import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";

import {
  getAdminDashboard,
  type AdminDashboard as AdminDashboardData,
} from "@/services/admin.service";

import AdminWelcome from "@/components/admin/AdminWelcome";
import AdminStats from "@/components/admin/AdminStats";
import AdminRecentOrders from "@/components/admin/AdminRecentOrders";
import AdminRecentProducts from "@/components/admin/AdminRecentProducts";
import AdminLowStock from "@/components/admin/AdminLowStock";
import AdminQuickActions from "@/components/admin/AdminQuickActions";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [dashboard, setDashboard] =
    useState<AdminDashboardData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAdminDashboard();

        setDashboard(data);
      } catch (err: unknown) {
        const message =
          err &&
          typeof err === "object" &&
          "response" in err &&
          err.response &&
          typeof err.response === "object" &&
          "data" in err.response &&
          err.response.data &&
          typeof err.response.data === "object" &&
          "message" in err.response.data &&
          typeof err.response.data.message === "string"
            ? err.response.data.message
            : null;

        setError(
          message ||
            "Impossible de charger le dashboard administrateur.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-neutral-500">
          Chargement du dashboard...
        </p>
      </div>
    );
  }

  if (error || !dashboard || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-neutral-950">
            Impossible de charger le dashboard
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            {error || "Une erreur est survenue."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminWelcome user={user} />

      <AdminStats statistics={dashboard.statistics} />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <AdminRecentOrders
          orders={dashboard.recentOrders}
          onViewOrders={() => navigate("/admin/orders")}
        />

        <AdminQuickActions
          onProducts={() => navigate("/admin/products")}
          onOrders={() => navigate("/admin/orders")}
          onUsers={() => navigate("/admin/users")}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminRecentProducts
          products={dashboard.recentProducts}
          onViewProducts={() =>
            navigate("/admin/products")
          }
        />

        <AdminLowStock
          products={dashboard.lowStockProducts}
          onViewProducts={() =>
            navigate("/admin/products")
          }
        />
      </div>
    </div>
  );
}