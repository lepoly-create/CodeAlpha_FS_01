import api from "@/api/axios";
import type { Product } from "@/types/product";

interface ProductsResponse {
  success: boolean;
  count: number;
  data: Product[];
}

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<ProductsResponse>("/products");

  return response.data.data;
};