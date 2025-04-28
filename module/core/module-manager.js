/**
 * Gestionnaire de modules pour le système Engrenages
 * Permet de gérer les modules optionnels du système
 */

export class ModuleManager {
  /**
   * Modules enregistrés
   * @type {Map<string, EngrenagesModule>}
   */
  static modules = new Map();
  
  /**
   * Initialise le gestionnaire de modules
   */
  static init() {
    // Enregistrer les modules de base
    this.registerCoreModules();
    
    // Initialiser les modules activés
    this.initActiveModules();
    
    // Enregistrer les hooks
    this._registerHooks();
  }
  
  /**
   * Enregistre les modules de base
   */
  static registerCoreModules() {
    // Importer les modules de base
    import("../modules/vehicles.js").then(m => this.registerModule(new m.VehiclesModule()));
    import("../modules/organizations.js").then(m => this.registerModule(new m.OrganizationsModule()));
    import("../modules/combat.js").then(m => this.registerModule(new m.CombatModule()));
    // Ajouter d'autres modules...
  }
  
  /**
   * Enregistre un module
   * @param {EngrenagesModule} module Module à enregistrer
   */
  static registerModule(module) {
    this.modules.set(module.id, module);
    
    // Enregistrer le paramètre du module
    game.settings.register("engrenages", `modules.${module.id}`, {
      name: module.name,
      hint: module.description,
      scope: "world",
      config: true,
      type: Boolean,
      default: module.defaultEnabled,
      onChange: value => {
        if (value) {
          ui.notifications.info(game.i18n.format("ENGRENAGES.Notifications.ModuleEnabled", {module: module.name}));
          // Initialiser le module si activé
          module.onEnable();
        } else {
          ui.notifications.info(game.i18n.format("ENGRENAGES.Notifications.ModuleDisabled", {module: module.name}));
          // Désactiver le module
          module.onDisable();
        }
        
        // Recharger la page pour appliquer les changements
        setTimeout(() => window.location.reload(), 1500);
      }
    });
  }
  
  /**
   * Initialise les modules activés
   */
  static initActiveModules() {
    for (const [id, module] of this.modules.entries()) {
      const isEnabled = game.settings.get("engrenages", `modules.${id}`);
      
      if (isEnabled) {
        module.onEnable();
      }
    }
  }
  
  /**
   * Vérifie si un module est activé
   * @param {string} moduleId ID du module
   * @returns {boolean} true si le module est activé
   */
  static isModuleEnabled(moduleId) {
    return game.settings.get("engrenages", `modules.${moduleId}`);
  }
  
  /**
   * Enregistre les hooks
   */
  static _registerHooks() {
    // Hook pour filtrer les types d'acteurs disponibles
    Hooks.on("renderDialog", (dialog, html, data) => {
      // Vérifie si c'est le dialogue de création d'acteur
      if (dialog.data.title === game.i18n.localize("ACTOR.Create")) {
        // Filtrer les types d'acteurs en fonction des modules activés
        for (const [id, module] of this.modules.entries()) {
          if (!this.isModuleEnabled(id)) {
            // Supprimer les types d'acteurs associés au module désactivé
            module.actorTypes.forEach(type => {
              html.find(`option[value="${type}"]`).remove();
            });
          }
        }
      }
    });
  }
}

/**
 * Classe de base pour les modules Engrenages
 */
export class EngrenagesModule {
  /**
   * ID du module
   * @type {string}
   */
  id = "";
  
  /**
   * Nom du module
   * @type {string}
   */
  name = "";
  
  /**
   * Description du module
   * @type {string}
   */
  description = "";
  
  /**
   * Activé par défaut
   * @type {boolean}
   */
  defaultEnabled = false;
  
  /**
   * Types d'acteurs associés au module
   * @type {Array<string>}
   */
  actorTypes = [];
  
  /**
   * Méthode appelée lorsque le module est activé
   */
  onEnable() {
    console.log(`Module ${this.id} activé`);
  }
  
  /**
   * Méthode appelée lorsque le module est désactivé
   */
  onDisable() {
    console.log(`Module ${this.id} désactivé`);
  }
}
