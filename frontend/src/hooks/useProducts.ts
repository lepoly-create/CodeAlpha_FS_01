import { useEffect, useState } from "react";

import { getProducts } from "@/services/product.service";

import type { Product } from "@/types/product";

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string;
}

export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        if (!ignore) {
          setProducts(data);
        }
      } catch (error) {
        console.error(
          "Impossible de charger les produits :",
          error,
        );

        if (!ignore) {
          setError(
            "Impossible de charger les produits.",
          );
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