'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Scroll zu einem Element mit optionalem URL-Parameter
  const scrollToSection = useCallback((sectionId: string, product?: string) => {
    // Setze den Hash für die Produkt-Vorauswahl
    if (product) {
      window.location.hash = `${sectionId}?product=${product}`;
    }

    // Scroll zum Element
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const regionalPlans = [
    {
      name: 'Büsumer Bankquischer',
      description: 'Das Original aus Büsum mit Garnelen-Logo.',
      image: '/buesumer-produkt.png',
      gradient: 'bg-[#B7EDB4]/40',
      product: 'buesumer',
    },
    {
      name: 'Sylter Bankquischer',
      description: 'Die Sylt-Edition mit Insel-Silhouette.',
      image: '/sylter-produkt.png',
      gradient: 'bg-[#9BC5E3]/40',
      product: 'sylter',
    },
    {
      name: 'Norderneyer Bankquischer',
      description: 'Die Norderney-Edition für Inselurlauber.',
      image: '/nordeneyer-bankquischer.png',
      gradient: 'bg-[#F5D6BA]/50',
      product: 'norderneyer',
    },
    {
      name: 'Rügener Bankquischer',
      description: 'Die Rügen-Edition für Ostseefans.',
      image: '/ruegener-bankquischer.png',
      gradient: 'bg-[#E8D4E8]/50',
      product: 'ruegener',
    },
  ];

  return (
    <section ref={ref} id="pricing" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">Geschäftskunden</p>
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-6">
            Bestelloptionen für
            <br />
            Geschäftskunden
          </h2>
          <div className="inline-block bg-blue-50 border border-blue-100 rounded-full px-6 py-2">
            <p className="text-blue-800 font-medium">
              Mindestbestellmenge: 1.000 Stück
            </p>
          </div>
        </motion.div>

        {/* Regionale Editionen */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Regionale Editionen</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {regionalPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 border-2 border-gray-200 space-y-4 flex flex-col"
              >
                {/* Product Image */}
                <div className={`w-full aspect-square ${plan.gradient} rounded-xl flex items-center justify-center p-4 shadow-md`}>
                  <div className="relative w-full h-full">
                    <Image
                      src={plan.image}
                      alt={plan.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="flex-grow text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{plan.name}</h3>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-auto"
                >
                  <button
                    onClick={() => scrollToSection('kontakt', plan.product)}
                    className="block w-full text-center py-2.5 rounded-full font-medium transition-colors bg-gray-100 text-gray-900 hover:bg-gray-200 text-sm cursor-pointer"
                  >
                    Jetzt anfragen
                  </button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Individualisierung */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Individuelles Design</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Option 1: Die vier vorgedruckten */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg space-y-6 flex flex-col"
            >
              <div className="text-center">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Die vier vorgedruckten</h4>
                <p className="text-gray-600 text-sm mb-6">
                  Wählen Sie aus unseren vier regionalen Editionen: Büsum, Sylt, Norderney oder Rügen.
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-auto"
              >
                <Link
                  href="#pricing"
                  className="block w-full text-center py-3 rounded-full font-medium transition-colors bg-gray-100 text-gray-900 hover:bg-gray-200"
                >
                  Editionen ansehen
                </Link>
              </motion.div>
            </motion.div>

            {/* Option 2: Selbst konfigurieren */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 border-2 border-[#2E5A4B] shadow-lg bg-gradient-to-br from-white to-[#FDF8F3] space-y-6 flex flex-col"
            >
              <div className="text-center">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Selbst konfigurieren</h4>
                <p className="text-gray-600 text-sm mb-6">
                  Wählen Sie Farbe, Text und Logo selbst aus. Live-Vorschau inklusive.
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-auto"
              >
                <Link
                  href="#konfigurator"
                  className="block w-full text-center py-3 rounded-full font-medium transition-colors bg-[#2E5A4B] text-white hover:bg-[#234539] shadow-lg"
                >
                  Jetzt konfigurieren
                </Link>
              </motion.div>
            </motion.div>

            {/* Option 3: Designen lassen */}
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg space-y-6 flex flex-col"
            >
              <div className="text-center">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">Designen lassen</h4>
                <p className="text-gray-600 text-sm mb-6">
                  Lassen Sie sich von uns ein individuelles Design erstellen. Wir beraten Sie gerne.
                </p>
              </div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-auto"
              >
                <button
                  onClick={() => scrollToSection('kontakt')}
                  className="block w-full text-center py-3 rounded-full font-medium transition-colors bg-gray-100 text-gray-900 hover:bg-gray-200 cursor-pointer"
                >
                  Design anfragen
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 1 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 text-sm uppercase tracking-wider">
            Immer dabei - trocken sitzt's sich besser!
          </p>
        </motion.div>
      </div>
    </section>
  );
}






