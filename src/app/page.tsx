import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProductSection from '@/components/ProductSection';
import BenefitsSection from '@/components/BenefitsSection';
import GuidanceSection from '@/components/GuidanceSection';
import OrderingSteps from '@/components/OrderingSteps';
import GallerySection from '@/components/GallerySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProductSection />
        <BenefitsSection />
        <GuidanceSection />
        <OrderingSteps />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
