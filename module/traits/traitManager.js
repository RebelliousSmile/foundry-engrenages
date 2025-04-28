/**
 * Gestionnaire des traits pour le système Engrenages
 * Permet d'appliquer les bonus et malus des traits lors des jets de dés
 */

export class GestionnaireTraits {
    /**
     * Initialise le gestionnaire de traits
     */
    static init() {
        // Enregistrement des hooks
        Hooks.on("renderDialog", GestionnaireTraits._onRenderDialog);
        Hooks.on("preRollEngrenagesDice", GestionnaireTraits._onPreRollEngrenagesDice);
    }

    /**
     * Modifie les dialogues de jet de dés pour inclure les traits pertinents
     * @param {Dialog} dialog - Le dialogue de jet de dés
     * @param {jQuery} html - Le contenu HTML du dialogue
     * @private
     */
    static _onRenderDialog(dialog, html) {
        // Vérifier si c'est un dialogue de jet de dés Engrenages
        if (!dialog.data.title?.includes("ENGRENAGES")) return;
        
        // Récupérer l'acteur concerné
        const actorId = dialog.data.actorId;
        if (!actorId) return;
        
        const actor = game.actors.get(actorId);
        if (!actor) return;
        
        // Récupérer les traits de l'acteur
        const traits = actor.items.filter(i => i.type === "trait");
        if (!traits.length) return;
        
        // Ajouter une section pour les traits dans le dialogue
        const form = html.find("form");
        if (!form.length) return;
        
        const traitsHTML = `
            <div class="form-group traits-applicables">
                <label>${game.i18n.localize("ENGRENAGES.Trait.ApplicableTraits")}</label>
                <div class="traits-list">
                    ${traits.map(trait => `
                        <div class="trait-option" data-trait-id="${trait.id}">
                            <input type="checkbox" name="trait-${trait.id}" id="trait-${trait.id}" data-trait-value="${trait.system.value}">
                            <label for="trait-${trait.id}">
                                ${trait.name} 
                                <span class="trait-value">
                                    ${Array(trait.system.value).fill('<i class="fas fa-star"></i>').join('')}
                                </span>
                            </label>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="form-group">
                <label>${game.i18n.localize("ENGRENAGES.Trait.BonusMalus")}</label>
                <div class="trait-bonus-malus">
                    <input type="number" name="trait-bonus" value="0" disabled>
                </div>
                <p class="notes">${game.i18n.localize("ENGRENAGES.Trait.BonusMalusHint")}</p>
            </div>
        `;
        
        form.find("button[type=submit]").before(traitsHTML);
        
        // Ajouter les écouteurs d'événements
        form.find(".trait-option input").on("change", (event) => {
            const checked = form.find(".trait-option input:checked");
            let bonus = 0;
            
            checked.each((_, el) => {
                bonus += parseInt(el.dataset.traitValue) || 0;
            });
            
            form.find("input[name=trait-bonus]").val(bonus);
        });
    }

    /**
     * Modifie le jet de dés pour inclure les bonus des traits
     * @param {Object} data - Les données du jet de dés
     * @private
     */
    static _onPreRollEngrenagesDice(data) {
        // Récupérer le bonus des traits depuis le formulaire
        const traitBonus = parseInt($("input[name=trait-bonus]").val()) || 0;
        
        // Ajouter le bonus au jet
        if (traitBonus) {
            data.bonus = (data.bonus || 0) + traitBonus;
            data.flavor = `${data.flavor || ""} (${game.i18n.localize("ENGRENAGES.Trait.BonusApplied")}: +${traitBonus})`;
        }
    }

    /**
     * Applique un bonus de trait à un acteur pour un jet de dés spécifique
     * @param {Actor} actor - L'acteur concerné
     * @param {Item} trait - Le trait à appliquer
     * @param {boolean} isBonus - Indique s'il s'agit d'un bonus (true) ou d'un malus (false)
     */
    static async appliquerTraitPourJet(actor, trait, isBonus = true) {
        if (!actor || !trait) return;
        
        // Créer un dialogue pour demander quel jet effectuer avec ce trait
        const competences = [
            ...Object.keys(actor.system.physique || {}).filter(k => k !== "custom"),
            ...Object.keys(actor.system.mental || {}).filter(k => k !== "custom"),
            ...Object.keys(actor.system.social || {}).filter(k => k !== "custom"),
            ...Object.keys(actor.system.occulte || {}).filter(k => k !== "rituel" && k !== "mystere" && k !== "artefact" && k !== "nom")
        ];
        
        const options = competences.map(c => {
            let label = CONFIG.engrenages.config.competencesPhysiques[c] || 
                        CONFIG.engrenages.config.competencesMentales[c] || 
                        CONFIG.engrenages.config.competencesSociales[c] || c;
            
            if (typeof label === "string" && label.startsWith("ENGRENAGES.")) {
                label = game.i18n.localize(label);
            }
            
            return `<option value="${c}">${label}</option>`;
        }).join("");
        
        const sign = isBonus ? "+" : "-";
        const value = trait.system.value;
        const title = isBonus ? 
            game.i18n.format("ENGRENAGES.Trait.ApplyBonusTitle", {name: trait.name, value: value}) : 
            game.i18n.format("ENGRENAGES.Trait.ApplyMalusTitle", {name: trait.name, value: value});
        
        const content = `
            <form>
                <div class="form-group">
                    <label>${game.i18n.localize("ENGRENAGES.Competence.Select")}</label>
                    <select name="competence">
                        ${options}
                    </select>
                </div>
                <div class="form-group">
                    <label>${game.i18n.localize("ENGRENAGES.Trait.Modifier")}</label>
                    <div class="trait-modifier">
                        <span>${sign}${value}</span>
                    </div>
                </div>
            </form>
        `;
        
        new Dialog({
            title,
            content,
            buttons: {
                roll: {
                    icon: '<i class="fas fa-dice"></i>',
                    label: game.i18n.localize("ENGRENAGES.Roll"),
                    callback: async (html) => {
                        const competence = html.find("[name=competence]").val();
                        if (!competence) return;
                        
                        // Déterminer la catégorie de la compétence
                        let category = "";
                        if (actor.system.physique[competence]) category = "physique";
                        else if (actor.system.mental[competence]) category = "mental";
                        else if (actor.system.social[competence]) category = "social";
                        else if (actor.system.occulte[competence]) category = "occulte";
                        
                        if (!category) return;
                        
                        // Préparer les données pour le jet
                        const competenceData = actor.system[category][competence];
                        const label = CONFIG.engrenages.config[`competences${category.charAt(0).toUpperCase() + category.slice(1)}s`][competence] || competence;
                        
                        // Détermination du bonus basé sur la formation
                        const formationBonus = competenceData.trained ? 2 : 0;
                        const valeur = parseInt(competenceData.value) || 0;
                        const total = valeur + formationBonus;
                        
                        // Ajouter le bonus ou malus du trait
                        const traitModifier = isBonus ? value : -value;
                        
                        // Lancer de dés
                        await EngrenagesRoll.rollCompetence(actor, {
                            category,
                            competence,
                            label: typeof label === "string" && label.startsWith("ENGRENAGES.") ? game.i18n.localize(label) : label,
                            value: total,
                            bonus: traitModifier,
                            flavor: `${trait.name} (${isBonus ? "Bonus" : "Malus"}: ${sign}${value})`
                        });
                    }
                },
                cancel: {
                    icon: '<i class="fas fa-times"></i>',
                    label: game.i18n.localize("Cancel")
                }
            },
            default: "roll"
        }).render(true);
    }
}
