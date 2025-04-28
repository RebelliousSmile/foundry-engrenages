/**
 * Système de migration des données pour Engrenages
 * Inspiré du système de migration de City of Mist
 */

import { EngrenagesSettings } from "./settings.js";

export class EngrenajesMigration {
    /**
     * Vérifie si une migration est nécessaire
     */
    static async checkMigration() {
        const currentVersion = EngrenagesSettings.getSetting("systemVersion");
        const systemVersion = game.system.version;
        
        if (currentVersion !== systemVersion) {
            await this.migrateFrom(currentVersion);
        }
    }
    
    /**
     * Effectue la migration depuis une version antérieure
     * @param {string} oldVersion - Version précédente
     */
    static async migrateFrom(oldVersion) {
        if (!game.user.isGM) return;
        
        // Vérifier s'il y a des données à migrer
        if (game.actors.contents.length === 0 && game.items.contents.length === 0) {
            await EngrenagesSettings.setSetting("systemVersion", game.system.version);
            return;
        }
        
        const newVersion = game.system.version;
        ui.notifications.info(`Engrenages | Migration depuis la version ${oldVersion} vers ${newVersion}...`);
        console.log(`Engrenages | Migration depuis ${oldVersion} vers ${newVersion}`);
        
        try {
            await this.migrationScript(oldVersion);
            ui.notifications.info("Engrenages | Migration terminée avec succès !");
        } catch (error) {
            ui.notifications.error("Engrenages | Erreur lors de la migration !");
            console.error("Engrenages | Erreur de migration:", error);
            return;
        }
        
        await EngrenagesSettings.setSetting("systemVersion", newVersion);
    }
    
    /**
     * Script de migration spécifique à chaque version
     * @param {string} oldVersion - Version précédente
     */
    static async migrationScript(oldVersion) {
        // Convertir les chaînes de version en nombres pour comparaison
        const oldV = this.versionToNumber(oldVersion);
        
        // Migration pour les versions antérieures à 0.1.0
        if (oldV < this.versionToNumber("0.1.0")) {
            await this.migrateTo0_1_0();
        }
        
        // Migration pour les versions antérieures à 0.2.0
        if (oldV < this.versionToNumber("0.2.0")) {
            await this.migrateTo0_2_0();
        }
        
        // Ajouter d'autres migrations ici au besoin
    }
    
    /**
     * Convertit une chaîne de version en nombre pour comparaison
     * @param {string} version - Chaîne de version (ex: "0.1.0")
     * @returns {number} Valeur numérique de la version
     */
    static versionToNumber(version) {
        const parts = version.split('.').map(p => parseInt(p));
        return parts[0] * 10000 + parts[1] * 100 + parts[2];
    }
    
    /**
     * Migration vers la version 0.1.0
     */
    static async migrateTo0_1_0() {
        console.log("Engrenages | Migration vers 0.1.0");
        
        // Migration des acteurs
        for (const actor of game.actors.contents) {
            const updateData = {};
            
            // Exemple de migration : ajout d'un nouveau champ
            if (actor.type === "character" && !actor.system.hasOwnProperty("resources")) {
                updateData["system.resources"] = {
                    health: { value: 10, max: 10 },
                    energy: { value: 5, max: 5 }
                };
            }
            
            // Appliquer les mises à jour si nécessaire
            if (Object.keys(updateData).length > 0) {
                await actor.update(updateData);
                console.log(`Engrenages | Acteur migré: ${actor.name}`);
            }
        }
        
        // Migration des objets
        for (const item of game.items.contents) {
            const updateData = {};
            
            // Exemple de migration : ajout d'un nouveau champ
            if (item.type === "equipment" && !item.system.hasOwnProperty("durability")) {
                updateData["system.durability"] = { value: 10, max: 10 };
            }
            
            // Appliquer les mises à jour si nécessaire
            if (Object.keys(updateData).length > 0) {
                await item.update(updateData);
                console.log(`Engrenages | Objet migré: ${item.name}`);
            }
        }
    }
    
    /**
     * Migration vers la version 0.2.0
     */
    static async migrateTo0_2_0() {
        console.log("Engrenages | Migration vers 0.2.0");
        
        // Exemple de migration future
    }
}
