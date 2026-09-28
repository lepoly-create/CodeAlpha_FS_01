"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const storeSettingsSchema = new mongoose_1.Schema({
    storeName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    contactEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: false,
        default: "",
        trim: true,
        maxlength: 30,
    },
    currency: {
        type: String,
        required: true,
        default: "$",
        trim: true,
        maxlength: 10,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("StoreSettings", storeSettingsSchema);
