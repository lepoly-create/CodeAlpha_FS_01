import api from "@/api/axios";

import type {
  AdminDashboard,
  AdminProduct,
  AdminStatistics,
} from "@/types/admin";

export type {
  AdminDashboard,
  AdminProduct,
  AdminStatistics,
};

export const getAdminDashboard =
  async (): Promise<AdminDashboard> => {
    const response = await api.get("/admin/dashboard");

    return response.data.data;
  };