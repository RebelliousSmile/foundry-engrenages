/**
 * Extension de la classe Actor pour le système Engrenages
 * @extends {Actor}
 */
export class EngrenagesActor extends Actor {
    /**
     * Augmente les données de l'acteur avec des données dérivées
     * @override
     */
    prepareDerivedData() {
        super.prepareDerivedData();
        
        const actorData = this.system;
        const flags = this.flags.engrenages || {};
        
        // Traitement selon le type d'acteur
        switch (this.type) {
            case 'character':
                this._prepareCharacterData(actorData);
                break;
            case 'npc':
                this._prepareNpcData(actorData);
                break;
        }
    }
    
    /**
     * Prépare les données dérivées pour les personnages
     * @param {Object} actorData - Données de l'acteur
     * @private
     */
    _prepareCharacterData(actorData) {
        // Calcul des modificateurs d'attributs
        if (actorData.attributes) {
            for (const [group, attrs] of Object.entries(actorData.attributes)) {
                for (const [key, attr] of Object.entries(attrs)) {
                    // Calcul du modificateur (valeur - 10) / 2, arrondi à l'inférieur
                    attrs[key].mod = Math.floor((attr - 10) / 2);
                }
            }
        }
        
        // Calcul de la capacité d'inventaire
        if (actorData.attributes?.physical?.strength) {
            const strength = actorData.attributes.physical.strength;
            actorData.inventory.capacity.max = strength * 2;
        }
        
        // Initialisation des ressources si elles n'existent pas
        if (!actorData.resources) {
            actorData.resources = {};
        }
        
        // Initialisation de la santé si elle n'existe pas
        if (!actorData.resources.health) {
            actorData.resources.health = { value: 10, max: 10 };
        }
        
        // Calcul des points de vie maximum
        if (actorData.attributes?.physical?.constitution) {
            const constitution = actorData.attributes.physical.constitution;
            const level = actorData.advancement?.level || 1;
            actorData.resources.health.max = 10 + constitution + (level - 1) * 5;
        }
    }
    
    /**
     * Prépare les données dérivées pour les PNJ
     * @param {Object} actorData - Données de l'acteur
     * @private
     */
    _prepareNpcData(actorData) {
        // Calcul des modificateurs d'attributs
        if (actorData.attributes) {
            for (const [group, attrs] of Object.entries(actorData.attributes)) {
                for (const [key, attr] of Object.entries(attrs)) {
                    // Calcul du modificateur (valeur - 10) / 2, arrondi à l'inférieur
                    attrs[key].mod = Math.floor((attr - 10) / 2);
                }
            }
        }
        
        // Initialisation des ressources si elles n'existent pas
        if (!actorData.resources) {
            actorData.resources = {};
        }
        
        // Initialisation de la santé si elle n'existe pas
        if (!actorData.resources.health) {
            actorData.resources.health = { value: 10, max: 10 };
        }
        
        // Calcul des points de vie maximum basé sur le niveau de menace
        const threat = actorData.details?.threat || 1;
        actorData.resources.health.max = threat * 10;
    }
    
    /**
     * Crée un jet de dés pour cet acteur
     * @param {string} attributeKey - Clé de l'attribut
     * @param {Object} options - Options pour le jet
     * @returns {Promise<Roll>} Le jet de dés
     */
    async rollAttribute(attributeKey, options = {}) {
        // Récupération de la valeur de l'attribut
        const attribute = this._getAttributeValue(attributeKey);
        if (attribute === undefined) {
            throw new Error(`Attribut ${attributeKey} non trouvé`);
        }
        
        // Préparation des données pour le jet
        const label = game.i18n.localize(`ENGRENAGES.Attribute.${attributeKey.capitalize()}`);
        const rollData = {
            actor: this,
            attribute: attribute
        };
        
        // Création de la formule de jet
        const formula = `2d6 + ${attribute}`;
        
        // Création du jet
        const roll = new Roll(formula, rollData);
        
        // Lancement du jet
        const result = await roll.evaluate();
        
        // Affichage du jet dans le chat
        if (options.showResult !== false) {
            const chatData = {
                user: game.user.id,
                speaker: ChatMessage.getSpeaker({ actor: this }),
                roll: result,
                content: `<h2>${label}</h2><p>${game.i18n.localize("ENGRENAGES.Roll.Result")}: ${result.total}</p>`
            };
            
            ChatMessage.create(chatData);
        }
        
        return result;
    }
    
    /**
     * Crée un jet de compétence pour cet acteur
     * @param {string} skillKey - Clé de la compétence
     * @param {Object} options - Options pour le jet
     * @returns {Promise<Roll>} Le jet de dés
     */
    async rollSkill(skillKey, options = {}) {
        // Récupération de la valeur de la compétence
        const skill = this.system.skills[skillKey];
        if (skill === undefined) {
            throw new Error(`Compétence ${skillKey} non trouvée`);
        }
        
        // Préparation des données pour le jet
        const label = game.i18n.localize(`ENGRENAGES.Skill.${skillKey.capitalize()}`);
        const rollData = {
            actor: this,
            skill: skill
        };
        
        // Création de la formule de jet
        const formula = `2d6 + ${skill}`;
        
        // Création du jet
        const roll = new Roll(formula, rollData);
        
        // Lancement du jet
        const result = await roll.evaluate();
        
        // Affichage du jet dans le chat
        if (options.showResult !== false) {
            const chatData = {
                user: game.user.id,
                speaker: ChatMessage.getSpeaker({ actor: this }),
                roll: result,
                content: `<h2>${label}</h2><p>${game.i18n.localize("ENGRENAGES.Roll.Result")}: ${result.total}</p>`
            };
            
            ChatMessage.create(chatData);
        }
        
        return result;
    }
    
    /**
     * Récupère la valeur d'un attribut
     * @param {string} key - Clé de l'attribut (ex: "physical.strength")
     * @returns {number|undefined} Valeur de l'attribut ou undefined si non trouvé
     * @private
     */
    _getAttributeValue(key) {
        const parts = key.split('.');
        let obj = this.system.attributes;
        
        for (const part of parts) {
            if (!obj[part]) return undefined;
            obj = obj[part];
        }
        
        return typeof obj === 'number' ? obj : undefined;
    }
}
