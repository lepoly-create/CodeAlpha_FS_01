import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/contexts/useAuth";

import {
  getAdminDashboard,
  type AdminDashboard,
} from "@/services/admin.service";

interface ApiErrorResponse {
  message?: string;
}

const DEFAULT_ERROR_MESSAGE =
  "Impossible de charger le dashboard administrateur.";

interface CachedAdminDashboardEntry {
  adminId: string;
  data: AdminDashboard;
  timestamp: number;
}

// Cache mémoire client sécurisé : cloisonné strictement par identifiant administrateur
let cachedAdminDashboard: CachedAdminDashboardEntry | null = null;
const STALE_THRESHOLD_MS = 20 * 1000;

export function invalidateAdminDashboardCache() {
  cachedAdminDashboard = null;
}

export function useAdminDashboard() {
  const { user } = useAuth();
  const currentAdminId = user?.role === "admin" ? user.id : "";

  const isAdminCacheValid =
    Boolean(currentAdminId) &&
    cachedAdminDashboard !== null &&
    cachedAdminDashboard.adminId === currentAdminId;

  const validCachedData = isAdminCacheValid ? cachedAdminDashboard!.data : null;

  // Rendu instantané depuis le cache uniquement pour cet administrateur
  const [dashboard, setDashboard] = useState<AdminDashboard | null>(
    validCachedData
  );
  const [loading, setLoading] = useState<boolean>(!validCachedData);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    if (!currentAdminId) {
      setDashboard(null);
      setLoading(false);
      return;
    }

    const now = Date.now();
    const isAdminMatch =
      cachedAdminDashboard !== null &&
      cachedAdminDashboard.adminId === currentAdminId;
    const isFresh =
      isAdminMatch && now - cachedAdminDashboard!.timestamp < STALE_THRESHOLD_MS;

    if (isFresh) {
      return;
    }

    const loadDashboard = async () => {
      try {
        if (!isAdminMatch) {
          setLoading(true);
        }
        setError("");

        const data = await getAdminDashboard();

        if (!ignore) {
          cachedAdminDashboard = {
            adminId: currentAdminId,
            data,
            timestamp: Date.now(),
          };
          setDashboard(data);
        }
      } catch (error: unknown) {
        if (ignore) {
          return;
        }

        if (axios.isAxiosError<ApiErrorResponse>(error)) {
          setError(
            error.response?.data?.message ?? DEFAULT_ERROR_MESSAGE
          );
        } else {
          setError(DEFAULT_ERROR_MESSAGE);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    void loadDashboard();

    return () => {
      ignore = true;
    };
  }, [currentAdminId]);

  return {
    dashboard,
    loading,
    error,
    refresh: () => {
      invalidateAdminDashboardCache();
      setLoading(true);
      void getAdminDashboard()
        .then((data) => {
          if (currentAdminId) {
            cachedAdminDashboard = {
              adminId: currentAdminId,
              data,
              timestamp: Date.now(),
            };
          }
          setDashboard(data);
        })
        .finally(() => setLoading(false));
    },
  };
}