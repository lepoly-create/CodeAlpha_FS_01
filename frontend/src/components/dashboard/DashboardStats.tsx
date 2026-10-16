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
      color: "text-[#0053db]",
      bgColor: "bg-[#e9edff]",
      borderColor: "border-[#0053db]/20",
    },
    {
      label: "En traitement",
      value: statistics.pendingOrders,
      description: "Commandes en attente",
      icon: Clock3,
      color: "text-[#835500]",
      bgColor: "bg-[#ffddb5]/60",
      borderColor: "border-[#835500]/20",
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
      color: "text-[#835500]",
      bgColor: "bg-[#ffddb5]/60",
      borderColor: "border-[#e59b22]/30",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.label}
            className="rounded-lg border border-[#e5e7eb] bg-white shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#524535]">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold tracking-tight text-[#141b2b]">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#524535]/80">
                    {stat.description}
                  </p>
                </div>

                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.25rem] border ${stat.bgColor} ${stat.borderColor} ${stat.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}