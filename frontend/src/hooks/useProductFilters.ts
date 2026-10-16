import { useCallback, useDeferredValue, useMemo, useState } from "react";
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

const matchesSearch = (product: Product, search: string): boolean => {
  if (!search) {
    return true;
  }

  return (
    product.name.toLowerCase().includes(search) ||
    product.description.toLowerCase().includes(search)
  );
};

const matchesCategory = (product: Product, category: string): boolean => {
  return category === "all" || product.category === category;
};

const matchesStatus = (product: Product, status: ProductStatusFilter): boolean => {
  switch (status) {
    case "active":
      return product.isActive && product.stock > 0;
    case "inactive":
      return !product.isActive;
    case "outOfStock":
      return product.stock === 0;
    case "all":
    default:
      return true;
  }
};

export default function useProductFilters(products: Product[]) {
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);

  // useDeferredValue (React 19) pour zéro saccade de saisie
  const deferredSearch = useDeferredValue(filters.search);

  // Mémoisation des catégories
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category))).sort();
  }, [products]);

  // Mémoisation des produits filtrés
  const filteredProducts = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase();

    return products.filter(
      (product) =>
        matchesSearch(product, normalizedSearch) &&
        matchesCategory(product, filters.category) &&
        matchesStatus(product, filters.status)
    );
  }, [products, deferredSearch, filters.category, filters.status]);

  const setSearch = useCallback((search: string) => {
    setFilters((current) => ({
      ...current,
      search,
    }));
  }, []);

  const setCategory = useCallback((category: string) => {
    setFilters((current) => ({
      ...current,
      category,
    }));
  }, []);

  const setStatus = useCallback((status: ProductStatusFilter) => {
    setFilters((current) => ({
      ...current,
      status,
    }));
  }, []);

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