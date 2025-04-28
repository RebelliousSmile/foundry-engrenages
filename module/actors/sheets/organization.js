/**
 * Feuille d'organisation pour Engrenages
 * @extends {ActorSheet}
 */
export class EngrenagesOrganizationSheet extends ActorSheet {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["engrenages", "sheet", "actor", "organization"],
            template: "systems/engrenages/templates/actors/organization-sheet.html",
            width: 600,
            height: 650,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "influence" }]
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
        this._prepareOrganizationData(context);
        
        return context;
    }

    /**
     * Prépare les données spécifiques aux organisations
     * @param {Object} context - Contexte de la feuille
     * @private
     */
    _prepareOrganizationData(context) {
        // Vous pouvez ajouter ici des calculs spécifiques pour l'affichage
        // Par exemple, calculer des modificateurs, des totaux, etc.
        
        // S'assurer que la liste des membres existe
        if (!context.system.membres) {
            context.system.membres = [];
        }
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Tout ce qui suit nécessite que la feuille ne soit pas en mode édition verrouillée
        if (!this.isEditable) return;

        // Gestion des clics sur les valeurs d'influence
        html.find('.influence-section .stat-value input').change(this._onInfluenceChange.bind(this));
        
        // Gestion des clics sur les valeurs de ressources
        html.find('.ressources-section .stat-value input').change(this._onRessourceChange.bind(this));
        
        // Gestion du clic sur le nom pour éditer les détails
        html.find('.info-field input, .info-field textarea').change(this._onInfoChange.bind(this));
        
        // Gestion des membres
        html.find('.add-membre').click(this._onAddMembre.bind(this));
        html.find('.membre-delete').click(this._onDeleteMembre.bind(this));
        html.find('.membre-name input, .membre-role input').change(this._onMembreChange.bind(this));
    }

    /**
     * Gère le changement d'une valeur d'influence
     * @param {Event} event - L'événement de changement
     * @private
     */
    _onInfluenceChange(event) {
        event.preventDefault();
        // Logique de mise à jour des valeurs d'influence si nécessaire
    }

    /**
     * Gère le changement d'une valeur de ressource
     * @param {Event} event - L'événement de changement
     * @private
     */
    _onRessourceChange(event) {
        event.preventDefault();
        // Logique de mise à jour des valeurs de ressources si nécessaire
    }

    /**
     * Gère le changement des informations de l'organisation
     * @param {Event} event - L'événement de changement
     * @private
     */
    _onInfoChange(event) {
        event.preventDefault();
        // Logique de mise à jour des informations si nécessaire
    }

    /**
     * Ajoute un nouveau membre à l'organisation
     * @param {Event} event - L'événement de clic
     * @private
     */
    async _onAddMembre(event) {
        event.preventDefault();
        
        // Récupération de la liste actuelle des membres
        const membres = duplicate(this.actor.system.membres || []);
        
        // Ajout d'un nouveau membre
        membres.push({
            name: "Nouveau membre",
            role: "Rôle"
        });
        
        // Mise à jour de l'acteur
        await this.actor.update({ "system.membres": membres });
    }

    /**
     * Supprime un membre de l'organisation
     * @param {Event} event - L'événement de clic
     * @private
     */
    async _onDeleteMembre(event) {
        event.preventDefault();
        
        // Récupération de l'index du membre à supprimer
        const membreItem = event.currentTarget.closest(".membre-item");
        const index = membreItem.dataset.index;
        
        if (index === undefined) return;
        
        // Confirmation de la suppression
        const confirmDelete = await Dialog.confirm({
            title: "Supprimer le membre",
            content: "<p>Êtes-vous sûr de vouloir supprimer ce membre ?</p>",
            yes: () => true,
            no: () => false,
            defaultYes: false
        });
        
        if (!confirmDelete) return;
        
        // Récupération de la liste actuelle des membres
        const membres = duplicate(this.actor.system.membres || []);
        
        // Suppression du membre
        membres.splice(index, 1);
        
        // Mise à jour de l'acteur
        await this.actor.update({ "system.membres": membres });
    }

    /**
     * Gère le changement des informations d'un membre
     * @param {Event} event - L'événement de changement
     * @private
     */
    _onMembreChange(event) {
        event.preventDefault();
        // La mise à jour est gérée automatiquement par Foundry VTT
    }
}
