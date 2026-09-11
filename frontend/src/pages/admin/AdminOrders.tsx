import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import AdminOrdersHeader from "@/components/admin/orders/AdminOrdersHeader";
import AdminOrderFilters from "@/components/admin/orders/AdminOrderFilters";
import AdminOrderTable from "@/components/admin/orders/AdminOrderTable";
import AdminOrderDetails from "@/components/admin/orders/AdminOrderDetails";

import {
  getAdminOrders,
  updateAdminOrderStatus,
  type AdminOrder,
} from "@/services/admin-order.service";

export default function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const [selectedOrder, setSelectedOrder] =
    useState<AdminOrder | null>(null);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const data = await getAdminOrders();

      setOrders(data);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to load orders."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return orders.filter((order) => {
      const matchesSearch =
        !normalizedSearch ||
        order._id
          .toLowerCase()
          .includes(normalizedSearch) ||
        order.user.fullName
          .toLowerCase()
          .includes(normalizedSearch) ||
        order.user.email
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        status === "all" ||
        order.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, status]);

  const handleUpdateStatus = async (
    newStatus: "confirmed" | "cancelled"
  ) => {
    if (!selectedOrder) {
      return;
    }

    try {
      setActionLoading(true);

      const updatedOrder =
        await updateAdminOrderStatus(
          selectedOrder._id,
          newStatus
        );

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === updatedOrder._id
            ? updatedOrder
            : order
        )
      );

      setSelectedOrder(updatedOrder);

      toast.success(
        newStatus === "confirmed"
          ? "Order confirmed successfully."
          : "Order cancelled successfully."
      );
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to update the order."
      );
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminOrdersHeader />

      <AdminOrderFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      {loading ? (
        <div className="rounded-xl border bg-white p-10 text-center">
          <p className="text-sm text-muted-foreground">
            Loading orders...
          </p>
        </div>
      ) : (
        <>
          <div className="text-sm text-muted-foreground">
            {filteredOrders.length}{" "}
            {filteredOrders.length === 1
              ? "order"
              : "orders"}
          </div>

          <AdminOrderTable
            orders={filteredOrders}
            onView={setSelectedOrder}
          />
        </>
      )}

      {selectedOrder && (
        <AdminOrderDetails
          order={selectedOrder}
          loading={actionLoading}
          onConfirm={() =>
            handleUpdateStatus("confirmed")
          }
          onCancel={() =>
            handleUpdateStatus("cancelled")
          }
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}