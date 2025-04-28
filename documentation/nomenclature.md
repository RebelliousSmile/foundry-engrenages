# Nomenclature du Système Engrenages

## Principes généraux

Pour maintenir la cohérence et la lisibilité du code dans le système Engrenages, nous adoptons les principes de nomenclature suivants :

1. **Langue principale** : Le code spécifique au système Engrenages (variables, fonctions, classes, commentaires) est écrit en français pour maintenir la cohérence avec le thème du jeu.
2. **Termes techniques de l'API** : Les termes techniques liés à l'API Foundry VTT doivent rester en anglais pour assurer la compatibilité et faciliter la maintenance.
3. **Conventions de nommage** : Nous suivons les conventions de nommage standard pour JavaScript/HTML/CSS, adaptées au français ou à l'anglais selon le contexte.
4. **Cohérence** : Les noms utilisés doivent être cohérents entre les différentes parties du code (JavaScript, HTML, CSS).

## Conventions spécifiques

### JavaScript

- **Classes** : PascalCase en français
  - Exemple : `FeuillePersonnage`, `GestionnaireCompetences`

- **Méthodes et fonctions** : camelCase en français
  - Exemple : `calculerTotal()`, `obtenirCouleurNiveauCompetence()`

- **Variables** : camelCase en français
  - Exemple : `valeur`, `couleur`, `elementCompetence`, `champInput`

- **Paramètres de fonction** : camelCase en français
  - Exemple : `function(evenement)`, `function(donnees)`

- **Constantes et configurations** : camelCase en français pour les objets de configuration
  - Exemple : `niveauxCompetence`, `competencesPhysiques`

- **Événements** : préfixés par `_on` ou `_sur` suivi d'un nom en camelCase en français
  - Exemple : `_onCompetenceValueSelect()`, `_surChangementValeur()`

- **Méthodes utilitaires** : préfixées par un verbe d'action en camelCase
  - Exemple : `_appliquerCouleursNiveauxCompetence()`, `_calculerBonus()`

### HTML/Templates

- **IDs** : kebab-case en français
  - Exemple : `feuille-personnage`, `section-competences`

- **Classes CSS** : kebab-case en français
  - Exemple : `element-competence`, `valeur-competence`, `affichage-niveau-competence`

- **Attributs data-** : kebab-case en français
  - Exemple : `data-color`, `data-valeur`, `data-categorie`

### CSS

- **Classes et IDs** : kebab-case en français, cohérent avec le HTML
  - Exemple : `.element-competence`, `.nom-competence`, `.formation-competence`

- **Variables CSS** : kebab-case en français, préfixées par `--engrenages`
  - Exemple : `--engrenages-primary`, `--engrenages-secondary`

## Exemples concrets de nomenclature

### Classes CSS renommées

| Ancien nom (Anglais/Mixte) | Nouveau nom (Français) |
|----------------------------|------------------------|
| `.competence-item`         | `.element-competence`  |
| `.competence-name`         | `.nom-competence`      |
| `.competence-trained`      | `.formation-competence`|
| `.competence-value`        | `.valeur-competence`   |
| `.competence-level-selector` | `.selecteur-niveau-competence` |
| `.competence-level-display`  | `.affichage-niveau-competence` |
| `.competence-level-name`     | `.nom-niveau-competence` |
| `.competence-level-description` | `.description-niveau-competence` |
| `.competence-value-controls`   | `.controles-valeur-competence` |
| `.competence-value-option`     | `.option-valeur-competence` |

### Fonctions et méthodes renommées

| Ancien nom (Anglais/Mixte) | Nouveau nom (Français) |
|----------------------------|------------------------|
| `getCompetenceLevelColor` | `obtenirCouleurNiveauCompetence` |
| `getCompetenceLevelName`  | `obtenirNomNiveauCompetence` |
| `getCompetenceLevelDescription` | `obtenirDescriptionNiveauCompetence` |
| `getCompetenceLevelRenown` | `obtenirRenommeeNiveauCompetence` |
| `getCompetenceLevelPair`  | `obtenirPaireValeursNiveauCompetence` |

### Variables renommées

| Ancien nom (Anglais/Mixte) | Nouveau nom (Français) |
|----------------------------|------------------------|
| `event`                   | `evenement`            |
| `element`                 | `element`              |
| `value`                   | `valeur`               |
| `competenceValue`         | `conteneurValeur`      |
| `inputElement`            | `champInput`           |
| `options`                 | `options`              |
| `levelDisplay`            | `affichageNiveau`      |
| `color`                   | `couleur`              |
| `name`                    | `nom`                  |
| `description`             | `description`          |
| `competenceItem`          | `elementCompetence`    |
| `inputName`               | `nomInput`             |
| `parts`                   | `parties`              |
| `category`                | `categorie`            |
| `competenceName`          | `nomCompetence`        |
| `label`                   | `etiquette`            |
| `trained`                 | `formationBonus`       |

## Structure des données

- **Modèles de données** : camelCase en français
  - Exemple : `donneesPersonnage`, `donneesCompetence`

- **Clés d'objet** : camelCase en français
  - Exemple : `{nomCompetence: "Athlétisme", valeur: 3}`

- **Configuration** : camelCase en français
  - Exemple : `niveauxCompetence` (au lieu de `competenceLevels`)

## Traductions

- **Clés de traduction** : Utiliser le format hiérarchique avec des points
  - Exemple : `ENGRENAGES.CompetenceLevel.Novice`, `ENGRENAGES.CompetenceDescription.Average`

## Exceptions et termes techniques

### Termes de l'API Foundry VTT (toujours en anglais)

- **Méthodes de l'API** : Toujours conserver les noms originaux en anglais
  - Exemple : `getData()`, `activateListeners()`, `_onSubmit()`, `render()`, `close()`

- **Hooks et événements** : Toujours utiliser les noms originaux en anglais
  - Exemple : `Hooks.on("renderActorSheet", ...)`, `Hooks.once("ready", ...)`

- **Propriétés des documents** : Conserver les noms originaux en anglais
  - Exemple : `actor.items`, `item.type`, `token.actor`, `game.actors`

- **Paramètres des méthodes de l'API** : Conserver les noms originaux en anglais
  - Exemple : `function(html, data)`, `function(event, html)`

### Termes mixtes (contexte spécifique)

- **Méthodes d'événements internes** : Conserver le préfixe `_on` pour les méthodes d'événements
  - Exemple : `_onRollCompetence()` (et non `_surLancerCompetence()`)

- **Bibliothèques externes** : Respecter la nomenclature originale des bibliothèques utilisées

### Exemples concrets de termes à conserver en anglais

| Catégorie | Exemples |
|------------|----------|
| Méthodes de l'API | `getData()`, `activateListeners()`, `_onSubmit()`, `render()` |
| Hooks | `Hooks.on()`, `Hooks.once()`, `"renderActorSheet"`, `"ready"` |
| Documents | `Actor`, `Item`, `Token`, `Scene`, `Combat` |
| Propriétés | `actor.items`, `item.type`, `token.actor`, `game.actors` |
| Événements | `"click"`, `"change"`, `"submit"`, `"dragstart"` |
