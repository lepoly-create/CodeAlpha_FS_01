# Installation

> **Projet :** MarketElectro
>
> **Version :** 1.0.0
>
> **Dernière mise à jour :** 26 juillet 2026
>
> **Auteur :** Josué Amegadjin

---

## Sommaire

- Présentation
- Prérequis
- Installation
- Variables d'environnement
- Structure du projet
- Lancement
- Dépannage

# Prérequis

Avant de lancer le projet, assurez-vous que les outils suivants sont installés sur votre machine.

- Node.js (version 20 ou supérieure recommandée)
- npm
- Git
- Visual Studio Code (recommandé)
- Un compte MongoDB Atlas
- Postman (pour tester l'API)

Pour vérifier les versions installées :

```bash
node -v
npm -v
git --version
```

---

# Cloner le projet

Clonez le dépôt GitHub :

```bash
git clone <URL_DU_DEPOT>
```

Accédez ensuite au dossier du backend :

```bash
cd backend
```

---

# Installer les dépendances

Installez toutes les dépendances du projet.

```bash
npm install
```

---

# Variables d'environnement

À la racine du projet, créez un fichier :

```text
.env
```

Ajoutez les variables suivantes :

```env
PORT=5000

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/marketElectro

JWT_SECRET=votre_secret_jwt

JWT_EXPIRES_IN=7d

ADMIN_NAME=CodeAlpha Admin
ADMIN_EMAIL=admin@codealpha.com
ADMIN_PASSWORD=admin123456
```

## Description des variables

| Variable | Description |
|----------|-------------|
| PORT | Port sur lequel le serveur sera lancé. |
| MONGO_URI | Chaîne de connexion MongoDB Atlas. |
| JWT_SECRET | Clé secrète utilisée pour signer les JSON Web Tokens. |
| JWT_EXPIRES_IN | Durée de validité des tokens JWT. |
| ADMIN_NAME | Nom du compte administrateur créé automatiquement. |
| ADMIN_EMAIL | Adresse email de l'administrateur. |
| ADMIN_PASSWORD | Mot de passe de l'administrateur. |

---

# Structure du projet

```text
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.ts
│   └── server.ts
│
├── scripts/
│
├── docs/
│
├── package.json
│
├── tsconfig.json
│
└── .env
```

---

# Lancer le serveur

Pour démarrer le backend en mode développement :

```bash
npm run dev
```

Si tout est correctement configuré, le terminal affichera :

```text
✅ MongoDB connecté
Serveur lancé sur le port 5000
```

---

# Créer le compte administrateur

Le projet fournit un script permettant de créer automatiquement un compte administrateur.

Exécutez la commande suivante :

```bash
npm run seed:admin
```

Si l'administrateur existe déjà, le script ne créera pas de doublon.

---

# Tester l'API

Une fois le serveur lancé, l'API est accessible à l'adresse :

```text
http://localhost:5000
```

Les principaux endpoints sont :

| Méthode | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| GET | /api/products |
| GET | /api/cart |
| POST | /api/orders |

Les tests peuvent être réalisés avec Postman.

---

# Vérification de l'installation

L'installation est considérée comme réussie lorsque les conditions suivantes sont remplies :

- le serveur démarre sans erreur ;
- la connexion à MongoDB Atlas est établie ;
- l'authentification fonctionne ;
- les routes de l'API répondent correctement.

---

# Dépannage

## Impossible de se connecter à MongoDB Atlas

Causes possibles :

- adresse IP non autorisée dans MongoDB Atlas ;
- chaîne de connexion incorrecte ;
- accès Internet indisponible.

Solutions :

- vérifier que l'adresse IP est autorisée dans MongoDB Atlas ;
- vérifier la variable `MONGO_URI` ;
- vérifier la connexion réseau.

---

## Le serveur ne démarre pas

Vérifiez que :

- toutes les dépendances sont installées (`npm install`) ;
- le fichier `.env` existe ;
- le port choisi n'est pas déjà utilisé.

---

# Étape suivante

Une fois l'installation terminée, consultez le document :

**03-Architecture.md**

qui présente en détail l'organisation interne du backend et le rôle de chaque dossier.

---

⬅️ **Précédent :** [01-Introduction.md](01-Introduction.md)

➡️ **Suivant :** [03-Architecture.md](03-Architecture.md)