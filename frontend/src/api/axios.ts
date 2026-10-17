import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { invalidateUserDashboardCache } from "@/hooks/useUserDashboard";
import { invalidateOrdersCache } from "@/services/order.service";
import { invalidateAdminDashboardCache } from "@/hooks/useAdminDashboard";

const rawBaseUrl = (import.meta.env.VITE_API_URL || "/api").trim();

const api = axios.create({
  baseURL: rawBaseUrl.replace(/\/+$/, ""),
  timeout: 15000, // 15 secondes pour éviter de bloquer indéfiniment
  headers: {
    "Content-Type": "application/json",
  },
});

// Registre de déduplication des requêtes GET simultanées en vol (In-Flight Request Deduplication)
const pendingGetRequests = new Map<string, Promise<AxiosResponse<unknown>>>();

/**
 * Nettoyage complet de la file d'attente des requêtes en cours
 */
export function clearPendingGetRequests(): void {
  pendingGetRequests.clear();
}

/**
 * Purge de sécurité globale de tous les caches clients (invalidation multi-utilisateurs)
 */
export function purgeAllClientDataCaches(): void {
  pendingGetRequests.clear();
  invalidateUserDashboardCache();
  invalidateOrdersCache();
  invalidateAdminDashboardCache();
}

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Wrapper transparent pour dédupliquer les appels GET concurrents identiques
const originalGet = api.get.bind(api);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
api.get = (function (url: string, config?: any) {
  const token = localStorage.getItem("token") || "";
  const key = `${url}:${JSON.stringify(config?.params || {})}:${token}`;

  const existing = pendingGetRequests.get(key);
  if (existing) {
    return existing;
  }

  const promise = originalGet(url, config).finally(() => {
    pendingGetRequests.delete(key);
  });

  pendingGetRequests.set(key, promise);
  return promise;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any) as typeof api.get;

// Intercepteur de réponse pour gérer l'invalidation automatique du JWT et les erreurs 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const hadToken = Boolean(localStorage.getItem("token"));
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Purge de sécurité immédiate des caches en mémoire pour éviter toute fuite de données
      purgeAllClientDataCaches();

      const publicPaths = [
        "/",
        "/login",
        "/register",
        "/products",
        "/contact",
        "/privacy-policy",
        "/terms",
        "/verify-email",
      ];
      const isPublicPath = publicPaths.some(
        (path) =>
          window.location.pathname === path ||
          window.location.pathname.startsWith(path + "/")
      );

      // Si l'utilisateur avait une session expirée et navigue sur une page privée, rediriger proprement
      if (hadToken && !isPublicPath) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;