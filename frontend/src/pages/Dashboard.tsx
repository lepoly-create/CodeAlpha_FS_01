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
    let isCancelled = false;

    getUserDashboard()
      .then((data) => {
        if (!isCancelled) {
          setDashboard(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          console.error("Erreur chargement dashboard :", err);
          setError("Impossible de charger les données de votre tableau de bord.");
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  /* Skeleton Loading */
  if (loading) {
    return (
      <section className="min-h-screen w-full bg-[#f9f9ff] p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="mx-auto max-w-7xl space-y-6">
          {/* Welcome Banner Skeleton */}
          <div className="h-52 w-full animate-pulse rounded-lg bg-[#f1f3ff]" />

          {/* Stats Skeleton */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-24 animate-pulse rounded-lg bg-[#f1f3ff]"
              />
            ))}
          </div>

          {/* Recent Orders + Account Summary Skeleton */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="h-80 animate-pulse rounded-lg bg-[#f1f3ff]" />
            <div className="h-80 animate-pulse rounded-lg bg-[#f1f3ff]" />
          </div>

          {/* Recommended Skeleton */}
          <div className="h-64 animate-pulse rounded-lg bg-[#f1f3ff]" />
        </div>
      </section>
    );
  }

  /* Vue d'erreur */
  if (error || !dashboard) {
    return (
      <section className="min-h-screen w-full bg-[#f9f9ff] p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <Card className="max-w-md w-full border border-[#ba1a1a]/20 bg-white shadow-xs rounded-lg">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-[0.25rem] bg-[#ffdad6]/60 text-[#ba1a1a] border border-[#ba1a1a]/20">
              <AlertCircle className="h-6 w-6" />
            </div>

            <div className="space-y-1">
              <h2 className="text-base font-bold text-[#141b2b]">
                Oups ! Erreur de connexion
              </h2>
              <p className="text-xs text-[#524535]">
                {error || "Impossible de récupérer vos données pour le moment."}
              </p>
            </div>

            <Button
              onClick={fetchDashboard}
              className="mt-2 flex items-center gap-2 rounded-[0.25rem] bg-[#1a1c20] text-white hover:bg-[#22252a] text-xs font-semibold px-4 h-9"
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
    <section className="min-h-screen w-full bg-[#f9f9ff] p-4 sm:p-6 lg:p-8">
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