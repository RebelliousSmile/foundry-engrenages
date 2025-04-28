# Nomenclature du Système Engrenages

## Principes généraux

Pour maintenir la cohérence et la lisibilité du code dans le système Engrenages, nous adoptons les principes de nomenclature suivants :

1. **Langue unique** : Tout le code (variables, fonctions, classes, commentaires) est écrit en français pour maintenir la cohérence avec le thème du jeu.
2. **Conventions de nommage** : Nous suivons les conventions de nommage standard pour JavaScript/HTML/CSS, adaptées au français.

## Conventions spécifiques

### JavaScript

- **Classes** : PascalCase en français
  - Exemple : `ClassePersonnage`, `FeuillePersonnage`

- **Méthodes et fonctions** : camelCase en français
  - Exemple : `lancerDes()`, `calculerTotal()`

- **Variables** : camelCase en français
  - Exemple : `valeurCompetence`, `niveauJauge`

- **Constantes** : SNAKE_CASE_MAJUSCULE en français
  - Exemple : `TYPES_ACTEURS`, `CONFIG_SYSTEME`

- **Événements** : préfixés par `_on` suivi d'un nom en camelCase en français
  - Exemple : `_onChangementValeur()`, `_onClicCompetence()`

### HTML/Templates

- **IDs** : kebab-case en français
  - Exemple : `feuille-personnage`, `section-competences`

- **Classes CSS** : kebab-case en français
  - Exemple : `competence-valeur`, `jauge-physique`

- **Attributs data-** : kebab-case en français
  - Exemple : `data-categorie`, `data-valeur`

### CSS

- **Classes et IDs** : kebab-case en français, cohérent avec le HTML
  - Exemple : `.competence-valeur`, `#jauge-physique`

- **Variables CSS** : kebab-case en français, préfixées par `--engrenages`
  - Exemple : `--engrenages-couleur-primaire`, `--engrenages-espacement`

## Structure des données

- **Modèles de données** : camelCase en français
  - Exemple : `donnéesPersonnage`, `donnéesCompétence`

- **Clés d'objet** : camelCase en français
  - Exemple : `{nomCompétence: "Athlétisme", valeur: 3}`

## Traductions

- **Clés de traduction** : Utiliser le format hiérarchique avec des points
  - Exemple : `ENGRENAGES.Competence.Niveau.Novice`

## Exceptions

- **API Foundry VTT** : Respecter la nomenclature originale de l'API Foundry VTT
  - Exemple : `getData()`, `activateListeners()`

- **Bibliothèques externes** : Respecter la nomenclature originale des bibliothèques utilisées
