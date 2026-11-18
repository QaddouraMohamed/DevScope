# DevScope

**Trouvez les meilleurs développeurs grâce à leur code.**

DevScope est une application web destinée aux recruteurs tech. Elle récupère les profils et les dépôts publics depuis l'**API GitHub**, puis permet de gérer une **shortlist de candidats** enregistrée sur une API REST (**MockAPI**). Fini la recherche développeur par développeur et les notes dispersées dans des fichiers.

**Présentation du projet :** [Voir la présentation Canva](https://canva.link/air2ut184bp9oib)

---

## Fonctionnalités

### Analyse d'un profil

- Recherche d'un développeur par son nom d'utilisateur GitHub
- Validation du nom d'utilisateur avant l'envoi de la requête : lettres, chiffres et tirets, entre 1 et 39 caractères, sans tiret au début ni à la fin
- Carte de profil : photo, nom, login, bio, ville, date d'inscription, nombre de dépôts, d'abonnés et d'abonnements
- Texte par défaut affiché quand une information est manquante (valeur `null` renvoyée par GitHub)
- Lien vers le profil GitHub original

### Dépôts

- Tous les dépôts publics affichés sous forme de cartes : nom, description, langage, étoiles, forks et date de mise à jour

### Shortlist

- Ajout d'un développeur à la shortlist en un clic, enregistré sur MockAPI
- Protection contre les doublons : un même candidat ne peut pas être ajouté deux fois
- Page shortlist avec la liste des candidats et leur nombre total
- Pour chaque candidat : photo, nom, login, langage principal, date d'ajout, statut (À contacter, Entretien, Retenu, Refusé) et note en étoiles
- Modification et suppression d'un candidat

### États de l'interface

- Indicateur de chargement pendant chaque requête
- Message clair pour chaque cas d'erreur :
  - **404** : développeur introuvable
  - **403 / 429** : limite de requêtes GitHub atteinte
  - **Erreur réseau** : message avec un bouton « Réessayer »
  - **Shortlist vide**

---

## Pages

| Page      | Fichier                          | Rôle                                                                      |
| --------- | -------------------------------- | ------------------------------------------------------------------------- |
| Accueil   | `index.html`                     | Page d'accueil avec le message de présentation                            |
| Recherche | `pages/search.html`              | Champ « Nom d'utilisateur » et bouton « Analyser », avec message d'erreur |
| Profil    | `pages/profil.html?username=...` | Carte du profil, dépôts et bouton « Ajouter à la shortlist »              |
| Shortlist | `pages/shortlist.html`           | Liste des candidats enregistrés                                           |

La barre de navigation est identique sur toutes les pages.

---

## Technologies utilisées

- **HTML5**
- **Tailwind CSS** : approche mobile-first et responsive
- **JavaScript (modules ES6)** avec `import` / `export`
- **Fetch API** avec `async` / `await`, vérification de `response.ok` et `try` / `catch`
- **API REST GitHub** pour les profils et les dépôts
- **MockAPI** pour la persistance de la shortlist
- **Jira** pour la planification, **Git / GitHub** pour le versionnement

---

## Structure du projet

```
DevScope/
├── assets/
│   ├── image/
│   └── target/
├── css/
│   ├── all.css
│   └── style.css
├── js/
│   ├── api.js              # Appels API (GitHub + MockAPI)
│   ├── config.js           # Configuration (URL MockAPI), ignoré par Git
│   ├── search.js           # Point d'entrée de la page Recherche
│   ├── search-func.js      # Fonctions de la page Recherche
│   ├── profil.js           # Point d'entrée de la page Profil
│   ├── profil-func.js      # Fonctions de la page Profil
│   ├── shortlist.js        # Point d'entrée de la page Shortlist
│   └── shortlist-func.js   # Fonctions de la page Shortlist
├── pages/
│   ├── profil.html
│   ├── search.html
│   └── shortlist.html
├── .gitignore
├── index.html
└── README.md
```

---

## Utilisation des API

### GitHub

| Méthode | Endpoint                                        | Rôle                                 |
| ------- | ----------------------------------------------- | ------------------------------------ |
| `GET`   | `https://api.github.com/users/{username}`       | Récupérer le profil d'un utilisateur |
| `GET`   | `https://api.github.com/users/{username}/repos` | Récupérer ses dépôts publics         |

### MockAPI

| Méthode  | Endpoint           | Rôle                  |
| -------- | ------------------ | --------------------- |
| `GET`    | `/candidates`      | Charger la shortlist  |
| `POST`   | `/candidates`      | Ajouter un candidat   |
| `PUT`    | `/candidates/{id}` | Modifier un candidat  |
| `DELETE` | `/candidates/{id}` | Supprimer un candidat |

Les requêtes `POST` et `PUT` envoient les données avec `JSON.stringify` et l'en-tête `Content-Type: application/json`.

---

## Principes de code

- **Un fichier pour les appels API** (`api.js`) et **un fichier par page**, reliés par des modules ES6
- **Affichage sécurisé** : les données des API sont insérées avec `createElement` et `textContent`, jamais avec `innerHTML`
- **Interface dynamique** : tout le contenu est généré à partir des données
- **Validation d'abord** : le nom d'utilisateur est vérifié avant la requête
- **Accessibilité** : attribut `alt` sur les images, `label` sur les champs, navigation au clavier

---

## Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/QaddouraMohamed/DevScope.git
cd DevScope
git checkout v1.0

# 2. Lancer un serveur local (les modules ES6 ne fonctionnent pas avec file://)
npx serve
# ou utiliser l'extension « Live Server » de VS Code
```

### Configuration de MockAPI

Le fichier `js/config.js` est ignoré par Git (voir `.gitignore`). Pour utiliser le projet :

1. Créer un projet sur [MockAPI](https://mockapi.io/)
2. Ajouter une ressource `candidates`
3. Créer le fichier `js/config.js` et y renseigner l'URL de base de votre projet MockAPI

---

## Ce que j'ai appris

### Techniques

- **Communiquer avec une API** : utiliser `fetch` avec `async` / `await`, vérifier `response.ok` avant d'exploiter les données et protéger chaque appel avec `try` / `catch`
- **Les méthodes HTTP et les codes de statut** : `GET`, `POST`, `PUT`, `DELETE`, ainsi que la signification des codes `200`, `201`, `404`, `403` et `429`
- **Gérer des erreurs différentes** : afficher un message adapté pour un utilisateur introuvable, une limite de requêtes atteinte ou une panne réseau
- **Envoyer des données en JSON** avec `JSON.stringify` et l'en-tête `Content-Type`
- **Organiser le code en modules ES6** avec `import` / `export`, en séparant les appels API, la logique et l'affichage de chaque page
- **Manipuler le DOM de façon sécurisée** : la différence entre `textContent` et `innerHTML`, et pourquoi éviter `innerHTML` avec des données externes (risque d'injection)
- **Transformer des données** avec `map`, `filter` et `sort`
- **Gérer les valeurs manquantes** (`null`) pour ne jamais afficher une information vide
- **Valider une saisie** avant d'envoyer une requête
- **Éviter les doublons** en vérifiant la shortlist avant chaque ajout

### Intégration et qualité

- **Tailwind CSS** et l'approche **mobile-first** pour un site responsive
- **L'accessibilité** : textes alternatifs, labels sur les champs, navigation au clavier
- **La validation HTML** avec le service du W3C

### Organisation

- **Planifier avec Jira** : découper le projet en epics et en tickets
- **Versionner avec Git et GitHub** : commits clairs et réguliers, un avancement poussé chaque soir
- **Protéger la configuration** avec un fichier ignoré par Git

---

## Auteur

**Mohamed Qaddoura**
GitHub : [@QaddouraMohamed](https://github.com/QaddouraMohamed)

Projet réalisé dans le cadre d'une formation front-end pour la startup fictive _DevScope_.
