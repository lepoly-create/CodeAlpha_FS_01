import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MonitorSmartphone } from "lucide-react";
import { cn } from "@/lib/utils";

export type LogoSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type LogoRounded = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
export type LogoVariant = "light" | "dark" | "auto";

export interface BrandLogoProps {
  /** Taille prédéfinie du logo (image) */
  size?: LogoSize;
  /** Rayon de bordure (rounded) adapté au niveau d'intégration */
  rounded?: LogoRounded;
  /** Afficher le libellé textuel "MarketElectro" à côté */
  withText?: boolean;
  /** Variante de contraste pour le texte (clair ou sombre) */
  variant?: LogoVariant;
  /** Lien de redirection au clic (ex: "/", "/dashboard", "/admin") */
  to?: string;
  /** Action personnalisée au clic (ex: scroll fluide ou fermeture menu) */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Badge ou sous-titre optionnel (ex: "Admin", "Officiel") */
  badge?: string;
  /** Classes CSS supplémentaires pour le conteneur englobant */
  className?: string;
  /** Classes CSS spécifiques pour l'élément image */
  imageClassName?: string;
  /** Classes CSS spécifiques pour le libellé textuel */
  textClassName?: string;
  /** Effet d'animation interactif au survol */
  interactive?: boolean;
  /** Priorité de chargement de l'image (eager / lazy) */
  priority?: boolean;
}

const sizeConfig: Record<
  LogoSize,
  {
    box: string;
    text: string;
    icon: string;
    badge: string;
    defaultRounded: LogoRounded;
  }
> = {
  xs: {
    box: "h-6 w-6 min-w-6",
    text: "text-sm",
    icon: "h-3.5 w-3.5",
    badge: "text-[9px] px-1 py-0.5",
    defaultRounded: "sm",
  },
  sm: {
    box: "h-8 w-8 min-w-8",
    text: "text-lg",
    icon: "h-4 w-4",
    badge: "text-[10px] px-1.5 py-0.5",
    defaultRounded: "md",
  },
  md: {
    box: "h-9 w-9 min-w-9 sm:h-10 sm:w-10 sm:min-w-10",
    text: "text-xl",
    icon: "h-5 w-5",
    badge: "text-[10px] px-1.5 py-0.5",
    defaultRounded: "lg",
  },
  lg: {
    box: "h-12 w-12 min-w-12",
    text: "text-2xl",
    icon: "h-6 w-6",
    badge: "text-xs px-2 py-0.5",
    defaultRounded: "xl",
  },
  xl: {
    box: "h-16 w-16 min-w-16",
    text: "text-3xl",
    icon: "h-8 w-8",
    badge: "text-xs px-2.5 py-1",
    defaultRounded: "2xl",
  },
  "2xl": {
    box: "h-20 w-20 min-w-20",
    text: "text-4xl",
    icon: "h-10 w-10",
    badge: "text-sm px-3 py-1",
    defaultRounded: "2xl",
  },
};

const roundedMap: Record<LogoRounded, string> = {
  none: "rounded-none",
  sm: "rounded-[0.25rem]",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
};

export default function BrandLogo({
  size = "md",
  rounded,
  withText = true,
  variant = "light",
  to,
  onClick,
  badge,
  className,
  imageClassName,
  textClassName,
  interactive = true,
  priority = false,
}: BrandLogoProps) {
  const [hasError, setHasError] = useState(false);
  const cfg = sizeConfig[size] || sizeConfig.md;
  const appliedRounded = roundedMap[rounded ?? cfg.defaultRounded];

  const textColorClass =
    variant === "dark"
      ? "text-white"
      : variant === "light"
      ? "text-[#141b2b]"
      : "text-[#141b2b] dark:text-white";

  // Rendu de l'icône / image du logo
  const logoImage = (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden transition-all duration-300",
        cfg.box,
        appliedRounded,
        variant === "dark"
          ? "border border-white/15 bg-[#1a1c20] shadow-[0_2px_10px_rgba(229,155,34,0.15)]"
          : "border border-black/5 bg-[#ff8d51]/10 shadow-xs",
        interactive && "group-hover:scale-105 group-hover:shadow-md",
        imageClassName
      )}
    >
      {!hasError ? (
        <img
          src="/images/logo.png"
          alt="MarketElectro"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setHasError(true)}
          className={cn(
            "h-full w-full object-cover transition-transform duration-300",
            appliedRounded,
            interactive && "group-hover:scale-110"
          )}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[#1a1c20] text-[#e59b22]">
          <MonitorSmartphone className={cfg.icon} />
        </div>
      )}
    </div>
  );

  // Rendu de la marque textuelle "MarketElectro"
  const textElement = withText && (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "font-bold tracking-tight select-none",
          cfg.text,
          textColorClass,
          textClassName
        )}
      >
        Market<span className="text-[#e59b22]">Electro</span>
      </span>

      {badge && (
        <span
          className={cn(
            "font-semibold uppercase tracking-wider rounded-[0.25rem] bg-[#e59b22]/15 text-[#e59b22] border border-[#e59b22]/30",
            cfg.badge
          )}
        >
          {badge}
        </span>
      )}
    </div>
  );

  const innerContent = (
    <>
      {logoImage}
      {textElement}
    </>
  );

  const containerClasses = cn(
    "group inline-flex items-center gap-3 transition-transform duration-200",
    interactive && "hover:opacity-95 active:scale-[0.99]",
    className
  );

  if (to) {
    return (
      <Link
        to={to}
        onClick={onClick}
        className={containerClasses}
        aria-label="MarketElectro - Accueil"
      >
        {innerContent}
      </Link>
    );
  }

  return <div className={containerClasses}>{innerContent}</div>;
}
