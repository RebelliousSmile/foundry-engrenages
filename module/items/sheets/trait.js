/**
 * Feuille d'objet pour les traits dans Engrenages
 * @extends {ItemSheet}
 */
export class EngrenagesTraitSheet extends ItemSheet {
    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["engrenages", "sheet", "item", "trait"],
            template: "systems/engrenages/templates/items/trait-sheet.html",
            width: 500,
            height: 400,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    /** @override */
    getData() {
        const context = super.getData();
        const itemData = this.item.toObject(false);
        
        // Ajout des données de configuration
        context.config = CONFIG.engrenages.config;
        
        // Ajout des données de l'objet
        context.system = itemData.system;
        context.flags = itemData.flags;
        
        return context;
    }

    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        // Tout ce qui suit nécessite que la feuille ne soit pas en mode édition verrouillée
        if (!this.isEditable) return;
        
        // Gestion des événements spécifiques aux traits
    }
}
