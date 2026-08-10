# Gestion des produits

> **Projet :** MarketElectro
>
> **Version :** 1.0.0
>
> **Dernière mise à jour :** 26 juillet 2026
>
> **Auteur :** Josué Amegadjin

---

# Objectif

Ce document décrit le fonctionnement du module **Produits** de MarketElectro.

Le module permet :

- de consulter le catalogue des produits ;
- d'afficher les informations détaillées d'un produit ;
- de créer un nouveau produit ;
- de modifier un produit existant ;
- de supprimer un produit.

Les opérations de création, de modification et de suppression sont réservées aux administrateurs.

---

# Fonctionnement général

Le cycle de vie d'un produit est le suivant :

```text
Administrateur
        │
        ▼
Création du produit
        │
        ▼
Enregistrement dans MongoDB
        │
        ▼
Consultation par les clients
        │
        ▼
Ajout au panier
        │
        ▼
Commande
        │
        ▼
Mise à jour automatique du stock
```

---

# Structure d'un produit

Chaque produit possède les informations suivantes :

| Champ | Type | Description |
|--------|------|-------------|
| _id | ObjectId | Identifiant unique |
| name | String | Nom du produit |
| description | String | Description |
| price | Number | Prix |
| image | String | Chemin ou URL de l'image |
| category | String | Catégorie |
| stock | Number | Quantité disponible |
| isActive | Boolean | Produit actif ou non |
| createdAt | Date | Date de création |
| updatedAt | Date | Dernière modification |

---

# Routes disponibles

| Méthode | Endpoint | Authentification | Rôle |
|----------|----------|------------------|------|
| GET | /api/products | Non | Tous |
| GET | /api/products/:id | Non | Tous |
| POST | /api/products | Oui | Admin |
| PUT | /api/products/:id | Oui | Admin |
| DELETE | /api/products/:id | Oui | Admin |

---

# Consulter tous les produits

## Endpoint

```http
GET /api/products
```

### Description

Retourne la liste des produits disponibles.

### Authentification

Aucune.

### Réponse

```json
{
    "success": true,
    "count": 2,
    "data": [
        {
            "_id": "...",
            "name": "MacBook Pro M4",
            "price": 2300,
            "stock": 13
        }
    ]
}
```

---

# Consulter un produit

## Endpoint

```http
GET /api/products/:id
```

### Description

Retourne les informations d'un produit à partir de son identifiant.

### Paramètre

| Nom | Type |
|------|------|
| id | ObjectId |

### Réponse

```json
{
    "success": true,
    "data": {
        "_id": "...",
        "name": "MacBook Pro M4",
        "description": "Ordinateur portable Apple",
        "price": 2300,
        "stock": 13
    }
}
```

---

# Créer un produit

## Endpoint

```http
POST /api/products
```

### Authentification

JWT requis.

### Autorisation

Administrateur uniquement.

### Header

```http
Authorization: Bearer <JWT_TOKEN>
```

### Body

```json
{
    "name": "MacBook Pro M4",
    "description": "Ordinateur portable Apple",
    "price": 2300,
    "image": "/assets/macbook.jpg",
    "category": "Ordinateurs",
    "stock": 20
}
```

### Réponse

```json
{
    "success": true,
    "message": "Produit créé avec succès",
    "data": {
        "_id": "...",
        "name": "MacBook Pro M4"
    }
}
```

---

# Modifier un produit

## Endpoint

```http
PUT /api/products/:id
```

### Authentification

JWT requis.

### Autorisation

Administrateur uniquement.

### Description

Met à jour les informations d'un produit existant.

Les champs peuvent être modifiés selon les besoins.

---

# Supprimer un produit

## Endpoint

```http
DELETE /api/products/:id
```

### Authentification

JWT requis.

### Autorisation

Administrateur uniquement.

### Description

Supprime un produit de la base de données.

---

# Contrôle des accès

Le module Produits utilise les middlewares suivants :

```text
Client
   │
   ▼
authMiddleware
   │
   ▼
authorizeRoles("admin")
   │
   ▼
Controller
```

Seuls les administrateurs peuvent modifier le catalogue.

Les clients peuvent uniquement consulter les produits.

---

# Gestion du stock

Le stock est automatiquement décrémenté lorsqu'une commande est validée.

Exemple :

Avant la commande :

```text
MacBook Pro M4

Stock : 20
```

Commande :

```text
Quantité achetée : 7
```

Après validation :

```text
Stock : 13
```

Ce mécanisme garantit que le stock reflète toujours les quantités réellement disponibles.

---

# Validation des données

Avant l'enregistrement d'un produit, plusieurs informations sont vérifiées :

- nom du produit ;
- description ;
- prix ;
- catégorie ;
- quantité en stock.

Les données invalides entraînent le rejet de la requête.

---

# Codes de réponse

| Code HTTP | Signification |
|------------|---------------|
| 200 | Opération réussie |
| 201 | Produit créé |
| 400 | Données invalides |
| 401 | Utilisateur non authentifié |
| 403 | Accès interdit |
| 404 | Produit introuvable |
| 500 | Erreur interne |

---

# Bonnes pratiques appliquées

Le module Produits applique les principes suivants :

- séparation entre routes, contrôleurs, services et modèles ;
- protection des opérations sensibles par JWT ;
- contrôle des rôles administrateur/client ;
- gestion centralisée de la logique métier dans les services ;
- mise à jour automatique du stock lors de la validation d'une commande.

---

# Étape suivante

Le document suivant décrit le fonctionnement du panier d'achat, la gestion des articles, les quantités ainsi que les opérations disponibles pour les utilisateurs authentifiés.

➡️ **07-Cart.md**