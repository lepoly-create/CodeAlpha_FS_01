"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const favorite_routes_1 = __importDefault(require("./routes/favorite.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const message_routes_1 = __importDefault(require("./routes/message.routes"));
const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "MarketElectro API Documentation",
        version: "1.0.0"
    }
};
const app = (0, express_1.default)();
// 1. Headers de sécurité HTTP avec Helmet
app.use((0, helmet_1.default)());
// 2. Configuration CORS restrictive
const allowedOrigins = [
    process.env.FRONTEND_URL || "http://localhost:5173"
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Permettre les requêtes sans origine (comme les outils locaux ou Postman)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Refusé par CORS (Origine non autorisée)"));
        }
    },
    credentials: true,
}));
app.use(express_1.default.json());
// 3. Documentation API Swagger
app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument, {
    explorer: true,
    customSiteTitle: "MarketElectro API Documentation"
}));
const isProd = process.env.NODE_ENV === "production";
const globalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: isProd ? 100 : 2000, // limite souple en dev
    message: {
        success: false,
        message: "Trop de requêtes depuis cette adresse IP, veuillez réessayer plus tard."
    },
    standardHeaders: true,
    legacyHeaders: false,
});
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: isProd ? 15 : 200, // limite souple en dev
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
app.use("/api/auth", auth_routes_1.default);
app.use("/api/products", product_routes_1.default);
app.use("/api/cart", cart_routes_1.default);
app.use("/api/orders", order_routes_1.default);
app.use("/api/favorites", favorite_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/dashboard", dashboard_routes_1.default);
app.use("/api/admin", admin_routes_1.default);
app.use("/api/messages", message_routes_1.default);
app.get("/", (req, res) => {
    res.json({
        message: "API fonctionnelle"
    });
});
// 6. Middleware global de capture d'erreurs
app.use((err, req, res, next) => {
    console.error("❌ Erreur non gérée :", err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Une erreur interne du serveur est survenue";
    res.status(statusCode).json({
        success: false,
        message: process.env.NODE_ENV === "production" ? "Une erreur interne est survenue" : message,
    });
});
exports.default = app;
