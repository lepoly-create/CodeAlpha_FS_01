import { useState } from "react";
import axios from "axios";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle2, MessageSquare, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/useAuth";

export default function ContactPage() {
  const { user, isAuthenticated } = useAuth();

  const getInitialNameParts = () => {
    if (!user?.fullName) return { firstName: "", lastName: "" };
    const parts = user.fullName.trim().split(" ");
    return {
      firstName: parts[0] || "",
      lastName: parts.slice(1).join(" ") || "",
    };
  };

  const initialNames = getInitialNameParts();

  const [formData, setFormData] = useState({
    firstName: initialNames.firstName,
    lastName: initialNames.lastName,
    email: user?.email || "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await api.post("/contact", formData);

      setSuccess(true);
      setFormData({
        firstName: initialNames.firstName,
        lastName: initialNames.lastName,
        email: user?.email || "",
        message: "",
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Une erreur est survenue lors de l'envoi.");
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
    <div className="min-h-[85vh] bg-[#f9f9ff] py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="mx-auto max-w-xl w-full">
        {/* Lien de retour */}
        <div className="mb-6">
          <Link
            to={isAuthenticated ? "/dashboard" : "/"}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#835500] hover:text-[#e59b22] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {isAuthenticated ? "Retour au tableau de bord" : "Retour à l'accueil"}
          </Link>
        </div>

        {/* Carte principale */}
        <div className="bg-white rounded-lg border border-[#e5e7eb] p-5 sm:p-8 shadow-xs">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-[0.25rem] bg-[#1a1c20] text-[#e59b22] border border-[#293040] shadow-xs">
              <MessageSquare className="h-5 w-5 stroke-[1.75]" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#835500]">
                Support & Assistance
              </span>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#141b2b]">
                Contactez-nous
              </h1>
              <p className="text-xs text-[#524535]">
                Notre équipe technique et commerciale vous répond sous 24h ouvrées.
              </p>
            </div>
          </div>

          {success ? (
            <div className="my-6 flex flex-col items-center justify-center rounded-lg bg-[#e9edff]/60 border border-[#0053db]/20 p-6 sm:p-8 text-center text-[#00174b] animate-in fade-in zoom-in-95 duration-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white mb-4 shadow-xs">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-base sm:text-lg text-[#141b2b]">
                Message envoyé avec succès !
              </h3>
              <p className="text-xs sm:text-sm text-[#524535] mt-1 max-w-sm">
                Merci pour votre message. Une copie a été transmise à notre support et nous vous répondrons directement par e-mail.
              </p>
              <Button
                onClick={() => setSuccess(false)}
                className="mt-6 rounded-[0.25rem] bg-[#1a1c20] text-white hover:bg-[#22252a] text-xs font-semibold px-5 h-10"
                variant="default"
              >
                Envoyer un autre message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-[0.25rem] bg-[#ffdad6]/60 border border-[#ba1a1a]/20 p-3 text-xs font-medium text-[#93000a] animate-in fade-in">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#524535] mb-1">
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] px-3.5 py-2.5 text-sm text-[#141b2b] placeholder:text-[#524535]/50 focus:bg-white focus:border-[#e59b22] focus:outline-none focus:ring-1 focus:ring-[#e59b22] transition-all"
                    placeholder="Jean"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#524535] mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] px-3.5 py-2.5 text-sm text-[#141b2b] placeholder:text-[#524535]/50 focus:bg-white focus:border-[#e59b22] focus:outline-none focus:ring-1 focus:ring-[#e59b22] transition-all"
                    placeholder="Dupont"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#524535] mb-1">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] px-3.5 py-2.5 text-sm text-[#141b2b] placeholder:text-[#524535]/50 focus:bg-white focus:border-[#e59b22] focus:outline-none focus:ring-1 focus:ring-[#e59b22] transition-all"
                  placeholder="jean.dupont@example.com"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#524535] mb-1">
                  Votre message
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-[0.25rem] border border-[#e5e7eb] bg-[#f9f9ff] p-3 text-sm text-[#141b2b] placeholder:text-[#524535]/50 focus:bg-white focus:border-[#e59b22] focus:outline-none focus:ring-1 focus:ring-[#e59b22] transition-all resize-none"
                  placeholder="Décrivez votre demande en détail (question produit, suivi de commande, etc.)..."
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 min-h-[44px] gap-2 rounded-[0.25rem] bg-[#e59b22] text-white font-semibold shadow-[0_4px_14px_0_rgba(229,155,34,0.35)] hover:bg-[#d97706] transition-all active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Envoi en cours...
                  </span>
                ) : (
                  <>
                    <Send className="h-4 w-4 stroke-[1.5]" />
                    Envoyer le message
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}