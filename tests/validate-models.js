/**
 * Script de validation des modèles de données pour le système Engrenages
 * 
 * Exécuter avec Node.js : node validate-models.js
 */

// Importation des modèles de données
import { ACTOR_MODELS } from '../module/models/actor-types.js';
import { ITEM_MODELS } from '../module/models/item-types.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Obtenir le chemin absolu du répertoire courant
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_PATH = path.resolve(__dirname, '..');

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

/**
 * Fonction pour vérifier la structure des objets imbriqués dans les modèles de données
 * Cette fonction détecte les problèmes courants qui peuvent causer des erreurs de localisation
 */
function validateNestedObjectStructure(schema, path = '', debug = false) {
    const issues = [];
    
    // Vérifier si c'est un objet
    if (typeof schema !== 'object' || schema === null) {
        return issues;
    }
    
    if (debug) {
        console.log(`Vérification de ${path}:`);
        console.log(`  Type: ${schema.type ? (typeof schema.type === 'function' ? schema.type.name : schema.type) : 'non défini'}`);
        console.log(`  Default: ${schema.default !== undefined ? 'oui' : 'non'}`);
        console.log(`  Required: ${schema.required ? 'oui' : 'non'}`);
        console.log(`  Propriétés: ${Object.keys(schema).join(', ')}`);
    }
    
    // Vérifier si c'est un objet de type avec des propriétés valides
    if (schema.type === 'Object' || schema.type === Object) {
        // Un objet doit avoir une propriété default
        if (!('default' in schema)) {
            issues.push(`${path}: Objet sans propriété 'default'`);
        }
        
        // Vérifier les propriétés qui ne sont pas des méta-propriétés
        const metaProps = ['type', 'default', 'required', 'choices', 'min', 'max'];
        
        for (const [key, value] of Object.entries(schema)) {
            if (!metaProps.includes(key)) {
                // C'est une sous-propriété, vérifier sa structure
                const subPath = path ? `${path}.${key}` : key;
                const subIssues = validateNestedObjectStructure(value, subPath, debug);
                issues.push(...subIssues);
            }
        }
    } else if (schema.type) {
        // C'est un champ typé, vérifier qu'il a les propriétés requises
        if (!('default' in schema) && !schema.required) {
            const issue = `${path}: Champ sans valeur par défaut ni propriété 'required' (type: ${typeof schema.type === 'function' ? schema.type.name : schema.type})`;
            issues.push(issue);
            if (debug) {
                console.log(`  PROBLÈME: ${issue}`);
                console.log(`  Contenu: ${JSON.stringify(schema)}`);
            }
        }
    } else {
        // C'est un objet sans type défini, parcourir ses propriétés
        if (debug) {
            console.log(`  Objet sans type défini: ${path}`);
        }
        
        for (const [key, value] of Object.entries(schema)) {
            if (key !== 'templates') { // Ignorer les templates
                const subPath = path ? `${path}.${key}` : key;
                const subIssues = validateNestedObjectStructure(value, subPath, debug);
                issues.push(...subIssues);
            }
        }
    }
    
    return issues;
}

/**
 * Fonction pour vérifier si les clés de localisation requises existent
 */
function validateLocalizationKeys(models, type) {
    console.log(`Vérification des clés de localisation pour les modèles de ${type}...`);
    const issues = [];
    
    // Charger le fichier de traduction
    try {
        const translationPath = path.join(BASE_PATH, 'lang', 'fr.json');
        const translationContent = fs.readFileSync(translationPath, 'utf8');
        const translations = JSON.parse(translationContent);
        
        // Vérifier les clés de type
        if (type === 'Actor') {
            for (const [key, model] of Object.entries(models.Actor)) {
                const localizationKey = `TYPES.Actor.${key}`;
                let current = translations;
                const parts = localizationKey.split('.');
                
                for (const part of parts) {
                    if (!current || !current[part]) {
                        issues.push(`Clé de localisation manquante: ${localizationKey}`);
                        break;
                    }
                    current = current[part];
                }
            }
        } else if (type === 'Item') {
            for (const [key, model] of Object.entries(models)) {
                if (key !== 'templates') {
                    const localizationKey = `TYPES.Item.${key}`;
                    let current = translations;
                    const parts = localizationKey.split('.');
                    
                    for (const part of parts) {
                        if (!current || !current[part]) {
                            issues.push(`Clé de localisation manquante: ${localizationKey}`);
                            break;
                        }
                        current = current[part];
                    }
                }
            }
        }
    } catch (error) {
        issues.push(`Erreur lors de la vérification des clés de localisation: ${error.message}`);
    }
    
    return issues;
}

/**
 * Fonction pour vérifier les problèmes courants qui peuvent causer des erreurs de localisation
 */
