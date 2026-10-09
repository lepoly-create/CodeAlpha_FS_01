import { useState } from "react";
import { Heart, ShoppingCart, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/format-price";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  isFavorite: boolean;
  favoritePending: boolean;
  onAddFavorite: (productId: string) => void;
  onRemoveFavorite: (productId: string) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  isFavorite,
  favoritePending,
  onAddFavorite,
  onRemoveFavorite,
}: ProductCardProps) {
  const [adding, setAdding] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      await addToCart(product._id, 1);
      toast.success("Produit ajouté au panier", {
        description: product.name,
      });
      onAddToCart?.(product);
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error);
      toast.error("Impossible d'ajouter le produit au panier");
    } finally {
      setAdding(false);
    }
  };

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-xl border-0 border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">
      {/* Zone Image avec Ratio Carré (Compact & Harmonieux) */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-50/80 p-3 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Bouton Favori en overlay moderne */}
        <button
          type="button"
          disabled={favoritePending}
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          onClick={() => {
            if (isFavorite) {
              onRemoveFavorite(product._id);
            } else {
              onAddFavorite(product._id);
            }
          }}
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-md shadow-sm border border-slate-200/60 text-slate-600 transition-transform active:scale-90 hover:bg-white hover:text-red-500 disabled:opacity-50 cursor-pointer z-10"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-slate-600 group-hover:text-red-500"
            }`}
          />
        </button>

        {/* Badges de Stock */}
        {isOutOfStock ? (
          <span className="absolute left-2.5 top-2.5 rounded-lg bg-slate-900/90 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md">
            Rupture
          </span>
        ) : isLowStock ? (
          <span className="absolute left-2.5 top-2.5 rounded-lg bg-amber-500/90 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md">
            Reste {product.stock}
          </span>
        ) : null}
      </div>

      {/* Détails du Produit */}
      <CardContent className="flex flex-1 flex-col p-3.5 space-y-1.5">
        {/* Catégorie */}
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {product.category}
        </p>

        {/* Nom du produit (limité à 1-2 lignes) */}
        <h3 className="line-clamp-1 text-xs sm:text-sm font-semibold text-slate-900 title-font group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Description courte */}
        <p className="line-clamp-2 text-xs text-slate-500 leading-relaxed min-h-8">
          {product.description}
        </p>

        {/* Prix */}
        <div className="pt-1 mt-auto">
          <p className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
            {formatPrice(product.price)}
          </p>
        </div>
      </CardContent>

      {/* Bouton d'action */}
      <CardFooter className="p-3.5 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={adding || isOutOfStock}
          size="sm"
          className="w-full rounded-xl bg-slate-900 text-xs font-medium text-white hover:bg-slate-800 active:scale-[0.98] transition-all cursor-pointer h-9 shadow-sm"
        >
          {adding ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <>
              <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
              {isOutOfStock ? "Épuisé" : "Ajouter"}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}