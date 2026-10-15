import { Request, Response } from "express";

import {
    getMyProfile,
    updateMyProfile,
    changeMyPassword,
    updateMyProfileImage,
    requestEmailChange,
} from "../services/user.services";

import { sendEmailChangeEmail } from "../services/email.services";
import { linkGoogleAccount } from "../services/google-auth.services";

export const requestEmailChangeController = async (
    req: Request,
    res: Response,
) => {
    try {
        const result = await requestEmailChange(
            req.user!.id,
            req.body.newEmail,
            req.body.currentPassword,
        );

        await sendEmailChangeEmail(
            result.newEmail,
            result.fullName,
            result.token,
        );

        res.status(200).json({
            success: true,
            message: "Un email de confirmation a été envoyé.",
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const linkGoogleAccountController = async (
    req: Request,
    res: Response,
) => {
    try {
        const profile = await linkGoogleAccount(
            req.user!.id,
            req.body.credential,
        );

        res.status(200).json({
            success: true,
            data: profile,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getMyProfileController = async (
    req: Request,
    res: Response,
) => {
    try {
        const profile = await getMyProfile(req.user!.id);

        res.status(200).json({
            success: true,
            data: profile,
        });
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateMyProfileController = async (
    req: Request,
    res: Response,
) => {
    try {
        const profile = await updateMyProfile(
            req.user!.id,
            req.body,
        );

        res.status(200).json({
            success: true,
            data: profile,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const changeMyPasswordController = async (
    req: Request,
    res: Response,
) => {
    try {
        await changeMyPassword(
            req.user!.id,
            req.body,
        );

        res.status(200).json({
            success: true,
            message: "Mot de passe modifié avec succès.",
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const uploadMyProfileImageController = async (
    req: Request,
    res: Response,
) => {
    try {
        const profile = await updateMyProfileImage(
            req.user!.id,
            req.file!,
        );

        res.status(200).json({
            success: true,
            data: profile,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};