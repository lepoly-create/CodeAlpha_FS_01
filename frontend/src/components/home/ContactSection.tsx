import { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Clock,
  HelpCircle,
  Mail,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FaqItem[] = [
  {
    category: "Catalogue & Accès",
    question: "Faut-il obligatoirement créer un compte pour consulter les produits ?",
    answer:
      "Non, l'ensemble du catalogue MarketElectro est en accès libre et sans restriction. Vous pouvez explorer les ordinateurs, smartphones, équipements audio et accessoires, comparer les caractéristiques techniques et vérifier les stocks réels sans avoir besoin d'être connecté. La création d'un compte (en 30 secondes par email ou en 1 clic avec Google) n'est nécessaire qu'au moment de valider votre commande pour assurer le suivi d'expédition.",
  },
  {
    category: "Qualité & Garantie",
    question: "Les appareils vendus sont-ils 100% neufs et sous garantie constructeur ?",
    answer:
      "Absolument. MarketElectro ne propose aucun appareil reconditionné masqué ou d'origine douteuse. Tous nos équipements sont 100% neufs, certifiés constructeurs et livrés dans leur emballage d'origine scellé avec numéro de série traçable. Ils bénéficient tous d'une garantie matérielle constructeur de 12 à 24 mois selon les catégories.",
  },
  {
    category: "Livraison & Suivi",
    question: "Quels sont les délais de livraison et comment suivre mon colis ?",
    answer:
      "Chaque commande passée sur la plateforme est traitée et préparée sous 24h ouvrées dans nos entrepôts avec un emballage renforcé anti-chocs. Dès que le transporteur prend en charge votre colis, le statut bascule en temps réel sur votre tableau de bord « Mes Commandes ». Vous pouvez y suivre l'évolution étape par étape en toute transparence.",
  },
  {
    category: "Paiement & Sécurité",
    question: "Comment sont protégés mes paiements et mes données personnelles ?",
    answer:
      "Toutes les connexions et transactions sur MarketElectro sont chiffrées selon le protocole SSL/TLS 256 bits. Les sessions d'authentification s'appuient sur des jetons JWT sécurisés avec révocation instantanée en cas de déconnexion. Vos données bancaires ne sont jamais stockées sur nos serveurs et restent strictement protégées.",
  },
  {
    category: "Support & SAV",
    question: "Comment contacter le service client en cas de question ou d'assistance ?",
    answer:
      "Vous pouvez nous contacter à tout moment via notre formulaire de contact en ligne, par email direct à support@marketelectro.com ou depuis l'espace support de votre compte client. Notre équipe technique interne s'engage à vous répondre sous 24 heures ouvrées du lundi au samedi.",
  },
  {
    category: "Commandes & Modifications",
    question: "Puis-je modifier ou annuler une commande après l'avoir validée ?",
    answer:
      "Tant que votre commande porte le statut « En attente » dans votre espace client, vous pouvez contacter notre assistance technique pour modifier votre adresse de livraison ou demander une annulation avant que le colis ne soit remis au transporteur.",
  },
];

const contactChannels = [
  {
    icon: Mail,
    title: "Email Support Direct",
    value: "support@marketelectro.polydev.live",
    caption: "Réponse détaillée sous 24h ouvrées",
    color: "bg-[#0053db] text-white",
  },
  {
    icon: Clock,
    title: "Disponibilité de l'équipe",
    value: "Lun - Sam : 08h00 - 18h00",
    caption: "Assistance technique et suivi logistique",
    color: "bg-[#835500] text-white",
  },
  {
    icon: ShieldCheck,
    title: "Engagements Qualité",
    value: "Garantie 6-12 Mois & SAV",
    caption: "Prise en charge officielle constructeur",
    color: "bg-[#1a1c20] text-[#e59b22]",
  },
];

export default function ContactSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((current) => (current === index ? null : index));
  };

  return (
    <section id="contact" className="bg-[#f9f9ff] py-16 sm:py-20 lg:py-24 border-b border-[#e5e7eb]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">

        {/* ========================================================= */}
        {/* PARTIE 1 : BANDEAU CONTACT & INTRODUCTION                 */}
        {/* ========================================================= */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">

          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded border-0 border-[#835500]/20 bg-[#ffddb5]/50 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.08em] text-[#835500]">
              Centre d'Assistance & Contact
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#141b2b] leading-tight">
              Une question avant de commander ? Notre équipe vous répond.
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-[#524535]">
              Nous croyons qu'une boutique de référence doit offrir un accompagnement irréprochable. Que vous ayez besoin d'un conseil sur la compatibilité d'un matériel ou de précisions sur une livraison, nous sommes à votre disposition.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-[0.25rem] bg-[#e59b22] px-6 text-sm font-semibold text-white shadow-xs hover:bg-[#d97706] transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                Envoyer un message en ligne
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>

              <Link
                to="/register"
                className="inline-flex h-11 items-center justify-center rounded-[0.25rem] border border-[#e5e7eb] bg-white px-6 text-sm font-semibold text-[#141b2b] hover:bg-[#f1f3ff] transition-colors shadow-xs"
              >
                Créer un compte client
              </Link>
            </div>
          </div>

          {/* 3 Cartes de coordonnées directes */}
          <div className="lg:col-span-5 space-y-3.5">
            {contactChannels.map((channel) => {
              const Icon = channel.icon;

              return (
                <div
                  key={channel.title}
                  className="rounded-lg border border-[#e5e7eb] bg-white p-4 sm:p-5 shadow-xs transition-all hover:border-[#e59b22]/50 hover:shadow-sm flex items-start gap-4"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[0.25rem] ${channel.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#524535]">
                      {channel.title}
                    </span>
                    <p className="mt-0.5 text-sm sm:text-base font-bold text-[#141b2b] truncate">
                      {channel.value}
                    </p>
                    <p className="mt-0.5 text-xs text-[#524535]">
                      {channel.caption}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ========================================================= */}
        {/* PARTIE 2 : FOIRE AUX QUESTIONS INTERACTIVE (FAQ ACCORDÉON) */}
        {/* ========================================================= */}
        <div className="rounded-lg border border-[#e5e7eb] bg-white p-6 sm:p-8 lg:p-10 shadow-xs space-y-8">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-[#f1f3ff] pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#835500]">
                <HelpCircle className="h-4 w-4 text-[#e59b22]" />
                Questions Fréquentes (FAQ)
              </div>
              <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#141b2b] tracking-tight">
                Tout ce que vous devez savoir avant de commander
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#524535]">
                Cliquez sur une question pour déplier ou replier sa réponse détaillée.
              </p>
            </div>
          </div>

          {/* Liste interactive des questions dépliables */}
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <div
                  key={faq.question}
                  className={`rounded-[0.25rem] border transition-all duration-200 overflow-hidden ${isOpen
                    ? "border-[#e59b22] bg-[#f9f9ff] shadow-xs"
                    : "border-[#e5e7eb] bg-white hover:border-[#dce2f7] hover:bg-[#f9f9ff]/50"
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-4 sm:p-5 text-left cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#835500] bg-[#f1f3ff] px-2 py-0.5 rounded-sm border border-[#e5e7eb]">
                        0{index + 1}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-[#141b2b]">
                        {faq.question}
                      </span>
                    </div>

                    <div
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${isOpen
                        ? "bg-[#e59b22] text-white rotate-180"
                        : "bg-[#f1f3ff] text-[#524535]"
                        }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-[#e5e7eb]/80 px-4 pb-5 pt-3 sm:px-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#835500]">
                          Catégorie : {faq.category}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed text-[#524535]">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Pied de FAQ : contact complémentaire */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-[#524535] border-t border-[#f1f3ff]">
            <p>
              Votre question n'apparaît pas dans la liste ? Notre support est à votre écoute.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 font-bold text-[#835500] hover:text-[#e59b22] transition-colors"
            >
              Accéder au formulaire de contact direct
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}