"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    },
    profileImage: {
        type: String,
        default: null
    },
    favoriteProducts: {
        type: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Product"
            }
        ],
        default: []
    },
    profileImagePublicId: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("User", userSchema);
