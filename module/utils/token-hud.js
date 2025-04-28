/**
 * Gestionnaire du HUD de token pour le système Engrenages
 * Permet d'afficher les jauges personnalisées sur le HUD des tokens
 */

import { GaugeManager } from "./gauge-manager.js";

export class EngrenagesTokenHUD {
  /**
   * Initialise les hooks pour le HUD de token
   */
  static init() {
    Hooks.on("renderTokenHUD", this._onRenderTokenHUD.bind(this));
  }

  /**
   * Gestion du rendu du HUD de token
   * @param {TokenHUD} app - L'application TokenHUD
   * @param {jQuery} html - Le HTML du HUD
   * @param {Object} data - Les données du token
   * @private
   */
  static _onRenderTokenHUD(app, html, data) {
    // Récupération de l'acteur associé au token
    const actor = app.object.actor;
    if (!actor) return;

    // Création du conteneur pour les jauges
    const gaugesContainer = $(`<div class="engrenages-token-gauges"></div>`);
    
    // Ajout des 4 jauges
    this._addHealthGauge(gaugesContainer, actor);
    this._addManaGauge(gaugesContainer, actor);
    this._addStaminaGauge(gaugesContainer, actor);
    this._addWillGauge(gaugesContainer, actor);
    
    // Ajout du conteneur au HUD
    html.find('.col.right').append(gaugesContainer);
    
    // Ajout du style CSS
    this._addStyles();
  }
  
  /**
   * Ajoute la jauge de santé
   * @param {jQuery} container - Le conteneur des jauges
   * @param {Actor} actor - L'acteur associé au token
   * @private
   */
  static _addHealthGauge(container, actor) {
    // Initialisation des ressources si nécessaire
    if (!actor.system.resources) {
      actor.system.resources = {};
    }
    
    if (!actor.system.resources.health) {
      actor.system.resources.health = { value: 10, max: 10 };
    }
    
    const health = actor.system.resources.health;
    const percentage = Math.max(0, Math.min(100, (health.value / health.max) * 100));
    
    // Détermine la classe CSS en fonction de la valeur de la jauge
    let statusClass = "";
    let malusText = "";
    
    if (health.value < 6 && health.value >= 3) {
      statusClass = "jauge-malus-mineur";
      malusText = "<span class=\"malus-info\">-2</span>";
    } else if (health.value < 3 && health.value >= 0) {
      statusClass = "jauge-malus-majeur";
      malusText = "<span class=\"malus-info\">-4</span>";
    } else if (health.value <= 0) {
      statusClass = "jauge-critique";
      malusText = "<span class=\"malus-info\">KO</span>";
    }
    
    const gauge = $(`
      <div class="engrenages-gauge health-gauge ${statusClass}" data-resource="health">
        <div class="gauge-label">
          <i class="fas fa-heart"></i>
          <span class="gauge-value">${health.value}/${health.max} ${malusText}</span>
        </div>
        <div class="gauge-bar">
          <div class="gauge-fill" style="width: ${percentage}%"></div>
        </div>
      </div>
    `);
    
    // Gestion du clic pour modifier la valeur
    gauge.on('click', ev => {
      ev.preventDefault();
      this._onGaugeClick(actor, GaugeManager.GAUGE_TYPES.HEALTH);
    });
    
    // Ajoute un tooltip avec les informations sur les malus
    this._addGaugeTooltip(gauge, health.value);
    
    container.append(gauge);
  }
  
