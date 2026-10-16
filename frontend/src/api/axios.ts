import axios from "axios";

const rawBaseUrl = (import.meta.env.VITE_API_URL || "/api").trim();

const api = axios.create({
  baseURL: rawBaseUrl.replace(/\/+$/, ""),
  timeout: 15000, // 15 secondes pour éviter de bloquer indéfiniment
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Intercepteur de réponse pour gérer l'invalidation automatique du JWT et les erreurs 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const hadToken = Boolean(localStorage.getItem("token"));
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      const publicPaths = ["/", "/login", "/register", "/products", "/contact", "/privacy-policy", "/terms", "/verify-email"];
      const isPublicPath = publicPaths.some(
        (path) => window.location.pathname === path || window.location.pathname.startsWith(path + "/")
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