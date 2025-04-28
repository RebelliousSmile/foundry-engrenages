/**
 * Formulaire de configuration TOML pour le système Engrenages
 * Permet aux MJ de gérer les configurations d'univers personnalisés
 */

import { ConfigurationEngrenages } from "../config/config-manager.js";
// Import de toml.js
import toml from "../lib/toml.js";

// Import dynamique de CodeMirror
let CodeMirror;

// Chargement de CodeMirror et de son mode TOML
async function chargerCodeMirror() {
  // Import dynamique de CodeMirror
  const CM = await import("../lib/codemirror.js");
  CodeMirror = CM.default || CM;
  
  // Import du mode TOML
  await import("../lib/mode/toml/toml.js");
  
  return CodeMirror;
}

export class FormConfigurationEngrenages extends FormApplication {
  // Référence à l'éditeur CodeMirror
  editor = null;
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "engrenages-config-form",
      title: "Configuration Engrenages",
      template: "systems/engrenages/templates/config/config-form.html",
      width: 720,
      height: 800,
      tabs: [
        { navSelector: ".tabs", contentSelector: ".tab-content", initial: "general" }
      ],
      classes: ["engrenages", "configuration-toml"]
    });
  }

  /**
   * Récupère les données pour le formulaire
   */
  getData() {
    const data = super.getData();
    
    // Récupère la configuration TOML actuelle
    data.configToml = game.settings.get("engrenages", ConfigurationEngrenages.CONFIG_SETTING_KEY);
    
    // Récupère la configuration parsée
    data.config = ConfigurationEngrenages.configuration;
    
    return data;
  }

  /**
   * Gestion des événements du formulaire
   */
  async activateListeners(html) {
    super.activateListeners(html);
    
    // Initialisation de CodeMirror
    const textArea = html.find('.toml-editor textarea')[0];
    if (textArea) {
      try {
        // Chargement dynamique de CodeMirror
        await chargerCodeMirror();
        
        // Création de l'éditeur
        this.editor = CodeMirror.fromTextArea(textArea, {
          mode: "toml",
          theme: "default",
          lineNumbers: true,
          lineWrapping: true,
          tabSize: 2,
          indentWithTabs: false,
          autofocus: true
        });
        
        // Ajuster la taille de l'éditeur
        this.editor.setSize("100%", "500px");
      } catch (error) {
        console.error("Engrenages: Erreur lors de l'initialisation de CodeMirror", error);
        ui.notifications.error("Erreur lors de l'initialisation de l'éditeur de code. Voir la console pour plus de détails.");
      }
    }
    
    // Bouton d'importation de fichier TOML
    html.find('.importer-config').click(this._onImporterConfig.bind(this));
    
    // Bouton d'exportation de la configuration
    html.find('.exporter-config').click(this._onExporterConfig.bind(this));
    
    // Bouton de réinitialisation à la configuration par défaut
    html.find('.reinitialiser-config').click(this._onReinitialiserConfig.bind(this));
  }

  /**
   * Traitement de la soumission du formulaire
   */
  async _updateObject(event, formData) {
    try {
      // Récupérer le contenu TOML depuis CodeMirror si disponible
      const tomlContent = this.editor ? this.editor.getValue() : formData.configToml;
      
      // Valider la configuration
      try {
        const config = toml.parse(tomlContent);
        const validation = ConfigurationEngrenages.validerConfiguration(config);
        
        if (!validation.valide) {
          // Afficher les erreurs
          const erreurs = validation.erreurs.join("<br>");
          return ui.notifications.error(`Erreurs dans la configuration TOML:<br>${erreurs}`);
        }
      } catch (parseError) {
        return ui.notifications.error(`Erreur de syntaxe TOML: ${parseError.message}`);
      }
      
      // Mettre à jour la configuration
      const success = await ConfigurationEngrenages.mettreAJourConfiguration(tomlContent);
      
      if (success) {
        // Recharger la page pour appliquer les changements
        window.location.reload();
      }
    } catch (error) {
      console.error("Engrenages: Erreur lors de la mise à jour de la configuration", error);
      ui.notifications.error("Erreur de mise à jour de la configuration. Voir la console pour plus de détails.");
    }
  }

  /**
   * Gestion de l'importation d'un fichier TOML
   */
  _onImporterConfig(event) {
    event.preventDefault();
    
    // Crée un élément input file invisible
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = ".toml";
    
    // Gestion de la sélection de fichier
    inputFile.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      try {
        // Charge le fichier TOML
        await ConfigurationEngrenages.chargerFichierConfiguration(file);
        
        // Recharge le formulaire
        this.render(true);
      } catch (error) {
        console.error("Engrenages: Erreur lors de l'importation du fichier", error);
      }
    });
    
    // Déclenche la boîte de dialogue de sélection de fichier
    inputFile.click();
  }

  /**
   * Gestion de l'exportation de la configuration
   */
  _onExporterConfig(event) {
    event.preventDefault();
    
    // Récupère la configuration TOML
    const tomlContent = ConfigurationEngrenages.exporterConfiguration();
    
    // Crée un blob et un lien de téléchargement
    const blob = new Blob([tomlContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    
    // Crée un lien de téléchargement invisible
    const a = document.createElement("a");
    a.href = url;
    a.download = "engrenages-config.toml";
    
    // Déclenche le téléchargement
    document.body.appendChild(a);
    a.click();
    
    // Nettoie
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }

  /**
   * Gestion de la réinitialisation à la configuration par défaut
   */
  async _onReinitialiserConfig(event) {
    event.preventDefault();
    
    // Demande confirmation
    const confirm = await Dialog.confirm({
      title: "Réinitialiser la configuration",
      content: "<p>Êtes-vous sûr de vouloir réinitialiser la configuration à ses valeurs par défaut ?</p><p>Toutes vos modifications seront perdues.</p>",
      yes: () => true,
      no: () => false
    });
    
    if (confirm) {
      // Charge la configuration par défaut
      await ConfigurationEngrenages.chargerConfigurationDefaut();
      
      // Recharge le formulaire
      this.render(true);
      
      ui.notifications.info("Configuration réinitialisée aux valeurs par défaut");
    }
  }
}
