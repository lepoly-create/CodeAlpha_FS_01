import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/common/BrandLogo";

export type NavSection = "hero" | "about" | "products" | "why-us" | "contact";

interface NavLink {
  label: string;
  href: string;
  id: NavSection;
}

const navLinks: NavLink[] = [
  { label: "Accueil", href: "/#hero", id: "hero" },
  { label: "À propos", href: "/#about", id: "about" },
  { label: "Catalogue", href: "/#products", id: "products" },
  { label: "Pourquoi nous", href: "/#why-us", id: "why-us" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

export default function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeScrollSection, setActiveScrollSection] = useState<NavSection>("hero");
  const location = useLocation();
  const navigate = useNavigate();

  const closeMenu = () => setMobileMenuOpen(false);


  // Navigation fluide vers une section de la landing page.
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    closeMenu();

    if (href.startsWith("/#")) {
      e.preventDefault();

      if (location.pathname !== "/") {
        void navigate(href);
        return;
      }

      const targetId = href.replace("/#", "");
      const element = document.getElementById(targetId);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", href);
      }
    }
  };

  // 1. Calcul dérivé sans `setState` synchrone dans `useEffect`
  const activeSection: NavSection =
    location.pathname === "/products" ? "products" : activeScrollSection;

  // 2. L'effet s'occupe UNIQUEMENT de la synchronisation avec le DOM (IntersectionObserver)
  useEffect(() => {
    if (location.pathname !== "/") return;

    const targetId = location.hash.replace(/^#/, "");

    if (targetId) {
      requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }

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
  }, [location.pathname, location.hash, navigate]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e5e7eb] bg-white/90 backdrop-blur-md shadow-xs transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <BrandLogo
          to="/"
          onClick={(e) => handleNavClick(e, "/")}
          size="md"
          rounded="lg"
          priority
        />

        {/* Navigation Desktop */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;

            return link.href.startsWith("/#") ? (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-sm transition-colors relative py-1 ${isActive
                  ? "font-semibold text-[#141b2b] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-[#e59b22]"
                  : "font-medium text-[#524535] hover:text-[#e59b22]"
                  }`}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.id}
                to={link.href}
                className={`text-sm transition-colors relative py-1 ${isActive
                  ? "font-semibold text-[#141b2b] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-[2px] after:bg-[#e59b22]"
                  : "font-medium text-[#524535] hover:text-[#e59b22]"
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
            className="inline-flex h-9 items-center justify-center rounded-[0.25rem] px-4 text-sm font-semibold text-[#141b2b] transition-all hover:bg-[#f1f3ff] hover:text-[#835500] active:scale-[0.98]"
          >
            Se connecter
          </Link>
          <Link
            to="/register"
            className="group relative inline-flex h-9 items-center justify-center gap-2 overflow-hidden rounded-[0.25rem] bg-[#e59b22] px-5 text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(229,155,34,0.35)] transition-all hover:bg-[#d97706] hover:shadow-[0_6px_20px_0_rgba(229,155,34,0.45)] active:scale-[0.98]"
          >
            <span>Créer un compte</span>
          </Link>
        </div>

        {/* Bouton Mobile */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-[0.25rem] border border-[#e5e7eb] text-[#141b2b] hover:bg-[#f1f3ff] md:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div className="animate-in slide-in-from-top-2 border-b border-[#e5e7eb] bg-white/95 px-4 pb-6 pt-3 backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col gap-1.5" aria-label="Navigation mobile">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return link.href.startsWith("/#") ? (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`rounded-[0.25rem] px-4 py-3 text-sm transition-all ${isActive
                    ? "bg-[#e9edff] font-semibold text-[#835500] border-l-2 border-[#e59b22]"
                    : "font-medium text-[#524535] hover:bg-[#f1f3ff] hover:text-[#141b2b]"
                    }`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.id}
                  to={link.href}
                  onClick={closeMenu}
                  className={`rounded-[0.25rem] px-4 py-3 text-sm transition-all ${isActive
                    ? "bg-[#e9edff] font-semibold text-[#835500] border-l-2 border-[#e59b22]"
                    : "font-medium text-[#524535] hover:bg-[#f1f3ff] hover:text-[#141b2b]"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#e5e7eb] pt-4">
              <Link
                to="/login"
                onClick={closeMenu}
                className="inline-flex h-11 min-h-[44px] items-center justify-center rounded-[0.25rem] border border-[#e5e7eb] bg-white text-sm font-semibold text-[#141b2b] shadow-xs transition-all active:scale-[0.98]"
              >
                Se connecter
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="inline-flex h-11 min-h-[44px] items-center justify-center rounded-[0.25rem] bg-[#e59b22] text-sm font-semibold text-white shadow-[0_4px_14px_0_rgba(229,155,34,0.35)] active:scale-[0.98]"
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