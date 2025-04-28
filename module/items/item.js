/**
 * Extension de la classe Item pour le système Engrenages
 * @extends {Item}
 */
export class EngrenagesItem extends Item {
    /**
     * Augmente les données de l'objet avec des données dérivées
     * @override
     */
    prepareDerivedData() {
        super.prepareDerivedData();
        
        const itemData = this.system;
        const flags = this.flags.engrenages || {};
        
        // Traitement selon le type d'objet
        switch (this.type) {
            case 'equipment':
                this._prepareEquipmentData(itemData);
                break;
            case 'skill':
                this._prepareSkillData(itemData);
                break;
            case 'trait':
                this._prepareTraitData(itemData);
                break;
        }
    }
    
    /**
     * Prépare les données dérivées pour l'équipement
     * @param {Object} itemData - Données de l'objet
     * @private
     */
    _prepareEquipmentData(itemData) {
        // Calcul du prix de vente (moitié du prix d'achat)
        itemData.properties.sellPrice = Math.floor(itemData.properties.price / 2);
        
        // Calcul de l'état de durabilité
        if (itemData.properties.durability) {
            const durability = itemData.properties.durability;
            const ratio = durability.value / durability.max;
            
            if (ratio <= 0) {
                itemData.properties.condition = "broken";
            } else if (ratio <= 0.3) {
                itemData.properties.condition = "poor";
            } else if (ratio <= 0.7) {
                itemData.properties.condition = "used";
            } else {
                itemData.properties.condition = "good";
            }
        }
        
        // Calcul des bonus d'arme
        if (itemData.type === "weapon" && itemData.weapon) {
            // Calcul du bonus d'attaque basé sur la rareté
            switch (itemData.properties.rarity) {
                case "uncommon":
                    itemData.weapon.attackBonus = 1;
                    break;
                case "rare":
                    itemData.weapon.attackBonus = 2;
                    break;
                case "legendary":
                    itemData.weapon.attackBonus = 3;
                    break;
                default:
                    itemData.weapon.attackBonus = 0;
            }
        }
        
        // Calcul des bonus d'armure
        if (itemData.type === "armor" && itemData.armor) {
            // Calcul du bonus de protection basé sur la rareté
            switch (itemData.properties.rarity) {
                case "uncommon":
                    itemData.armor.bonusProtection = 1;
                    break;
                case "rare":
                    itemData.armor.bonusProtection = 2;
                    break;
                case "legendary":
                    itemData.armor.bonusProtection = 3;
                    break;
                default:
                    itemData.armor.bonusProtection = 0;
            }
            
            // Protection totale
            itemData.armor.totalProtection = itemData.armor.protection + itemData.armor.bonusProtection;
        }
    }
    
    /**
     * Prépare les données dérivées pour les compétences
     * @param {Object} itemData - Données de l'objet
     * @private
     */
    _prepareSkillData(itemData) {
        // Calcul du bonus de compétence basé sur le rang
        itemData.bonus = itemData.rank;
        
        // Calcul du nombre de spécialités disponibles
        itemData.maxSpecialties = Math.max(1, Math.floor(itemData.rank / 2));
        
        // Vérification des utilisations
        if (itemData.uses && itemData.uses.max > 0) {
            itemData.hasUses = true;
            itemData.isAvailable = itemData.uses.value > 0;
        } else {
            itemData.hasUses = false;
            itemData.isAvailable = true;
        }
    }
    
    /**
     * Prépare les données dérivées pour les traits
     * @param {Object} itemData - Données de l'objet
     * @private
     */
    _prepareTraitData(itemData) {
        // Vérification des utilisations
        if (itemData.uses && itemData.uses.max > 0) {
            itemData.hasUses = true;
            itemData.isAvailable = itemData.uses.value > 0;
        } else {
            itemData.hasUses = false;
            itemData.isAvailable = true;
        }
    }
    
    /**
     * Utilise l'objet (consomme une utilisation)
     * @returns {Promise<EngrenagesItem>} L'objet mis à jour
     */
    async use() {
        if (!this.system.hasUses || !this.system.isAvailable) {
            return this;
        }
        
        // Réduction du nombre d'utilisations
        const uses = duplicate(this.system.uses);
        uses.value = Math.max(0, uses.value - 1);
        
        // Mise à jour de l'objet
        await this.update({ "system.uses": uses });
        
        return this;
    }
    
    /**
     * Recharge l'objet (restaure toutes les utilisations)
     * @returns {Promise<EngrenagesItem>} L'objet mis à jour
     */
    async recharge() {
        if (!this.system.hasUses) {
            return this;
        }
        
        // Restauration du nombre d'utilisations
        const uses = duplicate(this.system.uses);
        uses.value = uses.max;
        
        // Mise à jour de l'objet
        await this.update({ "system.uses": uses });
        
        return this;
    }
    
    /**
     * Répare l'équipement (restaure la durabilité)
     * @param {number} amount - Montant de durabilité à restaurer
     * @returns {Promise<EngrenagesItem>} L'objet mis à jour
     */
    async repair(amount = 1) {
        if (this.type !== "equipment" || !this.system.properties.durability) {
            return this;
        }
        
        // Restauration de la durabilité
        const durability = duplicate(this.system.properties.durability);
        durability.value = Math.min(durability.max, durability.value + amount);
        
        // Mise à jour de l'objet
        await this.update({ "system.properties.durability": durability });
        
        return this;
    }
    
    /**
     * Endommage l'équipement (réduit la durabilité)
     * @param {number} amount - Montant de durabilité à réduire
     * @returns {Promise<EngrenagesItem>} L'objet mis à jour
     */
    async damage(amount = 1) {
        if (this.type !== "equipment" || !this.system.properties.durability) {
            return this;
        }
        
        // Réduction de la durabilité
        const durability = duplicate(this.system.properties.durability);
        durability.value = Math.max(0, durability.value - amount);
        
        // Mise à jour de l'objet
        await this.update({ "system.properties.durability": durability });
        
        return this;
    }
}
