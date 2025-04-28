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
 * Cette fonction génère dynamiquement le schéma des compétences en fonction de la configuration TOML
 */
function defineCompetencesSchema() {
    // Fonction helper pour créer une compétence
    const createSkill = () => ({
        trained: new fields.BooleanField({ initial: false }),
        value: new fields.NumberField({ initial: 0, min: 0, max: 10 })
    });
    
    // Vérifier si les paramètres du système sont disponibles
    const useSystemSettings = game && game.settings && game.settings.get;
    
    // Obtenir la configuration des compétences depuis les paramètres du système
    let skillsConfig;
    try {
        if (useSystemSettings) {
            // Essayer de récupérer la configuration depuis les paramètres du système
            skillsConfig = game.settings.get("engrenages", "skills.config");
        }
    } catch (error) {
        console.warn("Engrenages | Impossible de récupérer la configuration des compétences, utilisation des valeurs par défaut");
    }
    
    // Configuration par défaut si aucune n'est trouvée
    const defaultConfig = {
        // Configuration par défaut des champs et compétences
        fields: {
            physique: {
                enabled: true,
                skills: ["athletisme", "conduite", "escrime", "pugilat", "tir"]
            },
            mental: {
                enabled: true,
                skills: ["citadin", "milieuRural", "sciences", "traumatologie", "custom"]
            },
            social: {
                enabled: true,
                skills: ["argutie", "creativite", "faconde", "maraude", "representation"]
            },
            occulte: {
                enabled: true,
                skills: ["rituel", "mystere", "artefact"]
            }
        },
        enableOcculte: true
    };
    
    // Générer le schéma des compétences en fonction de la configuration
    const schema = {};
    
    // Vérifier si nous avons une configuration TOML
    if (useSystemSettings && game.engrenages && game.engrenages.configManager && game.engrenages.configManager.configuration) {
        const tomlConfig = game.engrenages.configManager.configuration;
        
        // Convertir la configuration TOML en configuration de compétences
        if (tomlConfig.competences && tomlConfig.competences.domaines) {
            const newConfig = {
                fields: {},
                enableOcculte: tomlConfig.options && tomlConfig.options.occulteActif
            };
            
            // Convertir les domaines de compétences
            Object.entries(tomlConfig.competences.domaines).forEach(([domaineName, domaineConfig]) => {
                newConfig.fields[domaineName] = {
                    enabled: true,
                    skills: domaineConfig.competences || []
                };
            });
            
            // Mettre à jour la configuration
            skillsConfig = newConfig;
            
            // Enregistrer la configuration convertie pour les autres parties du système
            if (useSystemSettings) {
                try {
                    game.settings.set("engrenages", "skills.config", newConfig);
                } catch (error) {
                    console.warn("Engrenages | Impossible d'enregistrer la configuration des compétences", error);
                }
            }
        }
    }
    
    // Utiliser la configuration ou les valeurs par défaut
    const config = skillsConfig || defaultConfig;
    
    // Parcourir les champs de compétences
    Object.entries(config.fields || {}).forEach(([fieldName, fieldConfig]) => {
        // Vérifier si le champ est activé
        if (fieldName === "occulte" && !config.enableOcculte) {
            return; // Ignorer le champ occulte s'il est désactivé
        }
        
        if (fieldConfig.enabled) {
            // Créer un objet pour stocker les compétences de ce champ
            const fieldSkills = {};
            
            // Ajouter les compétences actives pour ce champ
            fieldConfig.skills.forEach(skillName => {
                // Utiliser directement le nom de la compétence comme identifiant
                // car les templates utilisent ces identifiants directement
                fieldSkills[skillName] = new fields.SchemaField(createSkill());
            });
            
            // Ajouter le champ au schéma
            schema[fieldName] = new fields.SchemaField(fieldSkills);
        }
    });
    
    return schema;
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
