import api from "@/api/axios";

export interface DashboardUser {
  id: string;
  fullName: string;
  email: string;
  role: "customer" | "admin";
  profileImage?: string | null;
}

export interface DashboardStatistics {
  totalOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  cancelledOrders: number;
  totalSpent: number;
  favoriteCount: number;
  cartItemsCount: number;
}

export interface DashboardProduct {
  _id: string;
  name: string;
  price: number;
  image?: string;
}

export interface DashboardOrderItem {
  product: DashboardProduct;
  quantity: number;
  price: number;
}

export interface DashboardOrder {
  _id: string;
  items: DashboardOrderItem[];
  totalAmount: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface UserDashboard {
  user: DashboardUser;
  statistics: DashboardStatistics;
  recentOrders: DashboardOrder[];
  recommendedProducts: DashboardProduct[];
}

export const getUserDashboard =
  async (): Promise<UserDashboard> => {
    const response = await api.get("/dashboard/user");

    return response.data.data;
  };