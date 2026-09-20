export interface AdminStatistics {
  totalUsers: number;
  totalProducts: number;
  activeProducts: number;
  outOfStockProducts: number;
  totalOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
}

export interface AdminProduct {
  _id: string;
  name: string;
  price: number;
  image?: string;
  stock: number;
  isActive: boolean;
}

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

export interface AdminDashboard {
  statistics: AdminStatistics;
  recentOrders: AdminOrder[];
  recentProducts: AdminProduct[];
  lowStockProducts: AdminProduct[];
}