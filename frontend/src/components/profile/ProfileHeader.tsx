import { Mail, ShieldCheck, UserCheck } from "lucide-react";
import type { UserProfile } from "@/services/user.service";
import ProfileImageUpload from "./ProfileImageUpload";

interface ProfileHeaderProps {
  user: UserProfile;
  onUpdated: (user: UserProfile) => void;
}

export default function ProfileHeader({ user, onUpdated }: ProfileHeaderProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-sm">
      {/* Cover Banner avec dégradé moderne */}
      <div className="h-32 w-full bg-linear-to-r from-slate-900 via-indigo-950 to-slate-800 sm:h-40" />

      {/* Profile Bar */}
      <div className="px-4 pb-6 sm:px-6">
        <div className="-mt-14 flex flex-col gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:gap-6">
          <ProfileImageUpload
            profileImage={user.profileImage}
            fullName={user.fullName}
            onUpdated={(profileImage) =>
              onUpdated({ ...user, profileImage })
            }
          />

          <div className="flex-1 space-y-3 pt-2 sm:pt-0">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {user.fullName}
                </h1>
                <p className="text-sm font-medium text-slate-500">
                  {user.email}
                </p>
              </div>

              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700 border border-slate-200">
                <UserCheck className="h-3.5 w-3.5 text-slate-500" />
                {user.role}
              </span>
            </div>

            {/* Badges de réassurance */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-emerald-700 border border-emerald-200/60">
                <Mail className="h-3.5 w-3.5 text-emerald-600" />
                Email vérifié
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2.5 py-1 text-blue-700 border border-blue-200/60">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
                Compte protégé
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}