import {
  useEffect,
  useRef,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "@/contexts/useAuth";

interface GoogleCredentialResponse {
  credential: string;
  select_by?: string;
  state?: string;
}

interface GoogleButtonProps {
  onError?: (
    message: string,
  ) => void;

  onCredential?: (
    credential: string,
  ) => Promise<void>;

  text?:
    | "signin_with"
    | "signup_with"
    | "continue_with";
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (
              response: GoogleCredentialResponse,
            ) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
            ux_mode?:
              | "popup"
              | "redirect";
          }) => void;

          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: string;
              size?: string;
              width?: string;
              text?: string;
              shape?: string;
            },
          ) => void;
        };
      };
    };
  }
}

let scriptPromise:
  Promise<void> | null = null;

let initializedClientId:
  string | null = null;

let activeCredentialHandler:
  ((
    credential: string,
  ) => Promise<void>) |
  null = null;

const loadGoogleScript =
  () => {
    if (
      window.google?.accounts?.id
    ) {
      return Promise.resolve();
    }

    if (scriptPromise) {
      return scriptPromise;
    }

    scriptPromise =
      new Promise<void>(
        (
          resolve,
          reject,
        ) => {
          const existing =
            document.querySelector(
              'script[src="https://accounts.google.com/gsi/client"]',
            );

          if (existing) {
            existing.addEventListener(
              "load",
              () => resolve(),
            );

            existing.addEventListener(
              "error",
              () =>
                reject(
                  new Error(
                    "Google Identity Services indisponible.",
                  ),
                ),
            );

            return;
          }

          const script =
            document.createElement(
              "script",
            );

          script.src =
            "https://accounts.google.com/gsi/client";

          script.async = true;
          script.defer = true;

          script.onload =
            () => resolve();

          script.onerror =
            () =>
              reject(
                new Error(
                  "Impossible de charger Google Identity Services.",
                ),
              );

          document.head.appendChild(
            script,
          );
        },
      );

    return scriptPromise;
  };

export default function GoogleLoginButton({
  onError,
  onCredential,
  text = "continue_with",
}: GoogleButtonProps) {
  const buttonRef =
    useRef<HTMLDivElement>(
      null,
    );

  const navigate =
    useNavigate();

  const {
    loginWithGoogle,
  } = useAuth();

  useEffect(() => {
    const clientId =
      import.meta.env
        .VITE_GOOGLE_CLIENT_ID;

    if (!clientId) {
      onError?.(
        "Configuration Google manquante.",
      );

      return;
    }

    let cancelled = false;

    const initialize =
      async () => {
        try {
          await loadGoogleScript();

          if (
            cancelled ||
            !buttonRef.current ||
            !window.google
          ) {
            return;
          }

          activeCredentialHandler =
            async (
              credential,
            ) => {
              if (
                onCredential
              ) {
                await onCredential(
                  credential,
                );
                return;
              }

              const user =
                await loginWithGoogle(
                  credential,
                );

              navigate(
                user.role === "admin"
                  ? "/admin"
                  : "/dashboard",
              );
            };

          if (
            initializedClientId
            !== clientId
          ) {
            window.google.accounts.id
              .initialize({
                client_id:
                  clientId,

                callback:
                  async (
                    response,
                  ) => {
                    try {
                      if (
                        !activeCredentialHandler
                      ) {
                        return;
                      }

                      await activeCredentialHandler(
                        response.credential,
                      );
                    } catch (
                      error
                    ) {
                      console.error(
                        error,
                      );

                      onError?.(
                        "Connexion avec Google impossible.",
                      );
                    }
                  },

                auto_select:
                  false,

                cancel_on_tap_outside:
                  true,

                ux_mode:
                  "popup",
              });

            initializedClientId =
              clientId;
          }

          buttonRef.current.innerHTML =
            "";

          window.google.accounts.id
            .renderButton(
              buttonRef.current,
              {
                theme:
                  "outline",
                size:
                  "large",
                text,
                shape:
                  "rectangular",
                width:
                  "360",
              },
            );
        } catch (
          error
        ) {
          console.error(
            error,
          );

          onError?.(
            "Google Login est indisponible.",
          );
        }
      };

    initialize();

    return () => {
      cancelled = true;
      activeCredentialHandler =
        null;
    };
  }, [
    loginWithGoogle,
    navigate,
    onCredential,
    onError,
    text,
  ]);

  return (
    <div
      ref={buttonRef}
      className="flex min-h-11 justify-center"
    />
  );
}