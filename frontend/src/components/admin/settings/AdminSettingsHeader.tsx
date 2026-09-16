import { Settings } from "lucide-react";

export default function AdminSettingsHeader() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Settings className="h-5 w-5 text-primary" />
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Settings
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your administrator account and store settings.
          </p>
        </div>
      </div>
    </div>
  );
}