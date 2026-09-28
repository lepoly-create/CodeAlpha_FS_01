import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "@/services/favorite.service";

export default function useProductFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [pendingFavoriteIds, setPendingFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favorites = await getFavorites();

        setFavoriteIds(
          favorites.map((product) => product._id),
        );
      } catch (error) {
        console.error(
          "Erreur lors du chargement des favoris :",
          error,
        );

        toast.error(
          "Impossible de charger vos favoris.",
        );
      }
    };

    loadFavorites();
  }, []);

  const addProductToFavorites = async (productId: string) => {
    if (pendingFavoriteIds.includes(productId)) {
      return;
    }

    setPendingFavoriteIds((current) => [
      ...current,
      productId,
    ]);

    try {
      await addFavorite(productId);

      setFavoriteIds((current) =>
        current.includes(productId)
          ? current
          : [...current, productId],
      );

      toast.success("Produit ajouté aux favoris.");
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout aux favoris :",
        error,
      );

      toast.error(
        "Impossible d'ajouter ce produit aux favoris.",
      );
    } finally {
      setPendingFavoriteIds((current) =>
        current.filter((id) => id !== productId),
      );
    }
  };

  const removeProductFromFavorites = async (productId: string) => {
    if (pendingFavoriteIds.includes(productId)) {
      return;
    }

    setPendingFavoriteIds((current) => [
      ...current,
      productId,
    ]);

    try {
      await removeFavorite(productId);

      setFavoriteIds((current) =>
        current.filter((id) => id !== productId),
      );

      toast.success("Produit retiré des favoris.");
    } catch (error) {
      console.error(
        "Erreur lors de la suppression des favoris :",
        error,
      );

      toast.error(
        "Impossible de retirer ce produit des favoris.",
      );
    } finally {
      setPendingFavoriteIds((current) =>
        current.filter((id) => id !== productId),
      );
    }
  };

  return {
    favoriteIds,
    pendingFavoriteIds,
    addProductToFavorites,
    removeProductFromFavorites,
  };
}