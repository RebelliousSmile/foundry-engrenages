/**
 * Modèles de données pour le système Engrenages
 * Utilise l'approche moderne des TypeDataModel de Foundry VTT
 */

// Raccourci pour les champs de données Foundry
const fields = foundry.data.fields;

/**
 * Classe de base pour tous les modèles de données d'acteurs
 * @extends {foundry.abstract.TypeDataModel}
 */
export class BaseActorDataModel extends foundry.abstract.TypeDataModel {
    /** @override */
    static defineSchema() {
        return {
            biography: new fields.HTMLField({
                required: false,
                blank: true,
                initial: ""
            }),
            notes: new fields.StringField({
                required: false,
                blank: true,
                initial: ""
            })
        };
    }

    /**
     * Préparation des données de base
     */
    prepareBaseData() {
        // Préparation commune à tous les types d'acteurs
    }

    /**
     * Préparation des données dérivées
     */
    prepareDerivedData() {
        // Calculs communs à tous les types d'acteurs
    }
}

/**
 * Modèle de données pour les compétences
 */
function defineCompetencesSchema() {
    return {
        physique: new fields.SchemaField({
            athletisme: new fields.SchemaField({
                trained: new fields.BooleanField({ initial: false }),
                value: new fields.NumberField({ initial: 0, min: 0, max: 10 })
            }),
            conduite: new fields.SchemaField({
                trained: new fields.BooleanField({ initial: false }),
                value: new fields.NumberField({ initial: 0, min: 0, max: 10 })
            }),
            escrime: new fields.SchemaField({
                trained: new fields.BooleanField({ initial: false }),
                value: new fields.NumberField({ initial: 0, min: 0, max: 10 })
            }),
            pugilat: new fields.SchemaField({
                trained: new fields.BooleanField({ initial: false }),
                value: new fields.NumberField({ initial: 0, min: 0, max: 10 })
            }),
            tir: new fields.SchemaField({
                trained: new fields.BooleanField({ initial: false }),
                value: new fields.NumberField({ initial: 0, min: 0, max: 10 })
            })
        }),
        mental: new fields.SchemaField({
            citadin: new fields.SchemaField({
                trained: new fields.BooleanField({ initial: false }),
                value: new fields.NumberField({ initial: 0, min: 0, max: 10 })
            }),
            connaissances: new fields.SchemaField({
                trained: new fields.BooleanField({ initial: false }),
                value: new fields.NumberField({ initial: 0, min: 0, max: 10 })
            }),
            investigation: new fields.SchemaField({
                trained: new fields.BooleanField({ initial: false }),
                value: new fields.NumberField({ initial: 0, min: 0, max: 10 })
            }),
            medecine: new fields.SchemaField({
                trained: new fields.BooleanField({ initial: false }),
                value: new fields.NumberField({ initial: 0, min: 0, max: 10 })
            }),
            perception: new fields.SchemaField({
                trained: new fields.BooleanField({ initial: false }),
                value: new fields.NumberField({ initial: 0, min: 0, max: 10 })
            })
        }),
        social: new fields.SchemaField({
            commandement: new fields.SchemaField({
                trained: new fields.BooleanField({ initial: false }),
                value: new fields.NumberField({ initial: 0, min: 0, max: 10 })
            }),
            eloquence: new fields.SchemaField({
                trained: new fields.BooleanField({ initial: false }),
                value: new fields.NumberField({ initial: 0, min: 0, max: 10 })
            }),
            etiquette: new fields.SchemaField({
                trained: new fields.BooleanField({ initial: false }),
                value: new fields.NumberField({ initial: 0, min: 0, max: 10 })
            }),
            intimidation: new fields.SchemaField({
                trained: new fields.BooleanField({ initial: false }),
                value: new fields.NumberField({ initial: 0, min: 0, max: 10 })
            }),
            subterfuge: new fields.SchemaField({
                trained: new fields.BooleanField({ initial: false }),
                value: new fields.NumberField({ initial: 0, min: 0, max: 10 })
            })
        }),
        occulte: new fields.SchemaField({
            arcanes: new fields.SchemaField({
                trained: new fields.BooleanField({ initial: false }),
                value: new fields.NumberField({ initial: 0, min: 0, max: 10 })
            }),
            ésotérisme: new fields.SchemaField({
                trained: new fields.BooleanField({ initial: false }),
                value: new fields.NumberField({ initial: 0, min: 0, max: 10 })
            }),
            rituels: new fields.SchemaField({
                trained: new fields.BooleanField({ initial: false }),
                value: new fields.NumberField({ initial: 0, min: 0, max: 10 })
            }),
            surnaturel: new fields.SchemaField({
                trained: new fields.BooleanField({ initial: false }),
                value: new fields.NumberField({ initial: 0, min: 0, max: 10 })
            }),
            volonté: new fields.SchemaField({
                trained: new fields.BooleanField({ initial: false }),
                value: new fields.NumberField({ initial: 0, min: 0, max: 10 })
            })
        })
    };
}

