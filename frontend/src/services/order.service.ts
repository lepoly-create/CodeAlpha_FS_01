import api from "@/api/axios";

export interface OrderItem {
  _id?: string;
  product: {
    _id: string;
    name: string;
    description?: string;
    price: number;
    image: string;
    category: string;
  };
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export const createOrder = async (): Promise<Order> => {
  const response = await api.post("/orders");

  return response.data.data;
};

export const getOrders = async (): Promise<Order[]> => {
  const response = await api.get("/orders");

  return response.data.data;
};

export const getOrderById = async (
  orderId: string,
): Promise<Order> => {
  const response = await api.get(`/orders/${orderId}`);

  return response.data.data;
};