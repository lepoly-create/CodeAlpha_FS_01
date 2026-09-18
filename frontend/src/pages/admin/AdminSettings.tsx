import { useAuth } from "@/contexts/useAuth";

import AdminSettingsHeader from "@/components/admin/settings/AdminSettingsHeader";
import AdminAccountSettings from "@/components/admin/settings/AdminAccountSettings";
import AdminPasswordSettings from "@/components/admin/settings/AdminPasswordSettings";
import AdminStoreSettings from "@/components/admin/settings/AdminStoreSettings";

export default function AdminSettings() {
  const { updateUser } = useAuth();

  return (
    <div className="w-full space-y-6 sm:space-y-8">
      <AdminSettingsHeader />

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminAccountSettings onProfileUpdated={updateUser} />

        <AdminPasswordSettings />

        <div className="xl:col-span-2">
          <AdminStoreSettings />
        </div>
      </div>
    </div>
  );
}