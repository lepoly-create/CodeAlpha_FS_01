import { Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import type { AdminUser } from "@/services/admin-user.service";
import { formatPrice } from "@/lib/format-price";

interface AdminUserTableProps {
  users: AdminUser[];
  onView: (user: AdminUser) => void;
  onDelete: (user: AdminUser) => void;
}

export default function AdminUserTable({
  users,
  onView,
  onDelete,
}: AdminUserTableProps) {
  if (users.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-[#e5e7eb] bg-white p-10 text-center shadow-xs">
        <p className="text-sm font-semibold text-[#524535]">
          Aucun utilisateur trouvé.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* VUE MOBILE (< 768px) : Cartes tactiles d'utilisateurs */}
      <div className="space-y-3 md:hidden">
        {users.map((user) => (
          <div
            key={user._id}
            className="rounded-lg border border-[#e5e7eb] bg-white p-4 shadow-xs space-y-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#ffddb5]/60 text-[#835500] font-bold text-xs border border-[#835500]/20">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>
                    {user.fullName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-sm text-[#141b2b]">
                  {user.fullName}
                </p>
                <p className="truncate text-xs text-[#524535]">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#f1f3ff] pt-2.5 text-xs">
              <span className="text-[#524535]">
                {user.totalOrders} commande{user.totalOrders > 1 ? "s" : ""}
              </span>
              <span className="font-bold text-sm text-[#141b2b]">
                {formatPrice(user.totalSpent)}
              </span>
            </div>

            <div className="flex items-center gap-2 border-t border-[#f1f3ff] pt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView(user)}
                className="flex-1 rounded-[0.25rem] border-[#e5e7eb] text-xs font-semibold text-[#141b2b] hover:bg-[#f1f3ff] h-9 gap-1.5"
              >
                <Eye className="h-3.5 w-3.5 text-[#0053db]" />
                Détails
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(user)}
                className="flex-1 rounded-[0.25rem] border-[#ffdad6] text-xs font-semibold text-[#ba1a1a] hover:bg-[#ffdad6]/40 h-9 gap-1.5"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Supprimer
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* VUE TABLETTE & DESKTOP (>= 768px) : Tableau classique */}
      <div className="hidden md:block overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-sm">
            <thead className="border-b border-[#f1f3ff] bg-[#f9f9ff] text-[#141b2b]">
              <tr>
                <th className="px-5 py-3.5 text-left font-bold text-xs uppercase tracking-wider text-[#524535]">
                  Client
                </th>

                <th className="px-5 py-3.5 text-left font-bold text-xs uppercase tracking-wider text-[#524535]">
                  Email
                </th>

                <th className="px-5 py-3.5 text-center font-bold text-xs uppercase tracking-wider text-[#524535]">
                  Commandes
                </th>

                <th className="px-5 py-3.5 text-right font-bold text-xs uppercase tracking-wider text-[#524535]">
                  Dépenses totales
                </th>

                <th className="px-5 py-3.5 text-right font-bold text-xs uppercase tracking-wider text-[#524535]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#f1f3ff]">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="transition-colors hover:bg-[#f9f9ff]"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#ffddb5]/60 text-[#835500] font-bold text-xs border border-[#835500]/20">
                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={user.fullName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span>
                            {user.fullName
                              .charAt(0)
                              .toUpperCase()}
                          </span>
                        )}
                      </div>

                      <span className="font-bold text-xs sm:text-sm text-[#141b2b]">
                        {user.fullName}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-3.5 text-xs text-[#524535]">
                    {user.email}
                  </td>

                  <td className="px-5 py-3.5 text-center text-xs font-semibold text-[#141b2b]">
                    {user.totalOrders}
                  </td>

                  <td className="px-5 py-3.5 text-right font-bold text-xs sm:text-sm text-[#141b2b]">
                    {formatPrice(user.totalSpent)}
                  </td>

                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(user)}
                        className="h-8 rounded-[0.25rem] text-xs font-semibold text-[#524535] hover:bg-[#e9edff] hover:text-[#0053db] gap-1.5 px-2.5"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Détails
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(user)}
                        className="h-8 rounded-[0.25rem] text-xs font-semibold text-[#ba1a1a] hover:bg-[#ffdad6]/50 hover:text-[#93000a] px-2.5"
                        title="Supprimer l'utilisateur"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}