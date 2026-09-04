import { useState } from "react";
import { Check, Mail, UserRound, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  updateMyProfile,
  type UserProfile,
} from "@/services/user.service";

interface ProfileInformationProps {
  user: UserProfile;
  onUpdated: (user: UserProfile) => void;
}

export default function ProfileInformation({
  user,
  onUpdated,
}: ProfileInformationProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);

  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fullName.trim() || !email.trim()) {
      toast.error("Tous les champs sont requis.");
      return;
    }

    setIsUpdating(true);

    try {
      const updatedUser = await updateMyProfile({
        fullName: fullName.trim(),
        email: email.trim(),
      });

      onUpdated(updatedUser);

      toast.success("Profil mis à jour avec succès.");

      setIsEditing(false);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);

      toast.error("Impossible de mettre à jour le profil.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setFullName(user.fullName);
    setEmail(user.email);
    setIsEditing(false);
  };

  return (
    <Card className="rounded-2xl border-neutral-200 bg-white shadow-sm">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Informations personnelles
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Gérez les informations principales de votre compte.
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100">
            <UserRound className="h-5 w-5 text-neutral-600" />
          </div>
        </div>

        {!isEditing ? (
          <>
            {/* Informations */}
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-neutral-500">
                  <UserRound className="h-4 w-4" />
                  Nom complet
                </div>

                <div className="rounded-xl focus:border-0 border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium">
                  {user.fullName}
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-neutral-500">
                  <Mail className="h-4 w-4" />
                  Adresse email
                </div>

                <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-medium">
                  {user.email}
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="mt-6 flex justify-end cursor-pointer">
              <Button
                variant="outline"
                onClick={() => {
                  setFullName(user.fullName);
                  setEmail(user.email);
                  setIsEditing(true);
                }}
              >
                Modifier les informations
              </Button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Full name */}
              <div className="space-y-2">
                <Label htmlFor="profile-fullName">
                  Nom complet
                </Label>

                <Input
                  id="profile-fullName"
                  value={fullName}
                  onChange={(event) =>
                    setFullName(event.target.value)
                  }
                  disabled={isUpdating}
                  placeholder="Votre nom complet"
                  className="h-10 rounded-xl focus:border-0"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="profile-email">
                  Adresse email
                </Label>

                <Input
                  id="profile-email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  disabled={isUpdating}
                  placeholder="votre@email.com"
                  className="h-10 rounded-xl focus:border-0"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancel}
                disabled={isUpdating}
                className="cursor-pointer hover:bg-red-700 hover:text-amber-50"
              >
                <X className="mr-2 h-4 w-4" />
                Annuler
              </Button>

              <Button
                type="submit"
                disabled={isUpdating}
                className="cursor-pointer hover:bg-blue-600 hover:text-amber-50"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Enregistrer
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}