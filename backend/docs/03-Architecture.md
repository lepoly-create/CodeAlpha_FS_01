# Architecture du projet

> **Projet :** MarketElectro
>
> **Version :** 1.0.0
>
> **Dernière mise à jour :** 26 juillet 2026
>
> **Auteur :** Josué Amegadjin

---

# Objectif

Ce document décrit l'architecture logicielle du backend de **MarketElectro**.

Le projet est développé selon une architecture en couches (*Layered Architecture*), largement utilisée dans les applications Node.js professionnelles. Cette approche permet de séparer les responsabilités de chaque composant afin de faciliter la maintenance, les tests et les évolutions futures.

---

# Vue d'ensemble

L'architecture générale du backend est la suivante :

```text
                 Client (React)
                       │
                       ▼
                 Express Routes
                       │
                       ▼
                 Controllers
                       │
                       ▼
                  Services
                       │
                       ▼
             Mongoose Models
                       │
                       ▼
               MongoDB Atlas
```

Chaque couche possède une responsabilité bien définie.

---

# Organisation des dossiers

```text
backend/
│
├── docs/
│
├── scripts/
│
├── src/
│   │
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── package.json
└── tsconfig.json
```

---

# Description des dossiers

## config/

Contient les fichiers de configuration du projet.

Exemple :

- connexion à MongoDB Atlas ;
- configuration des variables d'environnement.

Exemple :

```text
config/
│
└── database.ts
```

---

## controllers/

Les contrôleurs reçoivent les requêtes HTTP provenant des routes.

Leur rôle est de :

- récupérer les données envoyées par le client ;
- appeler le service correspondant ;
- retourner une réponse HTTP.

Ils ne contiennent aucune logique métier.

Exemple :

```text
controllers/

auth.controller.ts

product.controller.ts

cart.controller.ts

order.controller.ts
```

---

## services/

Les services contiennent toute la logique métier de l'application.

C'est dans cette couche que sont réalisées les opérations comme :

- authentification ;
- création d'un produit ;
- ajout au panier ;
- création d'une commande ;
- calcul du montant total ;
- mise à jour du stock.

Cette séparation permet de conserver des contrôleurs simples et facilement testables.

---

## models/

Les modèles représentent les collections MongoDB.

Ils définissent :

- les champs ;
- les types ;
- les contraintes ;
- les relations entre collections.

Exemple :

```text
User

Product

Cart

Order
```

---

## routes/

Les routes définissent les endpoints de l'API.

Elles associent une URL à un contrôleur.

Exemple :

```text
POST /api/auth/login

GET /api/products

POST /api/cart

POST /api/orders
```

---

## middleware/

Les middlewares exécutent un traitement avant d'arriver au contrôleur.

Dans ce projet, ils permettent notamment :

- de vérifier les JWT ;
- d'identifier l'utilisateur connecté ;
- de contrôler les rôles (Admin / Customer).

---

## utils/

Contient les fonctions utilitaires réutilisables dans plusieurs modules.

Exemple :

```text
generateToken()

verifyToken()
```

---

## types/

Contient les extensions de types TypeScript.

Dans ce projet, ce dossier permet notamment d'ajouter la propriété :

```ts
req.user
```

à l'objet `Request` d'Express.

---

## scripts/

Contient les scripts exécutés indépendamment du serveur.

Exemple :

```text
create-admin.ts
```

Ce script crée automatiquement un administrateur dans la base de données.

---

## docs/

Contient toute la documentation technique du projet.

---

# Cycle de traitement d'une requête

Lorsqu'une requête est envoyée à l'API, elle traverse les différentes couches.

Exemple :

```text
POST /api/cart
        │
        ▼
cart.routes.ts
        │
        ▼
cart.controller.ts
        │
        ▼
cart.service.ts
        │
        ▼
Cart Model
        │
        ▼
MongoDB Atlas
```

La réponse emprunte ensuite le chemin inverse jusqu'au client.

---

# Principe de séparation des responsabilités

Chaque couche possède une responsabilité unique.

| Couche | Responsabilité |
|---------|----------------|
| Routes | Définir les endpoints de l'API |
| Controllers | Gérer les requêtes et les réponses HTTP |
| Services | Contenir toute la logique métier |
| Models | Représenter les collections MongoDB |
| Middleware | Exécuter les traitements avant les contrôleurs |
| Utils | Fournir des fonctions réutilisables |
| Config | Centraliser la configuration |
| Scripts | Automatiser certaines opérations |
| Docs | Documenter le projet |

Cette organisation améliore la lisibilité du code et facilite sa maintenance.

---

# Architecture des modules

Chaque fonctionnalité suit la même organisation.

Exemple pour le module Produit :

```text
Product

│

├── product.routes.ts

├── product.controller.ts

├── product.service.ts

└── Product.ts
```

Cette structure est également utilisée pour :

- Auth
- Cart
- Order

Elle garantit une cohérence dans l'ensemble du projet.

---

# Avantages de cette architecture

Cette architecture présente plusieurs avantages :

- séparation claire des responsabilités ;
- meilleure lisibilité du code ;
- facilité de maintenance ;
- réutilisation des services ;
- simplification des tests ;
- évolutivité du projet.

Elle correspond aux bonnes pratiques couramment utilisées dans les applications Express.js professionnelles.

---

# Étape suivante

Le document suivant décrit la structure de la base de données MongoDB ainsi que les relations entre les différentes collections.

➡️ **04-Database.md**