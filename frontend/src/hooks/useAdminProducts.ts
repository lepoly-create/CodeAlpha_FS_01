import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import {
  createProduct,
  deleteProduct,
  getAdminProducts,
  updateProduct,
  type CreateProductData,
  type UpdateProductData,
} from "@/services/product.service";

import type { Product } from "@/types/product";

const getErrorMessage = (
  error: unknown,
  fallback: string
): string => {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? fallback;
  }

  return fallback;
};

export default function useAdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getAdminProducts();

      setProducts(data);
    } catch (error: unknown) {
      toast.error(
        getErrorMessage(
          error,
          "Unable to load products."
        )
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  const createAdminProduct = async (
    data: CreateProductData
  ) => {
    try {
      await createProduct(data);

      toast.success(
        "Product created successfully."
      );

      await loadProducts();
    } catch (error: unknown) {
      toast.error(
        getErrorMessage(
          error,
          "Unable to create product."
        )
      );

      throw error;
    }
  };

  const updateAdminProduct = async (
    id: string,
    data: UpdateProductData
  ) => {
    try {
      await updateProduct(id, data);

      toast.success(
        "Product updated successfully."
      );

      await loadProducts();
    } catch (error: unknown) {
      toast.error(
        getErrorMessage(
          error,
          "Unable to update product."
        )
      );

      throw error;
    }
  };

  const disableAdminProduct = async (
    id: string
  ) => {
    try {
      setDeleting(true);

      await deleteProduct(id);

      toast.success(
        "Product disabled successfully."
      );

      await loadProducts();
    } catch (error: unknown) {
      toast.error(
        getErrorMessage(
          error,
          "Unable to disable product."
        )
      );

      throw error;
    } finally {
      setDeleting(false);
    }
  };

  return {
    products,
    loading,
    deleting,
    createAdminProduct,
    updateAdminProduct,
    disableAdminProduct,
  };
}