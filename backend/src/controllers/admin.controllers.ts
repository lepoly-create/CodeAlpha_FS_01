import { Request, Response } from "express";

import {
  getAdminDashboard,
  getAdminProducts,
  getAdminOrders,
  getAdminOrderById,
  updateAdminOrderStatus,
  getAdminUsers,
  deleteAdminUser,
  deleteAdminOrder,
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

export const getOrders = async (
  req: Request,
  res: Response
) => {
  try {
    const orders = await getAdminOrders();

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Erreur lors du chargement des commandes",
    });
  }
};

export const getOrder = async (
  req: Request,
  res: Response
) => {
  try {
    const order = await getAdminOrderById(
      String(req.params.id)
    );

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOrderStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const { status } = req.body;

    const order = await updateAdminOrderStatus(
      String(req.params.id),
      status
    );

    res.status(200).json({
      success: true,
      message: "Statut de la commande mis à jour",
      data: order,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAdminUsers();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:
        error.message ||
        "Erreur lors du chargement des utilisateurs",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await deleteAdminUser(req.user!.id, String(req.params.id));

    res.status(200).json({
      success: true,
      message: "Utilisateur supprimé avec succès",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Erreur lors de la suppression de l'utilisateur",
    });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    await deleteAdminOrder(String(req.params.id));

    res.status(200).json({
      success: true,
      message: "Commande supprimée avec succès",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Erreur lors de la suppression de la commande",
    });
  }
};