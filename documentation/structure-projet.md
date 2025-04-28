# Structure du Projet Engrenages pour FoundryVTT

## Vue d'ensemble
Engrenages est un système de jeu générique avec de nombreuses règles optionnelles. Cette structure de projet vise à créer une implémentation modulaire, configurable et facile à maintenir pour FoundryVTT.

## Architecture du Projet
L'architecture s'inspire à la fois du système pbta (pour la configurabilité) et de city-of-mist (pour la modularité).

```
engrenages/
├── module/                     # Code source principal
│   ├── engrenages.js           # Point d'entrée principal
│   ├── config.js               # Configuration globale du système
│   ├── settings.js             # Paramètres et options du système
│   ├── migration.js            # Système de migration des données
│   ├── models/                 # Modèles de données
│   │   ├── actor-types.js      # Types d'acteurs
│   │   └── item-types.js       # Types d'objets
│   ├── actors/                 # Classes d'acteurs
│   │   ├── actor.js            # Classe de base des acteurs
│   │   └── sheets/            # Feuilles d'acteurs
│   │       ├── character.js    # Feuille de personnage
│   │       ├── npc.js          # Feuille de PNJ
│   │       ├── vehicle.js      # Feuille de véhicule
│   │       └── organization.js # Feuille d'organisation
│   ├── items/                  # Classes d'objets
│   │   ├── item.js             # Classe de base des objets
│   │   └── sheets/            # Feuilles d'objets
│   │       ├── equipment.js    # Équipement
│   │       ├── skill.js        # Compétences
│   │       └── trait.js        # Traits
│   ├── dice/                   # Système de dés
│   │   └── roll.js             # Gestion des lancers de dés
│   ├── optional/               # Modules de règles optionnelles
│   │   ├── config.js           # Configuration du système
│   │   ├── combat.js           # Règles de combat avancées
│   │   └── crafting.js         # Système d'artisanat
│   └── utils/                  # Utilitaires
│       ├── helpers.js          # Fonctions d'aide
│       ├── templates.js        # Gestion des templates
│       └── hooks.js            # Hooks du système
├── templates/                  # Templates Handlebars
│   ├── actors/                 # Templates d'acteurs
│   ├── items/                  # Templates d'objets
│   └── dialog/                 # Templates de dialogues
├── lang/                       # Fichiers de traduction
│   ├── en.json                 # Anglais
│   └── fr.json                 # Français
├── styles/                     # Feuilles de style CSS
│   ├── engrenages.css          # Style principal
│   └── optional/               # Styles pour modules optionnels
├── assets/                     # Ressources graphiques
│   ├── icons/                  # Icônes
│   └── images/                 # Images
├── packs/                      # Compendiums
├── system.json                 # Métadonnées du système
├── template.json               # Structure des données
└── documentation/              # Documentation
    ├── structure-projet.md     # Ce document
    ├── guide-developpement.md  # Guide pour les développeurs
    └── manuel-utilisateur.md   # Manuel pour les utilisateurs
```

## Composants Principaux

### 1. Système de Configuration

- **settings.js** : Gestion des paramètres du système
- Interface utilisateur pour activer/désactiver les règles optionnelles
- Stockage des configurations dans les paramètres de jeu

### 2. Système de Modèles de Données

- **models/actor-types.js** et **models/item-types.js** : Définition des structures de données
- Utilisation des data models de Foundry V10+
- Validation des données

### 3. Système d'Acteurs et d'Objets

- Classes de base extensibles
- Feuilles de personnage adaptatives selon les options activées
- Méthodes pour gérer les règles optionnelles

### 4. Modules Optionnels
- Chaque module dans **optional/** représente un ensemble de règles optionnelles
- Système de hooks pour s'intégrer au système de base
- Configuration indépendante pour chaque module

### 5. Système de Dés
- Gestion des lancers de dés configurables
- Support pour différents types de dés selon les règles activées
- Affichage des résultats dans le chat

### 6. Système de Migration
- Mise à jour des données lors des changements de version
- Gestion des modifications de structure de données
- Compatibilité ascendante

## Flux de Développement

### Phase 1: Structure de Base
1. Créer la structure de fichiers
2. Implémenter le système de configuration
3. Développer les classes de base pour acteurs et objets

### Phase 2: Fonctionnalités Essentielles

1. Implémenter le système de dés de base
2. Créer les feuilles de personnage et d'objets
3. Développer le système de migration

### Phase 3: Règles Optionnelles

1. Implémenter les modules optionnels
2. Créer les interfaces pour configurer ces modules
3. Assurer l'intégration avec le système de base

### Phase 4: Finalisation

1. Créer les compendiums
2. Finaliser les traductions
3. Optimiser les performances
4. Documenter le système

## Types d'Acteurs et Limites de Valeurs

Le système Engrenages comprend quatre types d'acteurs, chacun avec ses propres champs et limites :

### 1. Personnages Joueurs (character)

- Compétences : 0 à 10
- Spécialisations : 0 à 10 (liées aux compétences)
- Traits : 0 à 3
- Jauges : 0 à 10

### 2. Personnages Non Joueurs (npc)

- Compétences : 0 à 10
- Spécialisations : 0 à 10
- Traits : 0 à 3
- Jauges : maximum modifiable selon la menace du PNJ

### 3. Véhicules (vehicle)

- Vitesse : 0 à 10
- Maniabilité : 0 à 10
- Robustesse : 0 à 10
- État : 0 à 10

### 4. Organisations (organization)

- Influence (politique, économique, militaire, sociale) : 0 à 10
- Ressources (finances, personnel, équipement) : 0 à 10

### Équipement

- Impact des armes : 1 à 5

## Principes de Conception

- **Modularité** : Chaque composant doit être indépendant
- **Configurabilité** : Tout doit être adaptable aux préférences du MJ
- **Extensibilité** : Le code doit être facile à étendre
- **Maintenabilité** : Documentation claire et code lisible
