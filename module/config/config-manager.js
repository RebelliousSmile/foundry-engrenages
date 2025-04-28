/**
 * Gestionnaire de configuration TOML pour le système Engrenages
 * Permet de charger et gérer des configurations d'univers personnalisés
 */

// Import du module TOML
import toml from "../lib/toml.js";
import { ConfigValidator } from "./config-validator.js";

export class ConfigurationEngrenages {
  /**
   * Valide une configuration TOML
   * @param {Object} config Configuration TOML parsée
   * @returns {Object} Résultat de la validation {valide: boolean, erreurs: Array}
   */
  static validerConfiguration(config) {
    return ConfigValidator.validerConfiguration(config);
  }
  static CONFIG_SETTING_KEY = "configurationToml";
  static DEFAULT_CONFIG_PATH = "systems/engrenages/config/default.toml";
  
  /**
   * Configuration actuelle
   * @type {Object}
   */
  static configuration = null;
  
  /**
   * Initialise le gestionnaire de configuration
   */
  static async init() {
    try {
      // Charge la configuration par défaut ou celle enregistrée
      const configData = game.settings.get("engrenages", this.CONFIG_SETTING_KEY);
      
      if (configData && configData.trim() !== "") {
        this.configuration = toml.parse(configData);
        console.log("Engrenages: Configuration TOML chargée depuis les paramètres");
      } else {
        await this.chargerConfigurationDefaut();
      }
      
      // Applique la configuration
      this.appliquerConfiguration();
    } catch (error) {
      console.error("Engrenages: Erreur lors de l'initialisation de la configuration", error);
      ui.notifications.error("Erreur de chargement de la configuration Engrenages. Voir la console pour plus de détails.");
    }
  }
  
  /**
   * Charge la configuration par défaut depuis le fichier
   */
  static async chargerConfigurationDefaut() {
    try {
      const response = await fetch(this.DEFAULT_CONFIG_PATH);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const configText = await response.text();
      this.configuration = toml.parse(configText);
      
      // Valider la configuration
      const validation = ConfigValidator.validerConfiguration(this.configuration);
      if (!validation.valide) {
        console.error("Engrenages: Configuration par défaut invalide", validation.erreurs);
        ui.notifications.warn("La configuration par défaut contient des erreurs. Voir la console pour plus de détails.");
      }
      
      // Enregistre la configuration par défaut dans les paramètres
      await game.settings.set("engrenages", this.CONFIG_SETTING_KEY, configText);
      
      console.log("Engrenages: Configuration par défaut chargée");
    } catch (error) {
      console.error("Engrenages: Erreur lors du chargement de la configuration par défaut", error);
      // Crée une configuration minimale en cas d'échec
      this.configuration = this.getConfigurationMinimale();
    }
  }
  
  /**
   * Retourne une configuration minimale en cas d'échec de chargement
   * @returns {Object} Configuration minimale
   */
  static getConfigurationMinimale() {
    return {
      system: {
        name: "Engrenages",
        version: "1.0.0",
        description: "Système de jeu Engrenages pour Foundry VTT"
      },
      competences: {
        domaines: {
          physique: {
            nom: "Physique",
            competences: ["athletisme", "conduite", "escrime", "pugilat", "tir"]
          },
          social: {
            nom: "Social",
            competences: ["argutie", "creativite", "faconde", "maraude", "representation"]
          },
          mental: {
            nom: "Mental",
            competences: ["citadin", "milieuRural", "sciences", "traumatologie", "custom"]
          },
          occulte: {
            nom: "Occulte",
            competences: ["rituel", "mystere", "artefact"]
          }
        },
        niveaux: {
          0: "Incompetent",
          1: "Novice",
          2: "Amateur",
          3: "Professional",
          4: "Specialist",
          5: "Authority"
        },
        descriptions: {
          0: "Lamentable",
          1: "Piètre",
          2: "Moyen",
          3: "Bon",
          4: "Remarquable",
          5: "Exceptionnel"
        }
      },
      options: {
        occulteActif: true
      }
    };
  }
  
