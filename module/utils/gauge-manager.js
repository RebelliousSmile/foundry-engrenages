/**
 * Gestionnaire des jauges et séquelles pour le système Engrenages
 * Gère les impacts, malus et récupérations selon les règles du système
 */

export class GaugeManager {
  /**
   * Types de jauges disponibles
   * @type {Object}
   */
  static GAUGE_TYPES = {
    HEALTH: "health",
    WILL: "will",
    SOCIAL: "social",
    STAMINA: "stamina"
  };
  
  /**
   * Niveaux de malus selon la valeur de la jauge
   * @type {Object}
   */
  static MALUS_LEVELS = {
    NONE: { min: 6, max: 10, value: 0 },
    MINOR: { min: 3, max: 5, value: -2 },
    MAJOR: { min: 0, max: 2, value: -4 },
    CRITICAL: { min: -Infinity, max: -1, value: null } // Personnage hors-jeu
  };
  
  /**
   * Récupération quotidienne des points de jauge
   * @type {Number}
   */
  static DAILY_RECOVERY = 3;
  
  /**
   * Initialise les hooks pour la gestion des jauges
   */
  static init() {
    // Hook pour appliquer les malus aux jets
    Hooks.on("engrenages.preRollCheck", this._applyGaugeMalus.bind(this));
    
    // Hook pour la récupération quotidienne (à minuit)
    Hooks.on("ready", () => {
      // Vérifie si le hook de récupération quotidienne est déjà enregistré
      if (!game.engrenages.dailyRecoveryRegistered) {
        this._registerDailyRecovery();
        game.engrenages.dailyRecoveryRegistered = true;
      }
    });
  }
  
  /**
   * Enregistre le hook de récupération quotidienne
   * @private
   */
  static _registerDailyRecovery() {
    // Calcule le temps jusqu'à minuit
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const timeToMidnight = midnight.getTime() - now.getTime();
    
    // Planifie la récupération quotidienne
    setTimeout(() => {
      this._processDailyRecovery();
      
      // Réenregistre pour le jour suivant (toutes les 24h)
      setInterval(() => {
        this._processDailyRecovery();
      }, 24 * 60 * 60 * 1000);
    }, timeToMidnight);
    
    console.log(`Engrenages | Récupération quotidienne planifiée dans ${Math.floor(timeToMidnight / 60000)} minutes`);
  }
  
  /**
   * Traite la récupération quotidienne pour tous les acteurs
   * @private
   */
  static _processDailyRecovery() {
    console.log("Engrenages | Traitement de la récupération quotidienne des jauges");
    
    // Parcours tous les acteurs du jeu
    game.actors.forEach(actor => {
      if (actor.type === "character" || actor.type === "npc") {
        this.applyDailyRecovery(actor);
      }
    });
    
    // Notification
    ui.notifications.info("Les personnages ont récupéré des points de jauges (récupération quotidienne).");
  }
  
  /**
   * Applique la récupération quotidienne à un acteur
   * @param {Actor} actor - L'acteur à qui appliquer la récupération
   */
  static applyDailyRecovery(actor) {
    if (!actor.system.resources) return;
    
    const updates = {};
    let hasUpdates = false;
    
    // Parcours toutes les jauges
    Object.values(this.GAUGE_TYPES).forEach(gaugeType => {
      const gauge = actor.system.resources[gaugeType];
      if (!gauge) return;
      
      // Calcul de la nouvelle valeur (max 3 points, sans dépasser le maximum)
      const newValue = Math.min(gauge.max, gauge.value + this.DAILY_RECOVERY);
      
      // Si la valeur a changé, on l'ajoute aux mises à jour
      if (newValue !== gauge.value) {
        updates[`system.resources.${gaugeType}.value`] = newValue;
        hasUpdates = true;
      }
    });
    
    // Applique les mises à jour si nécessaire
    if (hasUpdates) {
      actor.update(updates);
    }
  }
  
  /**
   * Applique un impact à une jauge
   * @param {Actor} actor - L'acteur affecté
   * @param {string} gaugeType - Le type de jauge affectée
   * @param {number} value - La valeur de l'impact (négatif pour les dégâts, positif pour les soins)
   * @param {Object} options - Options supplémentaires
   * @returns {Promise} Une promesse résolue après l'application de l'impact
   */
  static async applyImpact(actor, gaugeType, value, options = {}) {
    if (!actor.system.resources) return null;
    
    const gauge = actor.system.resources[gaugeType];
    if (!gauge) return null;
    
    // Calcul de la nouvelle valeur
    const oldValue = gauge.value;
    const newValue = Math.max(0, Math.min(gauge.max, gauge.value + value));
    
    // Si la valeur n'a pas changé, on ne fait rien
    if (newValue === oldValue) return null;
    
    // Mise à jour de la jauge
    await actor.update({
      [`system.resources.${gaugeType}.value`]: newValue
    });
    
    // Vérification des séquelles si c'est un impact négatif et que la jauge est en dessous de 5
    if (value < 0 && newValue < 5 && !options.noSequelae) {
      await this.checkForSequelae(actor, gaugeType, newValue);
    }
    
    // Vérification si le personnage est hors-jeu
    if (newValue <= 0) {
      this._handleOutOfGame(actor, gaugeType);
    }
    
    return {
      oldValue,
      newValue,
      difference: newValue - oldValue
    };
  }
  