  /**
   * Ajoute la jauge de volonté (remplace mana)
   * @param {jQuery} container - Le conteneur des jauges
   * @param {Actor} actor - L'acteur associé au token
   * @private
   */
  static _addManaGauge(container, actor) {
    // Initialisation des ressources si nécessaire
    if (!actor.system.resources) {
      actor.system.resources = {};
    }
    
    if (!actor.system.resources.will) {
      actor.system.resources.will = { value: 10, max: 10 };
    }
    
    const will = actor.system.resources.will;
    const percentage = Math.max(0, Math.min(100, (will.value / will.max) * 100));
    
    // Détermine la classe CSS en fonction de la valeur de la jauge
    let statusClass = "";
    let malusText = "";
    
    if (will.value < 6 && will.value >= 3) {
      statusClass = "jauge-malus-mineur";
      malusText = "<span class=\"malus-info\">-2</span>";
    } else if (will.value < 3 && will.value >= 0) {
      statusClass = "jauge-malus-majeur";
      malusText = "<span class=\"malus-info\">-4</span>";
    } else if (will.value <= 0) {
      statusClass = "jauge-critique";
      malusText = "<span class=\"malus-info\">KO</span>";
    }
    
    const gauge = $(`
      <div class="engrenages-gauge will-gauge ${statusClass}" data-resource="will">
        <div class="gauge-label">
          <i class="fas fa-brain"></i>
          <span class="gauge-value">${will.value}/${will.max} ${malusText}</span>
        </div>
        <div class="gauge-bar">
          <div class="gauge-fill" style="width: ${percentage}%"></div>
        </div>
      </div>
    `);
    
    // Gestion du clic pour modifier la valeur
    gauge.on('click', ev => {
      ev.preventDefault();
      this._onGaugeClick(actor, GaugeManager.GAUGE_TYPES.WILL);
    });
    
    // Ajoute un tooltip avec les informations sur les malus
    this._addGaugeTooltip(gauge, will.value);
    
    container.append(gauge);
  }
  
  /**
   * Ajoute la jauge d'endurance
   * @param {jQuery} container - Le conteneur des jauges
   * @param {Actor} actor - L'acteur associé au token
   * @private
   */
  static _addStaminaGauge(container, actor) {
    // Initialisation des ressources si nécessaire
    if (!actor.system.resources) {
      actor.system.resources = {};
    }
    
    if (!actor.system.resources.stamina) {
      actor.system.resources.stamina = { value: 10, max: 10 };
    }
    
    const stamina = actor.system.resources.stamina;
    const percentage = Math.max(0, Math.min(100, (stamina.value / stamina.max) * 100));
    
    // Détermine la classe CSS en fonction de la valeur de la jauge
    let statusClass = "";
    let malusText = "";
    
    if (stamina.value < 6 && stamina.value >= 3) {
      statusClass = "jauge-malus-mineur";
      malusText = "<span class=\"malus-info\">-2</span>";
    } else if (stamina.value < 3 && stamina.value >= 0) {
      statusClass = "jauge-malus-majeur";
      malusText = "<span class=\"malus-info\">-4</span>";
    } else if (stamina.value <= 0) {
      statusClass = "jauge-critique";
      malusText = "<span class=\"malus-info\">KO</span>";
    }
    
    const gauge = $(`
      <div class="engrenages-gauge stamina-gauge ${statusClass}" data-resource="stamina">
        <div class="gauge-label">
          <i class="fas fa-running"></i>
          <span class="gauge-value">${stamina.value}/${stamina.max} ${malusText}</span>
        </div>
        <div class="gauge-bar">
          <div class="gauge-fill" style="width: ${percentage}%"></div>
        </div>
      </div>
    `);
    
    // Gestion du clic pour modifier la valeur
    gauge.on('click', ev => {
      ev.preventDefault();
      this._onGaugeClick(actor, GaugeManager.GAUGE_TYPES.STAMINA);
    });
    
    // Ajoute un tooltip avec les informations sur les malus
    this._addGaugeTooltip(gauge, stamina.value);
    
    container.append(gauge);
  }
  
