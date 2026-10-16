import { useState } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/useAuth";
import { deleteMyAccount } from "@/services/user.service";

export default function DeleteAccountSection() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [confirmationInput, setConfirmationInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOpen = () => {
    setConfirmationInput("");
    setError("");
    setIsOpen(true);
  };

  const handleClose = () => {
    if (loading) return;
    setIsOpen(false);
    setConfirmationInput("");
    setError("");
  };

  const isConfirmed = confirmationInput.trim() === "SUPPRIMER";

  const handleDelete = async () => {
    if (!isConfirmed || loading) return;

    try {
      setLoading(true);
      setError("");

      await deleteMyAccount();

      toast.success("Votre compte a été supprimé avec succès.");
      logout();
      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
          "Une erreur est survenue lors de la suppression du compte."
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Impossible de joindre le serveur.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="rounded-lg border border-[#ba1a1a]/20 bg-[#ffdad6]/20 shadow-xs">
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.25rem] bg-[#ffdad6] text-[#ba1a1a]">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#93000a]">
                  Zone de danger
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#524535]">
                  Supprimez définitivement votre compte et vos données personnelles.
                  Cette action est irréversible.
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="destructive"
              onClick={handleOpen}
              className="rounded-[0.25rem] shrink-0 gap-2 bg-[#ba1a1a] hover:bg-[#93000a] text-white shadow-xs"
            >
              <Trash2 className="h-4 w-4" />
              Supprimer mon compte
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modal de confirmation stricte */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
          role="presentation"
          onClick={handleClose}
        >
          <div
            className="w-full max-w-lg rounded-lg border border-[#e5e7eb] bg-white p-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-account-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[0.25rem] bg-[#ffdad6] text-[#ba1a1a]">
                  <AlertTriangle className="h-5 w-5 stroke-[1.75]" />
                </div>
                <div>
                  <h3
                    id="delete-account-title"
                    className="text-base sm:text-lg font-bold text-[#141b2b]"
                  >
                    Supprimer définitivement le compte
                  </h3>
                  <p className="text-xs text-[#524535]">
                    Action critique et irréversible
                  </p>
                </div>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleClose}
                disabled={loading}
                className="h-8 w-8 rounded-[0.25rem] text-[#524535] hover:bg-[#f1f3ff]"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-5 space-y-4 text-xs sm:text-sm text-[#524535]">
              <p>
                Êtes-vous absolument certain de vouloir supprimer votre compte ?
              </p>
              <div className="rounded-[0.25rem] bg-[#f9f9ff] border border-[#e5e7eb] p-3.5 space-y-1.5 text-xs text-[#141b2b]">
                <p>• Votre panier en cours et vos préférences seront effacés.</p>
                <p>• Vos sessions actives seront immédiatement révoquées.</p>
                <p>
                  • Vos commandes passées restent archivées dans notre registre comptable conformément à la réglementation.
                </p>
              </div>

              {error && (
                <div className="rounded-[0.25rem] bg-[#ffdad6]/40 border border-[#ba1a1a]/30 p-3 text-xs text-[#ba1a1a]">
                  {error}
                </div>
              )}

              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#141b2b]">
                  Tapez <span className="font-bold text-[#ba1a1a]">SUPPRIMER</span> pour confirmer :
                </label>
                <input
                  type="text"
                  value={confirmationInput}
                  onChange={(e) => setConfirmationInput(e.target.value)}
                  placeholder="SUPPRIMER"
                  disabled={loading}
                  className="w-full rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] px-4 py-2.5 text-sm font-mono tracking-wider text-[#141b2b] placeholder:text-[#524535]/50 focus:bg-white focus:border-[#ba1a1a] focus:outline-hidden transition-all"
                  autoFocus
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={loading}
                className="rounded-[0.25rem] border-[#e5e7eb] text-[#141b2b] hover:bg-[#f1f3ff]"
              >
                Annuler
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={!isConfirmed || loading}
                className="rounded-[0.25rem] gap-2 bg-[#ba1a1a] hover:bg-[#93000a] text-white disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Suppression en cours...
                  </span>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Supprimer mon compte
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
