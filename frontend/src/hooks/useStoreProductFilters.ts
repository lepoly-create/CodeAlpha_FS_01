import { useCallback, useDeferredValue, useMemo, useState } from "react";
import type { Product } from "@/types/product";

interface StoreProductFilters {
  search: string;
  category: string;
}

const initialFilters: StoreProductFilters = {
  search: "",
  category: "all",
};

const matchesSearch = (product: Product, search: string): boolean => {
  if (!search) {
    return true;
  }

  return (
    product.name.toLowerCase().includes(search) ||
    product.description.toLowerCase().includes(search) ||
    product.category.toLowerCase().includes(search)
  );
};

const matchesCategory = (
  product: Product,
  category: string,
  favoriteIdSet: Set<string>,
): boolean => {
  if (category === "all") {
    return true;
  }

  if (category === "favorites") {
    return favoriteIdSet.has(product._id);
  }

  return product.category === category;
};

export default function useStoreProductFilters(
  products: Product[],
  favoriteIds: string[],
) {
  const [filters, setFilters] = useState<StoreProductFilters>(initialFilters);

  // useDeferredValue (React 19) pour garantir une frappe réactive sans latence minimale
  const deferredSearch = useDeferredValue(filters.search);

  // Set pour recherche O(1) ultra-rapide
  const favoriteIdSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  // Mémoisation des catégories uniques
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category))).sort();
  }, [products]);

  // Mémoisation des produits filtrés
  const filteredProducts = useMemo(() => {
    const normalizedSearch = deferredSearch.trim().toLowerCase();

    return products.filter(
      (product) =>
        matchesSearch(product, normalizedSearch) &&
        matchesCategory(product, filters.category, favoriteIdSet),
    );
  }, [products, deferredSearch, filters.category, favoriteIdSet]);

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

  return {
    search: filters.search,
    category: filters.category,
    categories,
    filteredProducts,
    setSearch,
    setCategory,
  };
}