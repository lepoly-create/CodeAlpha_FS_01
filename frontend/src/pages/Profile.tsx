import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/useAuth";
import { getMyProfile, type UserProfile } from "@/services/user.service";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInformation from "@/components/profile/ProfileInformation";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";
import ChangeEmailForm from "@/components/profile/ChangeEmailForm";
import LinkGoogleAccountButton from "@/components/auth/LinkGoogleAccountButton";
import DeleteAccountSection from "@/components/profile/DeleteAccountSection";

export default function Profile() {
  const { updateUser } = useAuth();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");
        const profile = await getMyProfile();

        if (isMounted) {
          setUser(profile);
          updateUser(profile);
        }
      } catch (err) {
        console.error("Erreur chargement profil:", err);
        if (isMounted) {
          setError("Impossible de charger les données de votre profil.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [updateUser]);

  const handleUserUpdated = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    updateUser(updatedUser);
  };

  /* Skeleton Loader Responsive */
  if (loading) {
    return (
      <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6 animate-pulse">
        <div className="space-y-2">
          <div className="h-4 w-28 rounded bg-[#f1f3ff]" />
          <div className="h-8 w-48 rounded bg-[#f1f3ff]" />
        </div>
        <div className="h-60 rounded-lg bg-[#f1f3ff]" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-52 rounded-lg bg-[#f1f3ff]" />
            <div className="h-36 rounded-lg bg-[#f1f3ff]" />
          </div>
          <div className="space-y-6">
            <div className="h-52 rounded-lg bg-[#f1f3ff]" />
            <div className="h-52 rounded-lg bg-[#f1f3ff]" />
          </div>
        </div>
      </div>
    );
  }

  /* Vue d'erreur */
  if (error || !user) {
    return (
      <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#835500]">
            MarketElectro
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-[#141b2b] sm:text-3xl">
            Mon Profil
          </h1>
        </div>

        <Card className="rounded-lg border border-[#ba1a1a]/20 bg-[#ffdad6]/40">
          <CardContent className="flex items-center gap-3 p-6 text-[#ba1a1a]">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-sm font-medium">
              {error || "Une erreur est survenue lors du chargement."}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6">
      {/* En-tête de section */}
      <div>
        <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#835500]">
          Espace Client
        </span>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#141b2b] sm:text-3xl">
          Paramètres du compte
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#524535]">
          Gérez vos informations personnelles et la sécurité de votre accès.
        </p>
      </div>

      {/* Carte En-tête Profil */}
      <ProfileHeader user={user} onUpdated={handleUserUpdated} />

      {/* Disposition principale en Grille : 2 Cols (Desktop) / 1 Col (Mobile) */}
      <div className="grid gap-6 lg:grid-cols-3 items-start">
        {/* Colonne Gauche : Informations & Liaisons de compte */}
        <div className="space-y-6 lg:col-span-2">
          <ProfileInformation user={user} onUpdated={handleUserUpdated} />

          {/* Integration Google */}
          <Card className="rounded-lg border border-[#e5e7eb] bg-white shadow-xs">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4 border-b border-[#f1f3ff] pb-4">
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-[#141b2b]">
                    Compte Google
                  </h2>
                  <p className="mt-0.5 text-xs text-[#524535]">
                    Liez votre compte pour une connexion rapide en un clic.
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <LinkGoogleAccountButton />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Colonne Droite : Sécurité & Authentification */}
        <div className="space-y-6 lg:col-span-1">
          <ChangeEmailForm />
          <ChangePasswordForm />
        </div>
      </div>

      {/* Zone de danger (réservée aux utilisateurs clients) */}
      {user.role === "customer" && (
        <div className="pt-4 border-t border-[#e5e7eb]">
          <DeleteAccountSection />
        </div>
      )}
    </div>
  );
}