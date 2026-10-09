import {
  Heart,
  ShoppingBag,
  ShoppingCart,
  Clock3,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { DashboardStatistics } from "@/services/dashboard.service";

interface DashboardStatsProps {
  statistics: DashboardStatistics;
}

export default function DashboardStats({ statistics }: DashboardStatsProps) {
  const stats = [
    {
      label: "Mes commandes",
      value: statistics.totalOrders,
      description: "Commandes effectuées",
      icon: ShoppingBag,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
    },
    {
      label: "En traitement",
      value: statistics.pendingOrders,
      description: "Commandes en attente",
      icon: Clock3,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100",
    },
    {
      label: "Mes favoris",
      value: statistics.favoriteCount,
      description: "Produits enregistrés",
      icon: Heart,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-100",
    },
    {
      label: "Mon panier",
      value: statistics.cartItemsCount,
      description: "Articles sélectionnés",
      icon: ShoppingCart,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.label}
            className="rounded-2xl border-slate-200/80 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1 space-x-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold tracking-tight text-slate-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500">
                    {stat.description}
                  </p>
                </div>

                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-0 ${stat.bgColor} ${stat.borderColor}`}
                >
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}