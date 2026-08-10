> **Projet :** MarketElectro
>
> **Version :** 1.0.0
>
> **Dernière mise à jour :** 26 juillet 2026
>
> **Auteur :** Josué Amegadjin

# Introduction

## Présentation du projet

MarketElectro est une application web de commerce électronique développée dans le cadre d'un projet de stage. Elle permet aux utilisateurs de consulter un catalogue de produits électroniques, de gérer un panier d'achat et de passer des commandes en ligne.

L'application est composée de deux parties principales :

- un backend développé avec Node.js, Express.js, TypeScript et MongoDB ;
- un frontend développé avec React, qui consommera les services exposés par l'API REST.

Le backend est conçu selon une architecture en couches (Controllers, Services, Models et Routes) afin de garantir une bonne séparation des responsabilités, une meilleure maintenabilité et une évolution facilitée du projet.

---

# Objectifs du projet

Les principaux objectifs de MarketElectro sont :

- mettre en place une API REST sécurisée pour une application e-commerce ;
- permettre l'authentification et l'autorisation des utilisateurs grâce aux JSON Web Tokens (JWT) ;
- gérer un catalogue de produits ;
- offrir un système complet de gestion du panier d'achat ;
- permettre la création et le suivi des commandes ;
- appliquer les bonnes pratiques de développement avec Node.js, Express, TypeScript et MongoDB.

---

# Fonctionnalités principales

Le backend implémente les fonctionnalités suivantes :

### Authentification

- inscription d'un utilisateur ;
- connexion avec JWT ;
- consultation du profil utilisateur ;
- gestion des rôles (Administrateur / Client).

### Produits

- création d'un produit (administrateur) ;
- modification d'un produit ;
- suppression d'un produit ;
- consultation de la liste des produits ;
- consultation d'un produit.

### Panier

- création automatique d'un panier lors de l'inscription ;
- ajout d'un produit ;
- modification de la quantité d'un produit ;
- suppression d'un produit du panier ;
- consultation du panier.

### Commandes

- création d'une commande à partir du panier ;
- calcul automatique du montant total ;
- mise à jour du stock ;
- vidage automatique du panier après validation ;
- consultation de l'historique des commandes.

---

# Types d'utilisateurs

L'application distingue deux catégories d'utilisateurs.

## Administrateur

L'administrateur est responsable de la gestion du catalogue des produits.

Il peut :

- créer un produit ;
- modifier un produit ;
- supprimer un produit.

## Client

Le client utilise la plateforme pour effectuer ses achats.

Il peut :

- créer un compte ;
- se connecter ;
- consulter les produits ;
- gérer son panier ;
- passer une commande ;
- consulter son historique de commandes.

---

# Technologies utilisées

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- Mongoose
- JSON Web Token (JWT)
- bcryptjs

## Outils

- Postman
- Visual Studio Code
- Git
- GitHub
- npm

---

# Architecture générale

Le backend est organisé selon une architecture en couches.

```
Client (React)
        │
        ▼
Routes
        │
        ▼
Controllers
        │
        ▼
Services
        │
        ▼
Models (Mongoose)
        │
        ▼
MongoDB Atlas
```

Chaque couche possède une responsabilité unique, ce qui facilite les tests, la maintenance et les évolutions futures.

---

# État actuel du projet

À la rédaction de cette documentation, le backend est entièrement fonctionnel.

Les fonctionnalités suivantes ont été implémentées et validées :

- authentification par JWT ;
- gestion des rôles ;
- gestion des produits ;
- gestion du panier ;
- gestion des commandes ;
- décrémentation automatique du stock ;
- vidage automatique du panier après validation d'une commande.

Les tests de bout en bout réalisés avec Postman ont permis de valider l'ensemble des fonctionnalités principales de l'API.