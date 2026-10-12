import { Navigate } from "react-router-dom";

import AppLayout from "@/components/layout/AppLayout";
import PublicLayout from "@/components/layout/PublicLayout";
import { useAuth } from "@/contexts/useAuth";
import Products from "@/pages/Products";
import PublicProducts from "@/pages/PublicProducts";

export default function ProductsRoute() {
  const { isAuthenticated, user } = useAuth();

  if (user?.role === "admin") {
    return <Navigate to="/admin/products" replace />;
  }

  if (isAuthenticated) {
    return (
      <AppLayout>
        <Products />
      </AppLayout>
    );
  }

  return (
    <PublicLayout>
      <PublicProducts />
    </PublicLayout>
  );
}
