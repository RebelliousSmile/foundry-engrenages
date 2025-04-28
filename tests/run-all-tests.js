/**
 * Script principal pour exécuter tous les tests du système Engrenages
 * 
 * Exécuter avec Node.js : node run-all-tests.js
 */

import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtenir le chemin absolu du répertoire courant
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Liste des scripts de test à exécuter
const testScripts = [
    'validate-models.js',
    'validate-templates.js',
    'validate-translations.js'
];

// Fonction pour exécuter un script
function runScript(scriptPath) {
    return new Promise((resolve, reject) => {
        console.log(`\n=== Exécution de ${scriptPath} ===\n`);
        
        // Obtenir le chemin complet du script
        const fullPath = path.join(__dirname, scriptPath);
        
        exec(`node "${fullPath}"`, (error, stdout, stderr) => {
            console.log(stdout);
            if (stderr) console.error(stderr);
            
            if (error) {
                console.error(`Erreur lors de l'exécution de ${scriptPath}: ${error.message}`);
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

// Exécution séquentielle de tous les scripts
async function runAllTests() {
    console.log('=== Début des tests du système Engrenages ===\n');
    
    for (const script of testScripts) {
        try {
            await runScript(script);
        } catch (error) {
            console.error(`Test échoué: ${script}`);
        }
    }
    
    console.log('\n=== Fin des tests du système Engrenages ===');
}

runAllTests().catch(error => {
    console.error("Erreur lors de l'exécution des tests:", error);
    process.exit(1);
});
