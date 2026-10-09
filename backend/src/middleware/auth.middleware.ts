import {
    Request,
    Response,
    NextFunction
} from "express";

import jwt from "jsonwebtoken";
import User from "../models/User";

interface AuthUser {
    id: string;
    email: string;
    role: string;
}

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const authHeader =
            req.headers.authorization;

        if (
            !authHeader ||
            !authHeader.startsWith(
                "Bearer ",
            )
        ) {
            return res.status(401).json({
                success: false,
                message:
                    "Token manquant",
            });
        }

        const token =
            authHeader
                .slice(7)
                .trim();

        if (!token) {
            return res.status(401).json({
                success: false,
                message:
                    "Token manquant",
            });
        }

        const secret =
            process.env.JWT_SECRET;

        if (!secret) {
            throw new Error(
                "JWT_SECRET introuvable"
            );
        }

        const decoded =
            jwt.verify(
                token,
                secret,
            ) as AuthUser;

        if (
            !decoded ||
            typeof decoded.id !==
                "string"
        ) {
            return res.status(401).json({
                success: false,
                message:
                    "Token invalide",
            });
        }

        const user =
            await User.findById(
                decoded.id,
            );

        if (!user) {
            return res.status(401).json({
                success: false,
                message:
                    "Utilisateur introuvable",
            });
        }

        if (
            !user.emailVerified
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "Adresse email non vérifiée",
            });
        }

        req.user = {
            id:
                user._id.toString(),
            email:
                user.email,
            role:
                user.role,
        };

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message:
                "Token invalide",
        });
    }
};