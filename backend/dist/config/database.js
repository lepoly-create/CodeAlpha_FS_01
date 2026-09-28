"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
        throw new Error("MONGO_URI manquant dans le fichier .env");
    }
    try {
        await mongoose_1.default.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("✅ MongoDB connecté");
        mongoose_1.default.connection.on("error", (error) => {
            console.error("❌ Erreur MongoDB :", error);
        });
        mongoose_1.default.connection.on("disconnected", () => {
            console.log("⚠️ MongoDB déconnecté");
        });
        process.on("SIGINT", async () => {
            try {
                await mongoose_1.default.connection.close();
                console.log("🔌 Connexion MongoDB fermée proprement");
                process.exit(0);
            }
            catch (error) {
                console.error("Erreur lors de la fermeture MongoDB :", error);
                process.exit(1);
            }
        });
    }
    catch (error) {
        console.error("❌ Erreur de connexion MongoDB :", error);
        throw error;
    }
};
exports.connectDB = connectDB;
