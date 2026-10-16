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
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#e59b22] border-t-transparent" />
        <p className="text-xs sm:text-sm font-semibold text-[#524535]">
          Chargement du tableau de bord administrateur...
        </p>
      </div>
    );
  }

  if (error || !dashboard || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg border border-[#e5e7eb] bg-white p-6 text-center shadow-xs">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[0.25rem] bg-[#ffdad6]/60 text-[#ba1a1a]">
            <span className="text-xl font-bold">!</span>
          </div>
          <h2 className="mt-4 text-base font-bold text-[#141b2b]">
            Impossible de charger le tableau de bord
          </h2>
          <p className="mt-1.5 text-xs text-[#524535]">
            {error || "Une erreur est survenue lors de la récupération des données."}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 inline-flex h-9 items-center justify-center rounded-[0.25rem] bg-[#1a1c20] px-4 text-xs font-semibold text-white transition hover:bg-[#e59b22] cursor-pointer"
          >
            Réessayer
          </button>
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