import api from "@/api/axios";
import { invalidateUserDashboardCache } from "@/hooks/useUserDashboard";

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

export interface OrderResponse {
  success: boolean;
  message?: string;
  data: {
    _id: string;
    totalAmount: number;
    status: "pending" | "confirmed" | "cancelled";
  };
}

interface CachedOrdersEntry {
  userId: string;
  data: Order[];
  timestamp: number;
}

// Cache mémoire client sécurisé : cloisonné par identifiant utilisateur (Anti-Data Leak)
let cachedOrders: CachedOrdersEntry | null = null;
const ORDERS_CACHE_TTL_MS = 30 * 1000;

function getCurrentAuthUserId(): string {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw)?.id || "" : "";
  } catch {
    return "";
  }
}

export function invalidateOrdersCache() {
  cachedOrders = null;
}

export const createOrder = async (): Promise<OrderResponse["data"]> => {
  const response = await api.post<OrderResponse>("/orders");
  // Invalidation immédiate des caches pour synchronisation automatique
  invalidateOrdersCache();
  invalidateUserDashboardCache();
  return response.data.data;
};

export const getMyOrders = async (forceRefresh = false): Promise<Order[]> => {
  const now = Date.now();
  const currentUserId = getCurrentAuthUserId();

  const isUserMatch =
    Boolean(currentUserId) &&
    cachedOrders !== null &&
    cachedOrders.userId === currentUserId;

  if (
    !forceRefresh &&
    isUserMatch &&
    now - cachedOrders!.timestamp < ORDERS_CACHE_TTL_MS
  ) {
    return cachedOrders!.data;
  }

  const response = await api.get<{ success: boolean; data: Order[] }>("/orders");

  if (currentUserId) {
    cachedOrders = {
      userId: currentUserId,
      data: response.data.data,
      timestamp: now,
    };
  }

  return response.data.data;
};

export const getMyOrder = async (orderId: string): Promise<Order> => {
  const response = await api.get<{ success: boolean; data: Order }>(
    `/orders/${orderId}`
  );

  return response.data.data;
};