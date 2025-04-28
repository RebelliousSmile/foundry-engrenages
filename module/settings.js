/**
 * Gestion des paramètres du système Engrenages
 */

import { EngrenagesConfig } from "./config.js";
import { localize } from "./engrenages.js";

export class EngrenagesSettings {
    /**
     * Enregistre tous les paramètres du système
     */
    static registerSettings() {
        // Version du système (utilisé pour les migrations)
        game.settings.register("engrenages", "systemVersion", {
            name: "Version du système",
            scope: "world",
            config: false,
            type: String,
            default: game.system.version
        });
        
        // Configuration des règles de base
        game.settings.register("engrenages", "baseConfig", {
            name: localize("ENGRENAGES.Settings.BaseConfig.Name"),
            hint: localize("ENGRENAGES.Settings.BaseConfig.Hint"),
            scope: "world",
            config: true,
            type: Object,
            default: {
                useAttributeModifiers: true,
                useSkillSpecialties: false,
                useFatePoints: false
            },
            onChange: value => {
                // Mettre à jour l'interface utilisateur si nécessaire
                if (ui.actors) ui.actors.render();
            }
        });
        
        // Formule de dés par défaut
        game.settings.register("engrenages", "defaultDiceFormula", {
            name: localize("ENGRENAGES.Settings.DefaultDiceFormula.Name"),
            hint: localize("ENGRENAGES.Settings.DefaultDiceFormula.Hint"),
            scope: "world",
            config: true,
            type: String,
            default: EngrenagesConfig.defaultDiceFormulas.standard,
            onChange: value => {
                console.log(`Engrenages | Formule de dés par défaut changée pour: ${value}`);
            }
        });
        
        // Modules optionnels
        for (const [key, module] of Object.entries(EngrenagesConfig.optionalModules)) {
            this.registerOptionalModule(key, module);
        }
    }
    
    /**
     * Enregistre un module optionnel
     * @param {string} key - Clé du module
     * @param {Object} module - Configuration du module
     */
    static registerOptionalModule(key, module) {
        game.settings.register("engrenages", `modules.${key}`, {
            name: localize(module.name),
            hint: localize(module.description),
            scope: "world",
            config: true,
            type: Boolean,
            default: module.default,
            onChange: value => {
                // Recharger la page pour appliquer les changements
                if (value) {
                    ui.notifications.info(localize("ENGRENAGES.Notifications.ModuleEnabled").replace("{module}", localize(module.name)));
                } else {
                    ui.notifications.info(localize("ENGRENAGES.Notifications.ModuleDisabled").replace("{module}", localize(module.name)));
                }
            }
        });
    }
    
    /**
     * Récupère la valeur d'un paramètre
     * @param {string} key - Clé du paramètre
     * @returns {any} Valeur du paramètre
     */
    static getSetting(key) {
        return game.settings.get("engrenages", key);
    }
    
    /**
     * Définit la valeur d'un paramètre
     * @param {string} key - Clé du paramètre
     * @param {any} value - Nouvelle valeur
     * @returns {Promise} Promise résolue lorsque le paramètre est défini
     */
    static async setSetting(key, value) {
        return await game.settings.set("engrenages", key, value);
    }
    
    /**
     * Vérifie si un module optionnel est activé
     * @param {string} moduleId - ID du module
     * @returns {boolean} true si le module est activé
     */
    static isModuleEnabled(moduleId) {
        return this.getSetting(`modules.${moduleId}`);
    }
}
