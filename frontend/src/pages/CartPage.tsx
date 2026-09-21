import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/format-price";

import OrderSummary from "@/components/cart/OrderSummary";

export default function CartPage() {
  const {
    cart,
    cartCount,
    loading,
    updateQuantity,
    removeItem,
  } = useCart();

  const [updatingItem, setUpdatingItem] = useState<string | null>(
    null,
  );

  const handleUpdateQuantity = async (
    productId: string,
    quantity: number,
  ) => {
    if (quantity < 1 || updatingItem) {
      return;
    }

    try {
      setUpdatingItem(productId);

      await updateQuantity(productId, quantity);
    } catch (error) {
      console.error(
        "Erreur lors de la modification de la quantité :",
        error,
      );
    } finally {
      setUpdatingItem(null);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    if (updatingItem) {
      return;
    }

    try {
      setUpdatingItem(productId);

      await removeItem(productId);
    } catch (error) {
      console.error(
        "Erreur lors de la suppression du produit :",
        error,
      );
    } finally {
      setUpdatingItem(null);
    }
  };

  if (loading) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4 py-10 sm:px-6 sm:py-12">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-primary" />

          <p className="mt-4 text-sm text-neutral-500">
            Loading your cart...
          </p>
        </div>
      </section>
    );
  }

  type CartItemWithProduct = {
    _id?: string;
    productId: string;
    quantity: number;
    product?: {
      _id: string;
      name: string;
      price: number;
      image: string;
      category: string;
    };
  };

  const cartWithProducts = cart as
    | { items: CartItemWithProduct[] } 
    | null;

  if (!cartWithProducts || cartWithProducts.items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-10 text-center sm:px-6 sm:py-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
          <ShoppingBag className="h-7 w-7 text-neutral-500" />
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight">
          Your cart is empty
        </h1>

        <p className="mt-2 max-w-md text-neutral-500">
          Discover our latest electronics and add your
          favorite products to your cart.
        </p>

        <Link
          to="/products"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Continue shopping
        </Link>
      </section>
    );
  }

  const subtotal = cartWithProducts.items.reduce(
    (total, item) =>
      total + (item.product?.price ?? 0) * item.quantity,
    0,
  );

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <ShoppingBag className="h-4 w-4" />
          <span>Shopping cart</span>
        </div>

        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          My Cart
        </h1>

        <p className="mt-2 text-neutral-500">
          {cartCount}{" "}
          {cartCount === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      {/* Content */}
      <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
        {/* Products */}
        <div className="space-y-4">
          {cartWithProducts.items.map((item) => {
            const product = item.product;

            if (!product) {
              return null;
            }

            const productId = product._id;
            const isUpdating = updatingItem === productId;

            return (
              <article
                key={item._id ?? productId}
                className="flex gap-3 rounded-2xl border border-neutral-200 bg-white p-3 sm:gap-5 sm:p-4"
              >
                {/* Image */}
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100 sm:h-28 sm:w-28">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Product information */}
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

                  {/* Quantity + remove */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-neutral-200">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-none"
                        disabled={
                          item.quantity <= 1 || isUpdating
                        }
                        onClick={() =>
                          handleUpdateQuantity(
                            productId,
                            item.quantity - 1,
                          )
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>

                      <span className="flex h-9 min-w-10 items-center justify-center border-x border-neutral-200 text-sm font-medium">
                        {isUpdating ? "..." : item.quantity}
                      </span>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-none"
                        disabled={isUpdating}
                        onClick={() =>
                          handleUpdateQuantity(
                            productId,
                            item.quantity + 1,
                          )
                        }
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
                        handleRemoveItem(productId)
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Item total */}
                <div className="hidden text-right sm:block">
                  <p className="font-semibold">
                    {formatPrice(product.price * item.quantity)}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Summary */}
        <aside className="space-y-2">
          <OrderSummary subtotal={subtotal} />

          <Link
            to="/checkout"
            className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-6 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Proceed to checkout
          </Link>

          <Link
            to="/products"
            className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-neutral-200 text-sm font-medium text-foreground transition-colors hover:bg-neutral-100"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </section>
  );
}