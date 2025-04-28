/**
 * Script de validation des traductions pour le système Engrenages
 * 
 * Exécuter avec Node.js : node validate-translations.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtenir le chemin absolu du répertoire courant
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemin de base du système
const BASE_PATH = path.resolve(__dirname, '..');

// Fonction pour charger un fichier JSON
function loadJSON(filePath) {
    try {
        const fullPath = path.join(BASE_PATH, filePath);
        const content = fs.readFileSync(fullPath, 'utf8');
        return JSON.parse(content);
    } catch (error) {
        console.error(`Erreur lors du chargement du fichier ${filePath}:`, error);
        return null;
    }
}

// Fonction pour vérifier les clés dupliquées dans un objet JSON
function checkDuplicateKeys(obj, prefix = '') {
    const keys = new Set();
    const duplicates = [];
    
    function traverse(o, p) {
        for (const [key, value] of Object.entries(o)) {
            const fullKey = p ? `${p}.${key}` : key;
            
            if (keys.has(fullKey)) {
                duplicates.push(fullKey);
            } else {
                keys.add(fullKey);
            }
            
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                traverse(value, fullKey);
            }
        }
    }
    
    traverse(obj, prefix);
    return duplicates;
}

// Fonction pour vérifier les clés requises pour la localisation des modèles de données
function checkRequiredModelKeys(translations) {
    const requiredKeys = [
        'TYPES.Actor.character',
        'TYPES.Actor.npc',
        'TYPES.Actor.vehicle',
        'TYPES.Actor.organization',
        'TYPES.Actor.group',
        'TYPES.Item.equipment',
        'TYPES.Item.skill',
        'TYPES.Item.trait'
    ];
    
    const missingKeys = [];
    
    for (const key of requiredKeys) {
        const parts = key.split('.');
        let current = translations;
        
        for (const part of parts) {
            if (!current || !current[part]) {
                missingKeys.push(key);
                break;
            }
            current = current[part];
        }
    }
    
    return missingKeys;
}

// Chargement des fichiers de traduction
console.log('=== Validation des traductions du système Engrenages ===');
const frTranslations = loadJSON('lang/fr.json');

if (!frTranslations) {
    console.error('Impossible de charger les traductions françaises');
    process.exit(1);
}

// Vérification des clés dupliquées
console.log('Vérification des clés dupliquées...');
const duplicateKeys = checkDuplicateKeys(frTranslations);

if (duplicateKeys.length > 0) {
    console.error('Clés dupliquées trouvées:');
    duplicateKeys.forEach(key => console.error(`- ${key}`));
} else {
    console.log('Aucune clé dupliquée trouvée');
}

// Vérification des clés requises pour les modèles de données
console.log('Vérification des clés requises pour les modèles de données...');
const missingModelKeys = checkRequiredModelKeys(frTranslations);

if (missingModelKeys.length > 0) {
    console.error('Clés manquantes pour les modèles de données:');
    missingModelKeys.forEach(key => console.error(`- ${key}`));
} else {
    console.log('Toutes les clés requises pour les modèles de données sont présentes');
}

// Résumé
if (duplicateKeys.length === 0 && missingModelKeys.length === 0) {
    console.log('=== Validation des traductions réussie ===');
} else {
    console.error('=== Validation des traductions échouée ===');
}
