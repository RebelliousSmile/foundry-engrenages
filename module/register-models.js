/**
 * Module pour l'enregistrement des modèles de données dans Foundry VTT
 * Cette approche évite les problèmes de localisation en enregistrant directement les modèles
 * dans CONFIG.Actor.dataModels et CONFIG.Item.dataModels
 */

import { ACTOR_MODELS } from "./models/actor-types.js";
import { ITEM_MODELS } from "./models/item-types.js";

/**
 * Enregistre les modèles de données dans Foundry VTT
 */
export function registerDataModels() {
  console.log("Engrenages | Enregistrement des modèles de données");
  
  // Enregistrement des modèles d'acteurs
  CONFIG.Actor.dataModels = {
    character: ACTOR_MODELS.Actor.character,
    npc: ACTOR_MODELS.Actor.npc,
    vehicle: ACTOR_MODELS.Actor.vehicle,
    organization: ACTOR_MODELS.Actor.organization,
    group: ACTOR_MODELS.Actor.group
  };
  
  // Enregistrement des modèles d'objets
  CONFIG.Item.dataModels = {
    equipment: ITEM_MODELS.equipment,
    skill: ITEM_MODELS.skill,
    trait: ITEM_MODELS.trait
  };
  
  console.log("Engrenages | Modèles de données enregistrés avec succès");
}
