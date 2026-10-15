/**
 * Test de régression automatisé : Révocation des JWT & Invalidation de Session
 * 
 * Ce test s'exécute dans un environnement 100% isolé (sans connexion MongoDB de production).
 * Il valide le comportement strict de authMiddleware face :
 * 1. Aux tokens legacy sans claim tokenVersion (doivent être rejetés avec HTTP 401).
 * 2. Aux tokens révoqués après un changement de mot de passe (doivent être rejetés avec HTTP 401).
 * 3. Aux tokens légitimes à jour (doivent être acceptés).
 */

import jwt from "jsonwebtoken";
import { authMiddleware } from "../src/middleware/auth.middleware";
import User from "../src/models/User";

const TEST_SECRET = "test-jwt-secret-for-regression-validation-only-12345";
process.env.JWT_SECRET = TEST_SECRET;

interface MockResponse {
    statusCode: number;
    jsonData: any;
    status: (code: number) => MockResponse;
    json: (data: any) => MockResponse;
}

const createMockResponse = (): MockResponse => {
    const res: MockResponse = {
        statusCode: 200,
        jsonData: null,
        status(code: number) {
            this.statusCode = code;
            return this;
        },
        json(data: any) {
            this.jsonData = data;
            return this;
        },
    };
    return res;
};

// Sauvegarde de l'implémentation originale de User.findById
const originalFindById = User.findById;

async function runRegressionTests() {
    console.log("==================================================================");
    console.log(" DÉBUT DU TEST DE RÉGRESSION : AUTH MIDDLEWARE & RÉVOCATION JWT");
    console.log("==================================================================\n");

    let passedTests = 0;
    let failedTests = 0;

    const assert = (condition: boolean, testName: string, detail?: string) => {
        if (condition) {
            console.log(`  ✅ SUCCÈS : ${testName}`);
            passedTests++;
        } else {
            console.error(`  ❌ ÉCHEC  : ${testName} - ${detail || ""}`);
            failedTests++;
        }
    };

    try {
        // --- TEST 1 : Token legacy sans claim tokenVersion sur compte à version 0 ---
        {
            const legacyToken = jwt.sign(
                { id: "user_id_123", email: "user@example.com", role: "customer" },
                TEST_SECRET,
                { algorithm: "HS256", expiresIn: "7d" }
            );

            // Mock de l'utilisateur avec tokenVersion = 0
            (User as any).findById = () => ({
                _id: "user_id_123",
                email: "user@example.com",
                role: "customer",
                emailVerified: true,
                tokenVersion: 0,
            });

            const req: any = {
                headers: { authorization: `Bearer ${legacyToken}` },
            };
            const res = createMockResponse();
            let nextCalled = false;

            await authMiddleware(req, res as any, () => { nextCalled = true; });

            assert(
                res.statusCode === 401 && !nextCalled,
                "Token legacy sans tokenVersion doit être REJETÉ (401)",
                `Status reçu: ${res.statusCode}, Next appelé: ${nextCalled}`
            );
        }

        // --- TEST 2 : Token legacy sans tokenVersion sur compte réinitialisé (version = 1) ---
        {
            const legacyToken = jwt.sign(
                { id: "user_id_123", email: "user@example.com", role: "customer" },
                TEST_SECRET,
                { algorithm: "HS256", expiresIn: "7d" }
            );

            // Utilisateur ayant changé son mot de passe -> tokenVersion = 1
            (User as any).findById = () => ({
                _id: "user_id_123",
                email: "user@example.com",
                role: "customer",
                emailVerified: true,
                tokenVersion: 1,
            });

            const req: any = {
                headers: { authorization: `Bearer ${legacyToken}` },
            };
            const res = createMockResponse();
            let nextCalled = false;

            await authMiddleware(req, res as any, () => { nextCalled = true; });

            assert(
                res.statusCode === 401 && !nextCalled,
                "Token legacy après réinitialisation de mot de passe doit être REJETÉ (401)",
                `Status reçu: ${res.statusCode}`
            );
        }

        // --- TEST 3 : Ancien token valide (version 0) après changement de mot de passe (version 1) ---
        {
            const tokenV0 = jwt.sign(
                { id: "user_id_123", email: "user@example.com", role: "customer", tokenVersion: 0 },
                TEST_SECRET,
                { algorithm: "HS256", expiresIn: "7d" }
            );

            (User as any).findById = () => ({
                _id: "user_id_123",
                email: "user@example.com",
                role: "customer",
                emailVerified: true,
                tokenVersion: 1, // Le mot de passe a changé !
            });

            const req: any = {
                headers: { authorization: `Bearer ${tokenV0}` },
            };
            const res = createMockResponse();
            let nextCalled = false;

            await authMiddleware(req, res as any, () => { nextCalled = true; });

            assert(
                res.statusCode === 401 && !nextCalled,
                "Token (version 0) révoqué après changement de mot de passe (version 1) doit être REJETÉ (401)",
                `Status reçu: ${res.statusCode}`
            );
        }

        // --- TEST 4 : Token légitime à jour (version 1) après reconnexion ---
        {
            const tokenV1 = jwt.sign(
                { id: "user_id_123", email: "user@example.com", role: "customer", tokenVersion: 1 },
                TEST_SECRET,
                { algorithm: "HS256", expiresIn: "7d" }
            );

            (User as any).findById = () => ({
                _id: "user_id_123",
                email: "user@example.com",
                role: "customer",
                emailVerified: true,
                tokenVersion: 1,
            });

            const req: any = {
                headers: { authorization: `Bearer ${tokenV1}` },
            };
            const res = createMockResponse();
            let nextCalled = false;

            await authMiddleware(req, res as any, () => { nextCalled = true; });

            assert(
                nextCalled && req.user?.id === "user_id_123",
                "Token valide à jour doit être ACCEPTÉ (next appelé, req.user défini)",
                `Next appelé: ${nextCalled}, req.user: ${JSON.stringify(req.user)}`
            );
        }

        // --- TEST 5 : Document MongoDB legacy où tokenVersion est absent (undefined) ---
        {
            const tokenV0 = jwt.sign(
                { id: "user_id_legacy", email: "legacy@example.com", role: "customer", tokenVersion: 0 },
                TEST_SECRET,
                { algorithm: "HS256", expiresIn: "7d" }
            );

            // Document Mongoose legacy sans champ tokenVersion matérialisé
            (User as any).findById = () => ({
                _id: "user_id_legacy",
                email: "legacy@example.com",
                role: "customer",
                emailVerified: true,
                tokenVersion: undefined,
            });

            const req: any = {
                headers: { authorization: `Bearer ${tokenV0}` },
            };
            const res = createMockResponse();
            let nextCalled = false;

            await authMiddleware(req, res as any, () => { nextCalled = true; });

            assert(
                nextCalled && req.user?.id === "user_id_legacy",
                "Token valide (v0) sur document legacy (tokenVersion undefined) doit être ACCEPTÉ (repli sur 0)",
                `Next appelé: ${nextCalled}`
            );
        }

    } finally {
        // Restauration de l'implémentation originale
        (User as any).findById = originalFindById;
    }

    console.log("\n==================================================================");
    console.log(` RÉSULTATS : ${passedTests} SUCCÈS, ${failedTests} ÉCHECS`);
    console.log("==================================================================");

    if (failedTests > 0) {
        process.exit(1);
    }
}

runRegressionTests().catch((err) => {
    console.error("Erreur critique d'exécution du test :", err);
    process.exit(1);
});
