import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../src/config/database";
import User from "../src/models/User";


const createTestUser = async () => {

    try {

        await connectDB();


        const user = await User.create({

            fullName: "Test User",

            email: "test@codealpha.com",

            password: "123456"

        });


        console.log("Utilisateur créé avec succès :");

        console.log(user);


        process.exit(0);


    } catch (error) {

        console.error("Erreur :", error);

        process.exit(1);

    }

};


createTestUser();