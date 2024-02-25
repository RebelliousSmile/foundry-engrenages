import { MODULE_ID } from "../engrenages.mjs";

export const registerSettings = function () {
    let activeModules = game.modules.filter(m => m.active && m.id.includes('cogs-'));
    let selectedModules = ['default'];
    // transform the activeModules array into an array of objects with the module name and title
    if (activeModules.length > 0) {
        activeModules.forEach(m => {
            selectedModules.push(m.title);
        });
    }

    // console.log('Engrenages', selectedModules);
    game.settings.register(MODULE_ID, "game_module", {
        name: game.i18n.localize("SETTINGS.world.game_module.name"),
        hint: game.i18n.localize("SETTINGS.world.game_module.hint"),
        scope: "world",
        config: true,
        type: String,
        default: "default",
        choices: selectedModules,
        onChange: value => {
        // console.log(value);
        }
    });

    game.settings.register(MODULE_ID, "first-run-tips-shown", {
        name: game.i18n.localize("SETTINGS.world.first_run.name"),
        hint: game.i18n.localize("SETTINGS.world.first_run.hint"),
        scope: "world",
        config: true,
        type: Boolean,
        default: false
    });

    game.settings.register(MODULE_ID, "menace_die", {
        name: game.i18n.localize("SETTINGS.world.menace_die.name"),
        hint: game.i18n.localize("SETTINGS.world.menace_die.hint"),
        scope: "world",
        config: true,
        type: Boolean,
        default: false
    });

    game.settings.register(MODULE_ID, "occult", {
        name: game.i18n.localize("SETTINGS.world.occult.name"),
        hint: game.i18n.localize("SETTINGS.world.occult.hint"),
        scope: "world",
        config: true,
        type: Boolean,
        default: false
    });

    game.settings.register(MODULE_ID, "morale_management", {
        name: game.i18n.localize("SETTINGS.world.morale_management.name"),
        hint: game.i18n.localize("SETTINGS.world.morale_management.hint"),
        scope: "world",
        config: true,
        type: String,
        choices: {
            "none": game.i18n.localize("SETTINGS.world.morale_management.none"),
            "motivation": game.i18n.localize("SETTINGS.world.morale_management.motivation"),
            "destiny": game.i18n.localize("SETTINGS.world.morale_management.destiny")
        },
        default: false
    });

    game.settings.register(MODULE_ID, "specialties", {
        name: game.i18n.localize("SETTINGS.world.specialties.name"),
        hint: game.i18n.localize("SETTINGS.world.specialties.hint"),
        scope: "world",
        config: true,
        type: Boolean,
        default: false
    });

    game.settings.register(MODULE_ID, "confrontation", {
        name: game.i18n.localize("SETTINGS.world.confrontation.name"),
        hint: game.i18n.localize("SETTINGS.world.confrontation.hint"),
        scope: "world",
        config: true,
        type: Boolean,
        default: false
    });
}  