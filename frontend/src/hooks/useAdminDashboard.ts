import { useEffect, useState } from "react";
import axios from "axios";

import {
  getAdminDashboard,
  type AdminDashboard,
} from "@/services/admin.service";

interface ApiErrorResponse {
  message?: string;
}

const DEFAULT_ERROR_MESSAGE =
  "Impossible de charger le dashboard administrateur.";

export function useAdminDashboard() {
  const [dashboard, setDashboard] =
    useState<AdminDashboard | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAdminDashboard();

        if (!ignore) {
          setDashboard(data);
        }
      } catch (error: unknown) {
        if (ignore) {
          return;
        }

        if (axios.isAxiosError<ApiErrorResponse>(error)) {
          setError(
            error.response?.data?.message ??
              DEFAULT_ERROR_MESSAGE,
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
  }, []);

  return {
    dashboard,
    loading,
    error,
  };
}