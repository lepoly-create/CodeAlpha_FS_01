# Gestion des commandes

> **Projet :** MarketElectro
>
> **Version :** 1.0.0
>
> **Dernière mise à jour :** 26 juillet 2026
>
> **Auteur :** Josué Amegadjin

---

# Objectif

Ce document décrit le fonctionnement du module **Commandes** de MarketElectro.

Une commande représente la validation d'un panier d'achat.

Lorsqu'une commande est créée, le système :

- récupère le panier de l'utilisateur ;
- vérifie son contenu ;
- calcule le montant total ;
- vérifie la disponibilité des produits ;
- met à jour le stock ;
- crée la commande ;
- vide automatiquement le panier.

---

# Fonctionnement général

Le processus de création d'une commande est le suivant :

```text
Utilisateur
      │
      ▼
Connexion
      │
      ▼
Consultation du panier
      │
      ▼
Validation de la commande
      │
      ▼
Vérification du panier
      │
      ▼
Calcul du montant total
      │
      ▼
Vérification du stock
      │
      ▼
Création de la commande
      │
      ▼
Mise à jour du stock
      │
      ▼
Vidage du panier
```

---

# Structure d'une commande

Chaque commande possède les informations suivantes.

| Champ | Type | Description |
|--------|------|-------------|
| _id | ObjectId | Identifiant unique |
| user | ObjectId | Référence vers l'utilisateur |
| items | Array | Produits commandés |
| totalAmount | Number | Montant total de la commande |
| status | String | Statut de la commande |
| createdAt | Date | Date de création |
| updatedAt | Date | Dernière modification |

Chaque élément de `items` contient :

| Champ | Type | Description |
|--------|------|-------------|
| product | ObjectId | Produit commandé |
| quantity | Number | Quantité |
| price | Number | Prix unitaire au moment de la commande |

---

# Routes disponibles

| Méthode | Endpoint | Authentification |
|----------|----------|------------------|
| POST | /api/orders | Oui |
| GET | /api/orders | Oui |
| GET | /api/orders/:id | Oui |

Toutes les routes nécessitent un utilisateur authentifié.

---

# Créer une commande

## Endpoint

```http
POST /api/orders
```

### Description

Crée une nouvelle commande à partir du panier de l'utilisateur connecté.

### Header

```http
Authorization: Bearer <JWT_TOKEN>
```

### Fonctionnement

Lorsqu'une commande est créée, le backend exécute les opérations suivantes :

1. récupération du panier de l'utilisateur ;
2. vérification que le panier n'est pas vide ;
3. récupération des informations des produits ;
4. calcul du montant total ;
5. vérification du stock disponible ;
6. création de la commande ;
7. mise à jour du stock des produits ;
8. suppression des articles du panier.

### Réponse

```json
{
    "success": true,
    "message": "Commande créée avec succès",
    "data": {
        "_id": "...",
        "user": "...",
        "items": [
            {
                "product": "...",
                "quantity": 7,
                "price": 2300
            }
        ],
        "totalAmount": 16100,
        "status": "pending"
    }
}
```

---

# Consulter ses commandes

## Endpoint

```http
GET /api/orders
```

### Description

Retourne toutes les commandes de l'utilisateur connecté.

### Header

```http
Authorization: Bearer <JWT_TOKEN>
```

### Réponse

```json
{
    "success": true,
    "count": 2,
    "data": [
        {
            "_id": "...",
            "totalAmount": 16100,
            "status": "pending"
        }
    ]
}
```

---

# Consulter une commande

## Endpoint

```http
GET /api/orders/:id
```

### Description

Retourne les détails d'une commande spécifique appartenant à l'utilisateur connecté.

### Paramètre

| Nom | Type |
|------|------|
| id | ObjectId |

---

# Calcul du montant total

Le montant total est calculé automatiquement.

Pour chaque produit :

```text
Sous-total = Prix × Quantité
```

Puis :

```text
Montant total = Somme des sous-totaux
```

Exemple :

```text
MacBook Pro M4

Prix : 2 300

Quantité : 7

Sous-total : 16 100
```

Le montant total de la commande est enregistré dans le champ `totalAmount`.

---

# Vérification du stock

Avant la création d'une commande, le backend vérifie que la quantité demandée est disponible.

```text
Produit
     │
     ▼
Stock suffisant ?
     │
 ┌───┴────┐
 │        │
Non      Oui
 │        │
Erreur   Suite du traitement
```

Si le stock est insuffisant, la commande est refusée.

---

# Mise à jour du stock

Après la création de la commande :

```text
Ancien stock
      │
      ▼
Stock - Quantité commandée
      │
      ▼
Nouveau stock
```

Exemple :

Avant :

```text
MacBook Pro M4

Stock : 20
```

Commande :

```text
Quantité : 7
```

Après :

```text
Stock : 13
```

---

# Vidage du panier

Une fois la commande créée avec succès :

```text
Commande créée
       │
       ▼
Suppression des articles du panier
       │
       ▼
Panier vide
```

L'utilisateur peut alors commencer un nouvel achat.

---

# Sécurité

Toutes les routes sont protégées par le middleware d'authentification.

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
Order Controller
```

Un utilisateur ne peut consulter que ses propres commandes.

---

# Codes de réponse

| Code HTTP | Signification |
|------------|---------------|
| 200 | Opération réussie |
| 201 | Commande créée |
| 400 | Panier vide ou données invalides |
| 401 | Utilisateur non authentifié |
| 404 | Commande introuvable |
| 500 | Erreur interne |

---

# Bonnes pratiques appliquées

Le module Commandes applique les principes suivants :

- vérification de l'authentification avant chaque opération ;
- calcul automatique du montant total ;
- vérification du stock avant validation ;
- mise à jour automatique des quantités en stock ;
- vidage du panier après validation ;
- conservation d'un historique des commandes.

---

# Résumé

Le module Commandes constitue l'étape finale du processus d'achat.

Il assure la cohérence des données entre le panier, les produits et les commandes tout en garantissant la mise à jour automatique du stock et la conservation de l'historique des achats.

---

# Étape suivante

Le document suivant présente les différents codes d'erreur utilisés par l'API, leur signification ainsi que les réponses retournées au client.

➡️ **09-Errors.md**