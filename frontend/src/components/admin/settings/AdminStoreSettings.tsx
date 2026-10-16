import { useEffect, useState } from "react";
import axios from "axios";
import { Save } from "lucide-react";
import { toast } from "sonner";

import {
  getStoreSettings,
  updateStoreSettings,
  type StoreSettings,
} from "@/services/admin-settings.service";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminStoreSettings() {
  const [storeName, setStoreName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currency, setCurrency] = useState("$");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data: StoreSettings = await getStoreSettings();

        setStoreName(data.storeName);
        setContactEmail(data.contactEmail);
        setPhone(data.phone || "");
        setCurrency(data.currency);
      } catch (error: unknown) {
        toast.error(
          (axios.isAxiosError(error) && error.response?.data?.message) ||
          "Impossible de charger les paramètres de la boutique."
        );
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!storeName.trim()) {
      toast.error("Le nom de la boutique est requis.");
      return;
    }

    if (!contactEmail.trim()) {
      toast.error("L'adresse email de contact est requise.");
      return;
    }

    if (!currency.trim()) {
      toast.error("La devise est requise.");
      return;
    }

    try {
      setSaving(true);

      await updateStoreSettings({
        storeName: storeName.trim(),
        contactEmail: contactEmail.trim(),
        phone: phone.trim(),
        currency: currency.trim(),
      });

      toast.success("Paramètres de la boutique mis à jour.");
    } catch (error: unknown) {
      toast.error(
        (axios.isAxiosError(error) && error.response?.data?.message) ||
        "Impossible de mettre à jour les paramètres."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="rounded-lg border border-[#e5e7eb] bg-white p-5 sm:p-6 shadow-xs">
        <div className="space-y-4">
          <div className="h-6 w-48 animate-pulse rounded bg-[#f1f3ff]" />
          <div className="h-10 animate-pulse rounded bg-[#f1f3ff]" />
          <div className="h-10 animate-pulse rounded bg-[#f1f3ff]" />
          <div className="h-10 animate-pulse rounded bg-[#f1f3ff]" />
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-[#e5e7eb] bg-white p-5 sm:p-6 shadow-xs">
      <div className="border-b border-[#f1f3ff] pb-4 mb-5">
        <h2 className="text-base font-bold text-[#141b2b]">Configuration de la boutique</h2>
        <p className="mt-0.5 text-xs text-[#524535]">
          Configurez les paramètres publics affichés pour votre boutique en ligne.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="storeName" className="text-xs font-semibold uppercase tracking-wider text-[#141b2b]">Nom de la boutique</Label>
            <Input
              id="storeName"
              value={storeName}
              onChange={(event) => setStoreName(event.target.value)}
              placeholder="MarketElectro"
              disabled={saving}
              className="h-10 rounded-[0.25rem] border-[#e5e7eb] bg-[#f9f9ff] text-xs sm:text-sm text-[#141b2b] focus-visible:bg-white focus-visible:border-[#e59b22] focus-visible:ring-1 focus-visible:ring-[#e59b22]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="contactEmail" className="text-xs font-semibold uppercase tracking-wider text-[#141b2b]">Email de contact</Label>
            <Input
              id="contactEmail"
              type="email"
              value={contactEmail}
              onChange={(event) => setContactEmail(event.target.value)}
              placeholder="contact@marketelectro.com"
              disabled={saving}
              className="h-10 rounded-[0.25rem] border-[#e5e7eb] bg-[#f9f9ff] text-xs sm:text-sm text-[#141b2b] focus-visible:bg-white focus-visible:border-[#e59b22] focus-visible:ring-1 focus-visible:ring-[#e59b22]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-[#141b2b]">Téléphone</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+228 XX XX XX XX"
              disabled={saving}
              className="h-10 rounded-[0.25rem] border-[#e5e7eb] bg-[#f9f9ff] text-xs sm:text-sm text-[#141b2b] focus-visible:bg-white focus-visible:border-[#e59b22] focus-visible:ring-1 focus-visible:ring-[#e59b22]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="currency" className="text-xs font-semibold uppercase tracking-wider text-[#141b2b]">Devise</Label>
            <Input
              id="currency"
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
              placeholder="FCFA"
              disabled={saving}
              className="h-10 rounded-[0.25rem] border-[#e5e7eb] bg-[#f9f9ff] text-xs sm:text-sm text-[#141b2b] focus-visible:bg-white focus-visible:border-[#e59b22] focus-visible:ring-1 focus-visible:ring-[#e59b22]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-3">
          <Button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto rounded-[0.25rem] bg-[#e59b22] text-xs font-semibold text-white shadow-[0_4px_14px_0_rgba(229,155,34,0.35)] hover:bg-[#d97706] cursor-pointer h-10 px-5 gap-2"
          >
            <Save className="h-4 w-4" />
            {saving ? "Enregistrement..." : "Enregistrer les paramètres"}
          </Button>
        </div>
      </form>
    </section>
  );
}