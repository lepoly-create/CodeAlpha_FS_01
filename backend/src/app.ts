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
import adminRoutes from "./routes/admin.routes";

import messageRoutes from "./routes/message.routes";

import contactRoutes from "./routes/contact.routes";

const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "MarketElectro API Documentation",
        version: "1.0.0"
    }
};

const app = express();
// Indique à Express de faire confiance au premier proxy (celui de Render)
app.set('trust proxy', 1); 

// 1. Headers de sécurité HTTP avec Helmet

app.use(helmet());

// 2. Configuration CORS restrictive
const configuredOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((url) => url.trim())
  : [];

const defaultOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://marketelectro.polydev.live",
  "https://code-alpha-fs-01.vercel.app",
];

const allowedOrigins = Array.from(new Set([...configuredOrigins, ...defaultOrigins]));

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

const isProd = process.env.NODE_ENV === "production";

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isProd ? 300 : 2000, // 300 requêtes / 15 min en prod (anti-blocage navigation normale SPA)
  message: {
    success: false,
    message: "Trop de requêtes depuis cette adresse IP, veuillez réessayer plus tard."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: isProd ? 50 : 200,
  message: {
    success: false,
    message:
      "Trop de tentatives. Veuillez réessayer plus tard."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const emailActionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProd ? 10 : 100,
  message: {
    success: false,
    message:
      "Trop de demandes. Veuillez réessayer plus tard."
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const verificationLimiter =
    rateLimit({
        windowMs:
            15 * 60 * 1000,
        max: isProd ? 10 : 100,
        message: {
            success: false,
            message:
                "Trop de demandes de vérification. Veuillez réessayer plus tard.",
        },
        standardHeaders: true,
        legacyHeaders: false,
    });

// Appliquer le limiter global sur toutes les requêtes /api
app.use("/api", globalLimiter);

// Appliquer les limiters plus restrictifs sur l'authentification et les envois d'email
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);
app.use("/api/auth/google", authLimiter);

app.use("/api/auth/verify-email", verificationLimiter);
app.use("/api/auth/resend-verification", verificationLimiter);
app.use("/api/auth/forgot-password", emailActionLimiter);
app.use("/api/auth/reset-password", emailActionLimiter);
app.use("/api/auth/verify-email-change", emailActionLimiter);
app.use("/api/users/me/email-change", emailActionLimiter);
app.use("/api/contact", emailActionLimiter);

// Déclaration des routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/contact", contactRoutes);

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