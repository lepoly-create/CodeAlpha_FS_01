import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartEmptyState() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-7xl flex-col items-center justify-center px-4 py-10 text-center sm:px-6 sm:py-12">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
        <ShoppingBag className="h-7 w-7 text-neutral-500" />
      </div>

      <h1 className="mt-6 text-3xl font-bold tracking-tight">
        Your cart is empty
      </h1>

      <p className="mt-2 max-w-md text-neutral-500">
        Discover our latest electronics and add
        your favorite products to your cart.
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