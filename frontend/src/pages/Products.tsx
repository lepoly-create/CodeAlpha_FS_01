import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import { getProducts } from "@/services/product.service";
import type { Product } from "@/types/product";

import { Input } from "@/components/ui/input";
import ProductFilters from "@/components/products/ProductFilters";
import ProductGrid from "@/components/products/ProductGrid";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "@/services/favorite.service";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [pendingFavoriteIds, setPendingFavoriteIds] = useState<string[]>([]);

  /*
   * Récupération des produits depuis le backend
   */
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.error(error);
        setError("Impossible de charger les produits.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);
  
  /*
   * Ici je fais la récupération des produits favoris mais en gardant que leur ids depuis le backend
   */

  useEffect(() => {
  const loadFavorites = async () => {
    try {
      const favorites = await getFavorites();

      setFavoriteIds(
        favorites.map((product) => product._id),
      );
    } catch (error) {
      console.error(
        "Impossible de charger les favoris :",
        error,
      );
    }
  };

  loadFavorites();
}, []);

  /*
   * Extraction des catégories disponibles
   */
  const categories = useMemo(() => {
    return Array.from(
      new Set(
        products.map((product) => product.category),
      ),
    );
  }, [products]);

  /*
   * Recherche + filtrage par catégorie
   */
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  const handleAddFavorite = async (productId: string) => {
    setFavoriteIds((current) => [...current, productId]);
    setPendingFavoriteIds((current) => [...current, productId]);

    try {
      await addFavorite(productId);
    } catch (error) {
      console.error("Impossible d'ajouter le favori :", error);
      setFavoriteIds((current) =>
        current.filter((favoriteId) => favoriteId !== productId),
      );
    } finally {
      setPendingFavoriteIds((current) =>
        current.filter((favoriteId) => favoriteId !== productId),
      );
    }
  };

  const handleRemoveFavorite = async (productId: string) => {
    setFavoriteIds((current) =>
      current.filter((favoriteId) => favoriteId !== productId),
    );
    setPendingFavoriteIds((current) => [...current, productId]);

    try {
      await removeFavorite(productId);
    } catch (error) {
      console.error("Impossible de retirer le favori :", error);
      setFavoriteIds((current) => [...current, productId]);
    } finally {
      setPendingFavoriteIds((current) =>
        current.filter((favoriteId) => favoriteId !== productId),
      );
    }
  };

  return (
    <section className="space-y-8">
      {/* Heading */}
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
            MarketElectro
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Products
          </h1>

          <p className="mt-2 text-neutral-500">
            Discover the latest electronics and
            accessories.
          </p>
        </div>

        <p className="text-sm text-neutral-500">
          {filteredProducts.length} products
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-2xl">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" />

        <Input
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search products..."
          className="h-14 rounded-xl border-neutral-200 bg-neutral-100 pl-12 text-base shadow-none"
        />
      </div>

      {/* Filters */}
      <ProductFilters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-115 animate-pulse rounded-2xl bg-neutral-100"
            />
          ))}
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <p className="font-medium text-red-600">
            {error}
          </p>
        </div>
      )}

      {/* Products */}
      {!loading && !error && (
        <ProductGrid 
        products={filteredProducts} 
        favoriteIds={favoriteIds}
        pendingFavoriteIds={pendingFavoriteIds}
        onAddFavorite={handleAddFavorite}
        onRemoveFavorite={handleRemoveFavorite}
        />
      )}
    </section>
  );
}