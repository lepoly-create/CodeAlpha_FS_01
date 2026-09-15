import { Request, Response } from "express";

import {
  getStoreSettings,
  updateStoreSettings,
} from "../services/store-settings.services";

export const getSettings = async (
  req: Request,
  res: Response
) => {
  try {
    const settings = await getStoreSettings();

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Erreur lors du chargement des paramètres de la boutique",
    });
  }
};

export const updateSettings = async (
  req: Request,
  res: Response
) => {
  try {
    const settings = await updateStoreSettings(req.body);

    res.status(200).json({
      success: true,
      message: "Paramètres de la boutique mis à jour avec succès",
      data: settings,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message:
        error.message ||
        "Erreur lors de la mise à jour des paramètres",
    });
  }
};