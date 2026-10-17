import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/contexts/useAuth";
import {
  getUserDashboard,
  type UserDashboard,
} from "@/services/dashboard.service";

interface UseUserDashboardResult {
  dashboard: UserDashboard | null;
  loading: boolean;
  isRevalidating: boolean;
  error: string;
  refresh: () => Promise<void>;
}

interface CachedDashboardEntry {
  userId: string;
  data: UserDashboard;
  timestamp: number;
}

// Cache mémoire client sécurisé : cloisonné STRICTEMENT par identifiant utilisateur (Anti-Data Leak)
let cachedUserDashboard: CachedDashboardEntry | null = null;

// TTL de validité absolue : 60 secondes
const CACHE_TTL_MS = 60 * 1000;
// Seuil de fraîcheur pour revalidation silencieuse en arrière-plan : 15 secondes
const STALE_THRESHOLD_MS = 15 * 1000;

/**
 * Invalider manuellement le cache client du dashboard utilisateur
 */
export function invalidateUserDashboardCache() {
  cachedUserDashboard = null;
}

export function useUserDashboard(): UseUserDashboardResult {
  const { user } = useAuth();
  const currentUserId = user?.id ?? "";

  // Vérifier rigoureusement que le cache en mémoire appartient au compte actif
  const isUserCacheValid =
    Boolean(currentUserId) &&
    cachedUserDashboard !== null &&
    cachedUserDashboard.userId === currentUserId;

  const validCachedData = isUserCacheValid ? cachedUserDashboard!.data : null;

  // Rendu instantané si et seulement si les données de CET utilisateur sont déjà en mémoire
  const [dashboard, setDashboard] = useState<UserDashboard | null>(
    validCachedData
  );
  const [loading, setLoading] = useState<boolean>(!validCachedData);
  const [isRevalidating, setIsRevalidating] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchDashboard = useCallback(
    async (forceLoading = false) => {
      if (!currentUserId) return;

      try {
        const hasMatchingCache =
          cachedUserDashboard !== null &&
          cachedUserDashboard.userId === currentUserId;

        if (forceLoading && !hasMatchingCache) {
          setLoading(true);
        } else {
          setIsRevalidating(true);
        }
        setError("");

        const data = await getUserDashboard();

        cachedUserDashboard = {
          userId: currentUserId,
          data,
          timestamp: Date.now(),
        };
        setDashboard(data);
      } catch (err) {
        console.error("Erreur de chargement du dashboard utilisateur :", err);
        const hasMatchingCache =
          cachedUserDashboard !== null &&
          cachedUserDashboard.userId === currentUserId;

        if (!hasMatchingCache) {
          setError(
            "Impossible de charger les données de votre tableau de bord."
          );
        }
      } finally {
        setLoading(false);
        setIsRevalidating(false);
      }
    },
    [currentUserId]
  );

  useEffect(() => {
    let ignore = false;
    if (!currentUserId) {
      setDashboard(null);
      setLoading(false);
      return;
    }

    const now = Date.now();
    const isUserMatch =
      cachedUserDashboard !== null &&
      cachedUserDashboard.userId === currentUserId;
    const isExpired =
      !isUserMatch || now - cachedUserDashboard!.timestamp >= CACHE_TTL_MS;
    const isFresh =
      isUserMatch &&
      !isExpired &&
      now - cachedUserDashboard!.timestamp < STALE_THRESHOLD_MS;

    // Si le cache de cet utilisateur est très récent (< 15s), aucun appel réseau
    if (isFresh) {
      return;
    }

    // Revalidation transparente en arrière-plan (SWR)
    const load = async () => {
      try {
        if (!isUserMatch) {
          setLoading(true);
        } else {
          setIsRevalidating(true);
        }
        setError("");

        const data = await getUserDashboard();

        if (!ignore) {
          cachedUserDashboard = {
            userId: currentUserId,
            data,
            timestamp: Date.now(),
          };
          setDashboard(data);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Erreur SWR dashboard :", err);
          if (!isUserMatch) {
            setError(
              "Impossible de charger les données de votre tableau de bord."
            );
          }
        }
      } finally {
        if (!ignore) {
          setLoading(false);
          setIsRevalidating(false);
        }
      }
    };

    void load();

    return () => {
      ignore = true;
    };
  }, [currentUserId]);

  return {
    dashboard,
    loading,
    isRevalidating,
    error,
    refresh: () => fetchDashboard(true),
  };
}
