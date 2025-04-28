/**
 * Configuration du système Engrenages
 * Contient les constantes et configurations globales du système
 */

export const EngrenagesConfig = {
    // Types d'acteurs
    actorTypes: {
        character: "ENGRENAGES.ActorType.Character",
        npc: "ENGRENAGES.ActorType.NPC",
        vehicle: "ENGRENAGES.ActorType.Vehicle",
        organization: "ENGRENAGES.ActorType.Organization"
    },
    
    // Types d'objets
    itemTypes: {
        skill: "ENGRENAGES.ItemType.Skill",
        equipment: "ENGRENAGES.ItemType.Equipment",
        trait: "ENGRENAGES.ItemType.Trait",
        gauge: "ENGRENAGES.ItemType.Gauge"
    },
    
    // Champs de compétences
    competenceFields: {
        physique: "ENGRENAGES.Fields.Physique",
        mental: "ENGRENAGES.Fields.Mental",
        social: "ENGRENAGES.Fields.Social",
        occulte: "ENGRENAGES.Fields.Occulte"
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
        limitCompetences: {
            id: "limitCompetences",
            name: "ENGRENAGES.Optional.LimitCompetences.Name",
            description: "ENGRENAGES.Optional.LimitCompetences.Description",
            default: false
        },
        fieldsOnly: {
            id: "fieldsOnly",
            name: "ENGRENAGES.Optional.FieldsOnly.Name",
            description: "ENGRENAGES.Optional.FieldsOnly.Description",
            default: false
        },
        noCalculs: {
            id: "noCalculs",
            name: "ENGRENAGES.Optional.NoCalculs.Name",
            description: "ENGRENAGES.Optional.NoCalculs.Description",
            default: false
        },
        specialisations: {
            id: "specialisations",
            name: "ENGRENAGES.Optional.Specialisations.Name",
            description: "ENGRENAGES.Optional.Specialisations.Description",
            default: true
        },
        confrontations: {
            id: "confrontations",
            name: "ENGRENAGES.Optional.Confrontations.Name",
            description: "ENGRENAGES.Optional.Confrontations.Description",
            default: false
        },
        initiative: {
            id: "initiative",
            name: "ENGRENAGES.Optional.Initiative.Name",
            description: "ENGRENAGES.Optional.Initiative.Description",
            default: false
        },
        occultSciences: {
            id: "occultSciences",
            name: "ENGRENAGES.Optional.OccultSciences.Name",
            description: "ENGRENAGES.Optional.OccultSciences.Description",
            default: false
        },
        resources: {
            id: "resources",
            name: "ENGRENAGES.Optional.Resources.Name",
            description: "ENGRENAGES.Optional.Resources.Description",
            default: false
        },
        riskTaking: {
            id: "riskTaking",
            name: "ENGRENAGES.Optional.RiskTaking.Name",
            description: "ENGRENAGES.Optional.RiskTaking.Description",
            default: false
        },
        organizations: {
            id: "organizations",
            name: "ENGRENAGES.Optional.Organizations.Name",
            description: "ENGRENAGES.Optional.Organizations.Description",
            default: false
        },
        massCombat: {
            id: "massCombat",
            name: "ENGRENAGES.Optional.MassCombat.Name",
            description: "ENGRENAGES.Optional.MassCombat.Description",
            default: false
        },
        travels: {
            id: "travels",
            name: "ENGRENAGES.Optional.Travels.Name",
            description: "ENGRENAGES.Optional.Travels.Description",
            default: false
        },
        plans: {
            id: "plans",
            name: "ENGRENAGES.Optional.Plans.Name",
            description: "ENGRENAGES.Optional.Plans.Description",
            default: false
        },
        relations: {
            id: "relations",
            name: "ENGRENAGES.Optional.Relations.Name",
            description: "ENGRENAGES.Optional.Relations.Description",
            default: false
        },
        vehicles: {
            id: "vehicles",
            name: "ENGRENAGES.Optional.Vehicles.Name",
            description: "ENGRENAGES.Optional.Vehicles.Description",
            default: false
        },
        changeDice: {
            id: "changeDice",
            name: "ENGRENAGES.Optional.ChangeDice.Name",
            description: "ENGRENAGES.Optional.ChangeDice.Description",
            default: false
        },
        typeDice: {
            id: "typeDice",
            name: "ENGRENAGES.Optional.TypeDice.Name",
            description: "ENGRENAGES.Optional.TypeDice.Description",
            default: false
        },
        tensionDie: {
            id: "tensionDie",
            name: "ENGRENAGES.Optional.TensionDie.Name",
            description: "ENGRENAGES.Optional.TensionDie.Description",
            default: false
        },
        attachments: {
            id: "attachments",
            name: "ENGRENAGES.Optional.Attachments.Name",
            description: "ENGRENAGES.Optional.Attachments.Description",
            default: false
        },
        criticals: {
            id: "criticals",
            name: "ENGRENAGES.Optional.Criticals.Name",
            description: "ENGRENAGES.Optional.Criticals.Description",
            default: false
        },
        motivations: {
            id: "motivations",
            name: "ENGRENAGES.Optional.Motivations.Name",
            description: "ENGRENAGES.Optional.Motivations.Description",
            default: false
        },
        roles: {
            id: "roles",
            name: "ENGRENAGES.Optional.Roles.Name",
            description: "ENGRENAGES.Optional.Roles.Description",
            default: false
        },
        negativeExperience: {
            id: "negativeExperience",
            name: "ENGRENAGES.Optional.NegativeExperience.Name",
            description: "ENGRENAGES.Optional.NegativeExperience.Description",
            default: false
        },
        sharedExperience: {
            id: "sharedExperience",
            name: "ENGRENAGES.Optional.SharedExperience.Name",
            description: "ENGRENAGES.Optional.SharedExperience.Description",
            default: false
        },
        willpower: {
            id: "willpower",
            name: "ENGRENAGES.Optional.Willpower.Name",
            description: "ENGRENAGES.Optional.Willpower.Description",
            default: false
        }
    }
};
