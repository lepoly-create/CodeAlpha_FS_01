import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import {
  KeyRound,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { changeMyPassword } from "@/services/user.service";

import PasswordField from "./PasswordField";

interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

type PasswordFieldName = keyof ChangePasswordFormData;

type PasswordVisibility = Record<
  PasswordFieldName,
  boolean
>;

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

const validateChangePassword = (
  formData: ChangePasswordFormData
): string | null => {
  const {
    currentPassword,
    newPassword,
    confirmPassword,
  } = formData;

  if (
    !currentPassword ||
    !newPassword ||
    !confirmPassword
  ) {
    return "Veuillez remplir tous les champs.";
  }

  if (newPassword.length < 6) {
    return (
      "Le nouveau mot de passe doit contenir " +
      "au moins 6 caractères."
    );
  }

  if (newPassword !== confirmPassword) {
    return (
      "Les nouveaux mots de passe ne correspondent pas."
    );
  }

  if (currentPassword === newPassword) {
    return (
      "Le nouveau mot de passe doit être différent " +
      "de l'ancien."
    );
  }

  return null;
};

export default function ChangePasswordForm() {
  const [formData, setFormData] =
    useState<ChangePasswordFormData>(initialFormData);

  const [visibility, setVisibility] =
    useState<PasswordVisibility>(initialVisibility);

  const [isChanging, setIsChanging] = useState(false);

  const handleFieldChange =
    (field: PasswordFieldName) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setFormData((current) => ({
        ...current,
        [field]: event.target.value,
      }));
    };

  const toggleVisibility = (
    field: PasswordFieldName
  ) => {
    setVisibility((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const validationError =
      validateChangePassword(formData);

    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsChanging(true);

    try {
      await changeMyPassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      toast.success(
        "Mot de passe modifié avec succès."
      );

      setFormData(initialFormData);
      setVisibility(initialVisibility);
    } catch (error: unknown) {
      console.error(
        "Erreur lors du changement de mot de passe :",
        error
      );

      const message =
        axios.isAxiosError<{ message?: string }>(error)
          ? error.response?.data?.message
          : undefined;

      toast.error(
        message ||
          "Impossible de modifier le mot de passe."
      );
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <Card className="rounded-2xl border-neutral-200 bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Sécurité du compte
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Modifiez régulièrement votre mot de passe
              pour protéger votre compte.
            </p>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100">
            <ShieldCheck className="h-5 w-5 text-neutral-600" />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >
          <PasswordField
            id="current-password"
            label="Mot de passe actuel"
            value={formData.currentPassword}
            placeholder="Votre mot de passe actuel"
            autoComplete="current-password"
            visible={visibility.currentPassword}
            disabled={isChanging}
            onChange={handleFieldChange(
              "currentPassword"
            )}
            onToggleVisibility={() =>
              toggleVisibility("currentPassword")
            }
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <PasswordField
              id="new-password"
              label="Nouveau mot de passe"
              value={formData.newPassword}
              placeholder="Nouveau mot de passe"
              autoComplete="new-password"
              visible={visibility.newPassword}
              disabled={isChanging}
              description="Minimum 6 caractères."
              onChange={handleFieldChange("newPassword")}
              onToggleVisibility={() =>
                toggleVisibility("newPassword")
              }
            />

            <PasswordField
              id="confirm-password"
              label="Confirmer le nouveau mot de passe"
              value={formData.confirmPassword}
              placeholder="Confirmer le mot de passe"
              autoComplete="new-password"
              visible={visibility.confirmPassword}
              disabled={isChanging}
              onChange={handleFieldChange(
                "confirmPassword"
              )}
              onToggleVisibility={() =>
                toggleVisibility("confirmPassword")
              }
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={isChanging}
              className="cursor-pointer"
            >
              {isChanging ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Modification...
                </>
              ) : (
                <>
                  <KeyRound className="mr-2 h-4 w-4" />
                  Modifier le mot de passe
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}