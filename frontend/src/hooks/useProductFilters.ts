import { useState } from "react";

import type { Product } from "@/types/product";

export type ProductStatusFilter =
  | "all"
  | "active"
  | "inactive"
  | "outOfStock";

interface ProductFilters {
  search: string;
  category: string;
  status: ProductStatusFilter;
}

const initialFilters: ProductFilters = {
  search: "",
  category: "all",
  status: "all",
};

const getCategories = (
  products: Product[],
): string[] => {
  return Array.from(
    new Set(
      products.map((product) => product.category),
    ),
  ).sort();
};

const matchesSearch = (
  product: Product,
  search: string,
): boolean => {
  if (!search) {
    return true;
  }

  return (
    product.name.toLowerCase().includes(search) ||
    product.description
      .toLowerCase()
      .includes(search)
  );
};

const matchesCategory = (
  product: Product,
  category: string,
): boolean => {
  return (
    category === "all" ||
    product.category === category
  );
};

const matchesStatus = (
  product: Product,
  status: ProductStatusFilter,
): boolean => {
  switch (status) {
    case "active":
      return product.isActive;

    case "inactive":
      return !product.isActive;

    case "outOfStock":
      return product.stock === 0;

    case "all":
      return true;
  }
};

const filterProducts = (
  products: Product[],
  filters: ProductFilters,
): Product[] => {
  const normalizedSearch = filters.search
    .trim()
    .toLowerCase();

  return products.filter((product) => {
    return (
      matchesSearch(
        product,
        normalizedSearch,
      ) &&
      matchesCategory(
        product,
        filters.category,
      ) &&
      matchesStatus(
        product,
        filters.status,
      )
    );
  });
};

export default function useProductFilters(
  products: Product[],
) {
  const [filters, setFilters] =
    useState<ProductFilters>(initialFilters);

  const categories = getCategories(products);

  const filteredProducts = filterProducts(
    products,
    filters,
  );

  const setSearch = (search: string) => {
    setFilters((current) => ({
      ...current,
      search,
    }));
  };

  const setCategory = (category: string) => {
    setFilters((current) => ({
      ...current,
      category,
    }));
  };

  const setStatus = (
    status: ProductStatusFilter,
  ) => {
    setFilters((current) => ({
      ...current,
      status,
    }));
  };

  return {
    search: filters.search,
    category: filters.category,
    status: filters.status,
    categories,
    filteredProducts,
    setSearch,
    setCategory,
    setStatus,
  };
}