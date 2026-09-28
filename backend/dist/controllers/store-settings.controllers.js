"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSettings = exports.getSettings = void 0;
const store_settings_services_1 = require("../services/store-settings.services");
const getSettings = async (req, res) => {
    try {
        const settings = await (0, store_settings_services_1.getStoreSettings)();
        res.status(200).json({
            success: true,
            data: settings,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message ||
                "Erreur lors du chargement des paramètres de la boutique",
        });
    }
};
exports.getSettings = getSettings;
const updateSettings = async (req, res) => {
    try {
        const settings = await (0, store_settings_services_1.updateStoreSettings)(req.body);
        res.status(200).json({
            success: true,
            message: "Paramètres de la boutique mis à jour avec succès",
            data: settings,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message ||
                "Erreur lors de la mise à jour des paramètres",
        });
    }
};
exports.updateSettings = updateSettings;
