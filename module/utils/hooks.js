/**
 * Gestion des hooks pour le système Engrenages
 */

import { EngrenagesSettings } from "../settings.js";

export class EngrenagesHooks {
    /**
     * Initialise les hooks du système
     */
    static init() {
        // Hook pour les messages de chat
        Hooks.on("renderChatMessage", this._onRenderChatMessage.bind(this));
        
        // Hook pour les jets de dés
        Hooks.on("createChatMessage", this._onCreateChatMessage.bind(this));
        
        // Hook pour la mise à jour des acteurs
        Hooks.on("updateActor", this._onUpdateActor.bind(this));
        
        // Hook pour la mise à jour des objets
        Hooks.on("updateItem", this._onUpdateItem.bind(this));
        
        // Hook pour l'initialisation des modules optionnels
        Hooks.on("ready", this._initOptionalModules.bind(this));
    }
    
    /**
     * Gère le rendu des messages de chat
     * @param {ChatMessage} message - Le message de chat
     * @param {jQuery} html - Le contenu HTML du message
     * @param {Object} data - Les données du message
     * @private
     */
    static _onRenderChatMessage(message, html, data) {
        // Ajout de classes CSS selon le type de message
        if (message.isRoll) {
            html.addClass("engrenages-roll");
        }
        
        // Activation des boutons interactifs
        html.find(".engrenages-chat-button").click(this._onChatButtonClick.bind(this));
    }
    
    /**
     * Gère la création des messages de chat
     * @param {ChatMessage} message - Le message de chat
     * @param {Object} options - Options de création
     * @param {string} userId - ID de l'utilisateur
     * @private
     */
    static _onCreateChatMessage(message, options, userId) {
        // Traitement des résultats de jets
        if (message.isRoll) {
            this._processRollResult(message);
        }
    }
    
    /**
     * Gère la mise à jour des acteurs
     * @param {Actor} actor - L'acteur mis à jour
     * @param {Object} updateData - Données de mise à jour
     * @param {Object} options - Options de mise à jour
     * @param {string} userId - ID de l'utilisateur
     * @private
     */
    static _onUpdateActor(actor, updateData, options, userId) {
        // Vérification des points de vie
        if (updateData.system?.resources?.health?.value !== undefined) {
            const health = actor.system.resources.health;
            
            // Notification de santé critique
            if (health.value <= Math.floor(health.max * 0.25)) {
                if (game.userId === userId) {
                    ui.notifications.warn(game.i18n.localize("ENGRENAGES.Notifications.HealthCritical"));
                }
            }
        }
        
        // Vérification de l'expérience (niveau supérieur)
        if (updateData.system?.advancement?.xp !== undefined) {
            const xp = actor.system.advancement.xp;
            const level = actor.system.advancement.level;
            const xpForNextLevel = level * 10;
            
            if (xp >= xpForNextLevel) {
                if (game.userId === userId) {
                    ui.notifications.info(game.i18n.localize("ENGRENAGES.Notifications.LevelUp"));
                }
            }
        }
    }
    
    /**
     * Gère la mise à jour des objets
     * @param {Item} item - L'objet mis à jour
     * @param {Object} updateData - Données de mise à jour
     * @param {Object} options - Options de mise à jour
     * @param {string} userId - ID de l'utilisateur
     * @private
     */
    static _onUpdateItem(item, updateData, options, userId) {
        // Vérification de la durabilité des équipements
        if (item.type === "equipment" && updateData.system?.properties?.durability?.value !== undefined) {
            const durability = item.system.properties.durability;
            
            // Notification d'équipement brisé
            if (durability.value <= 0) {
                if (game.userId === userId) {
                    ui.notifications.warn(game.i18n.format("ENGRENAGES.Notifications.ItemBroken", {
                        item: item.name
                    }));
                }
            }
            // Notification d'équipement endommagé
            else if (durability.value <= Math.floor(durability.max * 0.3)) {
                if (game.userId === userId) {
                    ui.notifications.warn(game.i18n.format("ENGRENAGES.Notifications.ItemDamaged", {
                        item: item.name
                    }));
                }
            }
        }
    }
    
