import { CalendarDays, Mail, ShoppingBag, Star, X } from "lucide-react";

import { Button } from "@/components/ui/button";

import type { AdminUser } from "@/services/admin-user.service";

interface AdminUserDetailsProps {
  user: AdminUser;
  onClose: () => void;
}

export default function AdminUserDetails({
  user,
  onClose,
}: AdminUserDetailsProps) {
  const joinedDate = new Date(user.createdAt).toLocaleDateString();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h2 className="text-xl font-semibold">
              Customer details
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Customer account information.
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xl font-semibold text-primary">
                  {user.fullName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                {user.fullName}
              </h3>

              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                {user.email}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShoppingBag className="h-4 w-4" />
                Orders
              </div>

              <p className="mt-2 text-xl font-semibold">
                {user.totalOrders}
              </p>
            </div>

            <div className="rounded-xl border p-4">
              <div className="text-sm text-muted-foreground">
                Total spent
              </div>

              <p className="mt-2 text-xl font-semibold">
                {user.totalSpent.toLocaleString()} FCFA
              </p>
            </div>

            <div className="rounded-xl border p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4" />
                Favorites
              </div>

              <p className="mt-2 text-xl font-semibold">
                {user.favoriteProducts?.length ?? 0}
              </p>
            </div>

            <div className="rounded-xl border p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                Joined
              </div>

              <p className="mt-2 text-sm font-semibold">
                {joinedDate}
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}