  /**
   * Applique la configuration chargée au système
   */
  static appliquerConfiguration() {
    if (!this.configuration) return;
    
    // Mise à jour de la configuration des compétences
    if (this.configuration.competences && this.configuration.competences.domaines) {
      const configCompetences = {
        domaines: {}
      };
      
      // Traite chaque domaine de compétence
      Object.entries(this.configuration.competences.domaines).forEach(([key, domaine]) => {
        configCompetences.domaines[key] = {
          nom: domaine.nom || key,
          competences: domaine.competences || []
        };
      });
      
      // Détermine si le domaine occulte est activé
      const occulteActif = !!this.configuration.competences.domaines.occulte;
      
      // Met à jour la configuration du système
      const configSysteme = {
        competences: configCompetences,
        options: {
          occulteActif: occulteActif
        }
      };
      
      // Enregistre la configuration dans les paramètres du système
      game.settings.set("engrenages", "skills.config", configSysteme);
      
      console.log("Engrenages: Configuration des compétences mise à jour", configSysteme);
    }
  }
  
  /**
   * Charge une configuration depuis un fichier TOML
   * @param {File} file Fichier TOML à charger
   * @returns {Promise<boolean>} Succès du chargement
   */
  static async chargerFichierConfiguration(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (event) => {
        try {
          const configText = event.target.result;
          const config = toml.parse(configText);
          
          // Valider la configuration
          const validation = ConfigValidator.validerConfiguration(config);
          if (!validation.valide) {
            const erreurs = validation.erreurs.join("\n");
            ui.notifications.error(`Configuration invalide:\n${erreurs}`);
            return reject(new Error(`Configuration invalide: ${erreurs}`));
          }
          
          this.configuration = config;
          
          // Enregistre la configuration dans les paramètres
          await game.settings.set("engrenages", this.CONFIG_SETTING_KEY, configText);
          
          // Applique la configuration
          this.appliquerConfiguration();
          
          ui.notifications.info("Configuration Engrenages chargée avec succès");
          resolve(true);
        } catch (error) {
          console.error("Engrenages: Erreur lors du chargement de la configuration", error);
          ui.notifications.error("Erreur de chargement de la configuration. Voir la console pour plus de détails.");
          reject(error);
        }
      };
      
      reader.onerror = () => {
        ui.notifications.error("Erreur de lecture du fichier de configuration");
        reject(new Error("Erreur de lecture du fichier"));
      };
      
      reader.readAsText(file);
    });
  }
  
  /**
   * Enregistre la configuration actuelle dans un fichier TOML
   * @returns {string} Contenu TOML de la configuration
   */
  static exporterConfiguration() {
    // Cette fonction est simplifiée car nous n'avons pas de sérialisation TOML
    // Dans une implémentation complète, il faudrait convertir l'objet en TOML
    return game.settings.get("engrenages", this.CONFIG_SETTING_KEY);
  }
  
  /**
   * Met à jour la configuration avec un texte TOML
   * @param {string} tomlText Texte TOML de la configuration
   * @returns {Promise<boolean>} Succès de la mise à jour
   */
  static async mettreAJourConfiguration(tomlText) {
    try {
      // Vérifie que le TOML est valide
      const config = toml.parse(tomlText);
      
      // Valider la configuration
      const validation = ConfigValidator.validerConfiguration(config);
      if (!validation.valide) {
        const erreurs = validation.erreurs.join("\n");
        ui.notifications.error(`Configuration invalide:\n${erreurs}`);
        return false;
      }
      
      // Enregistre la configuration
      await game.settings.set("engrenages", this.CONFIG_SETTING_KEY, tomlText);
      this.configuration = config;
      
      // Applique la configuration
      this.appliquerConfiguration();
      
      ui.notifications.info("Configuration Engrenages mise à jour avec succès");
      return true;
    } catch (error) {
      console.error("Engrenages: Erreur lors de la mise à jour de la configuration", error);
      ui.notifications.error("Erreur de mise à jour de la configuration. Voir la console pour plus de détails.");
      return false;
    }
  }
}
