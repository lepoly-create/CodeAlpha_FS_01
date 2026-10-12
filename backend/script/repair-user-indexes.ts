import dotenv from "dotenv";
import mongoose from "mongoose";

import User from "../src/models/User";

dotenv.config();

const repairUserIndexes = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI est introuvable.");
  }

  await mongoose.connect(mongoUri);

  try {
    await User.collection.updateMany(
      { googleId: null },
      { $unset: { googleId: "" } },
    );

    const indexes = await User.collection.listIndexes().toArray();

    for (const index of indexes) {
      if (index.key?.googleId) {
        await User.collection.dropIndex(index.name);
      }
    }

    await User.collection.createIndex(
      { googleId: 1 },
      { unique: true, sparse: true, name: "googleId_1" },
    );

    console.log("✅ Index googleId réparé avec l'option sparse.");
  } finally {
    await mongoose.disconnect();
  }
};

repairUserIndexes().catch((error) => {
  console.error("❌ Réparation des index impossible :", error);
  process.exitCode = 1;
});
