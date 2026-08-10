# Authentification

> **Projet :** MarketElectro
>
> **Version :** 1.0.0
>
> **Dernière mise à jour :** 26 juillet 2026
>
> **Auteur :** Josué Amegadjin

---

# Objectif

Ce document décrit le système d'authentification et d'autorisation du backend de **MarketElectro**.

L'API utilise :

- **bcrypt** pour le chiffrement des mots de passe ;
- **JSON Web Token (JWT)** pour l'authentification ;
- un **middleware d'authentification** pour protéger les routes privées ;
- un **middleware d'autorisation** pour contrôler les rôles des utilisateurs.

---

# Fonctionnement général

Le processus d'authentification suit les étapes suivantes :

```text
Utilisateur
      │
      ▼
Inscription (/register)
      │
      ▼
Mot de passe chiffré (bcrypt)
      │
      ▼
Utilisateur enregistré dans MongoDB
      │
      ▼
Connexion (/login)
      │
      ▼
Vérification du mot de passe
      │
      ▼
Génération du JWT
      │
      ▼
Envoi du token au client
      │
      ▼
Accès aux routes protégées
```

---

# Sécurité des mots de passe

Les mots de passe ne sont jamais enregistrés en clair dans la base de données.

Avant la création d'un utilisateur :

```text
Mot de passe
      │
      ▼
bcrypt.hash()
      │
      ▼
Hash sécurisé
      │
      ▼
MongoDB
```

Lors de la connexion :

```text
Mot de passe saisi
        │
        ▼
bcrypt.compare()
        │
        ▼
Hash enregistré
        │
        ▼
Validation
```

---

# Authentification avec JWT

Après une connexion réussie, le serveur génère un JSON Web Token contenant les informations essentielles de l'utilisateur.

Le payload du token contient :

| Champ | Description |
|--------|-------------|
| id | Identifiant de l'utilisateur |
| email | Adresse email |
| role | Rôle (customer ou admin) |
| iat | Date d'émission |
| exp | Date d'expiration |

Le token est ensuite renvoyé au client.

Exemple de réponse :

```json
{
    "success": true,
    "message": "Connexion réussie",
    "data": {
        "token": "<JWT_TOKEN>",
        "user": {
            "id": "...",
            "fullName": "Josué Amegadjin",
            "email": "josue@example.com",
            "role": "customer"
        }
    }
}
```

---

# Configuration JWT

Les paramètres suivants sont définis dans le fichier `.env` :

```env
JWT_SECRET=codealpha_super_secret_key
JWT_EXPIRES_IN=7d
```

## Description

| Variable | Description |
|----------|-------------|
| JWT_SECRET | Clé utilisée pour signer les tokens JWT |
| JWT_EXPIRES_IN | Durée de validité du token |

Dans ce projet, un token reste valide pendant **7 jours**.

---

# Routes d'authentification

## Inscription

### Endpoint

```http
POST /api/auth/register
```

### Description

Crée un nouveau compte utilisateur.

Lors de l'inscription :

- le mot de passe est chiffré ;
- un panier vide est créé automatiquement ;
- l'utilisateur est enregistré dans MongoDB.

### Body

```json
{
    "fullName": "Josué Amegadjin",
    "email": "josue@example.com",
    "password": "123456"
}
```

### Réponse

```json
{
    "success": true,
    "message": "Utilisateur créé avec succès",
    "data": {
        "id": "...",
        "fullName": "Josué Amegadjin",
        "email": "josue@example.com"
    }
}
```

---

## Connexion

### Endpoint

```http
POST /api/auth/login
```

### Description

Authentifie un utilisateur et génère un JWT.

### Body

```json
{
    "email": "josue@example.com",
    "password": "123456"
}
```

### Réponse

```json
{
    "success": true,
    "message": "Connexion réussie",
    "data": {
        "token": "<JWT_TOKEN>",
        "user": {
            "id": "...",
            "fullName": "Josué Amegadjin",
            "email": "josue@example.com",
            "role": "customer"
        }
    }
}
```

---

## Profil

### Endpoint

```http
GET /api/auth/profile
```

### Description

Retourne les informations de l'utilisateur authentifié.

### Authentification

Cette route nécessite un JWT valide.

### Header

```http
Authorization: Bearer <JWT_TOKEN>
```

### Réponse

```json
{
    "success": true,
    "user": {
        "id": "...",
        "email": "josue@example.com",
        "role": "customer"
    }
}
```

---

# Middleware d'authentification

Le middleware `authMiddleware` est exécuté avant chaque route protégée.

Il effectue les opérations suivantes :

1. vérifie la présence du header `Authorization` ;
2. extrait le token JWT ;
3. vérifie la signature du token ;
4. récupère les informations de l'utilisateur ;
5. ajoute ces informations dans `req.user` ;
6. autorise l'accès à la route.

Schéma :

```text
Requête
    │
    ▼
Authorization ?
    │
 ┌──┴──┐
 │     │
Non   Oui
 │     │
401    Vérification JWT
          │
      Token valide ?
          │
      ┌───┴────┐
      │        │
    Non       Oui
      │        │
     401   req.user
               │
               ▼
         Controller
```

---

# Gestion des rôles

Le middleware `authorizeRoles()` contrôle l'accès selon le rôle de l'utilisateur.

Deux rôles sont actuellement disponibles :

| Rôle | Description |
|------|-------------|
| admin | Gestion des produits |
| customer | Consultation des produits, panier et commandes |

Exemple :

```ts
router.post(
    "/",
    authMiddleware,
    authorizeRoles("admin"),
    createProduct
);
```

---

# Codes de réponse

| Code HTTP | Signification |
|------------|---------------|
| 200 | Connexion réussie |
| 201 | Utilisateur créé |
| 400 | Données invalides |
| 401 | Authentification invalide |
| 403 | Accès interdit |
| 500 | Erreur interne du serveur |

---

# Bonnes pratiques appliquées

Le système d'authentification respecte les bonnes pratiques suivantes :

- chiffrement des mots de passe avec bcrypt ;
- aucun mot de passe stocké en clair ;
- utilisation de JWT pour les sessions ;
- protection des routes sensibles avec un middleware ;
- séparation entre authentification et autorisation ;
- gestion des rôles pour limiter l'accès aux ressources.

---

# Étape suivante

Le document suivant présente la gestion des produits, les routes disponibles et les opérations réservées aux administrateurs.

➡️ **06-Products.md**