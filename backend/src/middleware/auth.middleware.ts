import { Request, Response, NextFunction } from "express";
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
    next: NextFunction
) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Token manquant"
            });
        }

        const token = authHeader.split(" ")[1];

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT_SECRET introuvable");
        }

        const decoded = jwt.verify(token, secret) as AuthUser;

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Utilisateur introuvable"
            });
        }

        req.user = {
            id: user.id,
            email: user.email,
            role: user.role
        };

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Token invalide"
        });

    }

};