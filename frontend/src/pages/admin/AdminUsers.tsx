import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import AdminUsersHeader from "@/components/admin/users/AdminUsersHeader";
import AdminUserFilters from "@/components/admin/users/AdminUserFilters";
import AdminUserTable from "@/components/admin/users/AdminUserTable";
import AdminUserDetails from "@/components/admin/users/AdminUserDetails";

import {
  getAdminUsers,
  type AdminUser,
} from "@/services/admin-user.service";

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] =
    useState<AdminUser | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const data = await getAdminUsers();

      setUsers(data);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to load customers."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
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

  return (
    <div className="space-y-6">
      <AdminUsersHeader />

      <AdminUserFilters
        search={search}
        onSearchChange={setSearch}
      />

      {loading ? (
        <div className="rounded-xl border bg-white p-10 text-center">
          <p className="text-sm text-muted-foreground">
            Loading customers...
          </p>
        </div>
      ) : (
        <>
          <div className="text-sm text-muted-foreground">
            {filteredUsers.length}{" "}
            {filteredUsers.length === 1
              ? "customer"
              : "customers"}
          </div>

          <AdminUserTable
            users={filteredUsers}
            onView={setSelectedUser}
          />
        </>
      )}

      {selectedUser && (
        <AdminUserDetails
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}