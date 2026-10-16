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
      <Label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-[#524535]">
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
          className="h-10 rounded-[0.25rem] border-[#e5e7eb] bg-[#f9f9ff] text-[#141b2b] pr-10 focus:bg-white focus:border-[#e59b22] focus:ring-1 focus:ring-[#e59b22] text-sm"
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-[#524535]/60 hover:text-[#141b2b] hover:bg-transparent cursor-pointer"
          onClick={onToggleVisibility}
          disabled={disabled}
          aria-label={visible ? `Masquer ${label}` : `Afficher ${label}`}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>

      {description && (
        <p className="text-[11px] text-[#524535]">{description}</p>
      )}
    </div>
  );
}