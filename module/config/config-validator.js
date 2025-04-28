/**
 * Validateur de configuration TOML pour le système Engrenages
 */
export class ConfigValidator {
  /**
   * Valide une configuration TOML pour s'assurer qu'elle est compatible avec le système Engrenages
   * @param {Object} config Configuration TOML parsée
   * @returns {Object} Résultat de la validation {valide: boolean, erreurs: Array}
   */
  static validerConfiguration(config) {
    const erreurs = [];
    let valide = true;
    
    // Vérifier la structure de base
    if (!config.system) {
      erreurs.push("La section 'system' est manquante");
      valide = false;
    } else {
      if (!config.system.name) {
        erreurs.push("Le nom du système est manquant (system.name)");
        valide = false;
      }
      if (!config.system.version) {
        erreurs.push("La version du système est manquante (system.version)");
        valide = false;
      }
    }
    
    // Vérifier la structure des compétences
    if (!config.competences || !config.competences.domaines) {
      erreurs.push("La section 'competences.domaines' est manquante");
      valide = false;
    } else {
      // Vérifier chaque domaine
      const domaines = config.competences.domaines;
      
      // Vérifier les domaines requis
      const domainesRequis = ["physique", "mental", "social"];
      domainesRequis.forEach(domaine => {
        if (!domaines[domaine]) {
          erreurs.push(`Le domaine '${domaine}' est requis`);
          valide = false;
        }
      });
      
      // Vérifier la structure de chaque domaine
      Object.entries(domaines).forEach(([nom, domaine]) => {
        if (!domaine.nom) {
          erreurs.push(`Le domaine '${nom}' n'a pas de nom défini`);
          valide = false;
        }
        
        if (!domaine.competences || !Array.isArray(domaine.competences) || domaine.competences.length === 0) {
          erreurs.push(`Le domaine '${nom}' doit avoir au moins une compétence`);
          valide = false;
        }
      });
    }
    
    // Vérifier les niveaux de compétence
    if (!config.competences.niveaux) {
      erreurs.push("La section 'competences.niveaux' est manquante");
      valide = false;
    } else {
      // Vérifier que les niveaux sont définis pour les valeurs 0 à 5
      for (let i = 0; i <= 5; i++) {
        if (config.competences.niveaux[i] === undefined) {
          erreurs.push(`Le niveau de compétence ${i} n'est pas défini`);
          valide = false;
        }
      }
    }
    
    // Vérifier les options
    if (!config.options) {
      erreurs.push("La section 'options' est manquante");
      valide = false;
    } else {
      if (typeof config.options.occulteActif !== 'boolean') {
        erreurs.push("L'option 'occulteActif' doit être un booléen");
        valide = false;
      }
    }
    
    return { valide, erreurs };
  }
}
