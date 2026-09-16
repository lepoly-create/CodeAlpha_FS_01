import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/contexts/useAuth";

export default function CustomerRoute() {
  const { user } = useAuth();

  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}