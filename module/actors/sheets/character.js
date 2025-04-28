/**
 * Feuille de personnage pour Engrenages
 * @extends {ActorSheet}
 */
import { EngrenagesRoll } from "../../dice/roll.js";

export class EngrenagesCharacterSheet extends ActorSheet {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["engrenages", "sheet", "actor", "character"],
            template: "systems/engrenages/templates/actors/character-sheet.html",
            width: 720,
            height: 680,
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
        this._prepareCharacterData(context);
        
        return context;
    }

    /**
     * Prépare les données spécifiques aux personnages
     * @param {Object} context - Contexte de la feuille
     * @private
     */
    _prepareCharacterData(context) {
        // Vous pouvez ajouter ici des calculs spécifiques pour l'affichage
        // Par exemple, calculer des modificateurs, des totaux, etc.
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Tout ce qui suit nécessite que la feuille ne soit pas en mode édition verrouillée
        if (!this.isEditable) return;

        // Gestion des clics sur les boutons et autres éléments interactifs
        html.find('.affichage-niveau-competence').click(this._onCompetenceValueSelect.bind(this));
        html.find('.option-valeur-competence').click(this._onCompetenceValueSelect.bind(this));
        html.find('.element-competence').click(this._onRollCompetence.bind(this));
        
        // Appliquer les couleurs de fond à partir des attributs data-color
        this._appliquerCouleursNiveauxCompetence(html);
        
        // Gestion des clics sur les jauges pour les modifier
        html.find('.gauge-box input').change(this._onGaugeChange.bind(this));
        
        // Gestion du clic sur le nom pour éditer les détails
        html.find('.info-field input').change(this._onInfoChange.bind(this));
        
        // Gestion des cases à cocher pour les compétences formées
        html.find('.competence-trained input').change(this._onTrainedChange.bind(this));
        
        // Gestion des spécialisations
        html.find('.add-specialisation').click(this._onAddSpecialisation.bind(this));
        html.find('.specialisation-delete').click(this._onDeleteSpecialisation.bind(this));
        html.find('.specialisation-name').on('blur', this._onSpecialisationNameChange.bind(this));
    }

    /**
     * Applique les couleurs de fond aux éléments d'affichage des niveaux de compétence
     * @param {JQuery} html - L'élément HTML de la feuille
     * @private
     */
    _appliquerCouleursNiveauxCompetence(html) {
        const elementsNiveaux = html.find('.affichage-niveau-competence');
        elementsNiveaux.each((_, element) => {
            const couleur = element.dataset.color;
            if (couleur) {
                element.style.backgroundColor = couleur;
            }
        });
    }

    /**
     * Gère le lancer de dés pour une compétence
     * @param {Event} evenement - L'événement de clic
     * @private
     */
    async _onRollCompetence(evenement) {
        evenement.preventDefault();
        const element = evenement.currentTarget;
        
        // Remonter jusqu'à trouver l'élément parent qui contient le champ input
        const elementCompetence = element.closest('.element-competence');
        if (!elementCompetence) return;
        
        const champInput = elementCompetence.querySelector('input[type="hidden"]');
        if (!champInput) return;
        
        // Récupération du nom de la compétence à partir du nom du champ
        const nomInput = champInput.getAttribute('name');
        if (!nomInput) return;
        
        // Format attendu: system.categorie.competence.value
        const parties = nomInput.split('.');
        if (parties.length < 4) return;
        
        const categorie = parties[1]; // physique, mental, social
        const nomCompetence = parties[2]; // nom de la compétence
        
        // Récupération des données de la compétence
        const competence = this.actor.system[categorie][nomCompetence];
        if (!competence) return;
        
        // Préparation des données pour le lancer
        const etiquette = CONFIG.engrenages.config[`competences${categorie.charAt(0).toUpperCase() + categorie.slice(1)}s`][nomCompetence] || nomCompetence;
        
        // Détermination du bonus basé sur la formation
        const formationBonus = competence.trained ? 2 : 0;
        const valeur = parseInt(competence.value) || 0;
        const total = valeur + formationBonus;
        
        // Lancer de dés
        await EngrenagesRoll.rollCompetence(this.actor, {
            category: categorie,
            competence: nomCompetence,
            label: etiquette,
            value: total
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
     * Gère le changement des informations du personnage
     * @param {Event} event - L'événement de changement
     * @private
     */
    _onInfoChange(event) {
        event.preventDefault();
        // Logique de mise à jour des informations si nécessaire
    }

    /**
     * Gère le changement de l'état de formation d'une compétence
     * @param {Event} event - L'événement de changement
     * @private
     */
    _onTrainedChange(event) {
        event.preventDefault();
        // Logique de mise à jour de l'état de formation si nécessaire
    }
    
    /**
     * Gère la sélection d'une valeur de compétence (pair/impair)
     * @param {Event} evenement - L'événement de clic
     * @private
     */
    async _onCompetenceValueSelect(evenement) {
        evenement.preventDefault();
        const element = evenement.currentTarget;
        const valeur = Number(element.dataset.value);
        
        // Remonter jusqu'à trouver l'élément parent qui contient le champ input
        const conteneurValeur = element.closest('.valeur-competence');
        if (!conteneurValeur) return;
        
        const champInput = conteneurValeur.querySelector('input[type="hidden"]');
        if (!champInput) return;
        
        // Mise à jour de la valeur dans le champ caché
        champInput.value = valeur;
        
        // Mise à jour de l'affichage
        const options = conteneurValeur.querySelectorAll('.option-valeur-competence');
        options.forEach(option => {
            if (Number(option.dataset.value) === valeur) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        });
        
        // Mise à jour de l'affichage du niveau
        const affichageNiveau = conteneurValeur.querySelector('.affichage-niveau-competence');
        if (affichageNiveau) {
            const couleur = CONFIG.engrenages.config.niveauxCompetence[valeur].color;
            const nom = game.i18n.localize(CONFIG.engrenages.config.niveauxCompetence[valeur].name);
            const description = game.i18n.localize(CONFIG.engrenages.config.niveauxCompetence[valeur].description);
            
            affichageNiveau.dataset.color = couleur;
            affichageNiveau.style.backgroundColor = couleur;
            affichageNiveau.querySelector('.nom-niveau-competence').textContent = nom;
            affichageNiveau.querySelector('.description-niveau-competence').textContent = description;
        }
        
        // Enregistrer la modification dans l'acteur
        await this._onSubmit(evenement);
    }
    
    /**
     * Ajoute une nouvelle spécialisation à l'acteur
     * @param {Event} event - L'événement de clic
     * @private
     */
    async _onAddSpecialisation(event) {
        event.preventDefault();
        
        // Récupération de la catégorie de la spécialisation
        const category = event.currentTarget.dataset.category;
        if (!category) return;
        
        // Création d'un ID unique pour la nouvelle spécialisation
        const id = foundry.utils.randomID(16);
        
        // Nom par défaut basé sur la catégorie
        let defaultName = "";
        switch(category) {
            case "physique":
                defaultName = game.i18n.localize("ENGRENAGES.CompetencesPhysiques.athletisme");
                break;
            case "mental":
                defaultName = game.i18n.localize("ENGRENAGES.CompetencesMentales.sciences");
                break;
            case "social":
                defaultName = game.i18n.localize("ENGRENAGES.CompetencesSociales.creativite");
                break;
            default:
                defaultName = game.i18n.localize("ENGRENAGES.Specialisations.New");
        }
        
        // Préparation des données de mise à jour
        const updateData = {};
        updateData[`system.specialisations.${id}`] = {
            name: defaultName,
            category: category,
            value: 1
        };
        
        // Mise à jour de l'acteur
        await this.actor.update(updateData);
    }
    
    /**
     * Supprime une spécialisation de l'acteur
     * @param {Event} event - L'événement de clic
     * @private
     */
    async _onDeleteSpecialisation(event) {
        event.preventDefault();
        
        // Récupération de l'ID de la spécialisation à supprimer
        const specialisationItem = event.currentTarget.closest(".specialisation-item");
        const specialisationId = specialisationItem.dataset.specialisationId;
        
        if (!specialisationId) return;
        
        // Confirmation de la suppression
        const confirmDelete = await Dialog.confirm({
            title: game.i18n.localize("ENGRENAGES.Specialisations.Delete"),
            content: `<p>${game.i18n.localize("ENGRENAGES.Specialisations.DeleteConfirm")}</p>`,
            yes: () => true,
            no: () => false,
            defaultYes: false
        });
        
        if (!confirmDelete) return;
        
        // Préparation des données de mise à jour
        const updateData = {};
        updateData[`system.specialisations.-=${specialisationId}`] = null;
        
        // Mise à jour de l'acteur
        await this.actor.update(updateData);
    }
    
    /**
     * Gère le changement de nom d'une spécialisation
     * @param {Event} event - L'événement de changement
     * @private
     */
    async _onSpecialisationNameChange(event) {
        event.preventDefault();
        
        // Récupération de l'ID de la spécialisation et de la nouvelle valeur
        const specialisationItem = event.currentTarget.closest(".specialisation-item");
        const specialisationId = specialisationItem.dataset.specialisationId;
        const newName = event.currentTarget.textContent.trim();
        
        if (!specialisationId || !newName) return;
        
        // Préparation des données de mise à jour
        const updateData = {};
        updateData[`system.specialisations.${specialisationId}.name`] = newName;
        
        // Mise à jour de l'acteur
        await this.actor.update(updateData);
    }
}
