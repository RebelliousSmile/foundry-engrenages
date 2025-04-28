/**
 * Définition des modèles de données pour les acteurs
 * Utilise le système de data models de Foundry VTT v10+
 */

import { EngrenagesConfig } from "../config.js";

/**
 * Modèle de données commun à tous les types d'acteurs
 */
const BaseActorModel = {
    templates: ["common"],
    
    // Attributs spécifiques à tous les acteurs
    biography: {
        type: String,
        default: ""
    },
    notes: {
        type: String,
        default: ""
    }
};

/**
 * Modèle de données pour les personnages joueurs
 */
const CharacterModel = {
    templates: ["common", "competences", "gauges", "specialisations", "traits"],
    
    // Caractéristiques spécifiques aux personnages
    details: {
        type: Object,
        default: {},
        nom: {
            type: String,
            default: ""
        },
        traits: {
            type: String,
            default: ""
        }
    },
    
    // Équipement
    equipment: {
        type: Object,
        default: {},
        slot1: {
            type: String,
            default: ""
        },
        slot2: {
            type: String,
            default: ""
        },
        slot3: {
            type: String,
            default: ""
        },
        slot4: {
            type: String,
            default: ""
        },
        slot5: {
            type: String,
            default: ""
        },
        slot6: {
            type: String,
            default: ""
        },
        slot7: {
            type: String,
            default: ""
        },
        slot8: {
            type: String,
            default: ""
        },
        slot9: {
            type: String,
            default: ""
        }
    }
};

/**
 * Modèle de données pour les PNJ
 */
const NpcModel = {
    templates: ["common", "competences", "gauges", "specialisations", "traits"],
    
    // Caractéristiques spécifiques aux PNJ
    details: {
        type: Object,
        default: {},
        faction: {
            type: String,
            default: ""
        },
        role: {
            type: String,
            default: ""
        },
        threat: {
            type: Number,
            min: 1,
            max: 10,
            default: 1
        }
    },
    
    // Notes du MJ
    gmNotes: {
        type: String,
        default: ""
    }
};

/**
 * Modèle de données pour les véhicules
 */
const VehicleModel = {
    templates: ["common"],
    
    // Détails du véhicule
    details: {
        type: Object,
        default: {},
        nom: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        }
    },
    
    // Caractéristiques du véhicule
    stats: {
        type: Object,
        default: {},
        vitesse: {
            type: Number,
            min: 0,
            max: 10,
            default: 5
        },
        maniabilite: {
            type: Number,
            min: 0,
            max: 10,
            default: 5
        },
        robustesse: {
            type: Number,
            min: 0,
            max: 10,
            default: 5
        }
    },
    
    // État du véhicule
    etat: {
        type: Object,
        default: {},
        value: {
            type: Number,
            default: 10,
            min: 0,
            max: 10
        },
        max: {
            type: Number,
            default: 10,
            min: 0
        }
    },
    
    // Équipements du véhicule
    equipements: {
        type: Object,
        default: {}
    }
};

/**
 * Modèle de données pour les organisations
 */
const OrganizationModel = {
    templates: ["common"],
    
    // Détails de l'organisation
    details: {
        type: Object,
        default: {},
        nom: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        }
    },
    
    // Influence de l'organisation
    influence: {
        type: Object,
        default: {},
        politique: {
            type: Number,
            min: 0,
            max: 10,
            default: 0
        },
        economique: {
            type: Number,
            min: 0,
            max: 10,
            default: 0
        },
        militaire: {
            type: Number,
            min: 0,
            max: 10,
            default: 0
        },
        sociale: {
            type: Number,
            min: 0,
            max: 10,
            default: 0
        }
    },
    
    // Ressources de l'organisation
    ressources: {
        type: Object,
        default: {},
        finances: {
            type: Number,
            min: 0,
            max: 10,
            default: 5
        },
        personnel: {
            type: Number,
            min: 0,
            max: 10,
            default: 5
        },
        equipement: {
            type: Number,
            min: 0,
            max: 10,
            default: 5
        }
    },
    
    // Membres importants
    membres: {
        type: Array,
        default: []
    }
};

/**
 * Modèle de données pour les groupes
 */
const GroupModel = {
    templates: ["common"],
    
    // Membres du groupe
    members: {
        type: Array,
        default: []
    },
    
    // Ressources partagées
    resources: {
        type: Object,
        default: {}
    }
};

/**
 * Template commun à tous les acteurs
 */
const CommonTemplate = {
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: "icons/svg/mystery-man.svg"
    },
    flags: {
        type: Object,
        default: {}
    }
};

/**
 * Template pour les compétences
 */
