import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

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
    console.error(
      "Erreur lors de l'ajout au panier :",
      error,
    );

    toast.error("Impossible d'ajouter le produit au panier");
  } finally {
    setAdding(false);
  }
};
  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-none transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <div className="relative flex aspect-5/4 items-center justify-center overflow-hidden bg-neutral-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-110"
        />

        {/* Favorite */}
        <Button
          variant="secondary"
          size="icon"
          disabled={favoritePending}
          className="absolute cursor-pointer right-3 top-3 h-8 w-8 rounded-full bg-white shadow-sm hover:bg-white"
          aria-label={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          onClick={() => {
            if (isFavorite) {
              onRemoveFavorite(product._id);
            } else {
              onAddFavorite(product._id);
            }
          }}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-neutral-600"
            }`}
          />
        </Button>

        {/* Stock */}
        {product.stock <= 5 && (
          <span className="absolute left-3 
          top-3 rounded-full bg-black px-2.5 
          py-1 text-[11px] font-medium text-white">
            Low stock
          </span>
        )}
      </div>

      <CardContent className="flex space-y-0 p-3">
        
        {/* Category */}
        <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-500">
          {product.category}
        </p>

        {/* Name */}
        <h3 className="line-clamp-1 text-base font-semibold leading-snug">
          {product.name}
        </h3>

        {/* Description */}
        <p className="line-clamp-2 text-sm leading-snug text-neutral-500">
          {product.description}
        </p>

        {/* Price */}
        <p className="pt-1 text-lg font-bold">
          ${product.price.toLocaleString()}
        </p>
      </CardContent>

      <CardFooter className="relative bottom-5 left-0 p-6 pt-0 pb-0">
        <Button className="w-full"
          onClick={handleAddToCart}
          disabled={adding || product.stock === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />

          {product.stock === 0
            ? "Out of stock"
            : "Add to cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}