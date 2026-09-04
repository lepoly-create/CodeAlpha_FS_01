import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { useAuth } from "@/contexts/AuthContext";

import {
  getMyProfile,
  type UserProfile,
} from "@/services/user.service";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInformation from "@/components/profile/ProfileInformation";
import ChangePasswordForm from "@/components/profile/ChangePasswordForm";

export default function Profile() {
  const { updateUser } = useAuth();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
   * Chargement du profil
   */
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const profile = await getMyProfile();

        setUser(profile);
        updateUser(profile);
      } catch (error) {
        console.error(
          "Erreur lors du chargement du profil :",
          error
        );

        setError(
          "Impossible de charger votre profil."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [updateUser]);

  /*
   * Synchronisation après modification
   */
  const handleUserUpdated = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    updateUser(updatedUser);
  };

  /*
   * Chargement
   */
  if (loading) {
    return (
      <section className="space-y-8">
        <div>
          <div className="h-4 w-32 animate-pulse rounded bg-neutral-100" />

          <div className="mt-3 h-10 w-52 animate-pulse rounded bg-neutral-100" />

          <div className="mt-3 h-5 w-96 animate-pulse rounded bg-neutral-100" />
        </div>

        <div className="h-40 animate-pulse rounded-2xl bg-neutral-100" />

        <div className="h-64 animate-pulse rounded-2xl bg-neutral-100" />

        <div className="h-64 animate-pulse rounded-2xl bg-neutral-100" />
      </section>
    );
  }

  /*
   * Erreur
   */
  if (error || !user) {
    return (
      <section className="space-y-8">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
            MarketElectro
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Profil
          </h1>

          <p className="mt-2 text-neutral-500">
            Gérez vos informations personnelles et
            la sécurité de votre compte.
          </p>
        </div>

        <Card className="rounded-2xl border-red-200 bg-red-50">
          <CardContent className="flex items-center gap-3 p-6 text-red-600">
            <Loader2 className="h-5 w-5" />

            <p>
              {error || "Profil introuvable."}
            </p>
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      {/* Page heading */}
      <div>
        <p className="text-sm font-medium uppercase tracking-widest text-neutral-500">
          MarketElectro
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          Profil
        </h1>

        <p className="mt-2 text-neutral-500">
          Gérez vos informations personnelles et
          la sécurité de votre compte.
        </p>
      </div>

      {/* Présentation + photo */}
      <ProfileHeader
        user={user}
        onUpdated={handleUserUpdated}
      />

      {/* Informations personnelles */}
      <ProfileInformation
        user={user}
        onUpdated={handleUserUpdated}
      />

      {/* Sécurité */}
      <ChangePasswordForm />
    </section>
  );
}