function validateLocalizationStructure(models, type) {
    console.log(`Vérification de la structure de localisation pour les modèles de ${type}...`);
    const issues = [];
    
    // Vérifier les propriétés 'apply' qui pourraient causer des erreurs
    function checkForApplyIssues(obj, path = '') {
        if (typeof obj !== 'object' || obj === null) return;
        
        if ('apply' in obj && typeof obj.apply !== 'function') {
            issues.push(`${path}: Propriété 'apply' invalide (doit être une fonction)`);
        }
        
        for (const [key, value] of Object.entries(obj)) {
            const newPath = path ? `${path}.${key}` : key;
            if (typeof value === 'object' && value !== null) {
                checkForApplyIssues(value, newPath);
            }
        }
    }
    
    if (type === 'Actor') {
        for (const [key, model] of Object.entries(models.Actor)) {
            checkForApplyIssues(model, `Actor.${key}`);
        }
        
        // Vérifier les templates
        for (const [key, template] of Object.entries(models.templates)) {
            checkForApplyIssues(template, `templates.${key}`);
        }
    } else if (type === 'Item') {
        for (const [key, model] of Object.entries(models)) {
            if (key !== 'templates') {
                checkForApplyIssues(model, `Item.${key}`);
            }
        }
        
        // Vérifier les templates
        if (models.templates) {
            for (const [key, template] of Object.entries(models.templates)) {
                checkForApplyIssues(template, `templates.${key}`);
            }
        }
    }
    
    return issues;
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
        
        // Simulation de la localisation des schémas
        console.log('Simulation de la localisation des schémas...');
        simulateSchemaLocalization(actorDataModels, 'Actor');
        simulateSchemaLocalization(itemDataModels, 'Item');
        
        console.log('Simulation réussie');
        return true;
    } catch (error) {
        console.error('Erreur lors de la simulation:', error);
        return false;
    }
}

/**
 * Fonction pour simuler la localisation des schémas
 * Cette fonction détecte les problèmes qui peuvent causer l'erreur
 * "Cannot read properties of undefined (reading 'apply')"
 */
function simulateSchemaLocalization(dataModels, type) {
    // Simuler la fonction de localisation de Foundry
    function localizeSchema(schema, path = '') {
        if (typeof schema !== 'object' || schema === null) return;
        
        // Vérifier les propriétés qui peuvent avoir besoin de localisation
        if (schema.label) {
            // Simuler la localisation d'une étiquette
            const localizationKey = `${type}.${path}.label`;
            // Si schema.label.apply n'est pas une fonction, cela générera une erreur
            if (typeof schema.label.apply !== 'function') {
                throw new Error(`Erreur de localisation: Cannot read properties of undefined (reading 'apply') à ${localizationKey}`);
            }
        }
        
        // Parcourir récursivement les propriétés du schéma
        for (const [key, value] of Object.entries(schema)) {
            if (typeof value === 'object' && value !== null && key !== 'type' && key !== 'default') {
                const newPath = path ? `${path}.${key}` : key;
                localizeSchema(value, newPath);
            }
        }
    }
    
    // Appliquer la simulation à tous les modèles
    for (const [key, model] of Object.entries(dataModels)) {
        try {
            localizeSchema(model, key);
        } catch (error) {
            console.error(`Erreur lors de la localisation du modèle ${type}.${key}:`, error.message);
            throw error;
        }
    }
}

// Exécution des tests
console.log('=== Validation des modèles de données du système Engrenages ===');

// Tests de base
const actorModelsValid = validateActorModels();
const itemModelsValid = validateItemModels();

// Tests avancés pour la structure des objets imbriqués
console.log('\nVérification de la structure des objets imbriqués...');
let structureIssues = [];

// Vérifier les modèles d'acteurs
for (const [key, model] of Object.entries(ACTOR_MODELS.Actor)) {
    const modelIssues = validateNestedObjectStructure(model, `Actor.${key}`);
    structureIssues.push(...modelIssues);
}

// Vérifier les templates d'acteurs
for (const [key, template] of Object.entries(ACTOR_MODELS.templates)) {
    const templateIssues = validateNestedObjectStructure(template, `ActorTemplate.${key}`);
    structureIssues.push(...templateIssues);
}

// Vérifier les modèles d'objets
for (const [key, model] of Object.entries(ITEM_MODELS)) {
    if (key !== 'templates') {
        console.log(`\nVérification détaillée de Item.${key}:`);
        const modelIssues = validateNestedObjectStructure(model, `Item.${key}`, true);
        structureIssues.push(...modelIssues);
    }
}

// Vérifier les templates d'objets
if (ITEM_MODELS.templates) {
    for (const [key, template] of Object.entries(ITEM_MODELS.templates)) {
        const templateIssues = validateNestedObjectStructure(template, `ItemTemplate.${key}`);
        structureIssues.push(...templateIssues);
    }
}

