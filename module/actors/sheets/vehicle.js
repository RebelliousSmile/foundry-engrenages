/**
 * Feuille de véhicule pour Engrenages
 * @extends {ActorSheet}
 */
export class EngrenagesVehicleSheet extends ActorSheet {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["engrenages", "sheet", "actor", "vehicle"],
            template: "systems/engrenages/templates/actors/vehicle-sheet.html",
            width: 600,
            height: 600,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "stats" }]
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
        this._prepareVehicleData(context);
        
        return context;
    }

    /**
     * Prépare les données spécifiques aux véhicules
     * @param {Object} context - Contexte de la feuille
     * @private
     */
    _prepareVehicleData(context) {
        // Vous pouvez ajouter ici des calculs spécifiques pour l'affichage
        // Par exemple, calculer des modificateurs, des totaux, etc.
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Tout ce qui suit nécessite que la feuille ne soit pas en mode édition verrouillée
        if (!this.isEditable) return;

        // Gestion des clics sur les caractéristiques
        html.find('.stat-value input').change(this._onStatChange.bind(this));
        
        // Gestion des clics sur l'état
        html.find('.gauge-box input').change(this._onEtatChange.bind(this));
        
        // Gestion du clic sur le nom pour éditer les détails
        html.find('.info-field input, .info-field textarea').change(this._onInfoChange.bind(this));
        
        // Gestion des équipements
        html.find('.add-equipement').click(this._onAddEquipement.bind(this));
        html.find('.equipement-delete').click(this._onDeleteEquipement.bind(this));
    }

    /**
     * Gère le changement d'une caractéristique
     * @param {Event} event - L'événement de changement
     * @private
     */
    _onStatChange(event) {
        event.preventDefault();
        // Logique de mise à jour des caractéristiques si nécessaire
    }

    /**
     * Gère le changement de l'état du véhicule
     * @param {Event} event - L'événement de changement
     * @private
     */
    _onEtatChange(event) {
        event.preventDefault();
        // Logique de mise à jour de l'état si nécessaire
    }

    /**
     * Gère le changement des informations du véhicule
     * @param {Event} event - L'événement de changement
     * @private
     */
    _onInfoChange(event) {
        event.preventDefault();
        // Logique de mise à jour des informations si nécessaire
    }

    /**
     * Ajoute un nouvel équipement au véhicule
     * @param {Event} event - L'événement de clic
     * @private
     */
    async _onAddEquipement(event) {
        event.preventDefault();
        
        // Création d'un ID unique pour le nouvel équipement
        const id = foundry.utils.randomID(16);
        
        // Préparation des données de mise à jour
        const updateData = {};
        updateData[`system.equipements.${id}`] = {
            name: "Nouvel équipement",
            description: ""
        };
        
        // Mise à jour de l'acteur
        await this.actor.update(updateData);
    }

    /**
     * Supprime un équipement du véhicule
     * @param {Event} event - L'événement de clic
     * @private
     */
    async _onDeleteEquipement(event) {
        event.preventDefault();
        
        // Récupération de l'ID de l'équipement à supprimer
        const equipementItem = event.currentTarget.closest(".equipement-item");
        const equipementId = equipementItem.dataset.equipementId;
        
        if (!equipementId) return;
        
        // Confirmation de la suppression
        const confirmDelete = await Dialog.confirm({
            title: "Supprimer l'équipement",
            content: "<p>Êtes-vous sûr de vouloir supprimer cet équipement ?</p>",
            yes: () => true,
            no: () => false,
            defaultYes: false
        });
        
        if (!confirmDelete) return;
        
        // Préparation des données de mise à jour
        const updateData = {};
        updateData[`system.equipements.-=${equipementId}`] = null;
        
        // Mise à jour de l'acteur
        await this.actor.update(updateData);
    }
}
