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
    <article className="group relative flex gap-3 sm:gap-4 rounded-xl border-0 border-slate-200/80 bg-white p-3.5 shadow-sm transition-all hover:border-slate-300">
      {/* Vignette Produit */}
      <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl bg-slate-50 p-2 border-0 border-slate-100 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain transition-transform group-hover:scale-105"
        />
      </div>

      {/* Infos & Contrôles */}
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {product.category}
            </span>
            <h3 className="line-clamp-1 text-xs sm:text-sm font-semibold text-slate-900">
              {product.name}
            </h3>
            <p className="mt-0.5 text-xs sm:text-sm font-bold text-slate-900 sm:hidden">
              {formatPrice(product.price)}
            </p>
          </div>

          {/* Bouton Suppression */}
          <Button
            variant="ghost"
            size="icon"
            disabled={isUpdating || isRemoving}
            onClick={() => void handleRemoveItem()}
            className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors -mr-1"
            aria-label={`Supprimer ${product.name} du panier`}
          >
            {isRemoving ? (
              <Loader2 className="h-4 w-4 animate-spin text-red-600" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          {/* Sélecteur de Quantité */}
          <div className="flex items-center rounded-xl border-0 border-slate-200 bg-slate-50/50 p-0.5">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg cursor-pointer text-slate-600 hover:bg-white hover:text-slate-900 disabled:opacity-40"
              disabled={item.quantity <= 1 || isUpdating || isRemoving}
              onClick={() => void handleUpdateQuantity(item.quantity - 1)}
              aria-label={`Diminuer la quantité`}
            >
              <Minus className="h-4 w-4" />
            </Button>

            <span className="flex h-7 min-w-8 items-center justify-center text-xs font-bold text-slate-900">
              {isUpdating ? (
                <Loader2 className="h-3 w-3 animate-spin text-slate-400" />
              ) : (
                item.quantity
              )}
            </span>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg cursor-pointer text-slate-600 hover:bg-white hover:text-slate-900 disabled:opacity-40"
              disabled={isUpdating || isRemoving}
              onClick={() => void handleUpdateQuantity(item.quantity + 1)}
              aria-label={`Augmenter la quantité`}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Prix Total pour cet article (Desktop) */}
          <div className="hidden sm:block text-right">
            <p className="text-xs text-slate-400">Total unitaire</p>
            <p className="text-sm font-extrabold text-slate-900">
              {formatPrice(product.price * item.quantity)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}