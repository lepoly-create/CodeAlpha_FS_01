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

type StatusFilter =
  | "all"
  | "active"
  | "inactive"
  | "outOfStock";

interface ProductFilters {
  search: string;
  category: string;
  status: StatusFilter;
}

type ProductFormState =
  | {
      mode: "closed";
      product: null;
    }
  | {
      mode: "create";
      product: null;
    }
  | {
      mode: "edit";
      product: Product;
    };

const initialFilters: ProductFilters = {
  search: "",
  category: "all",
  status: "all",
};

const initialFormState: ProductFormState = {
  mode: "closed",
  product: null,
};

const getErrorMessage = (
  error: unknown,
  fallback: string
): string => {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? fallback;
  }

  return fallback;
};

const getCategories = (products: Product[]): string[] => {
  return Array.from(
    new Set(products.map((product) => product.category))
  ).sort();
};

const filterProducts = (
  products: Product[],
  filters: ProductFilters
): Product[] => {
  const normalizedSearch = filters.search
    .trim()
    .toLowerCase();

  return products.filter((product) => {
    const matchesSearch =
      !normalizedSearch ||
      product.name
        .toLowerCase()
        .includes(normalizedSearch) ||
      product.description
        .toLowerCase()
        .includes(normalizedSearch);

    const matchesCategory =
      filters.category === "all" ||
      product.category === filters.category;

    const matchesStatus =
      filters.status === "all" ||
      (filters.status === "active" &&
        product.isActive) ||
      (filters.status === "inactive" &&
        !product.isActive) ||
      (filters.status === "outOfStock" &&
        product.stock === 0);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus
    );
  });
};

export default function useAdminProducts() {
  const [products, setProducts] = useState<Product[]>(
    []
  );

  const [loading, setLoading] = useState(true);

  const [filters, setFilters] =
    useState<ProductFilters>(initialFilters);

  const [formState, setFormState] =
    useState<ProductFormState>(initialFormState);

  const [productToDelete, setProductToDelete] =
    useState<Product | null>(null);

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
    const timeoutId = window.setTimeout(() => {
      void loadProducts();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadProducts]);

  const handleAddProduct = () => {
    setFormState({
      mode: "create",
      product: null,
    });
  };

  const handleEditProduct = (product: Product) => {
    setFormState({
      mode: "edit",
      product,
    });
  };

  const handleCancelForm = () => {
    setFormState({
      mode: "closed",
      product: null,
    });
  };

  const handleSubmit = async (
    data: CreateProductData | UpdateProductData
  ) => {
    try {
      if (
        formState.mode === "edit" &&
        formState.product
      ) {
        await updateProduct(
          formState.product._id,
          data
        );

        toast.success(
          "Product updated successfully."
        );
      } else {
        await createProduct(
          data as CreateProductData
        );

        toast.success(
          "Product created successfully."
        );
      }

      handleCancelForm();
      await loadProducts();
    } catch (error: unknown) {
      toast.error(
        getErrorMessage(
          error,
          "Unable to save product."
        )
      );
    }
  };

  const handleDeleteProduct = (
    product: Product
  ) => {
    setProductToDelete(product);
  };

  const handleCancelDelete = () => {
    setProductToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) {
      return;
    }

    try {
      setDeleting(true);

      await deleteProduct(
        productToDelete._id
      );

      toast.success(
        "Product disabled successfully."
      );

      setProductToDelete(null);

      await loadProducts();
    } catch (error: unknown) {
      toast.error(
        getErrorMessage(
          error,
          "Unable to disable product."
        )
      );
    } finally {
      setDeleting(false);
    }
  };

  return {
    loading,

    filteredProducts: filterProducts(
      products,
      filters
    ),

    categories: getCategories(products),

    search: filters.search,
    category: filters.category,
    status: filters.status,

    onSearchChange: (search: string) => {
      setFilters((current) => ({
        ...current,
        search,
      }));
    },

    onCategoryChange: (category: string) => {
      setFilters((current) => ({
        ...current,
        category,
      }));
    },

    onStatusChange: (status: StatusFilter) => {
      setFilters((current) => ({
        ...current,
        status,
      }));
    },

    showForm: formState.mode !== "closed",

    selectedProduct:
      formState.mode === "edit"
        ? formState.product
        : null,

    handleAddProduct,
    handleEditProduct,
    handleCancelForm,
    handleSubmit,

    productToDelete,
    deleting,
    handleDeleteProduct,
    handleCancelDelete,
    handleConfirmDelete,
  };
}