const CompetencesTemplate = {
    physique: {
        type: Object,
        default: {},
        athletisme: {
            type: Object,
            default: {},
            trained: {
                type: Boolean,
                default: false
            },
            value: {
                type: Number,
                min: 0,
                max: 10,
                default: 0
            }
        },
        conduite: {
            type: Object,
            default: {},
            trained: {
                type: Boolean,
                default: false
            },
            value: {
                type: Number,
                min: 0,
                max: 10,
                default: 0
            }
        },
        escrime: {
            type: Object,
            default: {},
            trained: {
                type: Boolean,
                default: false
            },
            value: {
                type: Number,
                min: 0,
                max: 10,
                default: 0
            }
        },
        pugilat: {
            type: Object,
            default: {},
            trained: {
                type: Boolean,
                default: false
            },
            value: {
                type: Number,
                min: 0,
                max: 10,
                default: 0
            }
        },
        tir: {
            type: Object,
            default: {},
            trained: {
                type: Boolean,
                default: false
            },
            value: {
                type: Number,
                min: 0,
                max: 10,
                default: 0
            }
        }
    },
    mental: {
        type: Object,
        default: {},
        citadin: {
            type: Object,
            default: {},
            trained: {
                type: Boolean,
                default: false
            },
            value: {
                type: Number,
                min: 0,
                max: 10,
                default: 0
            }
        },
        milieuRural: {
            type: Object,
            default: {},
            trained: {
                type: Boolean,
                default: false
            },
            value: {
                type: Number,
                min: 0,
                max: 10,
                default: 0
            }
        },
        sciences: {
            type: Object,
            default: {},
            trained: {
                type: Boolean,
                default: false
            },
            value: {
                type: Number,
                min: 0,
                max: 10,
                default: 0
            }
        },
        traumatologie: {
            type: Object,
            default: {},
            trained: {
                type: Boolean,
                default: false
            },
            value: {
                type: Number,
                min: 0,
                max: 10,
                default: 0
            }
        },
        custom: {
            type: Object,
            default: {},
            name: {
                type: String,
                default: ""
            },
            trained: {
                type: Boolean,
                default: false
            },
            value: {
                type: Number,
                min: 0,
                max: 10,
                default: 0
            }
        }
    },
    social: {
        type: Object,
        default: {},
        argutie: {
            type: Object,
            default: {},
            trained: {
                type: Boolean,
                default: false
            },
            value: {
                type: Number,
                min: 0,
                max: 10,
                default: 0
            }
        },
        creativite: {
            type: Object,
            default: {},
            trained: {
                type: Boolean,
                default: false
            },
            value: {
                type: Number,
                min: 0,
                max: 10,
                default: 0
            }
        },
        faconde: {
            type: Object,
            default: {},
            trained: {
                type: Boolean,
                default: false
            },
            value: {
                type: Number,
                min: 0,
                max: 10,
                default: 0
            }
        },
        maraude: {
            type: Object,
            default: {},
            trained: {
                type: Boolean,
                default: false
            },
            value: {
                type: Number,
                min: 0,
                max: 10,
                default: 0
            }
        },
        representation: {
            type: Object,
            default: {},
            trained: {
                type: Boolean,
                default: false
            },
            value: {
                type: Number,
                min: 0,
                max: 10,
                default: 0
            }
        }
    },
    occulte: {
        type: Object,
        default: {},
        nom: {
            type: String,
            default: "Occulte"
        },
        rituel: {
            type: Object,
            default: {},
            trained: {
                type: Boolean,
                default: false
            },
            value: {
                type: Number,
                min: 0,
                max: 10,
                default: 0
            }
        },
        mystere: {
            type: Object,
            default: {},
            trained: {
                type: Boolean,
                default: false
            },
            value: {
                type: Number,
                min: 0,
                max: 10,
                default: 0
            }
        },
        artefact: {
            type: Object,
            default: {},
            trained: {
                type: Boolean,
                default: false
            },
            value: {
                type: Number,
                min: 0,
                max: 10,
                default: 0
            }
        }
    }
};

/**
 * Template pour les jauges
 */
const GaugesTemplate = {
    gauges: {
        type: Object,
        default: {},
        physique: {
            type: Object,
            default: {},
            value: {
                type: Number,
                min: 0,
                max: 10,
                default: 0
            },
            max: {
                type: Number,
                min: 0,
                default: 10
            }
        },
        mental: {
            type: Object,
            default: {},
            value: {
                type: Number,
                min: 0,
                max: 10,
                default: 0
            },
            max: {
                type: Number,
                min: 0,
                default: 10
            }
        },
        social: {
            type: Object,
            default: {},
            value: {
                type: Number,
                min: 0,
                max: 10,
                default: 0
            },
            max: {
                type: Number,
                min: 0,
                default: 10
            }
        },
        occulte: {
            type: Object,
            default: {},
            value: {
                type: Number,
                min: 0,
                max: 10,
                default: 0
            },
            max: {
                type: Number,
                min: 0,
                default: 10
            }
        }
    }
};

/**
 * Template pour les spécialisations
 */
const SpecialisationsTemplate = {
    specialisations: {
        type: Object,
        default: {},
        // Les spécialisations sont stockées avec des ID uniques comme clés
        // Exemple: specialisations.abc123 = { name: "Armes à feu", category: "physique", value: 5 }
        // Les spécialisations sont liées à une compétence et ont une valeur entre 0 et 10
    }
};

/**
 * Template pour les traits
 */
const TraitsTemplate = {
    traits: {
        type: Object,
        default: {},
        // Les traits sont stockés avec des ID uniques comme clés
        // Exemple: traits.abc123 = { name: "Courageux", description: "...", value: 2 }
        // Les traits ont une valeur entre 0 et 3
    }
};

/**
 * Modèles de données pour les acteurs
 */
export const ACTOR_MODELS = {
    templates: {
        common: CommonTemplate,
        competences: CompetencesTemplate,
        gauges: GaugesTemplate,
        specialisations: SpecialisationsTemplate,
        traits: TraitsTemplate
    },
    Actor: {
        character: CharacterModel,
        npc: NpcModel,
        group: GroupModel
    }
};
