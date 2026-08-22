import { Request, Response } from "express";

import {
    getMyProfile,
    updateMyProfile,
    changeMyPassword
} from "../services/user.services";


export const getProfile = async (
    req: Request,
    res: Response
) => {

    try {

        const user = await getMyProfile(
            req.user.id
        );

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error: any) {

        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};

export const updateProfile = async (
    req: Request,
    res: Response
) => {

    try {

        const user = await updateMyProfile(
            req.user.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Profil mis à jour avec succès",
            data: user
        });

    } catch (error: any) {

        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const changePassword = async (
    req: Request,
    res: Response
) => {

    try {

        await changeMyPassword(
            req.user.id,
            req.body
        );

        res.status(200).json({

            success: true,
            message: "Mot de passe modifié avec succès"
        });

    } catch (error: any) {

        res.status(400).json({

            success: false,
            message: error.message
        });
    }
};