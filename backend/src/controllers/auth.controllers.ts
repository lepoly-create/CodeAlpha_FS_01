import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.services";

export const login = async (req: Request, res: Response) => {

    try {

        const result = await loginUser(req.body);

        res.status(200).json({
            success: true,
            message: "Connexion réussie",
            data: result,
        });

    } catch (error: any) {

        res.status(401).json({
            success: false,
            message: error.message,
        });

    }
};

export const register = async (
    req: Request,
    res: Response
) => {

    try {

        const user = await registerUser(req.body);


        res.status(201).json({

            success: true,

            message: "Utilisateur créé avec succès",

            data: {

                id: user._id,

                fullName: user.fullName,

                email: user.email

            }

        });


    } catch (error:any) {


        res.status(400).json({

            success:false,

            message:error.message

        });


    }

};