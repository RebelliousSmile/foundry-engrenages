/**
 * Système de lancer de dés pour Engrenages
 */

import { EngrenagesConfig } from "../config.js";
import { EngrenagesSettings } from "../settings.js";

export class EngrenagesRoll {
    /**
     * Crée un nouveau lancer de dés Engrenages
     * @param {string} formula - Formule de dés
     * @param {Object} data - Données pour la formule
     * @param {Object} options - Options pour le lancer
     * @returns {Promise<Roll>} Le lancer de dés
     */
    static async create(formula, data = {}, options = {}) {
        // Création du lancer
        const roll = new Roll(formula, data);
        
        // Évaluation du lancer
        const result = await roll.evaluate({ async: true });
        
        // Retour du résultat
        return result;
    }
    
    /**
     * Effectue un lancer d'attribut
     * @param {Actor} actor - L'acteur qui effectue le lancer
     * @param {string} attributeKey - Clé de l'attribut
     * @param {Object} options - Options pour le lancer
     * @returns {Promise<Roll>} Le lancer de dés
     */
    static async rollAttribute(actor, attributeKey, options = {}) {
        // Récupération des données d'attribut
        const attrGroup = attributeKey.split('.')[0];
        const attrName = attributeKey.split('.')[1];
        const attribute = actor.system.attributes[attrGroup][attrName];
        const attrValue = attribute || 0;
        const attrMod = Math.floor((attrValue - 10) / 2);
        
        // Préparation des données pour le lancer
        const label = game.i18n.localize(`ENGRENAGES.Attribute.${attrName.capitalize()}`);
        const rollData = {
            actor: actor,
            attribute: attrValue,
            mod: attrMod
        };
        
        // Détermination de la formule de dés
        let formula = EngrenagesSettings.getSetting("defaultDiceFormula");
        
        // Application des avantages/désavantages
        if (options.advantage) {
            formula = EngrenagesConfig.defaultDiceFormulas.advantage;
        } else if (options.disadvantage) {
            formula = EngrenagesConfig.defaultDiceFormulas.disadvantage;
        }
        
        // Ajout du modificateur d'attribut
        formula = `${formula} + ${attrMod}`;
        
        // Création du lancer
        const roll = await this.create(formula, rollData);
        
        // Détermination du résultat
        const resultData = this._getResultData(roll.total);
        
        // Affichage du lancer dans le chat si demandé
        if (options.showResult !== false) {
            await this._displayRollResult(roll, {
                actor: actor,
                label: label,
                resultData: resultData,
                flavor: options.flavor
            });
        }
        
        return roll;
    }
    
    /**
     * Effectue un lancer de compétence
     * @param {Actor} actor - L'acteur qui effectue le lancer
     * @param {string} skillKey - Clé de la compétence
     * @param {Object} options - Options pour le lancer
     * @returns {Promise<Roll>} Le lancer de dés
     */
    static async rollSkill(actor, skillKey, options = {}) {
        // Récupération des données de compétence
        const skill = actor.system.skills[skillKey];
        const skillValue = skill || 0;
        
        // Préparation des données pour le lancer
        const label = game.i18n.localize(`ENGRENAGES.Skill.${skillKey.capitalize()}`);
        const rollData = {
            actor: actor,
            skill: skillValue
        };
        
        // Détermination de la formule de dés
        let formula = EngrenagesSettings.getSetting("defaultDiceFormula");
        
        // Application des avantages/désavantages
        if (options.advantage) {
            formula = EngrenagesConfig.defaultDiceFormulas.advantage;
        } else if (options.disadvantage) {
            formula = EngrenagesConfig.defaultDiceFormulas.disadvantage;
        }
        
        // Ajout du modificateur de compétence
        formula = `${formula} + ${skillValue}`;
        
        // Création du lancer
        const roll = await this.create(formula, rollData);
        
        // Détermination du résultat
        const resultData = this._getResultData(roll.total);
        
        // Affichage du lancer dans le chat si demandé
        if (options.showResult !== false) {
            await this._displayRollResult(roll, {
                actor: actor,
                label: label,
                resultData: resultData,
                flavor: options.flavor
            });
        }
        
        return roll;
    }
    
