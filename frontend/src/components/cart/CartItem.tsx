import { useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format-price";

import type { CartItem as CartItemData } from "@/types/cart";

interface CartItemProps {
  item: CartItemData;
  onUpdateQuantity: (
    productId: string,
    quantity: number,
  ) => Promise<void>;
  onRemoveItem: (
    productId: string,
  ) => Promise<void>;
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemProps) {
  const [isUpdating, setIsUpdating] =
    useState(false);

  const product = item.product;
  const productId = product._id;

  const handleUpdateQuantity = async (
    quantity: number,
  ) => {
    if (quantity < 1 || isUpdating) {
      return;
    }

    try {
      setIsUpdating(true);

      await onUpdateQuantity(
        productId,
        quantity,
      );
    } catch (error) {
      console.error(
        "Erreur lors de la modification de la quantité :",
        error,
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveItem = async () => {
    if (isUpdating) {
      return;
    }

    try {
      setIsUpdating(true);

      await onRemoveItem(productId);
    } catch (error) {
      console.error(
        "Erreur lors de la suppression du produit :",
        error,
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <article
      className="flex gap-3 rounded-2xl border border-neutral-200 bg-white p-3 sm:gap-5 sm:p-4"
    >
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100 sm:h-28 sm:w-28">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            {product.category}
          </p>

          <h2 className="mt-1 line-clamp-2 text-base font-semibold sm:text-lg">
            {product.name}
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            {formatPrice(product.price)}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center rounded-lg border border-neutral-200">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-none"
              disabled={
                item.quantity <= 1 ||
                isUpdating
              }
              onClick={() =>
                void handleUpdateQuantity(
                  item.quantity - 1,
                )
              }
              aria-label={`Diminuer la quantité de ${product.name}`}
            >
              <Minus className="h-4 w-4" />
            </Button>

            <span className="flex h-9 min-w-10 items-center justify-center border-x border-neutral-200 text-sm font-medium">
              {isUpdating
                ? "..."
                : item.quantity}
            </span>

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-none"
              disabled={isUpdating}
              onClick={() =>
                void handleUpdateQuantity(
                  item.quantity + 1,
                )
              }
              aria-label={`Augmenter la quantité de ${product.name}`}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-500 hover:text-red-600"
            disabled={isUpdating}
            onClick={() =>
              void handleRemoveItem()
            }
            aria-label={`Supprimer ${product.name} du panier`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="hidden text-right sm:block">
        <p className="font-semibold">
          {formatPrice(
            product.price * item.quantity,
          )}
        </p>
      </div>
    </article>
  );
}