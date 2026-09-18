import api from "@/api/axios";

export interface AdminUser {
  _id: string;
  fullName: string;
  email: string;
  role: "customer";
  profileImage?: string | null;
  favoriteProducts: string[];
  createdAt: string;
  updatedAt: string;
  totalOrders: number;
  totalSpent: number;
}

interface AdminUsersResponse {
  success: boolean;
  count: number;
  data: AdminUser[];
}

export const getAdminUsers = async (): Promise<AdminUser[]> => {
  const response = await api.get<AdminUsersResponse>("/admin/users");

  return response.data.data;
};