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
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#e59b22]/50 hover:shadow-[0_10px_25px_-5px_rgba(17,24,39,0.08)]">
      {/* Zone Image avec Ratio Carré et Studio Background */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#f9f9ff] p-3 flex items-center justify-center border-b border-[#f1f3ff]">
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
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 backdrop-blur-md shadow-xs border border-[#e5e7eb] text-[#524535] transition-transform active:scale-90 hover:bg-white hover:text-red-500 disabled:opacity-50 cursor-pointer z-10"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${isFavorite
              ? "fill-red-500 text-red-500"
              : "text-[#524535] group-hover:text-red-500"
              }`}
          />
        </button>

        {/* Badges de Stock */}
        {isOutOfStock ? (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-[#1a1c20] px-2.5 py-0.5 text-[10px] font-semibold text-white">
            Rupture
          </span>
        ) : isLowStock ? (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-[#e59b22] px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-xs">
            Reste {product.stock}
          </span>
        ) : null}
      </div>

      {/* Détails du Produit */}
      <CardContent className="flex flex-1 flex-col p-3.5 space-y-1.5">
        {/* Catégorie */}
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#524535]/70">
          {product.category}
        </p>

        {/* Nom du produit */}
        <h3 className="line-clamp-2 text-xs sm:text-sm font-semibold text-[#141b2b] tracking-[-0.01em] transition-colors group-hover:text-[#835500]">
          {product.name}
        </h3>

        {/* Description courte */}
        <p className="line-clamp-2 text-xs text-[#524535] leading-relaxed min-h-8">
          {product.description}
        </p>

        {/* Prix */}
        <div className="pt-1 mt-auto">
          <p className="text-base sm:text-lg font-bold text-[#141b2b] tracking-tight">
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
          className="w-full rounded-[0.25rem] bg-[#e59b22] text-xs font-semibold text-white hover:bg-[#d97706] shadow-[0_4px_14px_0_rgba(229,155,34,0.35)] hover:shadow-[0_6px_20px_0_rgba(229,155,34,0.45)] active:scale-[0.98] transition-all cursor-pointer h-9"
        >
          {adding ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <>
              <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
              {isOutOfStock ? "Épuisé" : "Ajouter au panier"}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}