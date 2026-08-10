# Base de données

> **Projet :** MarketElectro
>
> **Version :** 1.0.0
>
> **Dernière mise à jour :** 26 juillet 2026
>
> **Auteur :** Josué Amegadjin

---

# Objectif

Ce document décrit la structure de la base de données MongoDB utilisée par le backend de **MarketElectro**.

Le projet utilise **MongoDB Atlas** comme système de gestion de base de données et **Mongoose** comme ODM (Object Data Modeling) pour interagir avec les collections.

Les données sont réparties dans plusieurs collections représentant les principales entités de l'application.

---

# Vue d'ensemble

Le backend s'appuie sur les collections suivantes :

- User
- Product
- Cart
- Order

Ces collections sont liées entre elles afin de gérer les utilisateurs, les produits, les paniers et les commandes.

---

# Schéma général des relations

```text
                User
                  │
        ┌─────────┴─────────┐
        │                   │
        ▼                   ▼
      Cart               Order
        │                   │
        └─────────┬─────────┘
                  ▼
               Product
```

Description :

- un utilisateur possède un panier ;
- un utilisateur peut passer plusieurs commandes ;
- un panier contient plusieurs produits ;
- une commande contient plusieurs produits.

---

# Collection User

Cette collection stocke les informations des utilisateurs.

## Champs

| Champ | Type | Description |
|--------|------|-------------|
| _id | ObjectId | Identifiant unique |
| fullName | String | Nom complet |
| email | String | Adresse email (unique) |
| password | String | Mot de passe chiffré avec bcrypt |
| role | String | customer ou admin |
| createdAt | Date | Date de création |
| updatedAt | Date | Dernière modification |

## Exemple

```json
{
    "_id": "...",
    "fullName": "Josué Amegadjin",
    "email": "josue@example.com",
    "password": "$2b$10$...",
    "role": "customer",
    "createdAt": "...",
    "updatedAt": "..."
}
```

---

# Collection Product

Cette collection contient le catalogue des produits.

## Champs

| Champ | Type | Description |
|--------|------|-------------|
| _id | ObjectId | Identifiant du produit |
| name | String | Nom |
| description | String | Description |
| price | Number | Prix |
| image | String | Image |
| category | String | Catégorie |
| stock | Number | Quantité disponible |
| isActive | Boolean | Produit actif ou non |
| createdAt | Date | Création |
| updatedAt | Date | Modification |

## Exemple

```json
{
    "_id": "...",
    "name": "MacBook Pro M4",
    "description": "Ordinateur portable Apple",
    "price": 2300,
    "image": "/assets/macbook.jpg",
    "category": "Ordinateurs",
    "stock": 20,
    "isActive": true
}
```

---

# Collection Cart

Chaque utilisateur possède un panier.

Le panier contient une liste de produits accompagnés de leur quantité.

## Champs

| Champ | Type | Description |
|--------|------|-------------|
| _id | ObjectId | Identifiant |
| user | ObjectId | Référence vers User |
| items | Array | Produits du panier |
| createdAt | Date | Création |
| updatedAt | Date | Modification |

Chaque élément de `items` possède la structure suivante :

| Champ | Type | Description |
|--------|------|-------------|
| product | ObjectId | Référence vers Product |
| quantity | Number | Quantité |

## Exemple

```json
{
    "_id": "...",
    "user": "...",
    "items": [
        {
            "product": "...",
            "quantity": 3
        }
    ]
}
```

---

# Collection Order

Une commande est créée à partir du panier.

Elle conserve une copie des produits commandés afin que l'historique reste valide même si les produits évoluent par la suite.

## Champs

| Champ | Type | Description |
|--------|------|-------------|
| _id | ObjectId | Identifiant |
| user | ObjectId | Référence vers User |
| items | Array | Produits commandés |
| totalAmount | Number | Montant total |
| status | String | Statut de la commande |
| createdAt | Date | Date de création |
| updatedAt | Date | Dernière modification |

Chaque élément de `items` contient :

| Champ | Type | Description |
|--------|------|-------------|
| product | ObjectId | Produit commandé |
| quantity | Number | Quantité achetée |
| price | Number | Prix unitaire au moment de la commande |

## Exemple

```json
{
    "_id": "...",
    "user": "...",
    "items": [
        {
            "product": "...",
            "quantity": 2,
            "price": 2300
        }
    ],
    "totalAmount": 4600,
    "status": "pending"
}
```

---

# Relations entre les collections

## User → Cart

Relation :

```
1 utilisateur → 1 panier
```

Chaque utilisateur possède un panier créé automatiquement lors de son inscription.

---

## User → Order

Relation :

```
1 utilisateur → plusieurs commandes
```

L'historique des commandes est conservé.

---

## Cart → Product

Relation :

```
1 panier → plusieurs produits
```

Chaque produit est associé à une quantité.

---

## Order → Product

Relation :

```
1 commande → plusieurs produits
```

Les produits sont enregistrés avec leur quantité et leur prix au moment de la commande.

---

# Utilisation des références MongoDB

Les relations entre les collections sont réalisées à l'aide des `ObjectId` de MongoDB.

Exemple :

```ts
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
}
```

Grâce à ces références, Mongoose peut utiliser `populate()` afin de récupérer automatiquement les informations liées.

Exemple :

```ts
await Cart.findOne({ user: userId }).populate("items.product");
```

---

# Gestion des dates

Toutes les collections utilisent l'option :

```ts
timestamps: true
```

Mongoose ajoute automatiquement :

- createdAt
- updatedAt

sans qu'il soit nécessaire de les gérer manuellement.

---

# Bonnes pratiques

Le projet applique les bonnes pratiques suivantes :

- utilisation d'un identifiant MongoDB (`ObjectId`) ;
- séparation des données dans plusieurs collections ;
- utilisation de références plutôt que de duplication inutile ;
- mots de passe chiffrés avec bcrypt ;
- gestion automatique des dates avec Mongoose ;
- validation des données via les schémas Mongoose.

---

# Étape suivante

Le document suivant décrit le système d'authentification, l'utilisation des JSON Web Tokens (JWT), les rôles des utilisateurs ainsi que les routes sécurisées de l'application.

➡️ **05-Authentication.md**