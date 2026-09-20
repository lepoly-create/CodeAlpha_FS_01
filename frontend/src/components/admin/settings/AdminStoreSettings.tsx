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

  const handleSubmit = async (event: React.FormEvent) => {
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
      <section className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="space-y-4">
          <div className="h-6 w-48 animate-pulse rounded bg-muted" />
          <div className="h-10 animate-pulse rounded bg-muted" />
          <div className="h-10 animate-pulse rounded bg-muted" />
          <div className="h-10 animate-pulse rounded bg-muted" />
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border  bg-card p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Store settings</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure the information displayed for your store.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="storeName">Store name</Label>
            <Input
              id="storeName"
              value={storeName}
              onChange={(event) => setStoreName(event.target.value)}
              placeholder="MarketElectro"
              disabled={saving}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact email</Label>
            <Input
              id="contactEmail"
              type="email"
              value={contactEmail}
              onChange={(event) => setContactEmail(event.target.value)}
              placeholder="contact@marketelectro.com"
              disabled={saving}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+228 XX XX XX XX"
              disabled={saving}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Input
              id="currency"
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
              placeholder="$"
              disabled={saving}
            />
          </div>
        </div>

        <div className="flex justify-end pt-5">
          <Button
            type="submit"
            disabled={saving}
            className="gap-2"
          >
            <Save className="h-4 w-4" />

            {saving ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </section>
  );
}