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
    <Card className="rounded-lg border border-[#e5e7eb] bg-white shadow-xs">
      <CardContent className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-[#f1f3ff] pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#141b2b]">
              Informations personnelles
            </h2>
            <p className="mt-0.5 text-xs text-[#524535]">
              Vos coordonnées publiques et d'identification.
            </p>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.25rem] bg-[#f1f3ff] text-[#835500]">
            <UserRound className="h-4 w-4" />
          </div>
        </div>

        {!isEditing ? (
          <div className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#524535] flex items-center gap-1.5">
                  <UserRound className="h-3.5 w-3.5 text-[#e59b22]" /> Nom complet
                </span>
                <div className="rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] px-3.5 py-2.5 text-sm font-medium text-[#141b2b]">
                  {user.fullName}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#524535] flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-[#e59b22]" /> Adresse email
                </span>
                <div className="flex items-center justify-between rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] px-3.5 py-2.5 text-sm font-medium text-[#141b2b]">
                  <span className="truncate">{user.email}</span>
                  <Lock className="h-3.5 w-3.5 text-[#524535]/60 shrink-0 ml-2" />
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
                className="rounded-[0.25rem] border-[#e5e7eb] text-[#141b2b] hover:bg-[#f1f3ff] hover:text-[#835500] font-semibold text-xs sm:text-sm cursor-pointer shadow-xs transition-colors"
              >
                Modifier le profil
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="profile-fullName" className="text-xs font-semibold uppercase tracking-wider text-[#524535]">
                  Nom complet
                </Label>
                <Input
                  id="profile-fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isUpdating}
                  placeholder="Votre nom complet"
                  className="h-10 rounded-[0.25rem] border-[#e5e7eb] bg-[#f9f9ff] text-[#141b2b] focus:bg-white focus:border-[#e59b22] focus:ring-1 focus:ring-[#e59b22] text-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="profile-email-readonly" className="text-xs font-semibold uppercase tracking-wider text-[#524535]">
                    Adresse email
                  </Label>
                  <span className="text-[10px] text-[#524535]/70">(Géré dans la section Email)</span>
                </div>
                <Input
                  id="profile-email-readonly"
                  value={user.email}
                  disabled
                  className="h-10 rounded-[0.25rem] border-[#e5e7eb] bg-[#f1f3ff] text-[#524535] cursor-not-allowed text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancel}
                disabled={isUpdating}
                className="rounded-[0.25rem] text-[#524535] hover:bg-[#f1f3ff] hover:text-[#141b2b] text-xs sm:text-sm cursor-pointer"
              >
                <X className="mr-1.5 h-4 w-4" />
                Annuler
              </Button>

              <Button
                type="submit"
                disabled={isUpdating}
                className="rounded-[0.25rem] bg-[#e59b22] text-white hover:bg-[#d97706] text-xs sm:text-sm font-semibold shadow-xs cursor-pointer transition-colors"
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