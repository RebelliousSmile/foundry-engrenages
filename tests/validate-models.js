/**
 * Script de validation des modèles de données pour le système Engrenages
 * 
 * Exécuter avec Node.js : node validate-models.js
 */

// Importation des modèles de données
import { ACTOR_MODELS } from '../module/models/actor-types.js';
import { ITEM_MODELS } from '../module/models/item-types.js';

// Fonction pour valider la structure des modèles d'acteurs
function validateActorModels() {
    console.log('Validation des modèles d\'acteurs...');
    
    // Vérifier que ACTOR_MODELS.Actor existe
    if (!ACTOR_MODELS.Actor) {
        console.error('Erreur: ACTOR_MODELS.Actor est undefined');
        return false;
    }
    
    // Vérifier que tous les types d'acteurs attendus existent
    const expectedActorTypes = ['character', 'npc', 'vehicle', 'organization', 'group'];
    for (const type of expectedActorTypes) {
        if (!ACTOR_MODELS.Actor[type]) {
            console.error(`Erreur: ACTOR_MODELS.Actor.${type} est undefined`);
            return false;
        }
    }
    
    console.log('Modèles d\'acteurs valides');
    return true;
}

// Fonction pour valider la structure des modèles d'objets
function validateItemModels() {
    console.log('Validation des modèles d\'objets...');
    
    // Vérifier que les types d'objets attendus existent directement dans ITEM_MODELS
    const expectedItemTypes = ['equipment', 'skill', 'trait'];
    for (const type of expectedItemTypes) {
        if (!ITEM_MODELS[type]) {
            console.error(`Erreur: ITEM_MODELS.${type} est undefined`);
            return false;
        }
    }
    
    console.log('Modèles d\'objets valides');
    return true;
}

// Fonction pour simuler l'enregistrement des modèles de données
function simulateRegisterDataModels() {
    console.log('Simulation de l\'enregistrement des modèles de données...');
    
    try {
        // Simulation de CONFIG.Actor.dataModels
        const actorDataModels = {
            character: ACTOR_MODELS.Actor.character,
            npc: ACTOR_MODELS.Actor.npc,
            vehicle: ACTOR_MODELS.Actor.vehicle,
            organization: ACTOR_MODELS.Actor.organization,
            group: ACTOR_MODELS.Actor.group
        };
        
        // Simulation de CONFIG.Item.dataModels
        const itemDataModels = {
            equipment: ITEM_MODELS.equipment,
            skill: ITEM_MODELS.skill,
            trait: ITEM_MODELS.trait
        };
        
        console.log('Simulation réussie');
        return true;
    } catch (error) {
        console.error('Erreur lors de la simulation:', error);
        return false;
    }
}

// Exécution des tests
console.log('=== Validation des modèles de données du système Engrenages ===');
const actorModelsValid = validateActorModels();
const itemModelsValid = validateItemModels();
const registrationSimulated = simulateRegisterDataModels();

if (actorModelsValid && itemModelsValid && registrationSimulated) {
    console.log('=== Tous les tests ont réussi ===');
} else {
    console.error('=== Certains tests ont échoué ===');
}
