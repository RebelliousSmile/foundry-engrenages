/**
 * Système Engrenages pour FoundryVTT
 * Un système de jeu générique avec de nombreuses règles optionnelles
 */

// Import des modules
import { EngrenagesConfig } from "./config.js";
import { EngrenagesSettings } from "./settings.js";
import { EngrenajesMigration } from "./migration.js";
// Import des modèles de données modernes
import { CharacterDataModel, NpcDataModel, VehicleDataModel, OrganizationDataModel, GroupDataModel } from "./models/data-models.js";
import { EquipmentDataModel, SkillDataModel, TraitDataModel } from "./models/data-models.js";
// Import du gestionnaire de configuration TOML
import { ConfigurationEngrenages } from "./config/config-manager.js";
// Import du gestionnaire de modules
import { ModuleManager } from "./core/module-manager.js";
import { EngrenagesActor } from "./actors/actor.js";
import { EngrenagesItem } from "./items/item.js";
import { EngrenagesCharacterSheet } from "./actors/sheets/character.js";
import { EngrenagesNpcSheet } from "./actors/sheets/npc.js";
import { EngrenagesVehicleSheet } from "./actors/sheets/vehicle.js";
import { EngrenagesOrganizationSheet } from "./actors/sheets/organization.js";
import { EngrenagesTraitSheet } from "./items/sheets/trait.js";
import { preloadHandlebarsTemplates } from "./utils/templates.js";
import { EngrenagesHelpers } from "./utils/helpers.js";
import { EngrenagesHooks } from "./utils/hooks.js";
import { EngrenagesRoll } from "./dice/roll.js";
import { TraitManager } from "./traits/traitManager.js";
import { EngrenagesTokenHUD } from "./utils/token-hud.js";
import { GaugeManager } from "./utils/gauge-manager.js";

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
    try {
        // Enregistrement des modèles de données d'acteurs
        CONFIG.Actor.systemDataModels = {
            character: CharacterDataModel,
            npc: NpcDataModel,
            vehicle: VehicleDataModel,
            organization: OrganizationDataModel,
            group: GroupDataModel
        };
        
        // Enregistrement des modèles de données d'objets
        CONFIG.Item.systemDataModels = {
            equipment: EquipmentDataModel,
            skill: SkillDataModel,
            trait: TraitDataModel
        };
        
        console.log("Engrenages: Modèles de données enregistrés avec succès");
    } catch (error) {
        console.error("Engrenages: Erreur lors de l'enregistrement des modèles de données", error);
    }
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
        config: EngrenagesConfig,
        configManager: ConfigurationEngrenages,
        moduleManager: ModuleManager,
        tokenHUD: EngrenagesTokenHUD,
        gaugeManager: GaugeManager,
        dailyRecoveryRegistered: false
    };
    
    // Enregistrement des classes de documents
    CONFIG.Actor.documentClass = EngrenagesActor;
    CONFIG.Item.documentClass = EngrenagesItem;
    
    // Initialisation des types d'acteurs de base (personnage et PNJ)
    // Les véhicules et organisations seront ajoutés conditionnellement dans le hook ready
    const baseActorTypes = {
        character: EngrenagesConfig.actorTypes.character,
        npc: EngrenagesConfig.actorTypes.npc
    };
    
    // Mettre à jour les types d'acteurs disponibles
    CONFIG.Actor.types = Object.keys(baseActorTypes);
    CONFIG.engrenages = CONFIG.engrenages || {};
    CONFIG.engrenages.actorTypes = baseActorTypes;
    
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
    // Utiliser la feuille de trait pour tous les types d'objets pour l'instant
    Items.registerSheet("engrenages", EngrenagesTraitSheet, { 
        types: ["trait"], 
        makeDefault: true 
    });
    // Utiliser la feuille par défaut pour les autres types
    Items.registerSheet("engrenages", ItemSheet, { 
        types: ["equipment", "skill", "gauge"],
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
    TraitManager.init();
    
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
    
    // Initialisation de la configuration TOML
    await ConfigurationEngrenages.init();
    
    // Initialisation du gestionnaire de modules
    ModuleManager.init();
    
    // Initialisation du HUD de token avec les 4 jauges
    EngrenagesTokenHUD.init();
    
    // Initialisation du gestionnaire de jauges
    GaugeManager.init();
    
    // Vérifier les paramètres des modules optionnels
    const vehiclesEnabled = game.settings.get("engrenages", "modules.vehicles");
    const organizationsEnabled = game.settings.get("engrenages", "modules.organizations");
    
    // Mettre à jour les types d'acteurs disponibles si nécessaire
    if (vehiclesEnabled || organizationsEnabled) {
        // Créer une copie des types d'acteurs de base
        const updatedActorTypes = { ...CONFIG.engrenages.actorTypes };
        
        // Ajouter les types d'acteurs activés
        if (vehiclesEnabled) {
            updatedActorTypes.vehicle = EngrenagesConfig.actorTypes.vehicle;
            CONFIG.Actor.types.push("vehicle");
        }
        
        if (organizationsEnabled) {
            updatedActorTypes.organization = EngrenagesConfig.actorTypes.organization;
            CONFIG.Actor.types.push("organization");
        }
        
        // Mettre à jour la configuration
        CONFIG.engrenages.actorTypes = updatedActorTypes;
        
        // Mettre à jour les étiquettes des types d'acteurs
        game.i18n.translations.ACTOR.TypeCharacter = game.i18n.localize(EngrenagesConfig.actorTypes.character);
        game.i18n.translations.ACTOR.TypeNpc = game.i18n.localize(EngrenagesConfig.actorTypes.npc);
        
        if (vehiclesEnabled) {
            game.i18n.translations.ACTOR.TypeVehicle = game.i18n.localize(EngrenagesConfig.actorTypes.vehicle);
        }
        
        if (organizationsEnabled) {
            game.i18n.translations.ACTOR.TypeOrganization = game.i18n.localize(EngrenagesConfig.actorTypes.organization);
        }
    }
});

/**
 * Hook pour les messages de chat
 */
Hooks.on("renderChatMessage", (app, html, data) => {
    EngrenagesRoll.activateListeners(app, html, data);
});