/**
 * Modèle de données pour les jauges
 */
function defineGaugesSchema() {
    return {
        physique: new fields.SchemaField({
            value: new fields.NumberField({ initial: 0, min: 0, max: 10 }),
            max: new fields.NumberField({ initial: 10, min: 0 })
        }),
        mental: new fields.SchemaField({
            value: new fields.NumberField({ initial: 0, min: 0, max: 10 }),
            max: new fields.NumberField({ initial: 10, min: 0 })
        }),
        social: new fields.SchemaField({
            value: new fields.NumberField({ initial: 0, min: 0, max: 10 }),
            max: new fields.NumberField({ initial: 10, min: 0 })
        }),
        occulte: new fields.SchemaField({
            value: new fields.NumberField({ initial: 0, min: 0, max: 10 }),
            max: new fields.NumberField({ initial: 10, min: 0 })
        })
    };
}

/**
 * Modèle de données pour les spécialisations
 */
function defineSpecialisationsSchema() {
    return {
        list: new fields.ArrayField(new fields.SchemaField({
            id: new fields.StringField({ required: true }),
            name: new fields.StringField({ required: true }),
            category: new fields.StringField({ required: true }),
            value: new fields.NumberField({ initial: 0, min: 0, max: 10 })
        }))
    };
}

/**
 * Modèle de données pour les traits
 */
function defineTraitsSchema() {
    return {
        personality: new fields.ArrayField(new fields.SchemaField({
            id: new fields.StringField({ required: true }),
            name: new fields.StringField({ required: true }),
            value: new fields.NumberField({ initial: 1, min: 1, max: 3 }),
            description: new fields.StringField({ initial: "" })
        })),
        background: new fields.ArrayField(new fields.SchemaField({
            id: new fields.StringField({ required: true }),
            name: new fields.StringField({ required: true }),
            value: new fields.NumberField({ initial: 1, min: 1, max: 3 }),
            description: new fields.StringField({ initial: "" })
        }))
    };
}

/**
 * Modèle de données pour les personnages joueurs
 * @extends {BaseActorDataModel}
 */
export class CharacterDataModel extends BaseActorDataModel {
    /** @override */
    static defineSchema() {
        const baseSchema = super.defineSchema();
        return {
            ...baseSchema,
            ...defineCompetencesSchema(),
            ...defineGaugesSchema(),
            ...defineSpecialisationsSchema(),
            ...defineTraitsSchema(),
            details: new fields.SchemaField({
                nom: new fields.StringField({ initial: "" }),
                traits: new fields.StringField({ initial: "" })
            }),
            equipment: new fields.SchemaField({
                slot1: new fields.StringField({ initial: "" }),
                slot2: new fields.StringField({ initial: "" }),
                slot3: new fields.StringField({ initial: "" }),
                slot4: new fields.StringField({ initial: "" }),
                slot5: new fields.StringField({ initial: "" }),
                slot6: new fields.StringField({ initial: "" }),
                slot7: new fields.StringField({ initial: "" }),
                slot8: new fields.StringField({ initial: "" }),
                slot9: new fields.StringField({ initial: "" })
            })
        };
    }

