import { Request, Response } from "express";

import { getAdminDashboard,
     getAdminProducts,
 } from "../services/admin.services";

export const getDashboard = async (
  req: Request,
  res: Response,
) => {
  try {
    const dashboard = await getAdminDashboard();

    res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Erreur lors du chargement du dashboard administrateur",
    });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await getAdminProducts();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Erreur lors du chargement des produits",
    });
  }
};