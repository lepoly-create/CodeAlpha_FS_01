import { Navigate, Route, Routes } from "react-router-dom";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminOrders from "@/pages/admin/AdminOrders";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminUsers from "@/pages/admin/AdminUsers";

import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import Dashboard from "@/pages/Dashboard";
import ForgotPassword from "@/pages/ForgotPassword";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Products from "@/pages/Products";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Profile from "@/pages/Profile";
import Register from "@/pages/Register";
import ResetPassword from "@/pages/ResetPassword";
import TermsOfUse from "@/pages/TermsOfUse";
import VerifyEmail from "@/pages/VerifyEmail";
import VerifyEmailChange from "@/pages/VerifyEmailChange";

import AppLayout from "@/components/layout/AppLayout";
import PublicLayout from "@/components/layout/PublicLayout";

import AdminRoute from "./AdminRoute";
import CustomerRoute from "./CustomerRoute";
import ProtectedRoute from "./ProtectedRoute";

import OrdersPage from "@/pages/OrdersPage";

export default function AppRoutes() {
  return (
    <Routes>

      {/* ============================================ */}
      {/* ESPACE PUBLIC                               */}
      {/* ============================================ */}

      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />

        {/*
          Pour l'instant, nous conservons ta page Products
          existante telle quelle afin de ne pas casser
          les favoris/panier déjà implémentés.
        */}
        <Route path="/products" element={<Products />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />
      </Route>

      {/* ============================================ */}
      {/* AUTHENTIFICATION                            */}
      {/* ============================================ */}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/verify-email"
        element={<VerifyEmail />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />

      <Route
        path="/verify-email-change"
        element={<VerifyEmailChange />}
      />

        {/* ============================================ */}
        {/* ESPACE CLIENT                               */}
        {/* ============================================ */}

      {/* Pages protégées */}
      <Route element={<ProtectedRoute />}>
        <Route element={<CustomerRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/products" element={<Products />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/orders/:orderId" element={<OrdersPage />} />
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
            element={<AdminUsers />} 
          />

          <Route 
            path="/admin/settings" 
            element={<AdminSettings />} 
          />
        </Route>
      </Route>

      {/* ============================================ */}
      {/* FALLBACK                                    */}
      {/* ============================================ */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}