import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import AdminUsersHeader from "@/components/admin/users/AdminUsersHeader";
import AdminUserFilters from "@/components/admin/users/AdminUserFilters";
import AdminUserTable from "@/components/admin/users/AdminUserTable";
import AdminUserDetails from "@/components/admin/users/AdminUserDetails";

import {
  getAdminUsers,
  deleteAdminUser,
  type AdminUser,
} from "@/services/admin-user.service";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] =
    useState<AdminUser | null>(null);
  const [userToDelete, setUserToDelete] =
    useState<AdminUser | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const data = await getAdminUsers();

      setUsers(data);
    } catch (error: unknown) {
      toast.error(
        (axios.isAxiosError(error) && error.response?.data?.message) ||
        "Impossible de charger la liste des clients."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void (async () => {
      await loadUsers();
    })();
  }, []);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search
      .toLowerCase()
      .trim();

    if (!normalizedSearch) {
      return users;
    }

    return users.filter((user) => {
      return (
        user.fullName
          .toLowerCase()
          .includes(normalizedSearch) ||
        user.email
          .toLowerCase()
          .includes(normalizedSearch)
      );
    });
  }, [users, search]);

  const confirmDelete = async () => {
    if (!userToDelete || deleteLoading) return;

    try {
      setDeleteLoading(true);
      await deleteAdminUser(userToDelete._id);

      setUsers((current) =>
        current.filter((u) => u._id !== userToDelete._id)
      );

      toast.success(`Le compte de ${userToDelete.fullName} a été supprimé.`);
      setUserToDelete(null);
    } catch (error: unknown) {
      toast.error(
        (axios.isAxiosError(error) && error.response?.data?.message) ||
        "Impossible de supprimer l'utilisateur."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="w-full space-y-5 sm:space-y-6">
      <AdminUsersHeader />

      <AdminUserFilters
        search={search}
        onSearchChange={setSearch}
      />

      {loading ? (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#e59b22] border-t-transparent" />
          <p className="text-xs sm:text-sm font-semibold text-[#524535]">
            Chargement des comptes clients...
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between px-1">
            <p className="text-xs sm:text-sm font-medium text-[#524535]">
              <span className="font-bold text-[#141b2b]">{filteredUsers.length}</span>{" "}
              {filteredUsers.length <= 1
                ? "utilisateur inscrit"
                : "utilisateurs inscrits"}
            </p>
          </div>

          <AdminUserTable
            users={filteredUsers}
            onView={setSelectedUser}
            onDelete={setUserToDelete}
          />
        </>
      )}

      {selectedUser && (
        <AdminUserDetails
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {/* Modal de confirmation de suppression utilisateur */}
      {userToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
          role="presentation"
          onClick={() => !deleteLoading && setUserToDelete(null)}
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
                    Suppression compte
                  </span>
                  <h3 className="mt-0.5 font-bold text-base text-[#141b2b]">
                    Supprimer l'utilisateur
                  </h3>
                  <p className="text-xs text-[#524535]">
                    Cette action révoquera les accès du client
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setUserToDelete(null)}
                disabled={deleteLoading}
                className="h-8 w-8 rounded-[0.25rem] text-[#524535] hover:bg-[#f1f3ff]"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4 space-y-3 text-xs sm:text-sm text-[#524535]">
              <p className="leading-relaxed">
                Êtes-vous certain de vouloir supprimer le compte client de{" "}
                <span className="font-bold text-[#141b2b]">
                  {userToDelete.fullName}
                </span>{" "}
                ({userToDelete.email}) ?
              </p>
              <div className="rounded-[0.25rem] bg-[#f9f9ff] border border-[#e5e7eb] p-3 text-xs text-[#524535] leading-relaxed">
                Ses paniers d'achat et sessions actives seront immédiatement révoqués. L'historique de ses commandes ({userToDelete.totalOrders}) restera conservé pour le suivi comptable.
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5">
              <Button
                variant="outline"
                onClick={() => setUserToDelete(null)}
                disabled={deleteLoading}
                className="rounded-[0.25rem] border-[#e5e7eb] text-xs font-semibold text-[#524535] hover:bg-[#f1f3ff] h-9 px-4 cursor-pointer"
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                disabled={deleteLoading}
                className="rounded-[0.25rem] gap-2 bg-[#ba1a1a] hover:bg-[#93000a] text-xs font-semibold text-white h-9 px-4 cursor-pointer"
              >
                {deleteLoading ? (
                  "Suppression..."
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Supprimer le compte
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