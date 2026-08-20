import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const { cart, cartCount } = useCart();

  

  if (!cart || cart.items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-12 text-center">
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

  const handleContinueToPayment = () => {
    navigate("/payment");
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <Link
        to="/cart"
        className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to cart
      </Link>

      <div className="mt-6">
        <h1 className="text-4xl font-bold tracking-tight">
          Checkout
        </h1>

        <p className="mt-2 text-neutral-500">
          Review your order before continuing.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6">
          <h2 className="text-xl font-semibold">
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
                className="flex gap-4 py-5 first:pt-0"
              >
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
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
                    ${item.product.price.toLocaleString()} ×{" "}
                    {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  $
                  {(
                    item.product.price * item.quantity
                  ).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <h2 className="text-xl font-semibold">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-500">
                Subtotal
              </span>

              <span className="font-medium">
                ${subtotal.toLocaleString()}
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
                  ${subtotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleContinueToPayment}
            className="mt-6 h-12 w-full rounded-xl"
          >
            Continue to payment
          </Button>
        </aside>
      </div>
    </section>
  );
}