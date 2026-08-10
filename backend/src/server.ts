import dotenv from "dotenv";

dotenv.config();


import app from "./app";
import { connectDB } from "./config/database";


const PORT = process.env.PORT || 5000;


const startServer = async () => {

    await connectDB();


    app.listen(PORT, () => {

        console.log(
            `Serveur lancé sur le port ${PORT}`
        );

    });

};


startServer();