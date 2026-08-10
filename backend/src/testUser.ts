import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/database";
import User from "./models/User";


const testUser = async () => {

    try {

        await connectDB();

        const user = await User.create({
            fullName: "Test User",
            email: "test@example.com",
            password: "123456",
        });


        console.log("Utilisateur créé :");
        console.log(user);


        process.exit(0);


    } catch(error){

        console.log(error);

        process.exit(1);
    }
};


testUser();