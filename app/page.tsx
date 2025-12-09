import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import VideoComparison from "@/components/VideoComparison";
import MoreFeatures from "@/components/MoreFeatures";
import Community from "@/components/Community";
import Pricing from "@/components/Pricing";
import Configurator from "@/components/Configurator";
import Contact from "@/components/Contact";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <VideoComparison />
      <Pricing />
      <MoreFeatures />
      <Community />
      <Configurator />
      <Contact />
      <CTA />
      <Footer />
    </main>
  );
}
