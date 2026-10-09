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
      {/* Présentation principale */}
      <section id="hero">
        <HeroSection />
      </section>
     

      {/* Présentation de MarketElectro */}
      <section id="about">
        <AboutSection />
      </section>

      {/* Catégories */}
      <CategoriesSection />

      {/* Produits */}
      <FeaturedProductsSection />

      {/* Arguments de confiance */}
      <section id="why-us">
        <WhyMarketElectroSection />
      </section>

      {/* Parcours utilisateur */}
      <HowItWorksSection />

      {/* Contact */}
      <section id="contact">
        <ContactSection />
      </section>

      {/* CTA final */}
      <FinalCtaSection />
    </>
  );
}