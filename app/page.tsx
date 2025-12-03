import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import TrustedBy from '@/components/TrustedBy';
import Features from '@/components/Features';
import MoreFeatures from '@/components/MoreFeatures';
import Community from '@/components/Community';
import Pricing from '@/components/Pricing';
import Configurator from '@/components/Configurator';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <TrustedBy />
      <Features />
      <MoreFeatures />
      <Community />
      <Pricing />
      <Configurator />
      <CTA />
      <Footer />
    </main>
  );
}
