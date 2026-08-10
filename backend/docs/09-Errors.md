# Gestion des erreurs

> **Projet :** MarketElectro
>
> **Version :** 1.0.0
>
> **Dernière mise à jour :** 26 juillet 2026
>
> **Auteur :** Josué Amegadjin

---

# Objectif

Ce document décrit les différents codes d'erreur utilisés par l'API MarketElectro.

Toutes les réponses suivent une structure JSON uniforme afin de faciliter leur traitement côté client.

Structure générale :

```json
{
    "success": false,
    "message": "Description de l'erreur"
}
```

---

# Structure des réponses

## Succès

```json
{
    "success": true,
    "message": "Opération réussie",
    "data": {}
}
```

---

## Erreur

```json
{
    "success": false,
    "message": "Description de l'erreur"
}
```

---

# Codes HTTP utilisés

| Code | Signification | Utilisation |
|------|---------------|-------------|
| 200 | OK | Requête exécutée avec succès |
| 201 | Created | Ressource créée |
| 400 | Bad Request | Données invalides |
| 401 | Unauthorized | Utilisateur non authentifié |
| 403 | Forbidden | Accès interdit |
| 404 | Not Found | Ressource introuvable |
| 500 | Internal Server Error | Erreur interne du serveur |

---

# Erreurs d'authentification

## Email ou mot de passe incorrect

### Réponse

```json
{
    "success": false,
    "message": "Email ou mot de passe incorrect"
}
```

### Cause

- email inexistant ;
- mot de passe incorrect.

---

## Token manquant

### Réponse

```json
{
    "success": false,
    "message": "Accès refusé. Aucun token fourni."
}
```

### Cause

Le header Authorization est absent.

---

## Token invalide

### Réponse

```json
{
    "success": false,
    "message": "Token invalide"
}
```

### Cause

- token expiré ;
- token modifié ;
- signature invalide.

---

## Accès interdit

### Réponse

```json
{
    "success": false,
    "message": "Accès interdit"
}
```

### Cause

L'utilisateur est authentifié mais ne possède pas les droits nécessaires.

Exemple :

```text
Customer
      │
      ▼
POST /api/products
      │
      ▼
403 Forbidden
```

---

# Erreurs liées aux utilisateurs

## Email déjà utilisé

```json
{
    "success": false,
    "message": "Cet email est déjà utilisé"
}
```

Cette erreur apparaît lors de l'inscription.

---

# Erreurs liées aux produits

## Produit introuvable

```json
{
    "success": false,
    "message": "Produit introuvable"
}
```

Cette erreur est retournée lorsqu'un identifiant de produit n'existe pas.

---

## Identifiant MongoDB invalide

```json
{
    "success": false,
    "message": "Cast to ObjectId failed..."
}
```

### Exemple rencontré

```text
PRODUCT_ID
```

au lieu d'un véritable ObjectId MongoDB.

Cette erreur indique que le format de l'identifiant est invalide.

---

## Stock insuffisant

```json
{
    "success": false,
    "message": "Stock insuffisant"
}
```

Cette erreur est retournée lorsqu'un utilisateur demande une quantité supérieure au stock disponible.

---

# Erreurs liées au panier

## Panier introuvable

```json
{
    "success": false,
    "message": "Panier introuvable"
}
```

---

## Panier vide

```json
{
    "success": false,
    "message": "Le panier est vide"
}
```

Cette erreur empêche la création d'une commande vide.

---

# Erreurs liées aux commandes

## Commande introuvable

```json
{
    "success": false,
    "message": "Commande introuvable"
}
```

---

# Erreurs de validation

Lorsqu'une donnée obligatoire est absente ou invalide, l'API renvoie une erreur 400.

Exemple :

```json
{
    "name": "",
    "price": -10
}
```

Réponse :

```json
{
    "success": false,
    "message": "Les données fournies sont invalides"
}
```

---

# Gestion des erreurs serveur

En cas d'erreur inattendue :

```json
{
    "success": false,
    "message": "Erreur interne du serveur"
}
```

Le détail de l'erreur est enregistré dans les logs du serveur mais n'est pas exposé au client.

---

# Schéma général

```text
Client
   │
   ▼
Requête
   │
   ▼
Validation
   │
   ▼
Erreur ?
 ┌──────┴────────┐
 │               │
Oui             Non
 │               │
Message JSON   Controller
 │               │
 ▼               ▼
Réponse       Succès
```

---

# Bonnes pratiques appliquées

L'API suit plusieurs bonnes pratiques :

- utilisation des codes HTTP standards ;
- format de réponse uniforme ;
- messages d'erreur explicites ;
- aucune information sensible exposée ;
- gestion centralisée des erreurs dans les contrôleurs et services.

---

# Résumé

Le système de gestion des erreurs de MarketElectro fournit des réponses cohérentes et prévisibles.

Grâce à une structure uniforme, les applications clientes peuvent facilement détecter, afficher et traiter les erreurs retournées par l'API.

---

# Étape suivante

Le document suivant regroupe plusieurs exemples complets de requêtes et de réponses pour faciliter les tests avec Postman et l'intégration côté frontend.

➡️ **10-Examples.md**