    /**
     * Effectue un lancer personnalisé
     * @param {string} formula - Formule de dés
     * @param {Object} data - Données pour la formule
     * @param {Object} options - Options pour le lancer
     * @returns {Promise<Roll>} Le lancer de dés
     */
    static async rollCustom(formula, data = {}, options = {}) {
        // Création du lancer
        const roll = await this.create(formula, data);
        
        // Détermination du résultat
        const resultData = this._getResultData(roll.total);
        
        // Affichage du lancer dans le chat si demandé
        if (options.showResult !== false) {
            await this._displayRollResult(roll, {
                label: options.label || "Lancer personnalisé",
                resultData: resultData,
                flavor: options.flavor
            });
        }
        
        return roll;
    }
    
    /**
     * Détermine les données de résultat en fonction du total du lancer
     * @param {number} total - Total du lancer
     * @returns {Object} Données de résultat
     * @private
     */
    static _getResultData(total) {
        const results = EngrenagesConfig.rollResults;
        
        if (total >= results.critical.min) {
            return {
                type: "critical",
                label: game.i18n.localize(results.critical.label),
                class: "critical"
            };
        } else if (total >= results.success.min) {
            return {
                type: "success",
                label: game.i18n.localize(results.success.label),
                class: "success"
            };
        } else if (total >= results.partial.min) {
            return {
                type: "partial",
                label: game.i18n.localize(results.partial.label),
                class: "partial"
            };
        } else {
            return {
                type: "failure",
                label: game.i18n.localize(results.failure.label),
                class: "failure"
            };
        }
    }
    
    /**
     * Affiche le résultat d'un lancer dans le chat
     * @param {Roll} roll - Le lancer de dés
     * @param {Object} options - Options d'affichage
     * @returns {Promise<ChatMessage>} Le message de chat créé
     * @private
     */
    static async _displayRollResult(roll, options = {}) {
        // Préparation des données du template
        const templateData = {
            actor: options.actor,
            roll: roll,
            label: options.label,
            result: options.resultData,
            flavor: options.flavor
        };
        
        // Rendu du template
        const template = "systems/engrenages/templates/dialog/roll-result.html";
        const content = await renderTemplate(template, templateData);
        
        // Création du message de chat
        const chatData = {
            user: game.user.id,
            type: CONST.CHAT_MESSAGE_TYPES.ROLL,
            content: content,
            sound: CONFIG.sounds.dice,
            roll: roll
        };
        
        // Ajout du locuteur si un acteur est fourni
        if (options.actor) {
            chatData.speaker = ChatMessage.getSpeaker({ actor: options.actor });
        }
        
        // Création du message
        return await ChatMessage.create(chatData);
    }
    
    /**
     * Active les écouteurs d'événements pour les messages de chat
     * @param {ChatMessage} message - Le message de chat
     * @param {jQuery} html - Le contenu HTML du message
     * @param {Object} data - Les données du message
     */
    static activateListeners(message, html, data) {
        // Boutons de relance
        html.find('.engrenages-roll-button').click(this._onRollButton.bind(this));
    }
    
    /**
     * Gère le clic sur un bouton de relance
     * @param {Event} event - L'événement de clic
     * @private
     */
    static async _onRollButton(event) {
        event.preventDefault();
        
        const button = event.currentTarget;
        const action = button.dataset.action;
        const formula = button.dataset.formula;
        const actorId = button.dataset.actorId;
        
        // Récupération de l'acteur si nécessaire
        let actor = null;
        if (actorId) {
            actor = game.actors.get(actorId);
        }
        
        // Exécution de l'action
        switch (action) {
            case 'reroll':
                // Relance avec la même formule
                await this.rollCustom(formula, {}, {
                    label: "Relance",
                    showResult: true
                });
                break;
            case 'advantage':
                // Relance avec avantage
                if (actor) {
                    const attributeKey = button.dataset.attribute;
                    if (attributeKey) {
                        await this.rollAttribute(actor, attributeKey, {
                            advantage: true,
                            flavor: "Relance avec avantage",
                            showResult: true
                        });
                    }
                }
                break;
            case 'disadvantage':
                // Relance avec désavantage
                if (actor) {
                    const attributeKey = button.dataset.attribute;
                    if (attributeKey) {
                        await this.rollAttribute(actor, attributeKey, {
                            disadvantage: true,
                            flavor: "Relance avec désavantage",
                            showResult: true
                        });
                    }
                }
                break;
        }
    }
}
