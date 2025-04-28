/**
 * Helpers Handlebars pour le système Engrenages
 */

import { EngrenagesConfig } from "../config.js";
import { EngrenagesSettings } from "../settings.js";

export class EngrenagesHelpers {
    /**
     * Initialise les helpers Handlebars
     */
    static init() {
        // Formatage des nombres
        Handlebars.registerHelper("formatNumber", function(value) {
            return Number(value).toLocaleString();
        });
        
        // Comparaison de valeurs
        Handlebars.registerHelper("eq", function(a, b) {
            return a === b;
        });
        
        Handlebars.registerHelper("neq", function(a, b) {
            return a !== b;
        });
        
        Handlebars.registerHelper("gt", function(a, b) {
            return a > b;
        });
        
        Handlebars.registerHelper("lt", function(a, b) {
            return a < b;
        });
        
        Handlebars.registerHelper("gte", function(a, b) {
            return a >= b;
        });
        
        Handlebars.registerHelper("lte", function(a, b) {
            return a <= b;
        });
        
        // Opérations mathématiques
        Handlebars.registerHelper("add", function(a, b) {
            return a + b;
        });
        
        Handlebars.registerHelper("subtract", function(a, b) {
            return a - b;
        });
        
        Handlebars.registerHelper("multiply", function(a, b) {
            return a * b;
        });
        
        Handlebars.registerHelper("divide", function(a, b) {
            return a / b;
        });
        
        // Formatage du modificateur d'attribut
        Handlebars.registerHelper("formatMod", function(value) {
            const mod = Math.floor((value - 10) / 2);
            return mod >= 0 ? `+${mod}` : mod.toString();
        });
        
        // Vérification de l'activation d'un module optionnel
        Handlebars.registerHelper("isModuleEnabled", function(moduleId) {
            return EngrenagesSettings.isModuleEnabled(moduleId);
        });
        
        // Récupération d'une configuration
        Handlebars.registerHelper("config", function(key) {
            return foundry.utils.getProperty(EngrenagesConfig, key);
        });
        
        // Récupération d'un paramètre
        Handlebars.registerHelper("setting", function(key) {
            return EngrenagesSettings.getSetting(key);
        });
        
        // Génération d'un ID unique
        Handlebars.registerHelper("uniqueId", function() {
            return foundry.utils.randomID();
        });
        
        // Concaténation de chaînes
        Handlebars.registerHelper("concat", function(...args) {
            args.pop(); // Supprimer les options Handlebars
            return args.join("");
        });
        
        // Calcul du pourcentage
        Handlebars.registerHelper("percentage", function(value, max) {
            return Math.round((value / max) * 100);
        });
        
        // Répétition d'un bloc
        Handlebars.registerHelper("times", function(n, options) {
            let result = "";
            for (let i = 0; i < n; i++) {
                result += options.fn({ index: i, number: i + 1 });
            }
            return result;
        });
        
        // Conversion d'un objet en tableau
        Handlebars.registerHelper("toArray", function(obj) {
            return Object.entries(obj).map(([key, value]) => {
                return { key, value };
            });
        });
        
        // Localisation d'une chaîne
        Handlebars.registerHelper("localize", function(key) {
            return game.i18n.localize(key);
        });
        
        // Formatage de la classe CSS pour l'état de durabilité
        Handlebars.registerHelper("durabilityClass", function(value, max) {
            const ratio = value / max;
            if (ratio <= 0) return "broken";
            if (ratio <= 0.3) return "poor";
            if (ratio <= 0.7) return "used";
            return "good";
        });
        
        // Formatage de la classe CSS pour le résultat d'un jet
        Handlebars.registerHelper("rollResultClass", function(total) {
            const results = EngrenagesConfig.rollResults;
            if (total >= results.critical.min) return "critical";
            if (total >= results.success.min) return "success";
            if (total >= results.partial.min) return "partial";
            return "failure";
        });
    }
}
