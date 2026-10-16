import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import axios from "axios";
import { KeyRound, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { changeMyPassword } from "@/services/user.service";
import PasswordField from "./PasswordField";
import { useAuth } from "@/contexts/useAuth";

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

type PasswordFieldName = keyof ChangePasswordFormData;
type PasswordVisibility = Record<PasswordFieldName, boolean>;

const initialFormData: ChangePasswordFormData = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const initialVisibility: PasswordVisibility = {
  currentPassword: false,
  newPassword: false,
  confirmPassword: false,
};

export default function ChangePasswordForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<ChangePasswordFormData>(initialFormData);
  const [visibility, setVisibility] = useState<PasswordVisibility>(initialVisibility);
  const [isChanging, setIsChanging] = useState(false);

  // SI L'UTILISATEUR S'EST CONNECTÉ AVEC GOOGLE : Afficher un bloc explicatif (UX)
  if (user?.authProvider === "google") {
    return (
      <Card className="rounded-lg border border-[#e5e7eb] bg-white shadow-xs">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.25rem] bg-[#f1f3ff] text-[#0053db] border border-[#e5e7eb]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#141b2b]">
                Sécurité du compte
              </h2>
              <p className="mt-0.5 text-xs text-[#524535]">
                Authentification déléguée à Google.
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] p-4 text-xs text-[#524535] leading-relaxed">
            Votre compte est associé à votre profil Google. Le mot de passe et l'authentification à deux facteurs sont directement gérés sur le portail de sécurité Google.
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleFieldChange =
    (field: PasswordFieldName) => (event: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const toggleVisibility = (field: PasswordFieldName) => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    if (formData.newPassword.length < 8) {
      toast.error("Le nouveau mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      toast.error("Le nouveau mot de passe doit être différent de l'ancien.");
      return;
    }

    setIsChanging(true);

    try {
      await changeMyPassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      toast.success("Mot de passe modifié avec succès.");
      setFormData(initialFormData);
      setVisibility(initialVisibility);
    } catch (error: unknown) {
      const message = axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message
        : undefined;

      toast.error(message || "Impossible de modifier le mot de passe.");
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <Card className="rounded-lg border border-[#e5e7eb] bg-white shadow-xs">
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4 border-b border-[#f1f3ff] pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#141b2b]">
              Mot de passe
            </h2>
            <p className="mt-0.5 text-xs text-[#524535]">
              Mettez à jour la sécurité de votre compte local.
            </p>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.25rem] bg-[#f1f3ff] text-[#835500]">
            <KeyRound className="h-4 w-4" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <PasswordField
            id="current-password"
            label="Mot de passe actuel"
            value={formData.currentPassword}
            placeholder="••••••••"
            autoComplete="current-password"
            visible={visibility.currentPassword}
            disabled={isChanging}
            onChange={handleFieldChange("currentPassword")}
            onToggleVisibility={() => toggleVisibility("currentPassword")}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <PasswordField
              id="new-password"
              label="Nouveau MDP"
              value={formData.newPassword}
              placeholder="••••••••"
              autoComplete="new-password"
              visible={visibility.newPassword}
              disabled={isChanging}
              description="Minimum 8 caractères."
              onChange={handleFieldChange("newPassword")}
              onToggleVisibility={() => toggleVisibility("newPassword")}
            />

            <PasswordField
              id="confirm-password"
              label="Confirmation"
              value={formData.confirmPassword}
              placeholder="••••••••"
              autoComplete="new-password"
              visible={visibility.confirmPassword}
              disabled={isChanging}
              onChange={handleFieldChange("confirmPassword")}
              onToggleVisibility={() => toggleVisibility("confirmPassword")}
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={isChanging}
              className="w-full sm:w-auto rounded-[0.25rem] bg-[#1a1c20] text-white hover:bg-[#e59b22] text-xs sm:text-sm font-semibold shadow-xs cursor-pointer transition-colors"
            >
              {isChanging ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Mise à jour...
                </>
              ) : (
                <>
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Changer le mot de passe
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}