import { ArrowLeft, Construction } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

type AdminSection = "products" | "orders" | "users";

const sectionLabels: Record<AdminSection, string> = {
  products: "produits",
  orders: "commandes",
  users: "utilisateurs",
};

interface AdminManagementPageProps {
  section: AdminSection;
}

export default function AdminManagementPage({
  section,
}: AdminManagementPageProps) {
  const navigate = useNavigate();
  const label = sectionLabels[section];

  return (
    <section className="flex min-h-[60vh] items-center justify-center">
      <div className="max-w-lg text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100">
          <Construction className="h-7 w-7 text-neutral-600" />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-neutral-950">
          Gestion des {label}
        </h1>

        <p className="mt-3 text-sm leading-6 text-neutral-500">
          Cette section admin est prête pour recevoir son interface de gestion.
        </p>

        <Button
          variant="outline"
          onClick={() => navigate("/admin")}
          className="mt-6 rounded-xl"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au dashboard
        </Button>
      </div>
    </section>
  );
}