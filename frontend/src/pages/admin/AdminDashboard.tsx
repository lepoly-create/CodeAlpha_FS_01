import { useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/useAuth";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";

import AdminWelcome from "@/components/admin/AdminWelcome";
import AdminStats from "@/components/admin/AdminStats";
import AdminRecentOrders from "@/components/admin/AdminRecentOrders";
import AdminRecentProducts from "@/components/admin/AdminRecentProducts";
import AdminLowStock from "@/components/admin/AdminLowStock";
import AdminQuickActions from "@/components/admin/AdminQuickActions";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    dashboard,
    loading,
    error,
  } = useAdminDashboard();

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
          onViewProducts={() => navigate("/admin/products")}
        />

        <AdminLowStock
          products={dashboard.lowStockProducts}
          onViewProducts={() => navigate("/admin/products")}
        />
      </div>
    </div>
  );
}