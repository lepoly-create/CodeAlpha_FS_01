import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../src/models/User";

async function createAdmin() {
    try {

        await mongoose.connect(process.env.MONGO_URI!);

        const existingAdmin = await User.findOne({
            email: "admin@codealpha.com"
        });

        if (existingAdmin) {
            console.log("ℹ️ L'administrateur existe déjà.");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash("admin123456", 10);

        await User.create({
            fullName: "CodeAlpha Admin",
            email: "admin@codealpha.com",
            password: hashedPassword,
            role: "admin"
        });

        console.log("✅ Administrateur créé avec succès.");

        process.exit(0);

    } catch (error) {

        console.error("❌ Erreur :", error);

        process.exit(1);

    }
}

createAdmin();