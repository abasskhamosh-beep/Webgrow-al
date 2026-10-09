import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { AboutSection } from "@/components/AboutSection";
import { Portfolio } from "@/components/Portfolio";
import { BlogPreview } from "@/components/BlogPreview";
import { FAQ } from "@/components/FAQ";
import { CTABand } from "@/components/CTABand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <AboutSection />
      <Portfolio />
      <BlogPreview />
      <FAQ />
      <CTABand />
    </>
  );
}
