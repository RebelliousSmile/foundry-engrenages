/**
 * Définition des modèles de données pour les objets
 * Utilise le système de data models de Foundry VTT v10+
 */

import { EngrenagesConfig } from "../config.js";

/**
 * Modèle de données commun à tous les types d'objets
 */
const BaseItemModel = {
    templates: ["common"],
    
    // Attributs spécifiques à tous les objets
    description: {
        type: String,
        default: ""
    },
    notes: {
        type: String,
        default: ""
    }
};

/**
 * Modèle de données pour l'équipement
 */
const EquipmentModel = {
    templates: ["common"],
    
    // Caractéristiques spécifiques à l'équipement
    type: {
        type: String,
        default: "misc",
        choices: ["weapon", "armor", "shield", "tool", "consumable", "misc"]
    },
    
    // Champ pour le nom de l'équipement
    name: {
        type: String,
        required: true,
        default: ""
    },
    
    // Propriétés physiques
    properties: {
        type: Object,
        default: {}
    },
    
    // Poids de l'équipement
    weight: {
        type: Number,
        default: 1
    },
    
    // Prix de l'équipement
    price: {
        type: Number,
        default: 0
    },
    
    // Rareté de l'équipement
    rarity: {
        type: String,
        default: "common",
        choices: ["common", "uncommon", "rare", "legendary"]
    },
    
    // Durabilité de l'équipement
    durability: {
        type: Object,
        default: {}
    },
    
    // Valeur actuelle de durabilité
    durabilityValue: {
        type: Number,
        default: 10
    },
    
    // Valeur maximale de durabilité
    durabilityMax: {
        type: Number,
        default: 10
    },
    
    // Effets de l'équipement
    effects: {
        type: Array,
        default: []
    },
    
    // Pour les armes
    weapon: {
        type: Object,
        default: {}
    },
    
    // Dégâts de l'arme
    weaponDamage: {
        type: String,
        default: "1d6"
    },
    
    // Impact de l'arme
    weaponImpact: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    
    // Portée de l'arme
    weaponRange: {
        type: String,
        default: "melee"
    },
    
    // Propriétés spéciales de l'arme
    weaponProperties: {
        type: Array,
        default: []
    },
    
    // Pour les armures
    armor: {
        type: Object,
        default: {}
    },
    
    // Protection fournie par l'armure
    armorProtection: {
        type: Number,
        default: 0
    },
    
    // Pénalité de l'armure
    armorPenalty: {
        type: Number,
        default: 0
    }
};

/**
 * Modèle de données pour les compétences
 */
const SkillModel = {
    templates: ["common"],
    
    // Champ auquel la compétence est liée
    champ: {
        type: String,
        default: "physique",
        choices: ["physique", "mental", "social", "occulte"]
    },
    
    // Niveau de maîtrise
    rank: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    
    // Spécialités
    specialties: {
        type: Array,
        default: []
    },
    
    // Utilisations
    uses: {
        type: Object,
        default: {},
        value: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 0
        },
        per: {
            type: String,
            default: "day",
            choices: ["encounter", "day", "week", "never"]
        }
    }
};

/**
 * Modèle de données pour les traits
 */
const TraitModel = {
    templates: ["common"],
    
    // Type de trait
    traitType: {
        type: String,
        default: "personality",
        choices: ["personality", "background", "physical", "social", "flaw", "bond"]
    },
    
    // Valeur du trait (1, 2 ou 3 selon son importance)
    value: {
        type: Number,
        default: 1,
        min: 1,
        max: 3
    },
    
    // Effet mécanique du trait (description des bonus/malus potentiels)
    effect: {
        type: String,
        default: ""
    },
    
    // Exemples de situations où le trait apporte un bonus
    bonusExamples: {
        type: String,
        default: ""
    },
    
    // Exemples de situations où le trait apporte un malus
    malusExamples: {
        type: String,
        default: ""
    },
    
    // Notes additionnelles
    notes: {
        type: String,
        default: ""
    }
};

/**
 * Template commun à tous les objets
 */
const CommonTemplate = {
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: "icons/svg/item-bag.svg"
    },
    flags: {
        type: Object,
        default: {}
    }
};

/**
 * Modèles de données pour les objets
 */
export const ITEM_MODELS = {
    // Définir les modèles avec type et default pour éviter les erreurs de localisation
    equipment: {
        type: Object,
        default: {},
        ...EquipmentModel
    },
    skill: {
        type: Object,
        default: {},
        ...SkillModel
    },
    trait: {
        type: Object,
        default: {},
        ...TraitModel
    },
    templates: {
        common: CommonTemplate
    }
};