  /**
   * Vérifie si une séquelle est générée suite à un impact
   * @param {Actor} actor - L'acteur affecté
   * @param {string} gaugeType - Le type de jauge affectée
   * @param {number} gaugeValue - La valeur actuelle de la jauge
   * @returns {Promise} Une promesse résolue après la vérification
   */
  static async checkForSequelae(actor, gaugeType, gaugeValue) {
    // On ne vérifie que si la jauge est en dessous de 5
    if (gaugeValue >= 5) return null;
    
    // Jet de dé pour déterminer si une séquelle est générée
    const roll = await new Roll("1d6").evaluate({async: true});
    
    // Affiche le jet dans le chat
    roll.toMessage({
      speaker: ChatMessage.getSpeaker({actor}),
      flavor: `Vérification de séquelle (${this._getGaugeName(gaugeType)})`
    });
    
    // Si le résultat est strictement supérieur à la valeur de la jauge, une séquelle est générée
    if (roll.total > gaugeValue) {
      return this._generateSequelae(actor, gaugeType, gaugeValue);
    }
    
    return null;
  }
  
  /**
   * Génère une séquelle pour un acteur
   * @param {Actor} actor - L'acteur affecté
   * @param {string} gaugeType - Le type de jauge affectée
   * @param {number} gaugeValue - La valeur actuelle de la jauge
   * @returns {Promise} Une promesse résolue après la génération de la séquelle
   * @private
   */
  static async _generateSequelae(actor, gaugeType, gaugeValue) {
    // Détermine la gravité de la séquelle en fonction de la valeur de la jauge
    let severity = "légère";
    let recoveryTime = "1 mois";
    let recoveryTimeWithCare = "1 semaine";
    let careDifficulty = -2;
    
    if (gaugeValue <= 2) {
      severity = "grave";
      recoveryTime = "1 année";
      recoveryTimeWithCare = "1 mois";
      careDifficulty = -4;
    }
    
    // Génère un nom de séquelle en fonction du type de jauge
    const sequelaeNames = this._getSequelaeNames(gaugeType);
    const sequelaeIndex = Math.floor(Math.random() * sequelaeNames.length);
    const sequelaeBaseName = sequelaeNames[sequelaeIndex];
    const sequelaeFullName = `${sequelaeBaseName} ${severity}`;
    
    // Crée un item de type "trait" pour représenter la séquelle
    const sequelaeData = {
      name: sequelaeFullName,
      type: "trait",
      img: this._getSequelaeIcon(gaugeType),
      system: {
        description: `Une séquelle ${severity} affectant la jauge ${this._getGaugeName(gaugeType)}.\n\nRécupération naturelle: ${recoveryTime}\nRécupération avec soins: ${recoveryTimeWithCare}\nDifficulté des soins: ${careDifficulty}`,
        traitType: "sequelae",
        source: gaugeType,
        severity: gaugeValue <= 2 ? "major" : "minor",
        recoveryTime: gaugeValue <= 2 ? "year" : "month",
        recoveryTimeWithCare: gaugeValue <= 2 ? "month" : "week",
        careDifficulty: careDifficulty,
        active: true
      }
    };
    
    // Ajoute la séquelle à l'acteur
    const sequelae = await actor.createEmbeddedDocuments("Item", [sequelaeData]);
    
    // Notification dans le chat
    ChatMessage.create({
      speaker: ChatMessage.getSpeaker({actor}),
      content: `<h3>${actor.name} a subi une séquelle !</h3>
                <p><strong>${sequelaeFullName}</strong></p>
                <p>Cette séquelle affecte la jauge ${this._getGaugeName(gaugeType)} et impose des malus supplémentaires.</p>
                <p><em>Récupération naturelle:</em> ${recoveryTime}<br>
                <em>Récupération avec soins:</em> ${recoveryTimeWithCare}<br>
                <em>Difficulté des soins:</em> ${careDifficulty}</p>`
    });
    
    return sequelae[0];
  }
  
