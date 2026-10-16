import {
  PackagePlus,
  ShoppingBag,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AdminQuickActionsProps {
  onProducts: () => void;
  onOrders: () => void;
  onUsers: () => void;
}

export default function AdminQuickActions({
  onProducts,
  onOrders,
  onUsers,
}: AdminQuickActionsProps) {
  return (
    <Card className="rounded-lg border border-[#e5e7eb] bg-white shadow-xs">
      <CardHeader className="border-b border-[#f1f3ff] px-5 py-4">
        <CardTitle className="text-base font-bold text-[#141b2b]">
          Actions rapides
        </CardTitle>

        <p className="mt-0.5 text-xs text-[#524535]">
          Accédez rapidement aux principales fonctions.
        </p>
      </CardHeader>

      <CardContent className="space-y-2.5 p-5">
        <Button
          variant="outline"
          onClick={onProducts}
          className="h-10 w-full justify-start rounded-[0.25rem] border-[#e5e7eb] text-xs font-semibold text-[#141b2b] hover:border-[#e59b22] hover:bg-[#f1f3ff] hover:text-[#835500] cursor-pointer"
        >
          <PackagePlus className="mr-2.5 h-4 w-4 text-[#835500]" />
          Gérer les produits
        </Button>

        <Button
          variant="outline"
          onClick={onOrders}
          className="h-10 w-full justify-start rounded-[0.25rem] border-[#e5e7eb] text-xs font-semibold text-[#141b2b] hover:border-[#e59b22] hover:bg-[#f1f3ff] hover:text-[#835500] cursor-pointer"
        >
          <ShoppingBag className="mr-2.5 h-4 w-4 text-[#835500]" />
          Gérer les commandes
        </Button>

        <Button
          variant="outline"
          onClick={onUsers}
          className="h-10 w-full justify-start rounded-[0.25rem] border-[#e5e7eb] text-xs font-semibold text-[#141b2b] hover:border-[#e59b22] hover:bg-[#f1f3ff] hover:text-[#835500] cursor-pointer"
        >
          <Users className="mr-2.5 h-4 w-4 text-[#835500]" />
          Gérer les utilisateurs
        </Button>
      </CardContent>
    </Card>
  );
}