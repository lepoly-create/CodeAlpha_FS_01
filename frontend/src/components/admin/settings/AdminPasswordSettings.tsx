import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  changeAdminPassword,
} from "@/services/admin-settings.service";

export default function AdminPasswordSettings() {
  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (
    event: React.SyntheticEvent
  ) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error(
        "Les nouveaux mots de passe ne correspondent pas."
      );
      return;
    }

    try {
      setSaving(true);

      await changeAdminPassword({
        currentPassword,
        newPassword,
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      toast.success(
        "Mot de passe modifié avec succès."
      );
    } catch (error: unknown) {
      toast.error(
        (axios.isAxiosError(error) && error.response?.data?.message) ||
          "Impossible de modifier le mot de passe."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-xl border bg-white">
      <div className="border-b p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Lock className="h-4 w-4 text-primary" />
          </div>

          <div>
            <h2 className="text-lg font-semibold">
              Change password
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Keep your administrator account secure.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 p-6"
      >
        <div>
          <label className="text-sm font-medium">
            Current password
          </label>

          <input
            type="password"
            value={currentPassword}
            onChange={(event) =>
              setCurrentPassword(event.target.value)
            }
            className="mt-2 h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            required
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium">
              New password
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(event) =>
                setNewPassword(event.target.value)
              }
              className="mt-2 h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              minLength={6}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Confirm new password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              className="mt-2 h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              minLength={6}
              required
            />
          </div>
        </div>

        <div className="flex justify-end pt-5">
          <Button
            type="submit"
            disabled={saving}
          >
            {saving
              ? "Updating..."
              : "Update password"}
          </Button>
        </div>
      </form>
    </div>
  );
}