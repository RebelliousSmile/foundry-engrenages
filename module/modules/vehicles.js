/**
 * Module de véhicules pour le système Engrenages
 */

import { EngrenagesModule } from "../core/module-manager.js";

/**
 * Module de véhicules pour Engrenages
 */
export class VehiclesModule extends EngrenagesModule {
  constructor() {
    super();
    this.id = "vehicles";
    this.name = game.i18n.localize("ENGRENAGES.Optional.Vehicles.Name");
    this.description = game.i18n.localize("ENGRENAGES.Optional.Vehicles.Description");
    this.defaultEnabled = false;
    this.actorTypes = ["vehicle"];
  }
  
  /**
   * Méthode appelée lorsque le module est activé
   */
  onEnable() {
    super.onEnable();
    
    // Enregistrer la feuille de véhicule
    Actors.registerSheet("engrenages", game.engrenages.EngrenagesVehicleSheet, {
      types: ["vehicle"],
      makeDefault: true,
      label: "ENGRENAGES.SheetVehicle"
    });
    
    // Ajouter le type de véhicule à CONFIG.Actor.types
    if (!CONFIG.Actor.types.includes("vehicle")) {
      CONFIG.Actor.types.push("vehicle");
    }
    
    // Mettre à jour les types d'acteurs disponibles
    CONFIG.engrenages = CONFIG.engrenages || {};
    CONFIG.engrenages.actorTypes = CONFIG.engrenages.actorTypes || {};
    CONFIG.engrenages.actorTypes.vehicle = game.i18n.localize("ENGRENAGES.Types.Actor.vehicle");
    
    // Mettre à jour les traductions
    game.i18n.translations.ACTOR.TypeVehicle = game.i18n.localize("ENGRENAGES.Types.Actor.vehicle");
  }
  
  /**
   * Méthode appelée lorsque le module est désactivé
   */
  onDisable() {
    super.onDisable();
    
    // Supprimer le type de véhicule de CONFIG.Actor.types
    const index = CONFIG.Actor.types.indexOf("vehicle");
    if (index !== -1) {
      CONFIG.Actor.types.splice(index, 1);
    }
    
    // Supprimer le type de véhicule des types d'acteurs disponibles
    if (CONFIG.engrenages && CONFIG.engrenages.actorTypes) {
      delete CONFIG.engrenages.actorTypes.vehicle;
    }
  }
}
