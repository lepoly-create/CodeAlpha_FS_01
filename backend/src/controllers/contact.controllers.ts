import { Request, Response } from "express";
import { sendContactEmailToAdmin } from "../services/email.services";

export const submitContactMessage = async (
    req: Request,
    res: Response,
) => {
    try {
        const { firstName, lastName, email, message } = req.body;

        const fullName = `${firstName.trim()} ${lastName.trim()}`;
        const cleanMessage = message.trim();

        await sendContactEmailToAdmin(email, fullName, cleanMessage);

        return res.status(200).json({
            success: true,
            message: "Votre message a été transmis avec succès. Nous vous répondrons dans les plus brefs délais.",
        });

    } catch (error: any) {
        console.error("Erreur contrôleur contact :", error);
        return res.status(500).json({
            success: false,
            message: "Une erreur technique est survenue. Veuillez réessayer ultérieurement.",
        });
    }
};