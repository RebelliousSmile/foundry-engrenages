/**
 * Feuille de PNJ pour Engrenages
 * @extends {ActorSheet}
 */
import { EngrenagesRoll } from "../../dice/roll.js";

export class EngrenagesNpcSheet extends ActorSheet {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["engrenages", "sheet", "actor", "npc"],
            template: "systems/engrenages/templates/actors/npc-sheet.html",
            width: 600,
            height: 600,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "competences" }]
        });
    }

    /** @override */
    getData() {
        const context = super.getData();
        const actorData = this.actor.toObject(false);
        
        // Ajout des données de configuration
        context.config = CONFIG.engrenages.config;
        
        // Ajout des données de l'acteur
        context.system = actorData.system;
        context.flags = actorData.flags;
        
        // Préparation des données pour l'affichage
        this._prepareNpcData(context);
        
        return context;
    }

    /**
     * Prépare les données spécifiques aux PNJ
     * @param {Object} context - Contexte de la feuille
     * @private
     */
    _prepareNpcData(context) {
        // Vous pouvez ajouter ici des calculs spécifiques pour l'affichage
        // Par exemple, calculer des modificateurs, des totaux, etc.
        
        // S'assurer que la structure des capacités existe
        if (!context.system.abilities) {
            context.system.abilities = {};
        }
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Tout ce qui suit nécessite que la feuille ne soit pas en mode édition verrouillée
        if (!this.isEditable) return;

        // Gestion des clics sur les compétences pour lancer les dés
        html.find('.competence-value input').click(this._onRollCompetence.bind(this));
        
        // Gestion des clics sur les jauges pour les modifier
        html.find('.gauge-box input').change(this._onGaugeChange.bind(this));
        
        // Gestion du clic sur le nom pour éditer les détails
        html.find('.info-field input').change(this._onInfoChange.bind(this));
        
        // Gestion des capacités
        html.find('.add-ability').click(this._onAddAbility.bind(this));
        html.find('.ability-delete').click(this._onDeleteAbility.bind(this));
    }

    /**
     * Gère le lancer de dés pour une compétence
     * @param {Event} event - L'événement de clic
     * @private
     */
    async _onRollCompetence(event) {
        event.preventDefault();
        const element = event.currentTarget;
        const dataset = element.dataset;
        
        // Récupération du nom de la compétence à partir du nom du champ
        const inputName = element.getAttribute('name');
        if (!inputName) return;
        
        // Format attendu: system.category.value
        const parts = inputName.split('.');
        if (parts.length < 3) return;
        
        const category = parts[1]; // physique, mental, social
        
        // Récupération de la valeur
        const value = parseInt(this.actor.system[category].value) || 0;
        
        // Préparation des données pour le lancer
        const label = CONFIG.engrenages.config.fields[category] || category;
        
        // Lancer de dés
        await EngrenagesRoll.rollCompetence(this.actor, {
            category,
            label,
            value
        });
    }

    /**
     * Gère le changement de valeur d'une jauge
     * @param {Event} event - L'événement de changement
     * @private
     */
    _onGaugeChange(event) {
        event.preventDefault();
        // Logique de mise à jour des jauges si nécessaire
    }

    /**
     * Gère le changement des informations du PNJ
     * @param {Event} event - L'événement de changement
     * @private
     */
    _onInfoChange(event) {
        event.preventDefault();
        // Logique de mise à jour des informations si nécessaire
    }

    /**
     * Ajoute une nouvelle capacité au PNJ
     * @param {Event} event - L'événement de clic
     * @private
     */
    async _onAddAbility(event) {
        event.preventDefault();
        
        // Création d'un ID unique pour la nouvelle capacité
        const id = foundry.utils.randomID(16);
        
        // Préparation des données de mise à jour
        const updateData = {};
        updateData[`system.abilities.${id}`] = {
            name: "Nouvelle capacité",
            description: ""
        };
        
        // Mise à jour de l'acteur
        await this.actor.update(updateData);
    }

    /**
     * Supprime une capacité du PNJ
     * @param {Event} event - L'événement de clic
     * @private
     */
    async _onDeleteAbility(event) {
        event.preventDefault();
        
        // Récupération de l'ID de la capacité à supprimer
        const abilityItem = event.currentTarget.closest(".ability-item");
        const abilityId = abilityItem.dataset.abilityId;
        
        if (!abilityId) return;
        
        // Confirmation de la suppression
        const confirmDelete = await Dialog.confirm({
            title: "Supprimer la capacité",
            content: "<p>Êtes-vous sûr de vouloir supprimer cette capacité ?</p>",
            yes: () => true,
            no: () => false,
            defaultYes: false
        });
        
        if (!confirmDelete) return;
        
        // Préparation des données de mise à jour
        const updateData = {};
        updateData[`system.abilities.-=${abilityId}`] = null;
        
        // Mise à jour de l'acteur
        await this.actor.update(updateData);
    }
}
