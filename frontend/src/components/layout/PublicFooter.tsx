import { SiGithub, SiWhatsapp } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { MonitorSmartphone } from "lucide-react";
import { Link } from "react-router-dom";

export default function PublicFooter() {
  // 1. Gestion ultra-rapide du clic sur le logo / liens d'ancres
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {

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

  return (
    <footer className="border-t border-[#22252a] bg-[#121316] text-[#edf0ff]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">

          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link to="/"
              onClick={(e) => handleNavClick(e, "/")}
              className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[0.25rem] bg-[#1a1c20] text-[#e59b22] border border-[#293040] shadow-sm">
                <MonitorSmartphone className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Market<span className="text-[#e59b22]">Electro</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-xs leading-relaxed text-[#dce2f7]/70">
              Votre destination privilégiée pour l'achat de produits électroniques de haute qualité. Sécurité, rapidité et service client irréprochable.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="https://wa.me/22896033147"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Whatsapp"
                className="flex h-9 w-9 items-center justify-center rounded-[0.25rem] border border-[#293040] bg-[#1a1c20] text-[#dce2f7] transition-colors hover:border-[#e59b22] hover:text-[#e59b22]"
              >
                <SiWhatsapp className="h-4 w-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/josueamegadjin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-[0.25rem] border border-[#293040] bg-[#1a1c20] text-[#dce2f7] transition-colors hover:border-[#e59b22] hover:text-[#e59b22]"
              >
                <FaLinkedinIn className="h-4 w-4" />
              </a>

              <a
                href="https://github.com/lepoly-create"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github"
                className="flex h-9 w-9 items-center justify-center rounded-[0.25rem] border border-[#293040] bg-[#1a1c20] text-[#dce2f7] transition-colors hover:border-[#e59b22] hover:text-[#e59b22]"
              >
                <SiGithub className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation Boutique */}
          <div>
            <p className="text-sm font-bold text-white tracking-wider">Boutique</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-xs">
              <Link to="/" className="text-[#dce2f7]/70 transition-colors hover:text-[#e59b22]">
                Accueil
              </Link>
              <Link to="/products" className="text-[#dce2f7]/70 transition-colors hover:text-[#e59b22]">
                Catalogue complet
              </Link>
              <Link to="/products" className="text-[#dce2f7]/70 transition-colors hover:text-[#e59b22]">
                Promotions
              </Link>
            </nav>
          </div>

          {/* Informations */}
          <div>
            <p className="text-sm font-bold text-white tracking-wider">Informations</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-xs">
              <a href="/#about" className="text-[#dce2f7]/70 transition-colors hover:text-[#e59b22]">
                À propos
              </a>
              <a href="/#how-it-works" className="text-[#dce2f7]/70 transition-colors hover:text-[#e59b22]">
                Comment ça marche ?
              </a>
              <a href="/#contact" className="text-[#dce2f7]/70 transition-colors hover:text-[#e59b22]">
                Contact & Support
              </a>
            </nav>
          </div>

          {/* Espace Membre */}
          <div>
            <p className="text-sm font-bold text-white tracking-wider">Espace Client</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-xs">
              <Link to="/login" className="text-[#dce2f7]/70 transition-colors hover:text-[#e59b22]">
                Se connecter
              </Link>
              <Link to="/register" className="text-[#dce2f7]/70 transition-colors hover:text-[#e59b22]">
                Créer un compte
              </Link>
            </nav>
          </div>

        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-[#22252a] pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-[#dce2f7]/50">
            © {new Date().getFullYear()} MarketElectro. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-xs text-[#dce2f7]/50">
            <Link
              to="/terms"
              className="transition-colors hover:text-[#e59b22]"
            >
              Conditions Générales
            </Link>
            <Link
              to="/privacy-policy"
              className="transition-colors hover:text-[#e59b22]"
            >
              Politique de Confidentialité
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}