    /** @override */
    prepareDerivedData() {
        super.prepareDerivedData();
        // Calculs spécifiques aux personnages joueurs
    }
}

/**
 * Modèle de données pour les PNJ
 * @extends {BaseActorDataModel}
 */
export class NpcDataModel extends BaseActorDataModel {
    /** @override */
    static defineSchema() {
        const baseSchema = super.defineSchema();
        return {
            ...baseSchema,
            ...defineCompetencesSchema(),
            ...defineGaugesSchema(),
            ...defineSpecialisationsSchema(),
            ...defineTraitsSchema(),
            details: new fields.SchemaField({
                faction: new fields.StringField({ initial: "" }),
                role: new fields.StringField({ initial: "" }),
                threat: new fields.NumberField({ initial: 1, min: 1, max: 10 })
            }),
            gmNotes: new fields.StringField({ initial: "" })
        };
    }

    /** @override */
    prepareDerivedData() {
        super.prepareDerivedData();
        // Calculs spécifiques aux PNJ
    }
}

/**
 * Modèle de données pour les véhicules
 * @extends {BaseActorDataModel}
 */
export class VehicleDataModel extends BaseActorDataModel {
    /** @override */
    static defineSchema() {
        const baseSchema = super.defineSchema();
        return {
            ...baseSchema,
            details: new fields.SchemaField({
                nom: new fields.StringField({ initial: "" }),
                type: new fields.StringField({ initial: "" }),
                description: new fields.StringField({ initial: "" })
            }),
            stats: new fields.SchemaField({
                vitesse: new fields.NumberField({ initial: 5, min: 0, max: 10 }),
                maniabilite: new fields.NumberField({ initial: 5, min: 0, max: 10 }),
                robustesse: new fields.NumberField({ initial: 5, min: 0, max: 10 })
            }),
            etat: new fields.SchemaField({
                value: new fields.NumberField({ initial: 10, min: 0, max: 10 }),
                max: new fields.NumberField({ initial: 10, min: 0 })
            }),
            equipements: new fields.ObjectField({ initial: {} })
        };
    }

    /** @override */
    prepareDerivedData() {
        super.prepareDerivedData();
        // Calculs spécifiques aux véhicules
    }
}

/**
 * Modèle de données pour les organisations
 * @extends {BaseActorDataModel}
 */
export class OrganizationDataModel extends BaseActorDataModel {
    /** @override */
    static defineSchema() {
        const baseSchema = super.defineSchema();
        return {
            ...baseSchema,
            details: new fields.SchemaField({
                nom: new fields.StringField({ initial: "" }),
                type: new fields.StringField({ initial: "" }),
                description: new fields.StringField({ initial: "" })
            }),
            influence: new fields.SchemaField({
                politique: new fields.NumberField({ initial: 0, min: 0, max: 10 }),
                economique: new fields.NumberField({ initial: 0, min: 0, max: 10 }),
                militaire: new fields.NumberField({ initial: 0, min: 0, max: 10 }),
                sociale: new fields.NumberField({ initial: 0, min: 0, max: 10 })
            }),
            ressources: new fields.SchemaField({
                finances: new fields.NumberField({ initial: 5, min: 0, max: 10 }),
                personnel: new fields.NumberField({ initial: 5, min: 0, max: 10 }),
                equipement: new fields.NumberField({ initial: 5, min: 0, max: 10 })
            }),
            membres: new fields.ArrayField(new fields.StringField())
        };
    }

    /** @override */
    prepareDerivedData() {
        super.prepareDerivedData();
        // Calculs spécifiques aux organisations
    }
}

/**
 * Modèle de données pour les groupes
 * @extends {BaseActorDataModel}
 */
export class GroupDataModel extends BaseActorDataModel {
    /** @override */
    static defineSchema() {
        const baseSchema = super.defineSchema();
        return {
            ...baseSchema,
            members: new fields.ArrayField(new fields.StringField()),
            resources: new fields.ObjectField({ initial: {} })
        };
    }

    /** @override */
    prepareDerivedData() {
        super.prepareDerivedData();
        // Calculs spécifiques aux groupes
    }
}

