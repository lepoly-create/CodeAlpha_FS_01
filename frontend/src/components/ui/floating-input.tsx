import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

export interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  icon?: React.ReactNode;
  isError?: boolean;
}

export const FloatingInput = React.forwardRef<
  HTMLInputElement,
  FloatingInputProps
>(({ id, label, icon, type = "text", isError, className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPasswordType = type === "password";

  // Détermine le type effectif du champ (text ou password)
  const inputType = isPasswordType
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="relative my-5 w-full">
      <input
        ref={ref}
        id={id}
        type={inputType}
        placeholder=" "
        aria-invalid={isError ? "true" : "false"}
        className={`peer w-full border-b-2 
            bg-transparent py-2.5 pl-1 pr-10 text-lg
             text-white outline-none transition-colors placeholder:select-none 
              ${
          isError
            ? "border-red-400 focus:border-red-300"
            : "border-white/60 focus:border-cyan-400"
        } ${className || ""}`}
        {...props}
      />

      {/* Floating Label avec la syntaxe Tailwind corrigée */}
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-1 top-2.5 text-lg transition-all duration-200 peer-focus:-translate-y-7 peer-focus:text-sm peer-not-placeholder-shown:-translate-y-7 peer-not-placeholder-shown:text-sm ${
          isError
            ? "text-red-300 peer-focus:text-red-300 peer-not-placeholder-shown:text-red-300"
            : "text-white/80 peer-focus:text-cyan-400 peer-not-placeholder-shown:text-cyan-400"
        }`}
      >
        {label}
      </label>

      {/* Icône à droite : Toggle Password ou Icône personnalisée */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-white/80">
        {isPasswordType ? (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="rounded-md p-1 transition-colors hover:text-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            aria-label={
              showPassword
                ? "Masquer le mot de passe"
                : "Afficher le mot de passe"
            }
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        ) : (
          <div className="pointer-events-none">{icon}</div>
        )}
      </div>
    </div>
  );
});

FloatingInput.displayName = "FloatingInput";