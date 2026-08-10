import mongoose from "mongoose";
import dotenv from "dotenv";

import Product from "../src/models/Product";

dotenv.config();

const products = [
  {
    name: "ASSUS PRO",
    description: "Ordinateur portable ASSUS",
    price: 2300,
    image: "/images/products/ordinateur-portable.jpg",
    category: "Ordinateurs",
    stock: 20,
    isActive: true,
  },
  {
    name: "iPhone 15 Pro",
    description: "Smartphone Apple bonne gamme",
    price: 1200,
    image: "/images/products/iphone.avif",
    category: "Smartphones",
    stock: 15,
    isActive: true,
  },
  {
    name: "Sony WH",
    description: "appreil photo",
    price: 350,
    image: "/images/products/appareil-photo.webp",
    category: "Photo",
    stock: 12,
    isActive: true,
  },
  {
    name: "Pose PC",
    description: "Ordinateur portable en équilibre",
    price: 1800,
    image: "/images/products/pose-pc.avif",
    category: "Ordinateurs",
    stock: 8,
    isActive: true,
  },
  {
    name: "Radio POWER",
    description: "Radio pour suivre les médias audios",
    price: 1000,
    image: "/images/products/radio.webp",
    category: "Matériel",
    stock: 18,
    isActive: true,
  },
  {
    name: "Ecran Projection",
    description: "Ecran pour animer un picth",
    price: 250,
    image: "/images/products/ecran-projection.jpg",
    category: "Matériel",
    stock: 25,
    isActive: true,
  },
  
];

const seedProducts = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI est introuvable dans le fichier .env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connecté.");

    /*
     * Nettoyage des produits existants
     */
    await Product.deleteMany({});

    /*
     * Insertion des produits
     */
    const createdProducts = await Product.insertMany(products);

    console.log(
      `${createdProducts.length} produits ont été créés avec succès.`,
    );

    createdProducts.forEach((product) => {
      console.log(
        `${product.name} → ${product._id}`,
      );
    });

    await mongoose.disconnect();

    console.log("MongoDB déconnecté.");
  } catch (error) {
    console.error(
      "Erreur lors de l'injection des produits :",
      error,
    );

    await mongoose.disconnect();

    process.exit(1);
  }
};

seedProducts();