import {
  useState,
} from "react";

import {
  toast,
} from "sonner";

import {
  useAuth,
} from "@/contexts/useAuth";

import {
  linkGoogleAccount,
} from "@/services/user.service";

import GoogleLoginButton
  from "./GoogleLoginButton";

export default function LinkGoogleAccountButton() {
  const {
    user,
    updateUser,
  } = useAuth();

  const [
    message,
    setMessage,
  ] = useState("");

  if (!user) {
    return null;
  }

  if (
    user.authProvider ===
    "google"
  ) {
    return null;
  }

  if (
    user.authProvider ===
    "both"
  ) {
    return (
      <p className="text-sm text-green-600">
        Votre compte Google est déjà lié.
      </p>
    );
  }

  const handleCredential =
    async (
      credential: string,
    ) => {
      try {
        const updatedUser =
          await linkGoogleAccount(
            credential,
          );

        updateUser(
          updatedUser,
        );

        setMessage(
          "Google a été lié à votre compte.",
        );

        toast.success(
          "Compte Google lié avec succès.",
        );
      } catch (
        error: any
      ) {
        toast.error(
          error?.response?.data
            ?.message ||
            "Impossible de lier Google.",
        );

        throw error;
      }
    };

  return (
    <div className="space-y-3">

      <GoogleLoginButton
        text="continue_with"
        onCredential={
          handleCredential
        }
        onError={setMessage}
      />

      {message && (
        <p className="text-sm text-neutral-500">
          {message}
        </p>
      )}
    </div>
  );
}