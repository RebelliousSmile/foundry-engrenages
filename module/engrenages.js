/**
 * Système Engrenages pour FoundryVTT
 * Un système de jeu générique avec de nombreuses règles optionnelles
 */

// Import des modules
import { EngrenagesConfig } from "./config.js";
import { EngrenagesSettings } from "./settings.js";
import { EngrenajesMigration } from "./migration.js";
import { ACTOR_MODELS } from "./models/actor-types.js";
import { ITEM_MODELS } from "./models/item-types.js";
import { EngrenagesActor } from "./actors/actor.js";
import { EngrenagesItem } from "./items/item.js";
import { EngrenagesCharacterSheet } from "./actors/sheets/character.js";
import { EngrenagesNpcSheet } from "./actors/sheets/npc.js";
import { EngrenagesVehicleSheet } from "./actors/sheets/vehicle.js";
import { EngrenagesOrganizationSheet } from "./actors/sheets/organization.js";
import { EngrenagesEquipmentSheet } from "./items/sheets/equipment.js";
import { EngrenagesSkillSheet } from "./items/sheets/skill.js";
import { EngrenagesTraitSheet } from "./items/sheets/trait.js";
import { preloadHandlebarsTemplates } from "./utils/templates.js";
import { EngrenagesHelpers } from "./utils/helpers.js";
import { EngrenagesHooks } from "./utils/hooks.js";
import { EngrenagesRoll } from "./dice/roll.js";
import { GestionnaireTraits } from "./traits/traitManager.js";

/* -------------------------------------------- */
/*  Initialisation de Foundry VTT               */
/* -------------------------------------------- */

/**
 * Fonction d'internationalisation
 */
export function localize(key) {
    if (!game?.i18n?.localize) {
        console.error("Système d'internationalisation non disponible");
        return key;
    }
    return game.i18n.localize(key);
}

/**
 * Enregistrement des modèles de données
 */
function registerDataModels() {
    CONFIG.Actor.dataModels = ACTOR_MODELS;
    CONFIG.Item.dataModels = ITEM_MODELS;
}

/* -------------------------------------------- */
/*  Hooks Foundry VTT                           */
/* -------------------------------------------- */

Hooks.once("init", async function() {
    console.log("Engrenages | Initialisation du système Engrenages");
    
    // Enregistrement des modèles de données
    registerDataModels();
    
    // Configuration du système
    game.engrenages = {
        EngrenagesActor,
        EngrenagesItem,
        EngrenagesRoll,
        config: EngrenagesConfig
    };
    
    // Enregistrement des classes de documents
    CONFIG.Actor.documentClass = EngrenagesActor;
    CONFIG.Item.documentClass = EngrenagesItem;
    
    // Enregistrement des feuilles de personnage
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("engrenages", EngrenagesCharacterSheet, {
        types: ["character"],
        makeDefault: true,
        label: "ENGRENAGES.SheetCharacter"
    });
    Actors.registerSheet("engrenages", EngrenagesNpcSheet, {
        types: ["npc"],
        makeDefault: true,
        label: "ENGRENAGES.SheetNPC"
    });
    
    // Enregistrement conditionnel des feuilles de véhicule et d'organisation
    // Ces feuilles ne sont disponibles que si les options correspondantes sont activées
    const registerConditionalSheets = () => {
        // Vérifie si l'option 'vehicles' est activée
        const vehiclesEnabled = game.settings.get("engrenages", "modules.vehicles");
        if (vehiclesEnabled) {
            Actors.registerSheet("engrenages", EngrenagesVehicleSheet, {
                types: ["vehicle"],
                makeDefault: true,
                label: "ENGRENAGES.SheetVehicle"
            });
        }
        
        // Vérifie si l'option 'organizations' est activée
        const organizationsEnabled = game.settings.get("engrenages", "modules.organizations");
        if (organizationsEnabled) {
            Actors.registerSheet("engrenages", EngrenagesOrganizationSheet, {
                types: ["organization"],
                makeDefault: true,
                label: "ENGRENAGES.SheetOrganization"
            });
        }
    };
    
    // On attend que les paramètres soient chargés avant d'enregistrer les feuilles conditionnelles
    Hooks.once("ready", registerConditionalSheets);
    
    // Enregistrement des feuilles d'objets
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("engrenages", EngrenagesEquipmentSheet, { 
        types: ["equipment"], 
        makeDefault: true 
    });
    Items.registerSheet("engrenages", EngrenagesSkillSheet, { 
        types: ["skill"], 
        makeDefault: true 
    });
    Items.registerSheet("engrenages", EngrenagesTraitSheet, { 
        types: ["trait"], 
        makeDefault: true 
    });
    
    // Enregistrement des paramètres du système
    EngrenagesSettings.registerSettings();
    
    // Préchargement des templates Handlebars
    preloadHandlebarsTemplates();
    
    // Initialisation des helpers Handlebars
    EngrenagesHelpers.init();
    
    // Initialisation des hooks
    EngrenagesHooks.init();
    
    // Initialisation du gestionnaire de traits
    GestionnaireTraits.init();
    
    // Filtrage des types d'acteurs disponibles en fonction des options activées
    Hooks.on("renderDialog", (dialog, html, data) => {
        // Vérifie si c'est le dialogue de création d'acteur
        if (dialog.data.title === game.i18n.localize("ACTOR.Create")) {
            const vehiclesEnabled = game.settings.get("engrenages", "modules.vehicles");
            const organizationsEnabled = game.settings.get("engrenages", "modules.organizations");
            
            // Si l'option 'vehicles' n'est pas activée, masquer le type 'vehicle'
            if (!vehiclesEnabled) {
                html.find('option[value="vehicle"]').remove();
            }
            
            // Si l'option 'organizations' n'est pas activée, masquer le type 'organization'
            if (!organizationsEnabled) {
                html.find('option[value="organization"]').remove();
            }
        }
    });
});

/**
 * Hook exécuté lorsque Foundry est prêt
 */
Hooks.once("ready", async function() {
    // Vérification des migrations
    await EngrenajesMigration.checkMigration();
});

/**
 * Hook pour les messages de chat
 */
Hooks.on("renderChatMessage", (app, html, data) => {
    EngrenagesRoll.activateListeners(app, html, data);
});
