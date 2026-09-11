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
    <Card className="rounded-2xl border-neutral-200 bg-white shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Actions rapides
        </CardTitle>

        <p className="mt-1 text-sm text-neutral-500">
          Accédez rapidement aux principales fonctions.
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        <Button
          variant="outline"
          onClick={onProducts}
          className="h-11 w-full justify-start rounded-xl"
        >
          <PackagePlus className="mr-3 h-4 w-4" />
          Gérer les produits
        </Button>

        <Button
          variant="outline"
          onClick={onOrders}
          className="h-11 w-full justify-start rounded-xl"
        >
          <ShoppingBag className="mr-3 h-4 w-4" />
          Gérer les commandes
        </Button>

        <Button
          variant="outline"
          onClick={onUsers}
          className="h-11 w-full justify-start rounded-xl"
        >
          <Users className="mr-3 h-4 w-4" />
          Gérer les utilisateurs
        </Button>
      </CardContent>
    </Card>
  );
}