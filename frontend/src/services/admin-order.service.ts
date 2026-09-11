import api from "@/api/axios";

export interface AdminOrderUser {
  _id: string;
  fullName: string;
  email: string;
}

export interface AdminOrderProduct {
  _id: string;
  name: string;
  price: number;
  image?: string;
}

export interface AdminOrderItem {
  product: AdminOrderProduct;
  quantity: number;
  price: number;
}

export interface AdminOrder {
  _id: string;
  user: AdminOrderUser;
  items: AdminOrderItem[];
  totalAmount: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

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

export const getAdminOrderById = async (
  id: string
): Promise<AdminOrder> => {
  const response = await api.get<AdminOrderResponse>(
    `/admin/orders/${id}`
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