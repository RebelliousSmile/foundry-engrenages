/**
 * Configuration du système Engrenages
 * Contient les constantes et configurations globales du système
 */

export const EngrenagesConfig = {
    // Types d'acteurs
    actorTypes: {
        character: "ENGRENAGES.ActorType.Character",
        npc: "ENGRENAGES.ActorType.NPC",
        group: "ENGRENAGES.ActorType.Group"
    },
    
    // Types d'objets
    itemTypes: {
        skill: "ENGRENAGES.ItemType.Skill",
        equipment: "ENGRENAGES.ItemType.Equipment",
        trait: "ENGRENAGES.ItemType.Trait",
        gauge: "ENGRENAGES.ItemType.Gauge"
    },
    
    // Catégories de compétences
    competenceCategories: {
        physique: "ENGRENAGES.CompetenceCategory.Physique",
        mental: "ENGRENAGES.CompetenceCategory.Mental",
        social: "ENGRENAGES.CompetenceCategory.Social"
    },
    
    // Compétences physiques
    competencesPhysiques: {
        athletisme: "ENGRENAGES.Competence.Athletisme",
        conduite: "ENGRENAGES.Competence.Conduite",
        escrime: "ENGRENAGES.Competence.Escrime",
        pugilat: "ENGRENAGES.Competence.Pugilat",
        tir: "ENGRENAGES.Competence.Tir"
    },
    
    // Compétences mentales
    competencesMentales: {
        citadin: "ENGRENAGES.Competence.Citadin",
        milieuRural: "ENGRENAGES.Competence.MilieuRural",
        sciences: "ENGRENAGES.Competence.Sciences",
        traumatologie: "ENGRENAGES.Competence.Traumatologie"
    },
    
    // Compétences sociales
    competencesSociales: {
        argutie: "ENGRENAGES.Competence.Argutie",
        creativite: "ENGRENAGES.Competence.Creativite",
        faconde: "ENGRENAGES.Competence.Faconde",
        maraude: "ENGRENAGES.Competence.Maraude",
        representation: "ENGRENAGES.Competence.Representation"
    },
    
    // Jauges
    gauges: {
        physique: "ENGRENAGES.Gauge.Physique",
        mental: "ENGRENAGES.Gauge.Mental",
        social: "ENGRENAGES.Gauge.Social"
    },
    
    // Formules de dés par défaut
    defaultDiceFormulas: {
        standard: "2d6",
        advantage: "3d6kh2",
        disadvantage: "3d6kl2"
    },
    
    // Résultats des lancers
    rollResults: {
        critical: {
            min: 12,
            label: "ENGRENAGES.Roll.Critical"
        },
        success: {
            min: 8,
            label: "ENGRENAGES.Roll.Success"
        },
        partial: {
            min: 6,
            label: "ENGRENAGES.Roll.Partial"
        },
        failure: {
            min: 0,
            label: "ENGRENAGES.Roll.Failure"
        }
    },
    
    // Modules optionnels disponibles
    optionalModules: {
        univers: {
            id: "univers",
            name: "ENGRENAGES.Optional.Univers.Name",
            description: "ENGRENAGES.Optional.Univers.Description",
            default: false,
            choices: {
                generique: "ENGRENAGES.Univers.Generique",
                steampunk: "ENGRENAGES.Univers.Steampunk",
                cyberpunk: "ENGRENAGES.Univers.Cyberpunk",
                fantasy: "ENGRENAGES.Univers.Fantasy"
            }
        },
        combat: {
            id: "combat",
            name: "ENGRENAGES.Optional.Combat.Name",
            description: "ENGRENAGES.Optional.Combat.Description",
            default: false
        },
        magie: {
            id: "magie",
            name: "ENGRENAGES.Optional.Magie.Name",
            description: "ENGRENAGES.Optional.Magie.Description",
            default: false
        }
    }
};
