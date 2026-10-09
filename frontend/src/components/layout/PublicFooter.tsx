import { SiGithub,  SiWhatsapp } from "react-icons/si";
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
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link to="/"
            
                onClick={(e) => handleNavClick(e, "/")} 
                className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-md">
                <MonitorSmartphone className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Market<span className="text-indigo-400">Electro</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-xs leading-relaxed text-slate-400">
              Votre destination privilégiée pour l'achat de produits électroniques de haute qualité. Sécurité, rapidité et service client irréprochable.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="https://wa.me/22896033147"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Whatsapp"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition-colors hover:border-indigo-500 hover:text-white"
              >
                <SiWhatsapp className="h-4 w-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/josueamegadjin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition-colors hover:border-indigo-500 hover:text-white"
              >
                <FaLinkedinIn className="h-4 w-4" />
              </a>

              <a
                href="https://github.com/lepoly-create"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition-colors hover:border-indigo-500 hover:text-white"
              >
                <SiGithub className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation Boutique */}
          <div>
            <p className="text-sm font-bold text-white">Boutique</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-xs">
              <Link to="/" className="transition-colors hover:text-indigo-400">
                Accueil
              </Link>
              <Link to="/products" className="transition-colors hover:text-indigo-400">
                Catalogue complet
              </Link>
              <Link to="/products" className="transition-colors hover:text-indigo-400">
                Promotions
              </Link>
            </nav>
          </div>

          {/* Informations */}
          <div>
            <p className="text-sm font-bold text-white">Informations</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-xs">
              <a href="/#about" className="transition-colors hover:text-indigo-400">
                À propos
              </a>
              <a href="/#how-it-works" className="transition-colors hover:text-indigo-400">
                Comment ça marche ?
              </a>
              <a href="/#contact" className="transition-colors hover:text-indigo-400">
                Contact & Support
              </a>
            </nav>
          </div>

          {/* Espace Membre */}
          <div>
            <p className="text-sm font-bold text-white">Espace Client</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-xs">
              <Link to="/login" className="transition-colors hover:text-indigo-400">
                Se connecter
              </Link>
              <Link to="/register" className="transition-colors hover:text-indigo-400">
                Créer un compte
              </Link>
            </nav>
          </div>

        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-slate-800/80 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} MarketElectro. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <span className="hover:text-slate-300 cursor-pointer">Conditions Générales</span>
            <span className="hover:text-slate-300 cursor-pointer">Politique de Confidentialité</span>
          </div>
        </div>

      </div>
    </footer>
  );
}