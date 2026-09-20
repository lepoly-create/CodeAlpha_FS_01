import api from "@/api/axios";


import  type {AdminOrder} from "@/types/admin";
export type {
  AdminOrder,
};

interface AdminOrdersResponse {
  success: boolean;
  count: number;
  data: AdminOrder[];
}

interface AdminOrderResponse {
  success: boolean;
  data: AdminOrder;
}

export const getAdminOrders = async (): Promise<AdminOrder[]> => {
  const response = await api.get<AdminOrdersResponse>(
    "/admin/orders"
  );

  return response.data.data;
};


export const updateAdminOrderStatus = async (
  id: string,
  status: AdminOrder["status"]
): Promise<AdminOrder> => {
  const response = await api.put<AdminOrderResponse>(
    `/admin/orders/${id}/status`,
    { status }
  );

  return response.data.data;
};