/**
 * Classe de base pour tous les modèles de données d'objets
 * @extends {foundry.abstract.TypeDataModel}
 */
export class BaseItemDataModel extends foundry.abstract.TypeDataModel {
    /** @override */
    static defineSchema() {
        return {
            description: new fields.HTMLField({
                required: false,
                blank: true,
                initial: ""
            }),
            notes: new fields.StringField({
                required: false,
                blank: true,
                initial: ""
            })
        };
    }

    /**
     * Préparation des données de base
     */
    prepareBaseData() {
        // Préparation commune à tous les types d'objets
    }

    /**
     * Préparation des données dérivées
     */
    prepareDerivedData() {
        // Calculs communs à tous les types d'objets
    }
}

/**
 * Modèle de données pour l'équipement
 * @extends {BaseItemDataModel}
 */
export class EquipmentDataModel extends BaseItemDataModel {
    /** @override */
    static defineSchema() {
        const baseSchema = super.defineSchema();
        return {
            ...baseSchema,
            type: new fields.StringField({
                initial: "misc",
                choices: ["weapon", "armor", "shield", "tool", "consumable", "misc"]
            }),
            weight: new fields.NumberField({ initial: 1 }),
            price: new fields.NumberField({ initial: 0 }),
            rarity: new fields.StringField({
                initial: "common",
                choices: ["common", "uncommon", "rare", "legendary"]
            }),
            durability: new fields.SchemaField({
                value: new fields.NumberField({ initial: 10 }),
                max: new fields.NumberField({ initial: 10 })
            }),
            effects: new fields.ArrayField(new fields.ObjectField()),
            weapon: new fields.SchemaField({
                damage: new fields.StringField({ initial: "1d6" }),
                impact: new fields.NumberField({ initial: 1, min: 1, max: 5 }),
                range: new fields.StringField({ initial: "melee" }),
                properties: new fields.ArrayField(new fields.StringField())
            }),
            armor: new fields.SchemaField({
                protection: new fields.NumberField({ initial: 0 }),
                penalty: new fields.NumberField({ initial: 0 })
            })
        };
    }

    /** @override */
    prepareDerivedData() {
        super.prepareDerivedData();
        // Calculs spécifiques à l'équipement
    }
}

/**
 * Modèle de données pour les compétences
 * @extends {BaseItemDataModel}
 */
export class SkillDataModel extends BaseItemDataModel {
    /** @override */
    static defineSchema() {
        const baseSchema = super.defineSchema();
        return {
            ...baseSchema,
            champ: new fields.StringField({
                initial: "physique",
                choices: ["physique", "mental", "social", "occulte"]
            }),
            rank: new fields.NumberField({ initial: 0, min: 0, max: 5 }),
            specialties: new fields.ArrayField(new fields.StringField()),
            uses: new fields.SchemaField({
                value: new fields.NumberField({ initial: 0 }),
                max: new fields.NumberField({ initial: 0 }),
                per: new fields.StringField({
                    initial: "day",
                    choices: ["encounter", "day", "week", "never"]
                })
            })
        };
    }

    /** @override */
    prepareDerivedData() {
        super.prepareDerivedData();
        // Calculs spécifiques aux compétences
    }
}

/**
 * Modèle de données pour les traits
 * @extends {BaseItemDataModel}
 */
export class TraitDataModel extends BaseItemDataModel {
    /** @override */
    static defineSchema() {
        const baseSchema = super.defineSchema();
        return {
            ...baseSchema,
            traitType: new fields.StringField({
                initial: "personality",
                choices: ["personality", "background", "physical", "social", "flaw", "bond"]
            }),
            value: new fields.NumberField({ initial: 1, min: 1, max: 3 }),
            effect: new fields.StringField({ initial: "" }),
            bonusExamples: new fields.StringField({ initial: "" }),
            malusExamples: new fields.StringField({ initial: "" })
        };
    }

    /** @override */
    prepareDerivedData() {
        super.prepareDerivedData();
        // Calculs spécifiques aux traits
    }
}
