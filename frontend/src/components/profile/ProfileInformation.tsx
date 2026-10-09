import { useState } from "react";
import { Check, Mail, UserRound, X, Loader2, Lock } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { updateMyProfile, type UserProfile } from "@/services/user.service";

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
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!fullName.trim()) {
      toast.error("Le nom complet ne peut pas être vide.");
      return;
    }

    setIsUpdating(true);

    try {
      const updatedUser = await updateMyProfile({
        fullName: fullName.trim(),
      });

      onUpdated(updatedUser);
      toast.success("Informations mises à jour.");
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
    setIsEditing(false);
  };

  return (
    <Card className="rounded-2xl border-slate-200/80 bg-white shadow-sm">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">
              Informations personnelles
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Vos coordonnées publiques et d'identification.
            </p>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <UserRound className="h-4 w-4" />
          </div>
        </div>

        {!isEditing ? (
          <div className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                  <UserRound className="h-3.5 w-3.5" /> Nom complet
                </span>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900">
                  {user.fullName}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> Adresse email
                </span>
                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-700">
                  <span className="truncate">{user.email}</span>
                  <Lock className="h-3.5 w-3.5 text-slate-400 shrink-0 ml-2" />
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setFullName(user.fullName);
                  setIsEditing(true);
                }}
                className="rounded-xl border-slate-200 hover:bg-slate-100 font-medium text-xs sm:text-sm"
              >
                Modifier le profil
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="profile-fullName" className="text-xs font-medium text-slate-700">
                  Nom complet
                </Label>
                <Input
                  id="profile-fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isUpdating}
                  placeholder="Votre nom complet"
                  className="h-10 rounded-xl border-slate-200 focus-visible:ring-slate-950"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="profile-email-readonly" className="text-xs font-medium text-slate-500">
                    Adresse email
                  </Label>
                  <span className="text-[10px] text-slate-400">(Géré dans la section Email)</span>
                </div>
                <Input
                  id="profile-email-readonly"
                  value={user.email}
                  disabled
                  className="h-10 rounded-xl border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancel}
                disabled={isUpdating}
                className="rounded-xl hover:bg-slate-100 text-slate-600 text-xs sm:text-sm"
              >
                <X className="mr-1.5 h-4 w-4" />
                Annuler
              </Button>

              <Button
                type="submit"
                disabled={isUpdating}
                className="rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs sm:text-sm"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <Check className="mr-1.5 h-4 w-4" />
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