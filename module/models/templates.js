/**
 * Templates de modèles de données pour le système Engrenages
 * Ces templates sont utilisés pour définir des structures communes aux différents types d'acteurs et d'objets
 */

export const TEMPLATES = {
  // Templates communs à tous les types d'acteurs et d'objets
  common: {
    type: Object,
    default: {},
    img: { type: String, default: "icons/svg/mystery-man.svg" },
    description: { type: String, default: "" },
    notes: { type: String, default: "" }
  },
  
  // Template de base pour les acteurs
  base: {
    type: Object,
    default: {},
    name: { type: String, required: true, default: "" },
    type: { type: String, required: true }
  },
  
  // Template pour les compétences
  competences: {
    type: Object,
    default: {},
    physique: { type: Object, default: {} },
    mental: { type: Object, default: {} },
    social: { type: Object, default: {} },
    occulte: { type: Object, default: {} }
  },
  
  // Template pour les jauges
  gauges: {
    type: Object,
    default: {},
    sante: {
      type: Object,
      default: {},
      value: { type: Number, default: 10, min: 0, max: 10 },
      max: { type: Number, default: 10, min: 0 }
    },
    energie: {
      type: Object,
      default: {},
      value: { type: Number, default: 5, min: 0, max: 5 },
      max: { type: Number, default: 5, min: 0 }
    }
  },
  
  // Template pour les spécialisations
  specialisations: {
    type: Object,
    default: {},
    list: { type: Array, default: [] }
  },
  
  // Template pour les traits
  traits: {
    type: Object,
    default: {},
    personality: { type: Array, default: [] },
    background: { type: Array, default: [] },
    advantages: { type: Array, default: [] },
    disadvantages: { type: Array, default: [] }
  }
};
