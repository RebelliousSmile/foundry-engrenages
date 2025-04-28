/**
 * Classe de base pour les feuilles d'objets du système Engrenages
 * @extends {ItemSheet}
 */
export class EngrenagesBaseItemSheet extends ItemSheet {
    /**
     * Configuration par défaut des feuilles d'objets
     * @override
     */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            width: 530,
            height: 480,
            classes: ["engrenages", "sheet", "item"],
            tabs: [{
                navSelector: ".sheet-tabs",
                contentSelector: ".sheet-body",
                initial: "description"
            }]
        });
    }

    /**
     * Récupère le template HTML à utiliser pour la feuille
     * @override
     */
    get template() {
        const path = "systems/engrenages/templates/items";
        return `${path}/${this.item.type}-sheet.html`;
    }

    /**
     * Prépare les données à envoyer au template HTML
     * @override
     */
    getData() {
        const context = super.getData();
        const itemData = context.data;

        // Enrichit les données avec des informations supplémentaires
        context.system = itemData.system;
        context.flags = itemData.flags;
        context.config = CONFIG.ENGRENAGES;
        context.isGM = game.user.isGM;
        context.isOwner = this.item.isOwner;
        context.isEditable = this.isEditable;

        return context;
    }

    /**
     * Active les écouteurs d'événements pour les interactions avec la feuille
     * @override
     * @param {HTMLElement} html - Le HTML rendu
     */
    activateListeners(html) {
        super.activateListeners(html);

        // Écouteurs d'événements communs à toutes les feuilles d'objets
        if (this.isEditable) {
            // Boutons génériques
            html.find('.item-control').click(this._onItemControl.bind(this));
            
            // Champs de texte et de nombre
            html.find('input[type="text"], input[type="number"]').change(this._onChangeInput.bind(this));
            
            // Cases à cocher
            html.find('input[type="checkbox"]').click(this._onToggleCheckbox.bind(this));
            
            // Sélecteurs
            html.find('select').change(this._onChangeSelect.bind(this));
        }

        // Écouteurs pour tous les utilisateurs (même non éditables)
        html.find('.rollable').click(this._onRoll.bind(this));
        html.find('.expandable').click(this._onToggleExpand.bind(this));
    }

    /**
     * Gère les contrôles d'objets (utiliser, recharger, réparer, etc.)
     * @param {Event} event - L'événement déclencheur
     * @private
     */
    async _onItemControl(event) {
        event.preventDefault();
        const button = event.currentTarget;
        const action = button.dataset.action;

        switch (action) {
            case "use":
                await this.item.use();
                break;
            case "recharge":
                await this.item.recharge();
                break;
            case "repair":
                const amount = parseInt(button.dataset.amount || 1);
                await this.item.repair(amount);
                break;
            case "damage":
                const damage = parseInt(button.dataset.amount || 1);
                await this.item.damage(damage);
                break;
        }

        // Rafraîchit la feuille
        this.render(true);
    }

    /**
     * Gère les changements dans les champs de saisie
     * @param {Event} event - L'événement déclencheur
     * @private
     */
    _onChangeInput(event) {
        event.preventDefault();
        const input = event.currentTarget;
        const field = input.name;
        let value = input.value;

        // Conversion en nombre si nécessaire
        if (input.type === "number") {
            value = Number(value);
        }

        // Mise à jour de l'objet
        this._updateObject(event, { [field]: value });
    }

    /**
     * Gère les changements dans les cases à cocher
     * @param {Event} event - L'événement déclencheur
     * @private
     */
    _onToggleCheckbox(event) {
        event.preventDefault();
        const checkbox = event.currentTarget;
        const field = checkbox.name;
        const value = checkbox.checked;

        // Mise à jour de l'objet
        this._updateObject(event, { [field]: value });
    }

    /**
     * Gère les changements dans les sélecteurs
     * @param {Event} event - L'événement déclencheur
     * @private
     */
    _onChangeSelect(event) {
        event.preventDefault();
        const select = event.currentTarget;
        const field = select.name;
        const value = select.value;

        // Mise à jour de l'objet
        this._updateObject(event, { [field]: value });
    }

    /**
     * Gère les jets de dés
     * @param {Event} event - L'événement déclencheur
     * @private
     */
    _onRoll(event) {
        event.preventDefault();
        const element = event.currentTarget;
        const dataset = element.dataset;

        // Délègue le jet à l'objet
        if (dataset.roll) {
            const label = dataset.label || this.item.name;
            const roll = new Roll(dataset.roll, this.item.getRollData());
            
            roll.toMessage({
                speaker: ChatMessage.getSpeaker({ actor: this.item.actor }),
                flavor: label,
                rollMode: game.settings.get("core", "rollMode")
            });
        }
    }

    /**
     * Gère l'expansion/réduction des sections
     * @param {Event} event - L'événement déclencheur
     * @private
     */
    _onToggleExpand(event) {
        event.preventDefault();
        const header = event.currentTarget;
        const content = header.nextElementSibling;
        
        // Bascule la visibilité
        header.classList.toggle("expanded");
        content.style.display = content.style.display === "none" ? "block" : "none";
    }
}
