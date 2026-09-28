import { useState } from "react";

import type { Product } from "@/types/product";

interface StoreProductFilters {
  search: string;
  category: string;
}

const initialFilters: StoreProductFilters = {
  search: "",
  category: "all",
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
  favoriteIds: string[],
): boolean => {
  if (category === "all") {
    return true;
  }

  if (category === "favorites") {
    return favoriteIds.includes(product._id);
  }

  return product.category === category;
};

const getCategories = (
  products: Product[],
): string[] => {
  return Array.from(
    new Set(
      products.map(
        (product) => product.category,
      ),
    ),
  );
};

const filterProducts = (
  products: Product[],
  filters: StoreProductFilters,
  favoriteIds: string[],
): Product[] => {
  const normalizedSearch =
    filters.search.trim().toLowerCase();

  return products.filter(
    (product) =>
      matchesSearch(
        product,
        normalizedSearch,
      ) &&
      matchesCategory(
        product,
        filters.category,
        favoriteIds,
      ),
  );
};

export default function useStoreProductFilters(
  products: Product[],
  favoriteIds: string[],
) {
  const [filters, setFilters] =
    useState<StoreProductFilters>(
      initialFilters,
    );

  const categories = getCategories(products);

  const filteredProducts = filterProducts(
    products,
    filters,
    favoriteIds,
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

  return {
    search: filters.search,
    category: filters.category,
    categories,
    filteredProducts,
    setSearch,
    setCategory,
  };
}