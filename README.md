#  Dashboard de Gestion de Tâches

Un application web moderne et intuitive pour gérer vos tâches et projets avec une interface responsive et réactive.

##  Fonctionnalités

###  Gestion des Tâches
-  Créer, modifier et supprimer des tâches
-  Marquer les tâches comme terminées ou en cours
-  Associer chaque tâche à un projet
-  Filtrer les tâches (Toutes, En cours, Terminées)
-  Animation fluide lors de l'ajout de tâches

###  Gestion des Projets
-  Créer des nouveaux projets
-  Supprimer des projets (supprime aussi les tâches associées)
-  Sélectionner un projet pour filtrer les tâches correspondantes
-  Vue d'ensemble de tous les projets dans la barre latérale

###  Statistiques
-  Comptage global des tâches (Total, Terminées, En cours)
-  Statistiques détaillées par projet
-  Affichage en temps réel des métriques

###  Fonctionnalités Avancées
-  **Drag & Drop** : Réorganiser les tâches par glisser-déposer
-  **Persistance** : Sauvegarde automatique dans le localStorage
-  **Raccourcis clavier** : Appuyez sur Entrée pour ajouter une tâche/projet
-  **Responsive** : Adapté à tous les appareils

##  Technologies

- **HTML5** : Structure sémantique
- **CSS3 (Tailwind CSS)** : Styling moderne et responsive
- **JavaScript Vanilla** : Logique sans dépendances externes
- **LocalStorage API** : Persistance des données

##  Structure du Projet

```
codec/
├── index.html       # Structure HTML
├── script.js        # Logique JavaScript (optimisée)
└── README.md        # Documentation
```

##  Installation et Utilisation

### Prérequis
- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Pas de serveur requis !

### Démarrage
1. Clonez ou téléchargez le projet
2. Ouvrez `index.html` dans votre navigateur
3. Commencez à gérer vos tâches !

##  Guide d'Utilisation

### Créer une Tâche
1. Assurez-vous d'être dans l'onglet **Tâches**
2. (Optionnel) Sélectionnez un projet dans le dropdown
3. Tapez le nom de la tâche dans le champ
4. Cliquez sur **Ajouter** ou appuyez sur **Entrée**

### Créer un Projet
1. Allez dans l'onglet **Tâches**
2. Tapez le nom du projet dans le champ "Nom du projet..."
3. Cliquez sur **Ajouter projet** ou appuyez sur **Entrée**

### Marquer une Tâche comme Terminée
- Cliquez sur le bouton **Done** à côté de la tâche
- Le texte apparaîtra barré
- Cliquez sur **Undo** pour réactiver la tâche

### Supprimer une Tâche
- Cliquez sur le bouton **Supprimer** rouge à côté de la tâche

### Filtrer les Tâches
Utilisez les boutons en haut de la liste :
- **Toutes** : Affiche toutes les tâches
- **En cours** : Affiche uniquement les tâches actives
- **Terminées** : Affiche uniquement les tâches terminées

### Réorganiser les Tâches (Drag & Drop)
- Cliquez sur une tâche et maintenez
- Glissez-la à la position souhaitée
- Relâchez pour placer la tâche

### Consulter les Statistiques
1. Cliquez sur l'onglet **Statistiques**
2. Visualisez les métriques globales et par projet

##  Persistance des Données

Toutes vos tâches et projets sont automatiquement sauvegardés dans le **localStorage** de votre navigateur. Vos données persisteront même après fermeture de l'application.

##  Optimisations Réalisées

### Code
-  Centralisation des sélecteurs DOM dans l'objet `DOM`
-  Extraction des fonctions répétitives
-  Suppression des appels à `saveData()` répétés (utilisation de `Storage.save()`)
-  Meilleure séparation des responsabilités
-  Noms de variables plus explicites
-  Structure modulaire avec sections commentées

### Performance
-  Réduction des manipulations DOM
-  Utilisation d'event delegation où approprié
-  Caching des références DOM
-  Optimisation du drag & drop

### Maintenabilité
-  Code plus lisible et documenté
-  Fonctions avec responsabilités uniques
-  Support du clavier (Entrée pour valider)
-  Gestion d'erreurs cohérente

##  Personnalisation

### Couleurs
Modifiez les classes Tailwind CSS dans `index.html` :
- `bg-blue-600` : Couleur de la sidebar
- `bg-purple-600` : Couleur des projets
- `bg-green-500` : Couleur du bouton "Done"
- `bg-red-500` : Couleur des boutons "Supprimer"

### Polices
Changez la police dans la balise `<body>` en modifiant `font-sans`

## Dépannage

### Les tâches ne se sauvegardent pas
- Vérifiez que votre navigateur autorise le localStorage
- Assurez-vous que le stockage n'est pas désactivé

### Les tâches disparaissent après actualisation
- Le localStorage peut être effacé si le cache du navigateur est vidé
- Les données personnelles/mode privé ne persistent pas

## Notes de Développement

- **Compatibilité** : ES6 moderne, testé sur tous les navigateurs récents
- **Dépendances** : Aucune ! Pure JavaScript vanilla
- **Licence** : Libre d'utilisation

## Améliorations Futures Potentielles

- [ ] Export/Import des tâches (CSV, JSON)
- [ ] Dates limites pour les tâches
- [ ] Priorités des tâches
- [ ] Catégories personnalisées
- [ ] Mode sombre
- [ ] Synchronisation cloud
- [ ] Notifications pour les tâches

---

**Créé avec ❤️ par Nathan Herman**

Profitez de votre gestionnaire de tâches ! 
