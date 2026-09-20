import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  getAdminProfile,
  updateAdminProfile,
} from "@/services/admin-settings.service";

import type { AuthUser } from "@/services/auth.service";

interface AdminAccountSettingsProps {
  onProfileUpdated: (user: AuthUser) => void;
}

const getErrorMessage = (error: unknown, fallback: string) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {
    const response = error.response;

    if (
      typeof response === "object" &&
      response !== null &&
      "data" in response
    ) {
      const data = response.data;

      if (
        typeof data === "object" &&
        data !== null &&
        "message" in data &&
        typeof data.message === "string"
      ) {
        return data.message;
      }
    }
  }

  return fallback;
};

export default function AdminAccountSettings({
  onProfileUpdated,
}: AdminAccountSettingsProps) {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getAdminProfile();

        setFullName(data.fullName);
        setEmail(data.email);
      } catch (error: unknown) {
        toast.error(
          getErrorMessage(
            error,
            "Unable to load administrator profile."
          )
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSubmit = async (
    event: React.SyntheticEvent
  ) => {
    event.preventDefault();

    try {
      setSaving(true);

      const updatedUser = await updateAdminProfile({ fullName, email });

        onProfileUpdated({
        id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        role: updatedUser.role,
        profileImage: updatedUser.profileImage,
        });

      toast.success(
        "Administrator profile updated successfully."
      );
    } catch (error: unknown) {
      toast.error(
        getErrorMessage(error, "Unable to update profile.")
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-6">
        <p className="text-sm text-muted-foreground">
          Loading account information...
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white">
      <div className="border-b p-6">
        <h2 className="text-lg font-semibold">
          Administrator account
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Update your personal account information.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 p-6"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium">
              Full name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(event) =>
                setFullName(event.target.value)
              }
              className="mt-2 h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              className="mt-2 h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>
        </div>

        <div className="flex justify-end pt-5">
          
          <Button
            type="submit"
            disabled={saving}
          >
            <Save className="mr-2 h-4 w-4" />

            {saving ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}