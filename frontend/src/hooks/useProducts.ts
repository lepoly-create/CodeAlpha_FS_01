import { useEffect, useState } from "react";
import { getProducts } from "@/services/product.service";
import type { Product } from "@/types/product";

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string;
}

// Cache mémoire client (TTL : 60 secondes) pour navigation instantanée (0 latence)
let cachedProducts: Product[] | null = null;
let lastFetchTimestamp = 0;
const CACHE_TTL_MS = 60 * 1000;

export default function useProducts(): UseProductsResult {
  // Initialisation pure sans appel impur pendant le render (conformité React 19)
  const [products, setProducts] = useState<Product[]>(cachedProducts ?? []);
  const [loading, setLoading] = useState<boolean>(!cachedProducts);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let ignore = false;
    const isCacheFresh = cachedProducts !== null && Date.now() - lastFetchTimestamp < CACHE_TTL_MS;

    // Si les données en cache sont fraîches, aucun appel réseau inutile
    if (isCacheFresh) {
      return;
    }

    const loadProducts = async () => {
      try {
        if (!cachedProducts) {
          setLoading(true);
        }
        setError("");

        const data = await getProducts();

        if (!ignore) {
          cachedProducts = data;
          lastFetchTimestamp = Date.now();
          setProducts(data);
        }
      } catch (err) {
        console.error("Impossible de charger les produits :", err);

        if (!ignore) {
          if (!cachedProducts) {
            setError("Impossible de charger les produits.");
          }
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    void loadProducts();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    products,
    loading,
    error,
  };
}