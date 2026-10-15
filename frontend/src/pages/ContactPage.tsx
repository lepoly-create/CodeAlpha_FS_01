import { useState } from "react";
import axios from "axios";
import api from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle2, MessageSquare, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
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
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
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
    <div className="min-h-[85vh] bg-neutral-50/50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="mx-auto max-w-xl w-full">
        
        {/* Lien de retour */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-950 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l'accueil
          </Link>
        </div>

        {/* Carte principale */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 p-8 shadow-xl shadow-neutral-900/5">
          
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-900 text-white shadow-md">
              <MessageSquare className="h-6 w-6 stroke-[1.5]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Contactez-nous</h1>
              <p className="text-sm text-neutral-500">Notre équipe vous répond sous 24h ouvrées.</p>
            </div>
          </div>

          {success ? (
            <div className="my-8 flex flex-col items-center justify-center rounded-2xl bg-emerald-50/60 border border-emerald-100 p-8 text-center text-emerald-900 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white mb-4 shadow-sm">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg text-emerald-950">Message envoyé avec succès !</h3>
              <p className="text-sm text-emerald-700 mt-1 max-w-sm">
                Merci pour votre message. Une copie a été transmise à notre support et nous vous répondrons directement par e-mail.
              </p>
              <Button
                onClick={() => setSuccess(false)}
                className="mt-6 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800"
                variant="default"
              >
                Envoyer un autre message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="rounded-xl bg-rose-50 border border-rose-100 p-4 text-sm text-rose-700 animate-in fade-in">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
                    Prénom
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-neutral-900 focus:outline-none transition-all"
                    placeholder="Jean"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
                    Nom
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-neutral-900 focus:outline-none transition-all"
                    placeholder="Dupont"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-neutral-900 focus:outline-none transition-all"
                  placeholder="jean.dupont@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
                  Votre message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-neutral-200 bg-neutral-50/50 p-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:border-neutral-900 focus:outline-none transition-all resize-none"
                  placeholder="Décrivez votre demande en détail (question produit, suivi de commande, etc.)..."
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 gap-2 rounded-xl bg-neutral-900 text-white font-semibold hover:bg-neutral-800 transition-all active:scale-[0.98] shadow-md"
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