  /**
   * Ajoute la jauge sociale
   * @param {jQuery} container - Le conteneur des jauges
   * @param {Actor} actor - L'acteur associé au token
   * @private
   */
  static _addWillGauge(container, actor) {
    // Initialisation des ressources si nécessaire
    if (!actor.system.resources) {
      actor.system.resources = {};
    }
    
    if (!actor.system.resources.social) {
      actor.system.resources.social = { value: 10, max: 10 };
    }
    
    const social = actor.system.resources.social;
    const percentage = Math.max(0, Math.min(100, (social.value / social.max) * 100));
    
    // Détermine la classe CSS en fonction de la valeur de la jauge
    let statusClass = "";
    let malusText = "";
    
    if (social.value < 6 && social.value >= 3) {
      statusClass = "jauge-malus-mineur";
      malusText = "<span class=\"malus-info\">-2</span>";
    } else if (social.value < 3 && social.value >= 0) {
      statusClass = "jauge-malus-majeur";
      malusText = "<span class=\"malus-info\">-4</span>";
    } else if (social.value <= 0) {
      statusClass = "jauge-critique";
      malusText = "<span class=\"malus-info\">KO</span>";
    }
    
    const gauge = $(`
      <div class="engrenages-gauge social-gauge ${statusClass}" data-resource="social">
        <div class="gauge-label">
          <i class="fas fa-users"></i>
          <span class="gauge-value">${social.value}/${social.max} ${malusText}</span>
        </div>
        <div class="gauge-bar">
          <div class="gauge-fill" style="width: ${percentage}%"></div>
        </div>
      </div>
    `);
    
    // Gestion du clic pour modifier la valeur
    gauge.on('click', ev => {
      ev.preventDefault();
      this._onGaugeClick(actor, GaugeManager.GAUGE_TYPES.SOCIAL);
    });
    
    // Ajoute un tooltip avec les informations sur les malus
    this._addGaugeTooltip(gauge, social.value);
    
    container.append(gauge);
  }
  
  /**
   * Ajoute un tooltip à une jauge avec des informations sur les malus
   * @param {jQuery} gaugeElement - L'élément de la jauge
   * @param {number} value - La valeur actuelle de la jauge
   * @private
   */
  static _addGaugeTooltip(gaugeElement, value) {
    let tooltipContent = "";
    
    if (value < 6 && value >= 3) {
      tooltipContent = "<strong>Malus mineur (-2)</strong><br>En dessous de 6, une jauge inflige un malus de -2 (non cumulatif) à tous les jets.";
    } else if (value < 3 && value >= 0) {
      tooltipContent = "<strong>Malus majeur (-4)</strong><br>En dessous de 3, un malus de -4 (non cumulatif) est appliqué.";
    } else if (value < 5) {
      tooltipContent += "<br><strong>Risque de Séquelle</strong><br>En dessous de 5, chaque nouvelle blessure risque de provoquer une Séquelle.";
    }
    
    if (tooltipContent) {
      gaugeElement.attr("data-tooltip", tooltipContent);
      gaugeElement.addClass("has-tooltip");
    }
  }

  /**
   * Gestion du clic sur une jauge
   * @param {Actor} actor - L'acteur associé au token
   * @param {string} resourceKey - La clé de la ressource
   * @private
   */
  static _onGaugeClick(actor, resourceKey) {
    const resource = actor.system.resources[resourceKey];
    
    // Création du dialogue pour modifier la valeur
    const content = `
      <form>
        <div class="form-group">
          <label>Valeur actuelle</label>
          <input type="number" name="value" value="${resource.value}" min="0" max="${resource.max}">
        </div>
        <div class="form-group">
          <label>Valeur maximale</label>
          <input type="number" name="max" value="${resource.max}" min="1">
        </div>
        <div class="form-group">
          <label>Appliquer un impact</label>
          <div class="impact-buttons">
            <button type="button" class="impact-button" data-value="-3">-3</button>
            <button type="button" class="impact-button" data-value="-2">-2</button>
            <button type="button" class="impact-button" data-value="-1">-1</button>
            <button type="button" class="impact-button positive" data-value="+1">+1</button>
            <button type="button" class="impact-button positive" data-value="+2">+2</button>
            <button type="button" class="impact-button positive" data-value="+3">+3</button>
          </div>
        </div>
        <div class="form-group">
          <label><input type="checkbox" name="checkSequelae"> Vérifier les séquelles</label>
        </div>
      </form>
    `;
    
    const d = new Dialog({
      title: `Modifier ${this._getResourceName(resourceKey)}`,
      content,
      buttons: {
        impact: {
          label: "Appliquer Impact",
          callback: html => {
            const form = html.find("form")[0];
            const oldValue = resource.value;
            const newValue = Math.max(0, Math.min(parseInt(form.value.value), parseInt(form.max.value)));
            const max = Math.max(1, parseInt(form.max.value));
            const checkSequelae = form.checkSequelae.checked;
            
            // Calcul de l'impact
            const impact = newValue - oldValue;
            
            // Utilisation du GaugeManager pour appliquer l'impact
            game.engrenages.gaugeManager.applyImpact(actor, resourceKey, impact, {
              noSequelae: !checkSequelae
            });
          }
        },
        update: {
          label: "Mettre à jour",
          callback: html => {
            const form = html.find("form")[0];
            const value = Math.max(0, Math.min(parseInt(form.value.value), parseInt(form.max.value)));
            const max = Math.max(1, parseInt(form.max.value));
            
            actor.update({
              [`system.resources.${resourceKey}.value`]: value,
              [`system.resources.${resourceKey}.max`]: max
            });
          }
        },
        cancel: {
          label: "Annuler"
        }
      },
      default: "update",
      render: html => {
        // Gestion des boutons d'impact
        html.find('.impact-button').click(ev => {
          ev.preventDefault();
          const btn = ev.currentTarget;
          const impactValue = parseInt(btn.dataset.value);
          const input = html.find('input[name="value"]');
          const currentValue = parseInt(input.val());
          const maxValue = parseInt(html.find('input[name="max"]').val());
          
          // Calcul de la nouvelle valeur
          const newValue = Math.max(0, Math.min(currentValue + impactValue, maxValue));
          input.val(newValue);
        });
      }
    });
    
    d.render(true);
  }
  
