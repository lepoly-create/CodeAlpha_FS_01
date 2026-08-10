import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGO_URI;

  if (!mongoURI) {
    throw new Error("MONGO_URI manquant dans le fichier .env");
  }

  try {
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✅ MongoDB connecté");

    mongoose.connection.on("error", (error) => {
      console.error("❌ Erreur MongoDB :", error);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ MongoDB déconnecté");
    });

    process.on("SIGINT", async () => {
      try {
        await mongoose.connection.close();
        console.log("🔌 Connexion MongoDB fermée proprement");
        process.exit(0);
      } catch (error) {
        console.error("Erreur lors de la fermeture MongoDB :", error);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error("❌ Erreur de connexion MongoDB :", error);
    throw error;
  }
};
