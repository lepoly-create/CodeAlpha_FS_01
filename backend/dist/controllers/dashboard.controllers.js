"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboard = void 0;
const dashboard_services_1 = require("../services/dashboard.services");
const getDashboard = async (req, res) => {
    try {
        const dashboard = await (0, dashboard_services_1.getUserDashboard)(req.user.id);
        res.status(200).json({
            success: true,
            data: dashboard
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
exports.getDashboard = getDashboard;
