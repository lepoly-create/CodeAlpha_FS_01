import { Routes, Route } from "react-router-dom";
import Products from "@/pages/Products";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import Profile from "@/pages/Profile";
import AdminRoute from "./AdminRoute";
import CustomerRoute from "./CustomerRoute";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminManagementPage from "@/pages/admin/AdminManagementPage";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminOrders from "@/pages/admin/AdminOrders";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Pages publiques */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Pages protégées */}
      <Route element={<ProtectedRoute />}>
        <Route element={<CustomerRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        </Route>
      </Route>

      {/* Espace administrateur */}
      <Route element={<AdminRoute />}>
        <Route element={<AppLayout />}>
          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route path="/admin/products" element={<AdminProducts />} />
          <Route
            path="/admin/orders"
            element={<AdminOrders />}
          />
          
          <Route
            path="/admin/users"
            element={<AdminManagementPage section="users" />}
          />
        </Route>
      </Route>
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}