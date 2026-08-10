# Gestion du panier

> **Projet :** MarketElectro
>
> **Version :** 1.0.0
>
> **Dernière mise à jour :** 26 juillet 2026
>
> **Auteur :** Josué Amegadjin

---

# Objectif

Ce document décrit le fonctionnement du module **Panier** de MarketElectro.

Le panier permet à un utilisateur authentifié de préparer sa commande avant sa validation.

Chaque utilisateur possède un panier personnel créé automatiquement lors de son inscription.

Le panier permet :

- d'ajouter un produit ;
- de modifier la quantité d'un produit ;
- de supprimer un produit ;
- de consulter son contenu.

---

# Fonctionnement général

Le fonctionnement du panier est illustré ci-dessous.

```text
Utilisateur
      │
      ▼
Connexion
      │
      ▼
Consultation des produits
      │
      ▼
Ajout au panier
      │
      ▼
Modification des quantités
      │
      ▼
Consultation du panier
      │
      ▼
Validation de la commande
```

---

# Création automatique du panier

Lorsqu'un nouvel utilisateur s'inscrit, un panier vide est automatiquement créé.

Schéma :

```text
POST /api/auth/register
          │
          ▼
Création du compte
          │
          ▼
Création automatique du panier
          │
          ▼
Utilisateur prêt à effectuer des achats
```

Ainsi, chaque utilisateur possède toujours un panier disponible.

---

# Structure du panier

Chaque panier contient :

| Champ | Type | Description |
|--------|------|-------------|
| _id | ObjectId | Identifiant du panier |
| user | ObjectId | Référence vers l'utilisateur |
| items | Array | Produits présents dans le panier |
| createdAt | Date | Date de création |
| updatedAt | Date | Dernière modification |

Chaque élément du tableau `items` contient :

| Champ | Type | Description |
|--------|------|-------------|
| product | ObjectId | Produit |
| quantity | Number | Quantité |

---

# Routes disponibles

| Méthode | Endpoint | Authentification |
|----------|----------|------------------|
| GET | /api/cart | Oui |
| POST | /api/cart | Oui |
| PUT | /api/cart/:productId | Oui |
| DELETE | /api/cart/:productId | Oui |

Toutes les routes nécessitent un utilisateur authentifié.

---

# Consulter le panier

## Endpoint

```http
GET /api/cart
```

### Description

Retourne le panier de l'utilisateur connecté.

### Header

```http
Authorization: Bearer <JWT_TOKEN>
```

### Réponse

```json
{
    "success": true,
    "data": {
        "_id": "...",
        "user": "...",
        "items": [
            {
                "product": {
                    "_id": "...",
                    "name": "MacBook Pro M4",
                    "price": 2300
                },
                "quantity": 7
            }
        ]
    }
}
```

---

# Ajouter un produit au panier

## Endpoint

```http
POST /api/cart
```

### Header

```http
Authorization: Bearer <JWT_TOKEN>
```

### Body

```json
{
    "productId": "6a65ba09d5996d86848e02b9",
    "quantity": 2
}
```

### Fonctionnement

Lors de l'ajout :

- le produit est recherché dans la base de données ;
- si le produit existe déjà dans le panier, sa quantité est augmentée ;
- sinon, un nouvel élément est ajouté au panier.

---

# Modifier la quantité d'un produit

## Endpoint

```http
PUT /api/cart/:productId
```

### Description

Met à jour la quantité d'un produit déjà présent dans le panier.

### Body

```json
{
    "quantity": 5
}
```

---

# Supprimer un produit du panier

## Endpoint

```http
DELETE /api/cart/:productId
```

### Description

Retire un produit du panier de l'utilisateur.

Après cette opération, le produit n'apparaît plus dans le panier.

---

# Mise à jour automatique des quantités

Lorsque le même produit est ajouté plusieurs fois, une nouvelle ligne n'est pas créée.

Exemple :

Ajout n°1 :

```text
MacBook Pro M4

Quantité : 5
```

Ajout n°2 :

```text
MacBook Pro M4

Quantité : 2
```

Résultat :

```text
MacBook Pro M4

Quantité totale : 7
```

Cette logique évite les doublons dans le panier.

---

# Relation avec les commandes

Le panier sert de base à la création d'une commande.

Lorsqu'une commande est validée :

```text
Panier
     │
     ▼
Création de la commande
     │
     ▼
Mise à jour du stock
     │
     ▼
Panier vidé automatiquement
```

Le panier est alors prêt pour de futurs achats.

---

# Sécurité

Toutes les opérations sur le panier sont protégées.

Avant d'accéder au panier :

```text
Client
   │
   ▼
JWT
   │
   ▼
authMiddleware
   │
   ▼
Cart Controller
```

Un utilisateur ne peut consulter et modifier que son propre panier.

---

# Codes de réponse

| Code HTTP | Signification |
|------------|---------------|
| 200 | Opération réussie |
| 201 | Produit ajouté |
| 400 | Données invalides |
| 401 | Utilisateur non authentifié |
| 404 | Produit ou panier introuvable |
| 500 | Erreur interne |

---

# Bonnes pratiques appliquées

Le module Panier respecte les principes suivants :

- création automatique d'un panier lors de l'inscription ;
- un seul panier par utilisateur ;
- aucune duplication d'un même produit dans le panier ;
- mise à jour automatique des quantités ;
- protection des routes avec JWT ;
- séparation de la logique métier dans les services.

---

# Résumé

Le module Panier permet à un utilisateur authentifié de gérer facilement les produits qu'il souhaite acheter avant de passer une commande.

Il constitue une étape intermédiaire entre le catalogue des produits et le module de gestion des commandes.

---

# Étape suivante

Le document suivant décrit le processus complet de création d'une commande, la mise à jour du stock, le calcul du montant total ainsi que la gestion de l'historique des commandes.

➡️ **08-Orders.md**