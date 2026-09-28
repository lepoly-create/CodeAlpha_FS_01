"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProfileImage = exports.updateProfileImage = exports.changePassword = exports.updateProfile = exports.getProfile = void 0;
const user_services_1 = require("../services/user.services");
const getProfile = async (req, res) => {
    try {
        const user = await (0, user_services_1.getMyProfile)(req.user.id);
        res.status(200).json({
            success: true,
            data: user
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message
        });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        const user = await (0, user_services_1.updateMyProfile)(req.user.id, req.body);
        res.status(200).json({
            success: true,
            message: "Profil mis à jour avec succès",
            data: user
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.updateProfile = updateProfile;
const changePassword = async (req, res) => {
    try {
        await (0, user_services_1.changeMyPassword)(req.user.id, req.body);
        res.status(200).json({
            success: true,
            message: "Mot de passe modifié avec succès"
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.changePassword = changePassword;
const updateProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Aucune image fournie"
            });
        }
        const user = await (0, user_services_1.updateMyProfileImage)(req.user.id, req.file);
        res.status(200).json({
            success: true,
            message: "Photo de profil mise à jour avec succès",
            data: user
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.updateProfileImage = updateProfileImage;
const removeProfileImage = async (req, res) => {
    try {
        const user = await (0, user_services_1.removeMyProfileImage)(req.user.id);
        res.status(200).json({
            success: true,
            message: "Photo de profil supprimée avec succès",
            data: user
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.removeProfileImage = removeProfileImage;
