import { Mail, ShieldCheck } from "lucide-react";

import type { UserProfile } from "@/services/user.service";
import ProfileImageUpload from "./ProfileImageUpload";

interface ProfileHeaderProps {
  user: UserProfile;
  onUpdated: (user: UserProfile) => void;
}

export default function ProfileHeader({
  user,
  onUpdated,
}: ProfileHeaderProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div className="relative">
        {/* Bandeau */}
        <div className="h-32 bg-amber-200" />

        {/* Informations */}
        <div className="px-6 pb-6">
          <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end">
            <ProfileImageUpload
              profileImage={user.profileImage}
              fullName={user.fullName}
              onUpdated={(profileImage) =>
                onUpdated({ ...user, profileImage })
              }
            />

            <div className="flex-1 pb-1">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">
                    {user.fullName}
                  </h2>

                  <p className="mt-1 text-sm text-neutral-500">
                    {user.email}
                  </p>
                </div>

                <span className="w-fit rounded-full bg-neutral-100 px-3 mt-15 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-700">
                  {user.role}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-neutral-500">
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email vérifié
                </span>

                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Compte sécurisé
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}