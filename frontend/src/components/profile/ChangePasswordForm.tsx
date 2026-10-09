import { useState, type ChangeEvent, type  SyntheticEvent } from "react";
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
      <Card className="rounded-2xl border-slate-200/80 bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <p>null</p>
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Sécurité du compte
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Authentification déléguée à Google.
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-slate-200/80 bg-slate-50 p-4 text-xs text-slate-600 leading-relaxed">
            Votre compte est associé à votre profil **Google**. Le mot de passe et l'authentification à deux facteurs sont directement gérés sur le portail de sécurité Google.
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

  const handleSubmit = async (event:  SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Le nouveau mot de passe doit contenir au moins 6 caractères.");
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
    <Card className="rounded-2xl border-slate-200/80 bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
              Mot de passe
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Mettez à jour la sécurité de votre compte local.
            </p>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
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
              label="Nouveau mot de passe"
              value={formData.newPassword}
              placeholder="••••••••"
              autoComplete="new-password"
              visible={visibility.newPassword}
              disabled={isChanging}
              description="Minimum 6 caractères."
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
              className="rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs sm:text-sm"
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