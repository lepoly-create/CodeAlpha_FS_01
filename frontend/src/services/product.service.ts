import api from "@/api/axios";
import type { Product } from "@/types/product";

interface ProductsResponse {
  success: boolean;
  count: number;
  data: Product[];
}

interface ProductResponse {
  success: boolean;
  data: Product;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}


export type UpdateProductData = Partial<CreateProductData>;

//CLIENT  
export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<ProductsResponse>("/products");

  return response.data.data;
};

//ADMIN

export const getAdminProducts = async (): Promise<Product[]> => {
  const response = await api.get<ProductsResponse>("/admin/products");

  return response.data.data;
};

export const getProductById = async (
  id: string
): Promise<Product> => {
  const response = await api.get<ProductResponse>(
    `/products/${id}`
  );

  return response.data.data;
};

export const createProduct = async (
  data: CreateProductData
): Promise<Product> => {
  const response = await api.post<ProductResponse>(
    "/products",
    data
  );

  return response.data.data;
};

export const updateProduct = async (
  id: string,
  data: UpdateProductData
): Promise<Product> => {
  const response = await api.put<ProductResponse>(
    `/products/${id}`,
    data
  );

  return response.data.data;
};

export const deleteProduct = async (
  id: string
): Promise<Product> => {
  const response = await api.delete<ProductResponse>(
    `/products/${id}`
  );

  return response.data.data;
};