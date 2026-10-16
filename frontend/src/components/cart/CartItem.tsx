import { useState } from "react";
import { Minus, Plus, Trash2, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format-price";
import type { CartItem as CartItemData } from "@/types/cart";

interface CartItemProps {
  item: CartItemData;
  onUpdateQuantity: (productId: string, quantity: number) => Promise<void>;
  onRemoveItem: (productId: string) => Promise<void>;
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const product = item.product;
  const productId = product._id;

  const handleUpdateQuantity = async (quantity: number) => {
    if (quantity < 1 || isUpdating || isRemoving) return;

    try {
      setIsUpdating(true);
      await onUpdateQuantity(productId, quantity);
    } catch (error) {
      console.error("Erreur lors de la modification de la quantité :", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveItem = async () => {
    if (isUpdating || isRemoving) return;

    try {
      setIsRemoving(true);
      await onRemoveItem(productId);
    } catch (error) {
      console.error("Erreur lors de la suppression du produit :", error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <article className="group relative flex gap-3 sm:gap-4 rounded-lg border border-[#e5e7eb] bg-white p-3.5 shadow-xs transition-all hover:border-[#e59b22]/50">
      {/* Vignette Produit */}
      <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-[0.25rem] bg-[#f9f9ff] p-2 border border-[#e5e7eb] flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain transition-transform group-hover:scale-105"
        />
      </div>

      {/* Infos & Contrôles */}
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#524535]/70">
              {product.category}
            </span>
            <h3 className="line-clamp-1 text-xs sm:text-sm font-semibold text-[#141b2b]">
              {product.name}
            </h3>
            <p className="mt-0.5 text-xs sm:text-sm font-bold text-[#141b2b] sm:hidden">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Bouton Suppression */}
          <Button
            variant="ghost"
            size="icon"
            disabled={isUpdating || isRemoving}
            onClick={() => void handleRemoveItem()}
            className="h-8 w-8 text-[#524535]/60 hover:text-[#ba1a1a] hover:bg-[#ffdad6]/50 rounded-[0.25rem] transition-colors -mr-1"
            aria-label={`Supprimer ${product.name} du panier`}
          >
            {isRemoving ? (
              <Loader2 className="h-4 w-4 animate-spin text-[#ba1a1a]" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          {/* Sélecteur de Quantité */}
          <div className="flex items-center rounded-[0.25rem] border border-[#e5e7eb] bg-[#f1f3ff] p-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-[0.25rem] cursor-pointer text-[#141b2b] hover:bg-white disabled:opacity-40"
              disabled={item.quantity <= 1 || isUpdating || isRemoving}
              onClick={() => void handleUpdateQuantity(item.quantity - 1)}
              aria-label={`Diminuer la quantité`}
            >
              <Minus className="h-3.5 w-3.5" />
            </Button>

            <span className="flex h-7 min-w-8 items-center justify-center text-xs font-bold text-[#141b2b]">
              {isUpdating ? (
                <Loader2 className="h-3 w-3 animate-spin text-[#524535]" />
              ) : (
                item.quantity
              )}
            </span>

            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-[0.25rem] cursor-pointer text-[#141b2b] hover:bg-white disabled:opacity-40"
              disabled={isUpdating || isRemoving}
              onClick={() => void handleUpdateQuantity(item.quantity + 1)}
              aria-label={`Augmenter la quantité`}
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Prix Total pour cet article (Desktop) */}
          <div className="hidden sm:block text-right">
            <p className="text-xs text-[#524535]/70">Total unitaire</p>
            <p className="text-sm font-bold text-[#141b2b]">
              {formatPrice(product.price * item.quantity)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}