/**
 * Préchargement des templates Handlebars pour le système Engrenages
 */

/**
 * Précharge les templates Handlebars
 * @returns {Promise} Promise résolue lorsque tous les templates sont préchargés
 */
export async function preloadHandlebarsTemplates() {
    // Liste des templates à précharger
    const templatePaths = [
        // Feuilles d'acteur
        "systems/engrenages/templates/actors/character-sheet.html",
        "systems/engrenages/templates/actors/npc-sheet.html",
        
        // Parties communes des feuilles d'acteur
        "systems/engrenages/templates/actors/parts/actor-attributes.html",
        "systems/engrenages/templates/actors/parts/actor-skills.html",
        "systems/engrenages/templates/actors/parts/actor-inventory.html",
        "systems/engrenages/templates/actors/parts/actor-traits.html",
        "systems/engrenages/templates/actors/parts/actor-biography.html",
        "systems/engrenages/templates/actors/parts/actor-resources.html",
        
        // Feuilles d'objet
        "systems/engrenages/templates/items/equipment-sheet.html",
        "systems/engrenages/templates/items/skill-sheet.html",
        "systems/engrenages/templates/items/trait-sheet.html",
        
        // Parties communes des feuilles d'objet
        "systems/engrenages/templates/items/parts/item-header.html",
        "systems/engrenages/templates/items/parts/item-description.html",
        "systems/engrenages/templates/items/parts/item-effects.html",
        
        // Dialogues
        "systems/engrenages/templates/dialog/roll-result.html",
        "systems/engrenages/templates/dialog/settings-config.html"
    ];
    
    // Préchargement des templates
    return loadTemplates(templatePaths);
}