  /**
   * Gère la mise hors-jeu d'un personnage
   * @param {Actor} actor - L'acteur affecté
   * @param {string} gaugeType - Le type de jauge affectée
   * @private
   */
  static _handleOutOfGame(actor, gaugeType) {
    let consequence = "retiré du jeu";
    
    switch (gaugeType) {
      case this.GAUGE_TYPES.HEALTH:
        consequence = "mort physique";
        break;
      case this.GAUGE_TYPES.WILL:
        consequence = "folie";
        break;
      case this.GAUGE_TYPES.SOCIAL:
        consequence = "bannissement";
        break;
      case this.GAUGE_TYPES.STAMINA:
        consequence = "épuisement total";
        break;
    }
    
    // Notification dans le chat
    ChatMessage.create({
      speaker: ChatMessage.getSpeaker({actor}),
      content: `<h3>${actor.name} est hors-jeu !</h3>
                <p>Suite à la chute de sa jauge de ${this._getGaugeName(gaugeType)} à 0, ${actor.name} subit une ${consequence}.</p>
                <p>Le personnage est retiré du jeu jusqu'à ce que sa condition soit améliorée ou qu'une intervention narrative le permette.</p>`
    });
    
    // Applique un effet visuel sur le token
    if (actor.getActiveTokens().length > 0) {
      actor.getActiveTokens().forEach(token => {
        canvas.tokens.get(token.id).toggleOverlay("icons/svg/skull.svg");
      });
    }
  }
  
  /**
   * Applique les malus de jauge aux jets de dés
   * @param {Object} rollData - Les données du jet
   * @private
   */
  static _applyGaugeMalus(rollData) {
    const actor = rollData.actor;
    if (!actor || !actor.system.resources) return;
    
    let highestMalus = 0;
    
    // Parcours toutes les jauges pour trouver le malus le plus élevé
    Object.values(this.GAUGE_TYPES).forEach(gaugeType => {
      const gauge = actor.system.resources[gaugeType];
      if (!gauge) return;
      
      let malusValue = 0;
      
      // Détermine le malus en fonction de la valeur de la jauge
      if (gauge.value < 6 && gauge.value >= 3) {
        malusValue = -2;
      } else if (gauge.value < 3 && gauge.value >= 0) {
        malusValue = -4;
      }
      
      // Conserve le malus le plus élevé (le plus négatif)
      if (malusValue < highestMalus) {
        highestMalus = malusValue;
      }
    });
    
    // Applique le malus au jet
    if (highestMalus < 0) {
      rollData.modifier += highestMalus;
      rollData.malusSource = "jauges";
      rollData.malusValue = highestMalus;
    }
  }
  
  /**
   * Obtient le nom localisé d'une jauge
   * @param {string} gaugeType - Le type de jauge
   * @returns {string} Le nom localisé
   * @private
   */
  static _getGaugeName(gaugeType) {
    const names = {
      [this.GAUGE_TYPES.HEALTH]: "Santé",
      [this.GAUGE_TYPES.WILL]: "Volonté",
      [this.GAUGE_TYPES.SOCIAL]: "Social",
      [this.GAUGE_TYPES.STAMINA]: "Endurance"
    };
    
    return names[gaugeType] || gaugeType;
  }
  
  /**
   * Obtient des noms de séquelles en fonction du type de jauge
   * @param {string} gaugeType - Le type de jauge
   * @returns {Array} Liste de noms de séquelles
   * @private
   */
  static _getSequelaeNames(gaugeType) {
    switch (gaugeType) {
      case this.GAUGE_TYPES.HEALTH:
        return [
          "Blessure",
          "Fracture",
          "Entaille",
          "Contusion",
          "Hémorragie",
          "Infection",
          "Cicatrice"
        ];
      case this.GAUGE_TYPES.WILL:
        return [
          "Trauma",
          "Phobie",
          "Obsession",
          "Paranoïa",
          "Hallucination",
          "Cauchemar",
          "Anxiété"
        ];
      case this.GAUGE_TYPES.SOCIAL:
        return [
          "Discrédit",
          "Rumeur",
          "Scandale",
          "Humiliation",
          "Trahison",
          "Isolement",
          "Rejet"
        ];
      case this.GAUGE_TYPES.STAMINA:
        return [
          "Épuisement",
          "Fatigue",
          "Faiblesse",
          "Essoufflement",
          "Crampe",
          "Surmenage",
          "Vertige"
        ];
      default:
        return ["Séquelle"];
    }
  }
  
  /**
   * Obtient une icône en fonction du type de jauge
   * @param {string} gaugeType - Le type de jauge
   * @returns {string} Chemin de l'icône
   * @private
   */
  static _getSequelaeIcon(gaugeType) {
    switch (gaugeType) {
      case this.GAUGE_TYPES.HEALTH:
        return "icons/svg/blood.svg";
      case this.GAUGE_TYPES.WILL:
        return "icons/svg/brain.svg";
      case this.GAUGE_TYPES.SOCIAL:
        return "icons/svg/silenced.svg";
      case this.GAUGE_TYPES.STAMINA:
        return "icons/svg/sleep.svg";
      default:
        return "icons/svg/skull.svg";
    }
  }
}
