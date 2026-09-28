"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStoreSettings = exports.getStoreSettings = void 0;
const StoreSettings_1 = __importDefault(require("../models/StoreSettings"));
const getStoreSettings = async () => {
    let settings = await StoreSettings_1.default.findOne();
    if (!settings) {
        settings = await StoreSettings_1.default.create({
            storeName: "MarketElectro",
            contactEmail: "contact@marketelectro.com",
            phone: "",
            currency: "$",
        });
    }
    return settings;
};
exports.getStoreSettings = getStoreSettings;
const updateStoreSettings = async (data) => {
    let settings = await StoreSettings_1.default.findOne();
    if (!settings) {
        settings = await StoreSettings_1.default.create({
            storeName: data.storeName || "MarketElectro",
            contactEmail: data.contactEmail || "contact@marketelectro.com",
            phone: data.phone || "",
            currency: data.currency || "$",
        });
        return settings;
    }
    if (data.storeName !== undefined) {
        settings.storeName = data.storeName;
    }
    if (data.contactEmail !== undefined) {
        settings.contactEmail = data.contactEmail;
    }
    if (data.phone !== undefined) {
        settings.phone = data.phone;
    }
    if (data.currency !== undefined) {
        settings.currency = data.currency;
    }
    await settings.save();
    return settings;
};
exports.updateStoreSettings = updateStoreSettings;
