import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../src/models/User";

async function createAdmin() {
    try {

        await mongoose.connect(process.env.MONGO_URI!);

        const adminEmail = process.env.ADMIN_EMAIL || "admin@codealpha.com";
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminPassword) {
            throw new Error("ADMIN_PASSWORD est manquant dans les variables d'environnement");
        }

        const existingAdmin = await User.findOne({
            email: adminEmail
        });

        if (existingAdmin) {
            console.log("ℹ️ L'administrateur existe déjà.");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        await User.create({
            fullName: process.env.ADMIN_NAME || "Administrateur MarketElectro",
            email: adminEmail,
            password: hashedPassword,
            role: "admin",
            emailVerified: true,
            emailVerifiedAt: new Date(),
        });

        console.log("✅ Administrateur créé avec succès.");

        process.exit(0);

    } catch (error) {

        console.error("❌ Erreur :", error);

        process.exit(1);

    }
}

createAdmin();