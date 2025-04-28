/**
 * Module des organisations pour le système Engrenages
 * Ajoute le type d'acteur "organization" au système
 */

import { EngrenagesModule } from "../core/module-manager.js";

export class OrganizationsModule extends EngrenagesModule {
  /**
   * ID du module
   * @type {string}
   */
  id = "organizations";
  
  /**
   * Nom du module
   * @type {string}
   */
  name = "Module des organisations";
  
  /**
   * Description du module
   * @type {string}
   */
  description = "Ajoute le type d'acteur 'organisation' au système Engrenages";
  
  /**
   * Activé par défaut
   * @type {boolean}
   */
  defaultEnabled = false;
  
  /**
   * Types d'acteurs associés au module
   * @type {Array<string>}
   */
  actorTypes = ["organization"];
  
  /**
   * Méthode appelée lorsque le module est activé
   */
  onEnable() {
    console.log(`Module ${this.id} activé`);
    
    // Ajouter le type d'acteur "organization" au système
    CONFIG.Actor.types.push("organization");
    
    // Enregistrer les paramètres spécifiques aux organisations
    game.settings.register("engrenages", "organizations.showHierarchy", {
      name: "Afficher la hiérarchie",
      hint: "Affiche la hiérarchie des organisations dans leur fiche",
      scope: "world",
      config: true,
      type: Boolean,
      default: true
    });
  }
  
  /**
   * Méthode appelée lorsque le module est désactivé
   */
  onDisable() {
    console.log(`Module ${this.id} désactivé`);
    
    // Supprimer le type d'acteur "organization" du système
    const index = CONFIG.Actor.types.indexOf("organization");
    if (index > -1) {
      CONFIG.Actor.types.splice(index, 1);
    }
  }
}
