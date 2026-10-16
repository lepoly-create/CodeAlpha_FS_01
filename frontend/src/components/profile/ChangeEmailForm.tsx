import { useState } from "react";
import { Mail, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/useAuth";
import { requestEmailChange } from "@/services/user.service";

export default function ChangeEmailForm() {
  const { user } = useAuth();
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Pas de changement d'email possible manuellement si auth Google
  if (!user || user.authProvider === "google") {
    return null;
  }

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newEmail.trim() || !currentPassword) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);

    try {
      await requestEmailChange(newEmail.trim(), currentPassword);
      toast.success(
        "Un email de confirmation a été envoyé à votre nouvelle adresse."
      );
      setNewEmail("");
      setCurrentPassword("");
    } catch (error: unknown) {
      const responseMessage =
        typeof error === "object" &&
          error !== null &&
          "response" in error &&
          typeof (error as { response: { data?: { message?: string } } }).response?.data?.message === "string"
          ? (error as { response: { data: { message: string } } }).response.data.message
          : undefined;

      toast.error(
        responseMessage || "Impossible de demander le changement d'email."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="rounded-lg border border-[#e5e7eb] bg-white shadow-xs">
      <CardContent className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4 border-b border-[#f1f3ff] pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#141b2b]">
              Modifier l'adresse email
            </h2>
            <p className="mt-0.5 text-xs text-[#524535]">
              Un lien de vérification sera envoyé à la nouvelle adresse.
            </p>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.25rem] bg-[#f1f3ff] text-[#835500]">
            <Mail className="h-4 w-4" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="new-email" className="text-xs font-semibold uppercase tracking-wider text-[#524535]">
              Nouvelle adresse email
            </Label>
            <Input
              id="new-email"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="nouveau@domaine.com"
              disabled={loading}
              className="h-10 rounded-[0.25rem] border-[#e5e7eb] bg-[#f9f9ff] text-[#141b2b] focus:bg-white focus:border-[#e59b22] focus:ring-1 focus:ring-[#e59b22] text-sm"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email-confirm-pass" className="text-xs font-semibold uppercase tracking-wider text-[#524535]">
              Mot de passe actuel (pour validation)
            </Label>
            <Input
              id="email-confirm-pass"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
              className="h-10 rounded-[0.25rem] border-[#e5e7eb] bg-[#f9f9ff] text-[#141b2b] focus:bg-white focus:border-[#e59b22] focus:ring-1 focus:ring-[#e59b22] text-sm"
              required
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto rounded-[0.25rem] bg-[#1a1c20] text-white hover:bg-[#e59b22] text-xs sm:text-sm font-semibold shadow-xs cursor-pointer transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi de la demande...
                </>
              ) : (
                <>
                  Demander le changement
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}