// Examiner spécifiquement le modèle d'équipement pour identifier le problème
console.log('\nExamen détaillé du modèle d\'\u00e9quipement:');
function examineEquipmentModel(model, path = 'EquipmentModel', depth = 0) {
    const indent = '  '.repeat(depth);
    console.log(`${indent}Examen de ${path}:`);
    
    // Afficher les propriétés de base du modèle
    if (model.templates) {
        console.log(`${indent}  - templates: ${JSON.stringify(model.templates)}`);
    }
    
    // Parcourir toutes les propriétés
    for (const [key, value] of Object.entries(model)) {
        if (key === 'templates') continue; // Déjà traité
        
        if (typeof value === 'object' && value !== null) {
            if (value.type) {
                // Afficher les détails du champ typé
                const typeStr = typeof value.type === 'function' ? value.type.name : value.type;
                const defaultStr = value.default !== undefined ? (typeof value.default === 'object' ? JSON.stringify(value.default) : value.default) : 'non';
                console.log(`${indent}  - ${key}: type=${typeStr}, default=${defaultStr}, required=${value.required ? 'oui' : 'non'}`);
                
                // Vérifier si c'est un objet avec des sous-propriétés
                if ((value.type === Object || value.type === 'Object') && Object.keys(value).some(k => !['type', 'default', 'required', 'min', 'max', 'choices'].includes(k))) {
                    console.log(`${indent}  - ${key} a des sous-propriétés non standard:`);
                    for (const [subKey, subValue] of Object.entries(value)) {
                        if (!['type', 'default', 'required', 'min', 'max', 'choices'].includes(subKey)) {
                            console.log(`${indent}    * ${subKey}: ${typeof subValue === 'object' ? JSON.stringify(subValue) : subValue}`);
                        }
                    }
                }
            } else if (key !== 'templates') {
                // C'est un objet sans type défini, explorer récursivement
                console.log(`${indent}  - ${key}: objet sans type défini`);
                examineEquipmentModel(value, `${path}.${key}`, depth + 1);
            }
        }
    }
}

examineEquipmentModel(ITEM_MODELS.equipment);

// Afficher les problèmes de structure
if (structureIssues.length > 0) {
    console.error('\nProblèmes de structure détectés:');
    structureIssues.forEach(issue => console.error(`- ${issue}`));
} else {
    console.log('\nAucun problème de structure détecté');
}

// Tests de localisation
console.log('\nVérification des clés de localisation...');
const actorLocalizationIssues = validateLocalizationKeys(ACTOR_MODELS, 'Actor');
const itemLocalizationIssues = validateLocalizationKeys(ITEM_MODELS, 'Item');

// Afficher les problèmes de localisation
const localizationIssues = [...actorLocalizationIssues, ...itemLocalizationIssues];
if (localizationIssues.length > 0) {
    console.error('Problèmes de localisation détectés:');
    localizationIssues.forEach(issue => console.error(`- ${issue}`));
} else {
    console.log('Aucun problème de clés de localisation détecté');
}

// Tests de structure de localisation
console.log('\nVérification de la structure de localisation...');
const actorLocalizationStructureIssues = validateLocalizationStructure(ACTOR_MODELS, 'Actor');
const itemLocalizationStructureIssues = validateLocalizationStructure(ITEM_MODELS, 'Item');

// Afficher les problèmes de structure de localisation
const localizationStructureIssues = [...actorLocalizationStructureIssues, ...itemLocalizationStructureIssues];
if (localizationStructureIssues.length > 0) {
    console.error('Problèmes de structure de localisation détectés:');
    localizationStructureIssues.forEach(issue => console.error(`- ${issue}`));
} else {
    console.log('Aucun problème de structure de localisation détecté');
}

// Simulation de l'enregistrement des modèles
let registrationSimulated = false;
try {
    registrationSimulated = simulateRegisterDataModels();
} catch (error) {
    console.error('Erreur lors de la simulation de l\'enregistrement des modèles:', error.message);
}

// Résultat global
const allIssues = structureIssues.length + localizationIssues.length + localizationStructureIssues.length;
if (actorModelsValid && itemModelsValid && registrationSimulated && allIssues === 0) {
    console.log('\n=== Tous les tests ont réussi ===');
} else {
    console.error('\n=== Certains tests ont échoué ===');
    if (!actorModelsValid) console.error('- Validation des modèles d\'acteurs échouée');
    if (!itemModelsValid) console.error('- Validation des modèles d\'objets échouée');
    if (!registrationSimulated) console.error('- Simulation de l\'enregistrement des modèles échouée');
    if (allIssues > 0) console.error(`- ${allIssues} problèmes détectés dans les tests avancés`);
}
