// Import document classes.
import { EngrenagesActor } from './documents/actor.mjs';
import { EngrenagesItem } from './documents/item.mjs';
// Import sheet classes.
import { EngrenagesActorSheet } from './sheets/actor-sheet.mjs';
import { EngrenagesItemSheet } from './sheets/item-sheet.mjs';
// Import helper/utility classes and constants.
import { preloadHandlebarsTemplates } from './helpers/templates.mjs';
import { registerSettings } from './helpers/settings.mjs';

import { ENGRENAGES } from './helpers/config.mjs';

export const MODULE_ID = "engrenages";
/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once('init', function () {
  // Add utility classes to the global game object so that they're more easily
  // accessible in global contexts.
  registerSettings();

  game.engrenages = {
    EngrenagesActor,
    EngrenagesItem,
    // rollItemMacro,
  };

  // Add custom constants for configuration.
  CONFIG.ENGRENAGES = ENGRENAGES;

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: '1d20 + @abilities.dex.mod',
    decimals: 2,
  };

  // Define custom Document classes
  CONFIG.Actor.documentClass = EngrenagesActor;
  CONFIG.Item.documentClass = EngrenagesItem;

  // Active Effects are never copied to the Actor,
  // but will still apply to the Actor from within the Item
  // if the transfer property on the Active Effect is true.
  CONFIG.ActiveEffect.legacyTransferral = false;

  // Register sheet application classes
  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('engrenages', EngrenagesActorSheet, {
    makeDefault: true,
    label: 'ENGRENAGES.SheetLabels.Actor',
  });
  Items.unregisterSheet('core', ItemSheet);
  Items.registerSheet('engrenages', EngrenagesItemSheet, {
    makeDefault: true,
    label: 'ENGRENAGES.SheetLabels.Item',
  });

  // Preload Handlebars templates.
  return preloadHandlebarsTemplates();
});

