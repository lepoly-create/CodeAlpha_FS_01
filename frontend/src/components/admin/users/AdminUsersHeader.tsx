import { Users } from "lucide-react";

export default function AdminUsersHeader() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-[0.25rem] bg-[#ffddb5]/60 text-[#835500] border border-[#835500]/20">
          <Users className="h-5 w-5" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#835500]">
            Gestion Communauté
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#141b2b] sm:text-3xl">
            Utilisateurs & Clients
          </h1>

          <p className="mt-0.5 text-xs sm:text-sm text-[#524535]">
            Gérez les comptes clients inscrits et consultez leur historique de commandes.
          </p>
        </div>
      </div>
    </div>
  );
}