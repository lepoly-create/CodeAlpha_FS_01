/**
 * Tests d'intégration API avec Supertest : Authentification & Sécurité JWT
 * 
 * S'exécute dans un environnement 100% isolé sans modifier la base de données de production.
 */

import request from "supertest";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import app from "../src/app";
import User from "../src/models/User";

const TEST_SECRET = "test-integration-jwt-secret-secure-market-electro-999";
process.env.JWT_SECRET = TEST_SECRET;

const originalFindById = User.findById;
const originalFindOne = User.findOne;

export async function runAuthIntegrationTests(): Promise<{ passed: number; failed: number }> {
    console.log("\n==================================================================");
    console.log(" [SUITE 1] TESTS D'INTÉGRATION SUPERTEST : AUTH & SESSIONS");
    console.log("==================================================================");

    let passed = 0;
    let failed = 0;

    const assert = (condition: boolean, title: string, details?: string) => {
        if (condition) {
            console.log(`  ✅ [PASS] ${title}`);
            passed++;
        } else {
            console.error(`  ❌ [FAIL] ${title} - ${details || ""}`);
            failed++;
        }
    };

    try {
        // 1. Validation Zod sur POST /api/auth/register (Champs invalides)
        {
            const res = await request(app)
                .post("/api/auth/register")
                .send({
                    fullName: "A", // Trop court (< 2)
                    email: "email-invalide",
                    password: "123", // Trop court (< 8)
                });

            assert(
                res.status === 400 && res.body.success === false,
                "POST /api/auth/register : Rejette les données invalides (HTTP 400 Zod)",
                `Status: ${res.status}, Body: ${JSON.stringify(res.body)}`
            );
        }

        // 2. Échec de connexion : Utilisateur inexistant sur POST /api/auth/login
        {
            (User as any).findOne = () => ({
                select: () => null,
            });

            const res = await request(app)
                .post("/api/auth/login")
                .send({
                    email: "inexistant@example.com",
                    password: "password123",
                });

            assert(
                res.status === 401 && res.body.message === "Email ou mot de passe incorrect",
                "POST /api/auth/login : Rejette un utilisateur inexistant (HTTP 401)",
                `Status: ${res.status}`
            );
        }

        // 3. Échec de connexion : Email non vérifié sur POST /api/auth/login
        {
            const hashedPassword = await bcrypt.hash("validPassword123", 10);
            (User as any).findOne = () => ({
                select: () => ({
                    _id: "user_unverified_123",
                    email: "unverified@example.com",
                    password: hashedPassword,
                    emailVerified: false,
                }),
            });

            const res = await request(app)
                .post("/api/auth/login")
                .send({
                    email: "unverified@example.com",
                    password: "validPassword123",
                });

            assert(
                res.status === 403 && res.body.message.includes("confirmer votre adresse email"),
                "POST /api/auth/login : Bloque l'accès si email non vérifié (HTTP 403)",
                `Status: ${res.status}`
            );
        }

        // 4. Protection route GET /api/users/me sans token
        {
            const res = await request(app).get("/api/users/me");

            assert(
                res.status === 401 && res.body.message === "Token manquant",
                "GET /api/users/me : Rejette l'accès sans token (HTTP 401)",
                `Status: ${res.status}`
            );
        }

        // 5. Protection route GET /api/users/me avec token legacy sans tokenVersion
        {
            const legacyToken = jwt.sign(
                { id: "user_revoked_123", email: "user@example.com", role: "customer" },
                TEST_SECRET,
                { algorithm: "HS256", expiresIn: "7d" }
            );

            (User as any).findById = () => ({
                _id: "user_revoked_123",
                email: "user@example.com",
                role: "customer",
                emailVerified: true,
                tokenVersion: 1,
            });

            const res = await request(app)
                .get("/api/users/me")
                .set("Authorization", `Bearer ${legacyToken}`);

            assert(
                res.status === 401 && res.body.message.includes("Session expirée ou mot de passe"),
                "GET /api/users/me : Rejette un token legacy sans claim tokenVersion (HTTP 401)",
                `Status: ${res.status}`
            );
        }

        // 6. Succès d'accès sur GET /api/users/me avec token valide et tokenVersion synchronisé
        {
            const validToken = jwt.sign(
                { id: "user_valid_123", email: "client@example.com", role: "customer", tokenVersion: 2 },
                TEST_SECRET,
                { algorithm: "HS256", expiresIn: "7d" }
            );

            (User as any).findById = (id: string) => {
                const userDoc: any = {
                    _id: "user_valid_123",
                    fullName: "Jean Dupont",
                    email: "client@example.com",
                    role: "customer",
                    emailVerified: true,
                    tokenVersion: 2,
                    authProvider: "local",
                    profileImage: null,
                };
                userDoc.select = () => userDoc;
                return userDoc;
            };

            const res = await request(app)
                .get("/api/users/me")
                .set("Authorization", `Bearer ${validToken}`);

            assert(
                res.status === 200 && res.body.success === true && res.body.data.email === "client@example.com",
                "GET /api/users/me : Autorise l'accès avec un token valide à jour (HTTP 200)",
                `Status: ${res.status}, Data: ${JSON.stringify(res.body)}`
            );
        }

    } finally {
        (User as any).findById = originalFindById;
        (User as any).findOne = originalFindOne;
    }

    return { passed, failed };
}
