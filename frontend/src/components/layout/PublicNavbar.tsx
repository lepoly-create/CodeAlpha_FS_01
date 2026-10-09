import { Menu, MonitorSmartphone,  X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export type NavSection = "hero" | "about" | "products" | "why-us" | "contact";

interface NavLink {
  label: string;
  href: string;
  id: NavSection;
}

const navLinks: NavLink[] = [
  { label: "Accueil", href: "/#hero", id: "hero" },
  { label: "À propos", href: "/#about", id: "about" },
  { label: "Catalogue", href: "/products", id: "products" },
  { label: "Pourquoi nous", href: "/#why-us", id: "why-us" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

export default function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeScrollSection, setActiveScrollSection] = useState<NavSection>("hero");
  const location = useLocation();

  const closeMenu = () => setMobileMenuOpen(false);


  // 1. Gestion ultra-rapide du clic sur le logo / liens d'ancres
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    closeMenu();

    // Si on est sur la page d'accueil et qu'il s'agit d'une ancre (ex: /#about ou /)
    if (location.pathname === "/" && (href.startsWith("/#") || href === "/")) {
      e.preventDefault();
      const targetId = href.replace("/#", "");

      if (href === "/" || targetId === "hero") {
        // Remontée instantanée en haut
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        window.history.pushState(null, "", "/");
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          // Saut instantané vers la section sans lag
          element.scrollIntoView({ behavior: "instant" as ScrollBehavior });
          window.history.pushState(null, "", href);
        }
      }
    }
  };

  // 1. Calcul dérivé sans `setState` synchrone dans `useEffect`
  const activeSection: NavSection =
    location.pathname === "/products" ? "products" : activeScrollSection;

  // 2. L'effet s'occupe UNIQUEMENT de la synchronisation avec le DOM (IntersectionObserver)
  useEffect(() => {
    if (location.pathname !== "/") return;

    const sections = document.querySelectorAll<HTMLElement>("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            const sectionId = entry.target.id as NavSection;
            // Appel asynchrone via la promesse du navigateur (événement scroll/intersection)
            setActiveScrollSection(sectionId);
          }
        });
      },
      {
        rootMargin: "-25% 0px -45% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-0 shadow-2xl border-slate-200/80 bg-white/80 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={(e) => handleNavClick(e, "/")}
          className="group flex items-center gap-3 transition-transform duration-200 hover:scale-[1.02]"
          aria-label="MarketElectro - Accueil"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-500/20 group-hover:shadow-lg group-hover:shadow-indigo-500/30">
            <MonitorSmartphone className="h-5 w-5 transition-transform duration-300 group-hover:rotate-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Market
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Electro
            </span>
          </span>
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            return link.href.startsWith("/#") ? (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm transition-colors ${
                  isActive
                    ? "font-semibold text-indigo-600"
                    : "font-medium text-slate-600 hover:text-indigo-600"
                }`}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.id}
                to={link.href}
                className={`text-sm transition-colors ${
                  isActive
                    ? "font-semibold text-indigo-600"
                    : "font-medium text-slate-600 hover:text-indigo-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions Desktop */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98]"
          >
            Se connecter
          </Link>
          <Link
            to="/register"
            className="group relative inline-flex h-10 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:shadow-lg hover:shadow-indigo-500/30 active:scale-[0.98]"
          >
            <span>Créer un compte</span>
          </Link>
        </div>

        {/* Bouton Mobile */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 md:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="animate-in slide-in-from-top-2 border-b border-slate-200 bg-white/95 px-4 pb-6 pt-3 backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col gap-1.5" aria-label="Navigation mobile">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return link.href.startsWith("/#") ? (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`rounded-xl px-4 py-3 text-sm transition-all ${
                    isActive
                      ? "bg-indigo-50/80 font-semibold text-indigo-600"
                      : "font-medium text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.id}
                  to={link.href}
                  onClick={closeMenu}
                  className={`rounded-xl px-4 py-3 text-sm transition-all ${
                    isActive
                      ? "bg-indigo-50/80 font-semibold text-indigo-600"
                      : "font-medium text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
              <Link
                to="/login"
                onClick={closeMenu}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 shadow-sm transition-all active:scale-[0.98]"
              >
                Se connecter
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 active:scale-[0.98]"
              >
                S'inscrire
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}