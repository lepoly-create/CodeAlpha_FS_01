import type { ChangeEvent } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  autoComplete: "current-password" | "new-password";
  visible: boolean;
  disabled: boolean;
  description?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onToggleVisibility: () => void;
}

export default function PasswordField({
  id,
  label,
  value,
  placeholder,
  autoComplete,
  visible,
  disabled,
  description,
  onChange,
  onToggleVisibility,
}: PasswordFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-medium text-slate-700">
        {label}
      </Label>

      <div className="relative">
        <Input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          required
          className="h-10 rounded-xl border-slate-200 pr-10 focus-visible:ring-slate-950 text-sm"
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-slate-400 hover:text-slate-600 hover:bg-transparent"
          onClick={onToggleVisibility}
          disabled={disabled}
          aria-label={visible ? `Masquer ${label}` : `Afficher ${label}`}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>

      {description && (
        <p className="text-[11px] text-slate-500">{description}</p>
      )}
    </div>
  );
}