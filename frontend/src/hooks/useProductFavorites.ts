import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "@/services/favorite.service";

function getErrorStatus(error: unknown): number | undefined {
  if (typeof error !== "object" || error === null) {
    return undefined;
  }

  const errorRecord = error as Record<string, unknown>;
  const response = errorRecord.response;

  if (typeof response === "object" && response !== null) {
    const responseStatus = (response as Record<string, unknown>).status;

    if (typeof responseStatus === "number") {
      return responseStatus;
    }
  }

  return typeof errorRecord.status === "number"
    ? errorRecord.status
    : undefined;
}

export default function useProductFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [pendingFavoriteIds, setPendingFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadFavorites = async () => {
      try {
        const favorites = await getFavorites();

        if (isMounted) {
          setFavoriteIds(favorites.map((product) => product._id));
        }
      } catch (error: unknown) {
        console.error("Erreur lors du chargement des favoris :", error);

        // Détection du statut d'authentification (compatible Axios et Fetch)
        const status = getErrorStatus(error);
        const isUnauthorized = status === 401 || status === 403;

        // Ne déclencher le toast d'erreur QUE si ce n'est PAS un problème d'authentification
        if (!isUnauthorized && isMounted) {
          toast.error("Impossible de charger vos favoris.");
        }
      }
    };

    void loadFavorites();

    return () => {
      isMounted = false;
    };
  }, []);

  const addProductToFavorites = async (productId: string) => {
    if (pendingFavoriteIds.includes(productId)) {
      return;
    }

    setPendingFavoriteIds((current) => [...current, productId]);

    try {
      await addFavorite(productId);

      setFavoriteIds((current) =>
        current.includes(productId) ? current : [...current, productId],
      );

      toast.success("Produit ajouté aux favoris.");
    } catch (error: unknown) {
      console.error("Erreur lors de l'ajout aux favoris :", error);

      const status = getErrorStatus(error);
      if (status === 401 || status === 403) {
        toast.error("Veuillez vous connecter pour ajouter des favoris.");
      } else {
        toast.error("Impossible d'ajouter ce produit aux favoris.");
      }
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

    setPendingFavoriteIds((current) => [...current, productId]);

    try {
      await removeFavorite(productId);

      setFavoriteIds((current) =>
        current.filter((id) => id !== productId),
      );

      toast.success("Produit retiré des favoris.");
    } catch (error: unknown) {
      console.error("Erreur lors de la suppression des favoris :", error);

      const status = getErrorStatus(error);
      if (status === 401 || status === 403) {
        toast.error("Veuillez vous connecter pour gérer vos favoris.");
      } else {
        toast.error("Impossible de retirer ce produit des favoris.");
      }
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