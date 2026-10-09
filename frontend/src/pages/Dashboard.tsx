import { useCallback, useEffect, useState } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import DashboardWelcome from "@/components/dashboard/DashboardWelcome";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentOrders from "@/components/dashboard/RecentOrders";
import AccountSummary from "@/components/dashboard/AccountSummary";
import RecommendedProducts from "@/components/dashboard/RecommendedProducts";

import {
  getUserDashboard,
  type UserDashboard,
} from "@/services/dashboard.service";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<UserDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getUserDashboard();
      setDashboard(data);
    } catch (err) {
      console.error("Erreur chargement dashboard :", err);
      setError("Impossible de charger les données de votre tableau de bord.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  /* Skeleton Loading */
  if (loading) {
    return (
      <section className="min-h-screen w-full bg-slate-50/60 p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Welcome Banner Skeleton */}
          <div className="h-56 w-full animate-pulse rounded-3xl bg-slate-200" />

          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-28 animate-pulse rounded-2xl bg-slate-200"
              />
            ))}
          </div>

          {/* Recent Orders + Account Summary Skeleton */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="h-80 animate-pulse rounded-2xl bg-slate-200" />
            <div className="h-80 animate-pulse rounded-2xl bg-slate-200" />
          </div>

          {/* Recommended Skeleton */}
          <div className="h-64 animate-pulse rounded-2xl bg-slate-200" />
        </div>
      </section>
    );
  }

  /* Vue d'erreur */
  if (error || !dashboard) {
    return (
      <section className="min-h-screen w-full bg-slate-50/60 p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <Card className="max-w-md w-full border-rose-200 bg-white shadow-xl rounded-2xl">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 border border-rose-100">
              <AlertCircle className="h-7 w-7" />
            </div>

            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900">
                Oups ! Erreur de connexion
              </h2>
              <p className="text-xs text-slate-500">
                {error || "Impossible de récupérer vos données pour le moment."}
              </p>
            </div>

            <Button
              onClick={fetchDashboard}
              className="mt-2 flex items-center gap-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs"
            >
              <RefreshCw className="h-4 w-4" />
              Réessayer
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  const { user, statistics, recentOrders, recommendedProducts } = dashboard;

  return (
    <section className="min-h-screen w-full bg-slate-50/60 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* 1. Hero Welcome */}
        <DashboardWelcome
          user={user}
          onExploreProducts={() => navigate("/products")}
        />

        {/* 2. Key Stats */}
        <DashboardStats statistics={statistics} />

        {/* 3. Orders + Account Grid */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] items-stretch">
          <RecentOrders
            orders={recentOrders}
            onViewAll={() => navigate("/orders")}
            onViewOrderDetails={(id) => navigate(`/orders/${id}`)}
          />

          <AccountSummary
            user={user}
            onViewProfile={() => navigate("/profile")}
          />
        </div>

        {/* 4. Recommendations */}
        <RecommendedProducts
          products={recommendedProducts}
          onViewProducts={() => navigate("/products")}
          onSelectProduct={(id) => navigate(`/products/${id}`)}
        />
      </div>
    </section>
  );
}