"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const auth_services_1 = require("../services/auth.services");
const login = async (req, res) => {
    try {
        const result = await (0, auth_services_1.loginUser)(req.body);
        res.status(200).json({
            success: true,
            message: "Connexion réussie",
            data: result,
        });
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};
exports.login = login;
const register = async (req, res) => {
    try {
        const user = await (0, auth_services_1.registerUser)(req.body);
        res.status(201).json({
            success: true,
            message: "Utilisateur créé avec succès",
            data: {
                id: user._id,
                fullName: user.fullName,
                email: user.email
            }
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.register = register;
