/**
 * Tests d'intégration API avec Supertest : Commandes & Gestion des Stocks
 * 
 * S'exécute dans un environnement 100% isolé sans modifier la base de données de production.
 */

import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../src/app";
import User from "../src/models/User";
import * as orderServices from "../src/services/order.services";

const TEST_SECRET = "test-integration-jwt-secret-secure-market-electro-999";
process.env.JWT_SECRET = TEST_SECRET;

const originalFindById = User.findById;

export async function runOrderIntegrationTests(): Promise<{ passed: number; failed: number }> {
    console.log("\n==================================================================");
    console.log(" [SUITE 2] TESTS D'INTÉGRATION SUPERTEST : COMMANDES & STOCKS");
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

    const validCustomerToken = jwt.sign(
        { id: "customer_id_456", email: "client-order@example.com", role: "customer", tokenVersion: 0 },
        TEST_SECRET,
        { algorithm: "HS256", expiresIn: "7d" }
    );

    try {
        // Mock par défaut pour authMiddleware sur l'utilisateur client
        (User as any).findById = () => ({
            _id: "customer_id_456",
            email: "client-order@example.com",
            role: "customer",
            emailVerified: true,
            tokenVersion: 0,
        });

        // 1. Rejet de création de commande sans authentification
        {
            const res = await request(app).post("/api/orders");

            assert(
                res.status === 401 && res.body.message === "Token manquant",
                "POST /api/orders : Rejette la commande sans authentification (HTTP 401)",
                `Status: ${res.status}`
            );
        }

        // 2. Échec de commande : Panier vide
        {
            const originalCreateOrder = orderServices.createOrder;
            (orderServices as any).createOrder = async () => {
                throw new Error("Votre panier est vide");
            };

            const res = await request(app)
                .post("/api/orders")
                .set("Authorization", `Bearer ${validCustomerToken}`);

            assert(
                res.status === 400 && res.body.message === "Votre panier est vide",
                "POST /api/orders : Rejette la commande si le panier est vide (HTTP 400)",
                `Status: ${res.status}, Message: ${res.body.message}`
            );

            (orderServices as any).createOrder = originalCreateOrder;
        }

        // 3. Échec de commande : Rupture de stock
        {
            const originalCreateOrder = orderServices.createOrder;
            (orderServices as any).createOrder = async () => {
                throw new Error("Stock insuffisant pour Écran 4K 144Hz");
            };

            const res = await request(app)
                .post("/api/orders")
                .set("Authorization", `Bearer ${validCustomerToken}`);

            assert(
                res.status === 400 && res.body.message.includes("Stock insuffisant"),
                "POST /api/orders : Rejette la commande si le stock est insuffisant (HTTP 400)",
                `Status: ${res.status}, Message: ${res.body.message}`
            );

            (orderServices as any).createOrder = originalCreateOrder;
        }

        // 4. Succès de commande : Panier valide et stock réservé
        {
            const originalCreateOrder = orderServices.createOrder;
            const mockCreatedOrder = {
                _id: "order_generated_789",
                user: "customer_id_456",
                totalAmount: 599.99,
                status: "pending",
                items: [
                    {
                        product: "prod_1",
                        quantity: 1,
                        price: 599.99,
                    },
                ],
                createdAt: new Date().toISOString(),
            };

            (orderServices as any).createOrder = async () => mockCreatedOrder;

            const res = await request(app)
                .post("/api/orders")
                .set("Authorization", `Bearer ${validCustomerToken}`);

            assert(
                res.status === 201 && res.body.success === true && res.body.data._id === "order_generated_789",
                "POST /api/orders : Crée la commande avec succès (HTTP 201 Created)",
                `Status: ${res.status}, Data: ${JSON.stringify(res.body)}`
            );

            (orderServices as any).createOrder = originalCreateOrder;
        }

        // 5. Consultation des commandes : Accès refusé sans authentification
        {
            const res = await request(app).get("/api/orders");

            assert(
                res.status === 401,
                "GET /api/orders : Rejette la consultation sans token (HTTP 401)",
                `Status: ${res.status}`
            );
        }

        // 6. Consultation des commandes : Accès réussi avec authentification
        {
            const originalGetMyOrders = orderServices.getMyOrders;
            (orderServices as any).getMyOrders = async () => [
                {
                    _id: "order_1",
                    totalAmount: 120,
                    status: "delivered",
                },
            ];

            const res = await request(app)
                .get("/api/orders")
                .set("Authorization", `Bearer ${validCustomerToken}`);

            assert(
                res.status === 200 && res.body.success === true && Array.isArray(res.body.data) && res.body.data.length === 1,
                "GET /api/orders : Retourne l'historique de commandes du client (HTTP 200)",
                `Status: ${res.status}, Count: ${res.body.data?.length}`
            );

            (orderServices as any).getMyOrders = originalGetMyOrders;
        }

        // 7. Validation Zod : Rejet d'un identifiant de commande invalide (non-ObjectId)
        {
            const res = await request(app)
                .get("/api/orders/invalid-order-id-123")
                .set("Authorization", `Bearer ${validCustomerToken}`);

            assert(
                res.status === 400 && res.body.success === false,
                "GET /api/orders/:id : Rejette un identifiant invalide (HTTP 400 Zod regex)",
                `Status: ${res.status}, Body: ${JSON.stringify(res.body)}`
            );
        }

    } finally {
        (User as any).findById = originalFindById;
    }

    return { passed, failed };
}
