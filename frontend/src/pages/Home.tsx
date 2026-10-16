import AboutSection from "@/components/home/AboutSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import ContactSection from "@/components/home/ContactSection";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import WhyMarketElectroSection from "@/components/home/WhyMarketElectroSection";

export default function Home() {
  return (
    <>
      {/* 1. Présentation principale (Hero) */}
      <HeroSection />

      {/* 2. Présentation de la boutique & valeurs */}
      <AboutSection />

      {/* 3. Catégories de matériel */}
      <CategoriesSection />

      {/* 4. Sélection des produits vedettes */}
      <FeaturedProductsSection />

      {/* 5. Pourquoi choisir MarketElectro ? (Arguments comparatifs & garanties) */}
      <WhyMarketElectroSection />

      {/* 6. Comment commander & utiliser l'app (Parcours guidé 4 étapes) */}
      <HowItWorksSection />

      {/* 7. Centre d'Assistance & FAQ interactive avec réponses dépliables */}
      <ContactSection />

      {/* 8. Appel à l'action final */}
      <FinalCtaSection />
    </>
  );
}