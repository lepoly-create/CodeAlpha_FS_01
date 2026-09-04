import { useState } from "react";
import {
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { changeMyPassword } from "@/services/user.service";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);
  const [showNewPassword, setShowNewPassword] =
    useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [isChanging, setIsChanging] = useState(false);

  const handleSubmit = async (
    event: React.SyntheticEvent <HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error(
        "Le nouveau mot de passe doit contenir au moins 6 caractères."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(
        "Les nouveaux mots de passe ne correspondent pas."
      );
      return;
    }

    if (currentPassword === newPassword) {
      toast.error(
        "Le nouveau mot de passe doit être différent de l'ancien."
      );
      return;
    }

    setIsChanging(true);

    try {
      await changeMyPassword({
        currentPassword,
        newPassword,
      });

      toast.success(
        "Mot de passe modifié avec succès."
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(
        "Erreur lors du changement de mot de passe :",
        error
      );

      toast.error(
        "Impossible de modifier le mot de passe."
      );
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <Card className="rounded-2xl border-neutral-200 bg-white shadow-sm">
      <CardContent className="p-6">
        {/* Header */}
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

        {/* Formulaire */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >
          {/* Mot de passe actuel */}
          <div className="space-y-2">
            <Label htmlFor="current-password">
              Mot de passe actuel
            </Label>

            <div className="relative">
              <Input
                id="current-password"
                type={
                  showCurrentPassword
                    ? "text"
                    : "password"
                }
                value={currentPassword}
                onChange={(event) =>
                  setCurrentPassword(event.target.value)
                }
                placeholder="Votre mot de passe actuel"
                disabled={isChanging}
                className="h-10 rounded-xl pr-12 focus:border-0"
              />

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 border-0 bg-transparent"
                onClick={() =>
                  setShowCurrentPassword(
                    (current) => !current
                  )
                }
                disabled={isChanging}
                aria-label={
                  showCurrentPassword
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Nouveaux mots de passe */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="new-password">
                Nouveau mot de passe
              </Label>

              <div className="relative">
                <Input
                  id="new-password"
                  type={
                    showNewPassword
                      ? "text"
                      : "password"
                  }
                  value={newPassword}
                  onChange={(event) =>
                    setNewPassword(event.target.value)
                  }
                  placeholder="Nouveau mot de passe"
                  disabled={isChanging}
                  className="h-10 rounded-xl pr-12 focus:border-0"
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 border-0 bg-transparent"
                  onClick={() =>
                    setShowNewPassword(
                      (current) => !current
                    )
                  }
                  disabled={isChanging}
                  aria-label={
                    showNewPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <p className="text-xs text-neutral-500">
                Minimum 6 caractères.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">
                Confirmer le nouveau mot de passe
              </Label>

              <div className="relative">
                <Input
                  id="confirm-password"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value
                    )
                  }
                  placeholder="Confirmer le mot de passe"
                  disabled={isChanging}
                  className="h-10 rounded-xl pr-12 focus:border-0"
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 border-0 bg-transparent"
                  onClick={() =>
                    setShowConfirmPassword(
                      (current) => !current
                    )
                  }
                  disabled={isChanging}
                  aria-label={
                    showConfirmPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Bouton */}
          <div className="flex justify-end pt-2 cursor-pointer">
            <Button
              type="submit"
              disabled={isChanging}
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