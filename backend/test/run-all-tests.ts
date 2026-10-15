/**
 * Orchestrateur de tests d'intégration API (MarketElectro)
 * Exécute l'ensemble des suites Supertest dans un environnement mémoire isolé.
 */

import { runAuthIntegrationTests } from "./auth.integration.test";
import { runOrderIntegrationTests } from "./order.integration.test";

async function main() {
    console.log("==================================================================");
    console.log(" LANCEMENT DES TESTS D'INTÉGRATION API MARKETELECTRO (SUPERTEST)");
    console.log(" Environnement : Isolé en mémoire (Aucune écriture MongoDB prod)");
    console.log("==================================================================");

    const startTime = Date.now();

    const authResults = await runAuthIntegrationTests();
    const orderResults = await runOrderIntegrationTests();

    const totalPassed = authResults.passed + orderResults.passed;
    const totalFailed = authResults.failed + orderResults.failed;
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log("\n==================================================================");
    console.log(` RÉCAPITULATIF GLOBAL DES TESTS : ${totalPassed} SUCCÈS, ${totalFailed} ÉCHECS (${duration}s)`);
    console.log("==================================================================");

    if (totalFailed > 0) {
        console.error("❌ Certaines assertions ont échoué.");
        process.exit(1);
    } else {
        console.log("✅ Toutes les assertions d'intégration API ont été validées avec succès.");
        process.exit(0);
    }
}

main().catch((err) => {
    console.error("Erreur fatale dans le runner de tests :", err);
    process.exit(1);
});