  /**
   * Obtient le nom localisé d'une ressource
   * @param {string} resourceKey - La clé de la ressource
   * @returns {string} Le nom localisé
   * @private
   */
  static _getResourceName(resourceKey) {
    const names = {
      health: "Santé",
      will: "Volonté",
      stamina: "Endurance",
      social: "Social"
    };
    
    return names[resourceKey] || resourceKey;
  }
  
  /**
   * Ajoute les styles CSS pour les jauges
   * @private
   */
  static _addStyles() {
    // Vérification si les styles sont déjà ajoutés
    if (document.getElementById("engrenages-token-hud-styles")) return;
    
    const styles = `
      .engrenages-token-gauges {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-top: 10px;
      }
      
      .engrenages-gauge {
        width: 100px;
        cursor: pointer;
        position: relative;
      }
      
      .engrenages-gauge.has-tooltip {
        overflow: visible;
      }
      
      .engrenages-gauge.has-tooltip:hover::after {
        content: attr(data-tooltip);
        position: absolute;
        left: 110%;
        top: 0;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        padding: 5px 8px;
        border-radius: 4px;
        width: 200px;
        font-size: 12px;
        z-index: 100;
        pointer-events: none;
      }
      
      .gauge-label {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        margin-bottom: 2px;
        color: #f0f0f0;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
      }
      
      .gauge-bar {
        height: 8px;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        overflow: hidden;
      }
      
      .gauge-fill {
        height: 100%;
        transition: width 0.3s ease;
      }
      
      .health-gauge .gauge-fill {
        background-color: #e74c3c;
      }
      
      .will-gauge .gauge-fill {
        background-color: #9b59b6;
      }
      
      .stamina-gauge .gauge-fill {
        background-color: #f39c12;
      }
      
      .social-gauge .gauge-fill {
        background-color: #3498db;
      }
      
      .jauge-malus-mineur .gauge-label {
        color: #f1c40f;
      }
      
      .jauge-malus-majeur .gauge-label {
        color: #e74c3c;
      }
      
      .jauge-critique .gauge-label {
        color: #7f8c8d;
      }
      
      .malus-info {
        font-weight: bold;
        margin-left: 4px;
      }
      
      /* Styles pour le dialogue de modification de jauge */
      .impact-buttons {
        display: flex;
        gap: 5px;
        margin-top: 5px;
      }
      
      .impact-button {
        flex: 1;
        background-color: #e74c3c;
        color: white;
        border: none;
        padding: 3px 0;
        border-radius: 3px;
        cursor: pointer;
      }
      
      .impact-button.positive {
        background-color: #2ecc71;
      }
      
      .impact-button:hover {
        opacity: 0.8;
      }
    `;
    
    const styleElement = document.createElement("style");
    styleElement.id = "engrenages-token-hud-styles";
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
  }
}
