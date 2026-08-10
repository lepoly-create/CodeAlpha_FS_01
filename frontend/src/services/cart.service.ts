import api from "@/api/axios";

export interface AddToCartPayload {
  productId: string;
  quantity: number;
}

export interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    isActive: boolean;
  };
  quantity: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

interface CartResponse {
  success: boolean;
  data: Cart;
}

export const getCart = async (): Promise<Cart> => {
  const response = await api.get<CartResponse>("/cart");

  return response.data.data;
};

export const addToCart = async (
  payload: AddToCartPayload,
): Promise<Cart> => {
  const response = await api.post<CartResponse>(
    "/cart",
    payload,
  );

  return response.data.data;
};