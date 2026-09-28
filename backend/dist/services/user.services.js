"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMyProfileImage = exports.updateMyProfileImage = exports.changeMyPassword = exports.updateMyProfile = exports.getMyProfile = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const toUserProfile = (user) => ({
    id: user._id.toString(),
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage ?? null
});
const getMyProfile = async (userId) => {
    const user = await User_1.default.findById(userId)
        .select("-password");
    if (!user) {
        throw new Error("Utilisateur introuvable");
    }
    return toUserProfile(user);
};
exports.getMyProfile = getMyProfile;
const updateMyProfile = async (userId, data) => {
    const user = await User_1.default.findById(userId);
    if (!user) {
        throw new Error("Utilisateur introuvable");
    }
    if (data.email && data.email !== user.email) {
        const existingUser = await User_1.default.findOne({
            email: data.email
        });
        if (existingUser) {
            throw new Error("Cet email est déjà utilisé");
        }
        user.email = data.email;
    }
    if (data.fullName !== undefined) {
        user.fullName = data.fullName;
    }
    await user.save();
    const updatedUser = await User_1.default.findById(userId)
        .select("-password");
    if (!updatedUser) {
        throw new Error("Utilisateur introuvable");
    }
    return toUserProfile(updatedUser);
};
exports.updateMyProfile = updateMyProfile;
const changeMyPassword = async (userId, data) => {
    const user = await User_1.default.findById(userId);
    if (!user) {
        throw new Error("Utilisateur introuvable");
    }
    const isCurrentPasswordValid = await bcryptjs_1.default.compare(data.currentPassword, user.password);
    if (!isCurrentPasswordValid) {
        throw new Error("Mot de passe actuel incorrect");
    }
    if (data.newPassword.length < 6) {
        throw new Error("Le nouveau mot de passe doit contenir au moins 6 caractères");
    }
    const isSamePassword = await bcryptjs_1.default.compare(data.newPassword, user.password);
    if (isSamePassword) {
        throw new Error("Le nouveau mot de passe doit être différent de l'ancien");
    }
    user.password = await bcryptjs_1.default.hash(data.newPassword, 10);
    await user.save();
};
exports.changeMyPassword = changeMyPassword;
const updateMyProfileImage = async (userId, file) => {
    const user = await User_1.default.findById(userId);
    if (!user) {
        throw new Error("Utilisateur introuvable");
    }
    if (!file) {
        throw new Error("Aucune image fournie");
    }
    if (user.profileImagePublicId) {
        await cloudinary_1.default.uploader.destroy(user.profileImagePublicId, {
            resource_type: "image"
        });
    }
    const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary_1.default.uploader.upload_stream({
            folder: "marketelectro/profiles",
            resource_type: "image"
        }, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            if (!result) {
                reject(new Error("Échec de l'upload de l'image"));
                return;
            }
            resolve({
                secure_url: result.secure_url,
                public_id: result.public_id
            });
        });
        uploadStream.end(file.buffer);
    });
    user.profileImage = uploadResult.secure_url;
    user.profileImagePublicId =
        uploadResult.public_id;
    await user.save();
    const updatedUser = await User_1.default.findById(userId)
        .select("-password");
    if (!updatedUser) {
        throw new Error("Utilisateur introuvable");
    }
    return toUserProfile(updatedUser);
};
exports.updateMyProfileImage = updateMyProfileImage;
const removeMyProfileImage = async (userId) => {
    const user = await User_1.default.findById(userId);
    if (!user) {
        throw new Error("Utilisateur introuvable");
    }
    if (user.profileImagePublicId) {
        await cloudinary_1.default.uploader.destroy(user.profileImagePublicId, {
            resource_type: "image"
        });
    }
    user.profileImage = null;
    user.profileImagePublicId = null;
    await user.save();
    const updatedUser = await User_1.default.findById(userId)
        .select("-password");
    if (!updatedUser) {
        throw new Error("Utilisateur introuvable");
    }
    return toUserProfile(updatedUser);
};
exports.removeMyProfileImage = removeMyProfileImage;
