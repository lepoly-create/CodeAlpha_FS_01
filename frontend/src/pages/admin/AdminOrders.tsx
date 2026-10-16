import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import AdminOrdersHeader from "@/components/admin/orders/AdminOrdersHeader";
import AdminOrderFilters from "@/components/admin/orders/AdminOrderFilters";
import AdminOrderTable from "@/components/admin/orders/AdminOrderTable";
import AdminOrderDetails from "@/components/admin/orders/AdminOrderDetails";

import {
  getAdminOrders,
  updateAdminOrderStatus,
  deleteAdminOrder,
  type AdminOrder,
} from "@/services/admin-order.service";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const [selectedOrder, setSelectedOrder] =
    useState<AdminOrder | null>(null);
  const [orderToDelete, setOrderToDelete] =
    useState<AdminOrder | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadOrders = async () => {
    try {
      setLoading(true);

      const data = await getAdminOrders();

      setOrders(data);
    } catch (error: unknown) {
      toast.error(
        (axios.isAxiosError(error) && error.response?.data?.message) ||
        "Impossible de charger les commandes."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void (async () => {
      await loadOrders();
    })();
  }, []);

  const filteredOrders = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim();

    return orders.filter((order) => {
      const matchesSearch =
        !normalizedSearch ||
        order._id
          .toLowerCase()
          .includes(normalizedSearch) ||
        (order.user?.fullName || "")
          .toLowerCase()
          .includes(normalizedSearch) ||
        (order.user?.email || "")
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
          ? "Commande confirmée avec succès."
          : "Commande annulée avec succès."
      );
    } catch (error: unknown) {
      toast.error(
        (axios.isAxiosError(error) && error.response?.data?.message) ||
        "Impossible de mettre à jour le statut de la commande."
      );
    } finally {
      setActionLoading(false);
    }
  };

  const confirmDeleteOrder = async () => {
    if (!orderToDelete || deleteLoading) return;

    try {
      setDeleteLoading(true);
      await deleteAdminOrder(orderToDelete._id);

      setOrders((current) =>
        current.filter((o) => o._id !== orderToDelete._id)
      );

      if (selectedOrder?._id === orderToDelete._id) {
        setSelectedOrder(null);
      }

      toast.success("Commande supprimée avec succès.");
      setOrderToDelete(null);
    } catch (error: unknown) {
      toast.error(
        (axios.isAxiosError(error) && error.response?.data?.message) ||
        "Impossible de supprimer la commande."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="w-full space-y-5 sm:space-y-6">
      <AdminOrdersHeader />

      <AdminOrderFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
      />

      {loading ? (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#e59b22] border-t-transparent" />
          <p className="text-xs sm:text-sm font-semibold text-[#524535]">
            Chargement des commandes clients...
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between px-1">
            <p className="text-xs sm:text-sm font-medium text-[#524535]">
              <span className="font-bold text-[#141b2b]">{filteredOrders.length}</span>{" "}
              {filteredOrders.length <= 1
                ? "commande affichée"
                : "commandes affichées"}
            </p>
          </div>

          <AdminOrderTable
            orders={filteredOrders}
            onView={setSelectedOrder}
            onDelete={setOrderToDelete}
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
          onDelete={() => setOrderToDelete(selectedOrder)}
        />
      )}

      {/* Modal de confirmation de suppression de commande */}
      {orderToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
          role="presentation"
          onClick={() => !deleteLoading && setOrderToDelete(null)}
        >
          <div
            className="w-full max-w-md rounded-lg border border-[#e5e7eb] bg-white p-5 sm:p-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.25rem] bg-[#ffdad6]/60 text-[#ba1a1a] border border-[#ba1a1a]/20">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#ba1a1a]">
                    Suppression commande
                  </span>
                  <h3 className="mt-0.5 font-bold text-base text-[#141b2b]">
                    Supprimer la commande
                  </h3>
                  <p className="text-xs text-[#524535]">
                    Ref #{orderToDelete._id.slice(-8).toUpperCase()}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOrderToDelete(null)}
                disabled={deleteLoading}
                className="h-8 w-8 rounded-[0.25rem] text-[#524535] hover:bg-[#f1f3ff]"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4 space-y-3 text-xs sm:text-sm text-[#524535]">
              <p className="leading-relaxed">
                Êtes-vous certain de vouloir supprimer cette commande d'un montant de{" "}
                <span className="font-bold text-[#141b2b]">
                  {orderToDelete.totalAmount.toLocaleString("fr-FR")} FCFA
                </span>{" "}
                ?
              </p>
              <div className="rounded-[0.25rem] bg-[#f9f9ff] border border-[#e5e7eb] p-3 text-xs text-[#524535] leading-relaxed">
                {orderToDelete.status === "pending"
                  ? "Cette commande étant 'En attente', les quantités d'articles commandés seront automatiquement restituées au stock magasin."
                  : "Cette commande sera définitivement retirée de la base de données sans possibilité de restauration."}
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5">
              <Button
                variant="outline"
                onClick={() => setOrderToDelete(null)}
                disabled={deleteLoading}
                className="rounded-[0.25rem] border-[#e5e7eb] text-xs font-semibold text-[#524535] hover:bg-[#f1f3ff] h-9 px-4 cursor-pointer"
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDeleteOrder}
                disabled={deleteLoading}
                className="rounded-[0.25rem] gap-2 bg-[#ba1a1a] hover:bg-[#93000a] text-xs font-semibold text-white h-9 px-4 cursor-pointer"
              >
                {deleteLoading ? (
                  "Suppression..."
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Supprimer définitivement
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}