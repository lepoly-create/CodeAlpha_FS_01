import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/useAuth";

import {
  getAdminProfile,
  updateAdminProfile,
} from "@/services/admin-settings.service";

import type { AuthUser } from "@/services/auth.service";

interface AdminAccountSettingsProps {
  onProfileUpdated: (user: AuthUser) => void;
}

const getErrorMessage = (error: unknown, fallback: string) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {
    const response = error.response;

    if (
      typeof response === "object" &&
      response !== null &&
      "data" in response
    ) {
      const data = response.data;

      if (
        typeof data === "object" &&
        data !== null &&
        "message" in data &&
        typeof data.message === "string"
      ) {
        return data.message;
      }
    }
  }

  return fallback;
};

export default function AdminAccountSettings({
  onProfileUpdated,
}: AdminAccountSettingsProps) {
  const { user } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getAdminProfile();

        setFullName(data.fullName);
        setEmail(data.email);
      } catch (error: unknown) {
        toast.error(
          getErrorMessage(
            error,
            "Impossible de charger le profil administrateur."
          )
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSubmit = async (
    event: React.SyntheticEvent
  ) => {
    event.preventDefault();

    try {
      setSaving(true);

      const updatedUser = await updateAdminProfile({ fullName, email });

      if (user) {
        onProfileUpdated({
          ...user,
          id: updatedUser._id,
          fullName: updatedUser.fullName,
          email: updatedUser.email,
          role: updatedUser.role,
          profileImage: updatedUser.profileImage,
        });
      }

      toast.success(
        "Profil administrateur mis à jour avec succès."
      );
    } catch (error: unknown) {
      toast.error(
        getErrorMessage(error, "Impossible de mettre à jour le profil.")
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-lg border border-[#e5e7eb] bg-white p-6 shadow-xs">
        <div className="space-y-4">
          <div className="h-6 w-44 animate-pulse rounded bg-[#f1f3ff]" />
          <div className="h-10 animate-pulse rounded bg-[#f1f3ff]" />
          <div className="h-10 animate-pulse rounded bg-[#f1f3ff]" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[#e5e7eb] bg-white shadow-xs">
      <div className="border-b border-[#f1f3ff] p-5 sm:p-6">
        <h2 className="text-base font-bold text-[#141b2b]">
          Compte administrateur
        </h2>

        <p className="mt-0.5 text-xs text-[#524535]">
          Mettez à jour vos informations de compte personnelles.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 p-5 sm:p-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#141b2b]">
              Nom complet
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(event) =>
                setFullName(event.target.value)
              }
              className="h-10 w-full rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] px-3.5 text-xs sm:text-sm text-[#141b2b] outline-hidden transition-all focus:bg-white focus:border-[#e59b22] focus:ring-1 focus:ring-[#e59b22]"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#141b2b]">
              Adresse email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              className="h-10 w-full rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] px-3.5 text-xs sm:text-sm text-[#141b2b] outline-hidden transition-all focus:bg-white focus:border-[#e59b22] focus:ring-1 focus:ring-[#e59b22]"
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
            <Save className="h-4 w-4" />
            {saving ? "Enregistrement..." : "Enregistrer les modifications"}
          </Button>
        </div>
      </form>
    </div>
  );
}