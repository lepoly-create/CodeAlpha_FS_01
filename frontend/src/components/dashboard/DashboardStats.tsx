import {
  Heart,
  ShoppingBag,
  ShoppingCart,
  Clock3,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import type {
  DashboardStatistics,
} from "@/services/dashboard.service";

interface DashboardStatsProps {
  statistics: DashboardStatistics;
}

export default function DashboardStats({
  statistics,
}: DashboardStatsProps) {
  const stats = [
    {
      label: "Mes commandes",
      value: statistics.totalOrders,
      description: "Commandes passées",
      icon: ShoppingBag,
    },
    {
      label: "En attente",
      value: statistics.pendingOrders,
      description: "Commandes à traiter",
      icon: Clock3,
    },
    {
      label: "Mes favoris",
      value: statistics.favoriteCount,
      description: "Produits sauvegardés",
      icon: Heart,
    },
    {
      label: "Mon panier",
      value: statistics.cartItemsCount,
      description: "Articles dans votre panier",
      icon: ShoppingCart,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.label}
            className="rounded-2xl border-neutral-200 bg-white shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-neutral-500">
                    {stat.label}
                  </p>

                  <p className="mt-3 text-3xl font-bold tracking-tight text-neutral-950">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-xs text-neutral-400">
                    {stat.description}
                  </p>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100">
                  <Icon className="h-5 w-5 text-neutral-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}