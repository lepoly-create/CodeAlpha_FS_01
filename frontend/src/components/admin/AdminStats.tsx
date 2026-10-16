import {
  ShoppingBag,
  Package,
  Users,
  Wallet,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import type { AdminStatistics } from "@/services/admin.service";
import { formatPrice } from "@/lib/format-price";

interface AdminStatsProps {
  statistics: AdminStatistics;
}

export default function AdminStats({
  statistics,
}: AdminStatsProps) {
  const stats = [
    {
      label: "Produits",
      value: statistics.totalProducts,
      description: `${statistics.activeProducts} actifs`,
      icon: Package,
    },
    {
      label: "Clients",
      value: statistics.totalUsers,
      description: "Clients inscrits",
      icon: Users,
    },
    {
      label: "Commandes",
      value: statistics.totalOrders,
      description: `${statistics.pendingOrders} en attente`,
      icon: ShoppingBag,
    },
    {
      label: "Chiffre d'affaires",
      value: formatPrice(statistics.totalRevenue),
      description: "Commandes confirmées",
      icon: Wallet,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.label}
            className="rounded-lg border border-[#e5e7eb] bg-white shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#e59b22]/50 hover:shadow-md"
          >
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-[#524535]">
                    {stat.label}
                  </p>

                  <p className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-[#141b2b] truncate">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-[11px] sm:text-xs text-[#524535]/80 truncate">
                    {stat.description}
                  </p>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.25rem] bg-[#e9edff] text-[#0053db]">
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