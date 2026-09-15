import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

import type { AdminUser } from "@/services/admin-user.service";

interface AdminUserTableProps {
  users: AdminUser[];
  onView: (user: AdminUser) => void;
}

export default function AdminUserTable({
  users,
  onView,
}: AdminUserTableProps) {
  if (users.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        <p className="text-sm text-muted-foreground">
          No customers found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/40">
            <tr>
              <th className="px-6 py-4 text-left font-medium">
                Customer
              </th>

              <th className="px-6 py-4 text-left font-medium">
                Email
              </th>

              <th className="px-6 py-4 text-center font-medium">
                Orders
              </th>

              <th className="px-6 py-4 text-right font-medium">
                Total spent
              </th>

              <th className="px-6 py-4 text-right font-medium">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {users.map((user) => (
              <tr
                key={user._id}
                className="transition hover:bg-muted/20"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10">
                      {user.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt={user.fullName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-semibold text-primary">
                          {user.fullName
                            .charAt(0)
                            .toUpperCase()}
                        </span>
                      )}
                    </div>

                    <span className="font-medium">
                      {user.fullName}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-muted-foreground">
                  {user.email}
                </td>

                <td className="px-6 py-4 text-center">
                  {user.totalOrders}
                </td>

                <td className="px-6 py-4 text-right font-medium">
                  {user.totalSpent.toLocaleString()} FCFA
                </td>

                <td className="px-6 py-4 text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onView(user)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}