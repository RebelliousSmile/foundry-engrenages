/**
 * Script de validation des templates pour le système Engrenages
 * 
 * Exécuter avec Node.js : node validate-templates.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtenir le chemin absolu du répertoire courant
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemin de base du système
const BASE_PATH = path.resolve(__dirname, '..');

// Liste des templates à vérifier (extraite de templates.js)
const templatePaths = [
    // Feuilles d'acteur
    "systems/engrenages/templates/actors/character-sheet.html",
    "systems/engrenages/templates/actors/npc-sheet.html",
    
    // Parties communes des feuilles d'acteur
    "systems/engrenages/templates/actors/parts/actor-attributes.html",
    "systems/engrenages/templates/actors/parts/actor-skills.html",
    "systems/engrenages/templates/actors/parts/actor-inventory.html",
    "systems/engrenages/templates/actors/parts/actor-traits.html",
    "systems/engrenages/templates/actors/parts/actor-biography.html",
    "systems/engrenages/templates/actors/parts/actor-resources.html",
    
    // Feuilles d'objet
    "systems/engrenages/templates/items/equipment-sheet.html",
    "systems/engrenages/templates/items/skill-sheet.html",
    "systems/engrenages/templates/items/trait-sheet.html",
    
    // Parties communes des feuilles d'objet
    "systems/engrenages/templates/items/parts/item-header.html",
    "systems/engrenages/templates/items/parts/item-description.html",
    "systems/engrenages/templates/items/parts/item-effects.html",
    
    // Dialogues
    "systems/engrenages/templates/dialog/roll-result.html",
    "systems/engrenages/templates/dialog/settings-config.html"
];

// Fonction pour vérifier si un fichier existe
function fileExists(filePath) {
    try {
        // Convertir le chemin du format Foundry au format système de fichiers
        const localPath = filePath.replace('systems/engrenages/', '');
        const fullPath = path.join(BASE_PATH, localPath);
        return fs.existsSync(fullPath);
    } catch (error) {
        console.error(`Erreur lors de la vérification du fichier ${filePath}:`, error);
        return false;
    }
}

// Vérification de tous les templates
console.log('=== Validation des templates du système Engrenages ===');
let allTemplatesValid = true;

for (const templatePath of templatePaths) {
    const exists = fileExists(templatePath);
    if (exists) {
        console.log(`✓ ${templatePath}`);
    } else {
        console.error(`✗ ${templatePath} - MANQUANT`);
        allTemplatesValid = false;
    }
}

if (allTemplatesValid) {
    console.log('=== Tous les templates existent ===');
} else {
    console.error('=== Certains templates sont manquants ===');
}
