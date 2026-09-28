/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  addToCart as addToCartRequest,
  getCart,
  updateCartItem,
  removeFromCart,
} from "@/services/cart.service";

import { useAuth } from "@/contexts/useAuth";
import type { Cart } from "@/types/cart";

interface CartContextValue {
  cart: Cart | null;
  cartCount: number;
  loading: boolean;

  refreshCart: () => Promise<void>;

  addToCart: (
    productId: string,
    quantity?: number,
  ) => Promise<void>;

  updateQuantity: (
    productId: string,
    quantity: number,
  ) => Promise<void>;

  removeItem: (
    productId: string,
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
  const userId = user?.id ?? null;

  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(
    Boolean(userId),
  );

  /*
   * Identifiant de requête.
   *
   * Il permet d'empêcher une ancienne requête GET /cart
   * de remplacer l'état produit par une requête plus récente.
   */
  const requestIdRef = useRef(0);

  /*
   * Chargement / actualisation du panier
   */
  const refreshCart = useCallback(async () => {
    const requestId = ++requestIdRef.current;

    if (!userId) {
      setCart(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const data = await getCart();

      /*
       * Seule la requête la plus récente peut mettre
       * à jour l'état du panier.
       */
      if (requestId === requestIdRef.current) {
        setCart(data);
      }
    } catch (error) {
      if (requestId === requestIdRef.current) {
        console.error(
          "Impossible de récupérer le panier :",
          error,
        );
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, [userId]);

  /*
   * Charger automatiquement le panier lorsque
   * l'utilisateur authentifié change.
   */
  useEffect(() => {
    refreshCart();

    return () => {
      requestIdRef.current += 1;
    };
  }, [refreshCart]);

  /*
   * Ajouter un produit
   */
  const addToCart = useCallback(
    async (
      productId: string,
      quantity = 1,
    ) => {
      try {
        const updatedCart =
          await addToCartRequest({
            productId,
            quantity,
          });

        setCart(updatedCart);
      } catch (error) {
        console.error(
          "Impossible d'ajouter le produit au panier :",
          error,
        );

        throw error;
      }
    },
    [],
  );

  /*
   * Modifier la quantité
   */
  const updateQuantity = useCallback(
    async (
      productId: string,
      quantity: number,
    ) => {
      if (quantity < 1) {
        return;
      }

      try {
        const updatedCart =
          await updateCartItem(
            productId,
            quantity,
          );

        setCart(updatedCart);
      } catch (error) {
        console.error(
          "Impossible de modifier la quantité :",
          error,
        );

        throw error;
      }
    },
    [],
  );

  /*
   * Supprimer un produit
   */
  const removeItem = useCallback(
    async (productId: string) => {
      try {
        const updatedCart =
          await removeFromCart(productId);

        setCart(updatedCart);
      } catch (error) {
        console.error(
          "Impossible de supprimer le produit :",
          error,
        );

        throw error;
      }
    },
    [],
  );

  /*
   * Nombre total d'articles
   */
  const cartCount = cart
    ? cart.items.reduce(
        (total, item) =>
          total + item.quantity,
        0,
      )
    : 0;

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      cartCount,
      loading,
      refreshCart,
      addToCart,
      updateQuantity,
      removeItem,
    }),
    [
      cart,
      cartCount,
      loading,
      refreshCart,
      addToCart,
      updateQuantity,
      removeItem,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart doit être utilisé à l'intérieur de CartProvider.",
    );
  }

  return context;
}