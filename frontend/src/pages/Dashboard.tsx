import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import DashboardWelcome from "@/components/dashboard/DashboardWelcome";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentOrders from "@/components/dashboard/RecentOrders";
import AccountSummary from "@/components/dashboard/AccountSummary";

import {
  getUserDashboard,
  type UserDashboard,
} from "@/services/dashboard.service";
import RecommendedProducts from "@/components/dashboard/RecommendedProducts";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<UserDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getUserDashboard();

        setDashboard(data);
      } catch (error) {
        console.error(
          "Erreur lors du chargement du dashboard :",
          error
        );

        setError(
          "Impossible de charger votre tableau de bord."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <section className="space-y-8">
        <div>
          <div className="h-4 w-32 animate-pulse rounded bg-neutral-100" />

          <div className="mt-3 h-10 w-72 animate-pulse rounded bg-neutral-100" />

          <div className="mt-3 h-5 w-96 animate-pulse rounded bg-neutral-100" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-2xl bg-neutral-100"
            />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="h-80 animate-pulse rounded-2xl bg-neutral-100 lg:col-span-2" />

          <div className="h-80 animate-pulse rounded-2xl bg-neutral-100" />
        </div>
      </section>
    );
  }

  if (error || !dashboard) {
    return (
      <section className="space-y-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
            MarketElectro
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Tableau de bord
          </h1>

          <p className="mt-2 text-neutral-500">
            Retrouvez ici un aperçu de votre activité.
          </p>
        </div>

        <Card className="rounded-2xl border-red-200 bg-red-50">
          <CardContent className="flex items-center gap-3 p-6 text-red-600">
            <Loader2 className="h-5 w-5" />

            <p>
              {error || "Impossible de récupérer vos données."}
            </p>
          </CardContent>
        </Card>
      </section>
    );
  }

  const { user, statistics } = dashboard;

  return (
    <section className="space-y-8">
      {/* Header */}
      <DashboardWelcome
        user={user}
        onExploreProducts={() => {
            window.location.href = "/products";
        }}
        />
        <DashboardStats statistics={statistics} />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <RecentOrders
            orders={dashboard.recentOrders}
            onViewAll={() => {}}
          />

          <AccountSummary
            user={dashboard.user}
            onViewProfile={() => navigate("/profile")}
          />
        </div>
        <RecommendedProducts
          products={dashboard.recommendedProducts}
          onViewProducts={() => navigate("/products")}
        />
        

      
    </section>
  );
}