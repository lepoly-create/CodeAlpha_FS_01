import { UserCheck } from "lucide-react";
import type { UserProfile } from "@/services/user.service";
import ProfileImageUpload from "./ProfileImageUpload";

interface ProfileHeaderProps {
  user: UserProfile;
  onUpdated: (user: UserProfile) => void;
}

export default function ProfileHeader({ user, onUpdated }: ProfileHeaderProps) {
  const roleLabel =
    user.role === "admin" ? "Administrateur" : "Espace Client";

  return (
    <div className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-xs">
      {/* Cover Banner avec dégradé Deep Matte Carbon & voile ambré */}
      <div className="relative h-28 w-full bg-gradient-to-r from-[#121316] via-[#1a1c20] to-[#22252a] sm:h-36">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(229,155,34,0.12),transparent_70%)]" />
      </div>

      {/* Profile Bar Centrée */}
      <div className="px-4 pb-8 sm:px-6">
        <div className="-mt-14 sm:-mt-18 flex flex-col items-center text-center">
          {/* Photo de profil centrée avec bouton de changement */}
          <ProfileImageUpload
            profileImage={user.profileImage}
            fullName={user.fullName}
            onUpdated={(profileImage) =>
              onUpdated({ ...user, profileImage })
            }
          />

          {/* Informations principales centrées */}
          <div className="mt-4 flex flex-col items-center space-y-1.5">
            <h1 className="text-2xl font-extrabold tracking-tight text-[#141b2b] sm:text-3xl">
              {user.fullName}
            </h1>

            <p className="text-sm font-medium text-[#524535]">
              {user.email}
            </p>

            {/* Badge de rôle épuré */}
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f1f3ff] px-3.5 py-1 text-xs font-semibold text-[#141b2b] border border-[#e5e7eb]">
                <UserCheck className="h-3.5 w-3.5 text-[#e59b22]" />
                {roleLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}