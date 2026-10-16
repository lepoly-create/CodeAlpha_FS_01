import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "@/components/layout/AppLayout";
import PublicLayout from "@/components/layout/PublicLayout";
import PageLoadingFallback from "@/components/common/PageLoadingFallback";

import AdminRoute from "./AdminRoute";
import CustomerRoute from "./CustomerRoute";
import ProtectedRoute from "./ProtectedRoute";
import ProductsRoute from "./ProductsRoute";
import ContactRoute from "./ContactRoute";

// Lazy loading des pages pour diviser le bundle JS et accélérer le chargement initial
const Home = lazy(() => import("@/pages/Home"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfUse = lazy(() => import("@/pages/TermsOfUse"));

const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const VerifyEmail = lazy(() => import("@/pages/VerifyEmail"));
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
const VerifyEmailChange = lazy(() => import("@/pages/VerifyEmailChange"));

const Dashboard = lazy(() => import("@/pages/Dashboard"));
const CartPage = lazy(() => import("@/pages/CartPage"));
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage"));
const OrdersPage = lazy(() => import("@/pages/OrdersPage"));
const Profile = lazy(() => import("@/pages/Profile"));

const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminProducts = lazy(() => import("@/pages/admin/AdminProducts"));
const AdminOrders = lazy(() => import("@/pages/admin/AdminOrders"));
const AdminUsers = lazy(() => import("@/pages/admin/AdminUsers"));
const AdminSettings = lazy(() => import("@/pages/admin/AdminSettings"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoadingFallback />}>
      <Routes>
        {/* ============================================ */}
        {/* ESPACE PUBLIC                               */}
        {/* ============================================ */}

        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
        </Route>

        <Route path="/contact" element={<ContactRoute />} />
        <Route path="/products" element={<ProductsRoute />} />

        {/* ============================================ */}
        {/* AUTHENTIFICATION                            */}
        {/* ============================================ */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email-change" element={<VerifyEmailChange />} />

        {/* ============================================ */}
        {/* ESPACE CLIENT                               */}
        {/* ============================================ */}

        <Route element={<ProtectedRoute />}>
          <Route element={<CustomerRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/dashboard/products"
                element={<Navigate to="/products" replace />}
              />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/orders/:orderId" element={<OrdersPage />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Route>

        {/* ============================================ */}
        {/* ESPACE ADMINISTRATEUR                       */}
        {/* ============================================ */}

        <Route element={<AdminRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
        </Route>

        {/* ============================================ */}
        {/* FALLBACK                                    */}
        {/* ============================================ */}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}