import api from "@/api/axios";
import type { Product } from "@/types/product";

export const getFavorites = async (): Promise<Product[]> => {
  const response = await api.get("/favorites");

  return response.data.data;
};

export const addFavorite = async (productId: string): Promise<void> => {
  await api.post(`/favorites/${productId}`);
};

export const removeFavorite = async (productId: string): Promise<void> => {
  await api.delete(`/favorites/${productId}`);
};