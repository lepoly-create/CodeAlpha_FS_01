import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

export default function CartButton() {
  const { cartCount } = useCart();

  return (
    <Link
      to="/cart"
      className="relative flex h-9 w-9 items-center justify-center rounded-[0.25rem] border border-[#e5e7eb] bg-white text-[#141b2b] transition-all hover:bg-[#f1f3ff] hover:text-[#835500] active:scale-95 shadow-xs"
      aria-label={`Panier contenant ${cartCount} article${cartCount > 1 ? "s" : ""
        }`}
    >
      <ShoppingBag className="h-4 w-4 text-[#141b2b]" />

      {cartCount > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 animate-in zoom-in-50 items-center justify-center rounded-full bg-[#e59b22] px-1 text-[9px] font-bold text-white shadow-[0_2px_8px_rgba(229,155,34,0.4)]">
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </Link>
  );
}