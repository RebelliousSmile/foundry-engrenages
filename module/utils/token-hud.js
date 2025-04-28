/**
 * Gestionnaire du HUD de token pour le système Engrenages
 * Permet d'afficher les jauges personnalisées sur le HUD des tokens
 */

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
    
    const gauge = $(`
      <div class="engrenages-gauge health-gauge" data-resource="health">
        <div class="gauge-label">
          <i class="fas fa-heart"></i>
          <span class="gauge-value">${health.value}/${health.max}</span>
        </div>
        <div class="gauge-bar">
          <div class="gauge-fill" style="width: ${percentage}%"></div>
        </div>
      </div>
    `);
    
    // Gestion du clic pour modifier la valeur
    gauge.on('click', ev => {
      ev.preventDefault();
      this._onGaugeClick(actor, "health");
    });
    
    container.append(gauge);
  }
  
  /**
   * Ajoute la jauge de mana
   * @param {jQuery} container - Le conteneur des jauges
   * @param {Actor} actor - L'acteur associé au token
   * @private
   */
  static _addManaGauge(container, actor) {
    // Initialisation des ressources si nécessaire
    if (!actor.system.resources) {
      actor.system.resources = {};
    }
    
    if (!actor.system.resources.mana) {
      actor.system.resources.mana = { value: 5, max: 5 };
    }
    
    const mana = actor.system.resources.mana;
    const percentage = Math.max(0, Math.min(100, (mana.value / mana.max) * 100));
    
    const gauge = $(`
      <div class="engrenages-gauge mana-gauge" data-resource="mana">
        <div class="gauge-label">
          <i class="fas fa-hat-wizard"></i>
          <span class="gauge-value">${mana.value}/${mana.max}</span>
        </div>
        <div class="gauge-bar">
          <div class="gauge-fill" style="width: ${percentage}%"></div>
        </div>
      </div>
    `);
    
    // Gestion du clic pour modifier la valeur
    gauge.on('click', ev => {
      ev.preventDefault();
      this._onGaugeClick(actor, "mana");
    });
    
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
      actor.system.resources.stamina = { value: 8, max: 8 };
    }
    
    const stamina = actor.system.resources.stamina;
    const percentage = Math.max(0, Math.min(100, (stamina.value / stamina.max) * 100));
    
    const gauge = $(`
      <div class="engrenages-gauge stamina-gauge" data-resource="stamina">
        <div class="gauge-label">
          <i class="fas fa-running"></i>
          <span class="gauge-value">${stamina.value}/${stamina.max}</span>
        </div>
        <div class="gauge-bar">
          <div class="gauge-fill" style="width: ${percentage}%"></div>
        </div>
      </div>
    `);
    
    // Gestion du clic pour modifier la valeur
    gauge.on('click', ev => {
      ev.preventDefault();
      this._onGaugeClick(actor, "stamina");
    });
    
    container.append(gauge);
  }
  
  /**
   * Ajoute la jauge de volonté
   * @param {jQuery} container - Le conteneur des jauges
   * @param {Actor} actor - L'acteur associé au token
   * @private
   */
  static _addWillGauge(container, actor) {
    // Initialisation des ressources si nécessaire
    if (!actor.system.resources) {
      actor.system.resources = {};
    }
    
    if (!actor.system.resources.will) {
      actor.system.resources.will = { value: 6, max: 6 };
    }
    
    const will = actor.system.resources.will;
    const percentage = Math.max(0, Math.min(100, (will.value / will.max) * 100));
    
    const gauge = $(`
      <div class="engrenages-gauge will-gauge" data-resource="will">
        <div class="gauge-label">
          <i class="fas fa-brain"></i>
          <span class="gauge-value">${will.value}/${will.max}</span>
        </div>
        <div class="gauge-bar">
          <div class="gauge-fill" style="width: ${percentage}%"></div>
        </div>
      </div>
    `);
    
    // Gestion du clic pour modifier la valeur
    gauge.on('click', ev => {
      ev.preventDefault();
      this._onGaugeClick(actor, "will");
    });
    
    container.append(gauge);
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
      </form>
    `;
    
    new Dialog({
      title: `Modifier ${this._getResourceName(resourceKey)}`,
      content,
      buttons: {
        validate: {
          label: "Valider",
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
      default: "validate"
    }).render(true);
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
      mana: "Mana",
      stamina: "Endurance",
      will: "Volonté"
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
      
      .mana-gauge .gauge-fill {
        background-color: #3498db;
      }
      
      .stamina-gauge .gauge-fill {
        background-color: #f39c12;
      }
      
      .will-gauge .gauge-fill {
        background-color: #9b59b6;
      }
    `;
    
    const styleElement = document.createElement("style");
    styleElement.id = "engrenages-token-hud-styles";
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
  }
}
