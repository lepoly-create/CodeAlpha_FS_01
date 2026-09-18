import { ArrowLeft, ShoppingBag } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { createOrder } from "@/services/order.service";
import { formatPrice } from "@/lib/format-price";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const { cart, cartCount } = useCart();
  const [loading, setLoading] = useState(false);

  

  if (!cart || cart.items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-10 text-center sm:px-6 sm:py-12">
        <ShoppingBag className="h-10 w-10 text-neutral-400" />

        <h1 className="mt-6 text-3xl font-bold">
          Your cart is empty
        </h1>

        <p className="mt-2 text-neutral-500">
          Add some products before proceeding to checkout.
        </p>

        <Link
          to="/products"
          className="mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Continue shopping
        </Link>
      </section>
    );
  }

  const subtotal = cart.items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0,
  );

  const handleCreateOrder = async () => {
  try {
    setLoading(true);

    await createOrder();

    toast.success("Commande créée avec succès.");

    navigate("/dashboard");
  } catch (error: unknown) {
    toast.error(
      (axios.isAxiosError(error) && error.response?.data?.message) ||
        "Impossible de créer la commande."
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <Link
        to="/cart"
        className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to cart
      </Link>

      <div className="mt-6">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Checkout
        </h1>

        <p className="mt-2 text-neutral-500">
          Review your order before continuing.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
        <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
          <h2 className="text-lg font-semibold sm:text-xl">
            Order items
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            {cartCount}{" "}
            {cartCount === 1 ? "item" : "items"}
          </p>

          <div className="mt-6 divide-y divide-neutral-200">
            {cart.items.map((item) => (
              <div
                key={`${item.product._id}-${item.quantity}`}
                className="flex gap-3 py-5 first:pt-0 sm:gap-4"
              >
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-neutral-100 sm:h-20 sm:w-20">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs uppercase tracking-wider text-neutral-500">
                    {item.product.category}
                  </p>

                  <h3 className="mt-1 truncate font-semibold">
                    {item.product.name}
                  </h3>

                  <p className="mt-1 text-sm text-neutral-500">
                    {formatPrice(item.product.price)} ×{" "}
                    {item.quantity}
                  </p>
                </div>

                <p className="shrink-0 text-sm font-semibold sm:text-base">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <h2 className="text-lg font-semibold sm:text-xl">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-500">
                Subtotal
              </span>

              <span className="font-medium">
                {formatPrice(subtotal)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-neutral-500">
                Shipping
              </span>

              <span className="font-medium">
                Free
              </span>
            </div>

            <div className="border-t border-neutral-200 pt-4">
              <div className="flex justify-between">
                <span className="font-semibold">
                  Total
                </span>

                <span className="text-xl font-bold">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleCreateOrder}
            disabled={loading}
            className="mt-6 h-12 w-full rounded-xl"
          >
            {loading ? "Creating order..." : "Place order"}
          </Button>
        </aside>
      </div>
    </section>
  );
}
