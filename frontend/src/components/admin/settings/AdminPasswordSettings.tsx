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
    <div className="rounded-lg border border-[#e5e7eb] bg-white shadow-xs">
      <div className="border-b border-[#f1f3ff] p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[0.25rem] bg-[#ffddb5]/60 text-[#835500]">
            <Lock className="h-4 w-4" />
          </div>

          <div>
            <h2 className="text-base font-bold text-[#141b2b]">
              Sécurité du compte
            </h2>

            <p className="mt-0.5 text-xs text-[#524535]">
              Modifiez votre mot de passe administrateur pour préserver la sécurité de la boutique.
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-5 sm:p-6"
      >
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#141b2b]">
            Mot de passe actuel
          </label>

          <input
            type="password"
            value={currentPassword}
            onChange={(event) =>
              setCurrentPassword(event.target.value)
            }
            placeholder="••••••••"
            className="h-10 w-full rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] px-3.5 text-xs sm:text-sm text-[#141b2b] outline-hidden transition-all focus:bg-white focus:border-[#e59b22] focus:ring-1 focus:ring-[#e59b22]"
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#141b2b]">
              Nouveau mot de passe
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(event) =>
                setNewPassword(event.target.value)
              }
              placeholder="••••••••"
              className="h-10 w-full rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] px-3.5 text-xs sm:text-sm text-[#141b2b] outline-hidden transition-all focus:bg-white focus:border-[#e59b22] focus:ring-1 focus:ring-[#e59b22]"
              minLength={6}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#141b2b]">
              Confirmer le mot de passe
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              placeholder="••••••••"
              className="h-10 w-full rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] px-3.5 text-xs sm:text-sm text-[#141b2b] outline-hidden transition-all focus:bg-white focus:border-[#e59b22] focus:ring-1 focus:ring-[#e59b22]"
              minLength={6}
              required
            />
          </div>
        </div>

        <div className="flex justify-end pt-3">
          <Button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto rounded-[0.25rem] bg-[#e59b22] text-xs font-semibold text-white shadow-[0_4px_14px_0_rgba(229,155,34,0.35)] hover:bg-[#d97706] cursor-pointer h-10 px-5 gap-2"
          >
            <Lock className="h-4 w-4" />
            {saving
              ? "Modification en cours..."
              : "Mettre à jour le mot de passe"}
          </Button>
        </div>
      </form>
    </div>
  );
}