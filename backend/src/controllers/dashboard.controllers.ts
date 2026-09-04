import { Request, Response } from "express";

import {
    getUserDashboard
} from "../services/dashboard.services";

export const getDashboard = async (
    req: Request,
    res: Response
) => {

    try {
        const dashboard =
            await getUserDashboard(
                req.user.id
            );
        res.status(200).json({
            success: true,
            data: dashboard
        });

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};