/**
 * Module de combat pour le système Engrenages
 * Ajoute des fonctionnalités de combat avancées au système
 */

import { EngrenagesModule } from "../core/module-manager.js";

export class CombatModule extends EngrenagesModule {
  /**
   * ID du module
   * @type {string}
   */
  id = "combat";
  
  /**
   * Nom du module
   * @type {string}
   */
  name = "Module de combat";
  
  /**
   * Description du module
   * @type {string}
   */
  description = "Ajoute des fonctionnalités de combat avancées au système Engrenages";
  
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
    
    // Enregistrer les paramètres spécifiques au combat
    game.settings.register("engrenages", "combat.useInitiativeBonus", {
      name: "Utiliser le bonus d'initiative",
      hint: "Ajoute un bonus d'initiative basé sur les compétences",
      scope: "world",
      config: true,
      type: Boolean,
      default: true
    });
    
    game.settings.register("engrenages", "combat.criticalHitThreshold", {
      name: "Seuil de coup critique",
      hint: "Valeur à partir de laquelle un jet est considéré comme critique",
      scope: "world",
      config: true,
      type: Number,
      default: 20,
      range: {
        min: 18,
        max: 20,
        step: 1
      }
    });
    
    // Enregistrer les hooks de combat
    Hooks.on("updateCombat", this._onUpdateCombat.bind(this));
    Hooks.on("getCombatTrackerEntryContext", this._addCombatTrackerContextOptions.bind(this));
  }
  
  /**
   * Méthode appelée lorsque le module est désactivé
   */
  onDisable() {
    console.log(`Module ${this.id} désactivé`);
  }
  
  /**
   * Gestion de la mise à jour du combat
   * @private
   */
  _onUpdateCombat(combat, update, options, userId) {
    // Logique de mise à jour du combat
    if (game.user.id !== userId) return;
    
    // Si le tour a changé
    if (update.turn !== undefined) {
      // Notification du changement de tour
      const combatant = combat.combatants.get(combat.current.combatantId);
      if (combatant && combatant.actor) {
        ui.notifications.info(`C'est au tour de ${combatant.actor.name} !`);
      }
    }
  }
  
  /**
   * Ajoute des options au menu contextuel du tracker de combat
   * @private
   */
  _addCombatTrackerContextOptions(html, options) {
    options.push({
      name: "Coup spécial",
      icon: '<i class="fas fa-fist-raised"></i>',
      condition: li => {
        const combatant = game.combat.combatants.get(li.data("combatant-id"));
        return combatant && combatant.isOwner;
      },
      callback: li => {
        const combatant = game.combat.combatants.get(li.data("combatant-id"));
        if (combatant && combatant.actor) {
          // Logique pour effectuer un coup spécial
          ui.notifications.info(`${combatant.actor.name} prépare un coup spécial !`);
        }
      }
    });
  }
}
