import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";
import swaggerUi from "swagger-ui-express";
import favoriteRoutes from "./routes/favorite.routes";
import userRoutes from "./routes/user.routes";
import dashboardRoutes from "./routes/dashboard.routes";

const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "MarketElectro API Documentation",
        version: "1.0.0"
    }
};

const app = express();

// 1. Headers de sécurité HTTP avec Helmet
app.use(helmet());

// 2. Configuration CORS restrictive
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Permettre les requêtes sans origine (comme les outils locaux ou Postman)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Refusé par CORS (Origine non autorisée)"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// 3. Documentation API Swagger
app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
        explorer: true,
        customSiteTitle: "MarketElectro API Documentation"
    })
);

// 4. Rate Limiting pour contrer les attaques DoS et Brute-Force
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes par fenêtre de 15 min
  message: {
    success: false,
    message: "Trop de requêtes depuis cette adresse IP, veuillez réessayer plus tard."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // limite chaque IP à 15 requêtes d'authentification par 15 min
  message: {
    success: false,
    message: "Trop de tentatives de connexion ou d'inscription. Veuillez réessayer dans 15 minutes."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Appliquer le limiter global sur toutes les requêtes /api
app.use("/api", globalLimiter);

// Appliquer le limiter plus restrictif sur l'auth
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

// 5. Déclaration des routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.get("/", (req, res) => {
    res.json({
        message: "API fonctionnelle"
    });
});

// 6. Middleware global de capture d'erreurs
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("❌ Erreur non gérée :", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Une erreur interne du serveur est survenue";

  res.status(statusCode).json({
    success: false,
    message: process.env.NODE_ENV === "production" ? "Une erreur interne est survenue" : message,
  });
});

export default app;