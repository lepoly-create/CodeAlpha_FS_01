import {
  useCallback,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  addToCart as addToCartRequest,
  getCart,
  type Cart,
} from "@/services/cart.service";

import { useAuth } from "@/contexts/AuthContext";

interface CartContextValue {
  cart: Cart | null;
  cartCount: number;
  loading: boolean;
  refreshCart: () => Promise<void>;
  addToCart: (
    productId: string,
    quantity?: number,
  ) => Promise<void>;
}

const CartContext = createContext<
  CartContextValue | undefined
>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({
  children,
}: CartProviderProps) {
  const { user } = useAuth();

  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    if (!user) {
      setCart(null);
      return;
    }

    try {
      setLoading(true);

      const data = await getCart();
      console.log("Réponse GET /api/cart :", data);

      setCart(data);
    } catch (error) {
      console.error(
        "Impossible de récupérer le panier :",
        error,
      );
    } finally {
      setLoading(false);
    }
  }, [user]);

  const addToCart = async (
    productId: string,
    quantity = 1,
  ) => {
    const updatedCart = await addToCartRequest({
      productId,
      quantity,
    });

    setCart(updatedCart);
  };

  const cartCount = useMemo(() => {
  if (!cart) {
    return 0;
  }

  return cart.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );
}, [cart]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void refreshCart();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [refreshCart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        loading,
        refreshCart,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart doit être utilisé à l'intérieur de CartProvider.",
    );
  }

  return context;
}