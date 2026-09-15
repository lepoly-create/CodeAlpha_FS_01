import { Users } from "lucide-react";

export default function AdminUsersHeader() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Users className="h-5 w-5 text-primary" />
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Users
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage registered customers and view their activity.
          </p>
        </div>
      </div>
    </div>
  );
}