    /**
     * Initialise les modules optionnels
     * @private
     */
    static _initOptionalModules() {
        console.log("Engrenages | Initialisation des modules optionnels");
        
        // Vérification que la configuration est disponible
        if (!CONFIG.engrenages || !CONFIG.engrenages.config || !CONFIG.engrenages.config.optionalModules) {
            console.warn("Engrenages | La configuration des modules optionnels n'est pas disponible");
            return;
        }
        
        // Parcours des modules optionnels
        for (const [key, module] of Object.entries(CONFIG.engrenages.config.optionalModules)) {
            // Vérification si le module est activé
            if (EngrenagesSettings.isModuleEnabled(key)) {
                console.log(`Engrenages | Module ${key} activé`);
                
                // Chargement dynamique du module
                import(`../optional/${key}.js`)
                    .then(module => {
                        // Initialisation du module
                        if (module.default && typeof module.default.init === "function") {
                            module.default.init();
                            console.log(`Engrenages | Module ${key} initialisé`);
                        }
                    })
                    .catch(error => {
                        console.error(`Engrenages | Erreur lors du chargement du module ${key}:`, error);
                    });
            }
        }
    }
    
    /**
     * Traite le résultat d'un jet de dés
     * @param {ChatMessage} message - Le message de chat contenant le jet
     * @private
     */
    static _processRollResult(message) {
        // Récupération du jet
        const roll = message.roll;
        if (!roll) return;
        
        // Récupération du total
        const total = roll.total;
        
        // Application des effets selon le résultat
        const results = CONFIG.engrenages.config.rollResults;
        
        if (total >= results.critical.min) {
            // Effet critique
            console.log("Engrenages | Résultat critique:", total);
        } else if (total >= results.success.min) {
            // Effet de succès
            console.log("Engrenages | Résultat succès:", total);
        } else if (total >= results.partial.min) {
            // Effet de succès partiel
            console.log("Engrenages | Résultat succès partiel:", total);
        } else {
            // Effet d'échec
            console.log("Engrenages | Résultat échec:", total);
        }
    }
    
    /**
     * Gère le clic sur un bouton dans un message de chat
     * @param {Event} event - L'événement de clic
     * @private
     */
    static _onChatButtonClick(event) {
        event.preventDefault();
        
        const button = event.currentTarget;
        const action = button.dataset.action;
        
        // Exécution de l'action selon le type de bouton
        switch (action) {
            case "apply-damage":
                this._applyDamage(button.dataset);
                break;
            case "apply-healing":
                this._applyHealing(button.dataset);
                break;
            case "use-item":
                this._useItem(button.dataset);
                break;
            // Ajoutez d'autres actions selon les besoins
        }
    }
    
    /**
     * Applique des dégâts à un acteur
     * @param {Object} data - Données du bouton
     * @private
     */
    static _applyDamage(data) {
        const targetId = data.targetId;
        const amount = parseInt(data.amount || "0");
        
        if (!targetId || isNaN(amount)) return;
        
        // Récupération de l'acteur cible
        const target = game.actors.get(targetId);
        if (!target) return;
        
        // Application des dégâts
        const health = duplicate(target.system.resources.health);
        health.value = Math.max(0, health.value - amount);
        
        // Mise à jour de l'acteur
        target.update({ "system.resources.health": health });
        
        // Notification
        ui.notifications.info(game.i18n.format("ENGRENAGES.Notifications.DamageApplied", {
            target: target.name,
            amount: amount
        }));
    }
    
    /**
     * Applique des soins à un acteur
     * @param {Object} data - Données du bouton
     * @private
     */
    static _applyHealing(data) {
        const targetId = data.targetId;
        const amount = parseInt(data.amount || "0");
        
        if (!targetId || isNaN(amount)) return;
        
        // Récupération de l'acteur cible
        const target = game.actors.get(targetId);
        if (!target) return;
        
        // Application des soins
        const health = duplicate(target.system.resources.health);
        health.value = Math.min(health.max, health.value + amount);
        
        // Mise à jour de l'acteur
        target.update({ "system.resources.health": health });
        
        // Notification
        ui.notifications.info(game.i18n.format("ENGRENAGES.Notifications.HealingApplied", {
            target: target.name,
            amount: amount
        }));
    }
    
    /**
     * Utilise un objet
     * @param {Object} data - Données du bouton
     * @private
     */
    static _useItem(data) {
        const actorId = data.actorId;
        const itemId = data.itemId;
        
        if (!actorId || !itemId) return;
        
        // Récupération de l'acteur et de l'objet
        const actor = game.actors.get(actorId);
        if (!actor) return;
        
        const item = actor.items.get(itemId);
        if (!item) return;
        
        // Utilisation de l'objet
        item.use();
        
        // Notification
        ui.notifications.info(game.i18n.format("ENGRENAGES.Notifications.ItemUsed", {
            item: item.name
        }));
    }
}
