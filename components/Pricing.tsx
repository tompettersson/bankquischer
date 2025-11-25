'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const plans = [
    {
      name: 'Büsumer Bankquischer',
      price: 'Auf Anfrage',
      description: 'Das Original aus Büsum mit Garnelen-Logo. Perfekt für alle, die die Nordsee lieben.',
      features: [
        'Microfasertuch 20 x 30 cm',
        'Pouch mit Karabiner',
        'Garnelen-Logo',
        'Made in Germany',
        'Immer dabei',
      ],
      cta: 'Jetzt bestellen',
      highlight: true,
      comingSoon: false,
    },
    {
      name: 'Sylter Bankquischer',
      price: 'Auf Anfrage',
      description: 'Die Sylt-Edition mit Insel-Silhouette. Für alle Sylt-Liebhaber.',
      features: [
        'Microfasertuch 20 x 30 cm',
        'Pouch mit Karabiner',
        'Sylt-Logo',
        'Made in Germany',
        'Immer dabei',
      ],
      cta: 'Jetzt bestellen',
      highlight: false,
      comingSoon: false,
    },
    {
      name: 'Lahntal Bankquischer',
      price: 'Bald verfügbar',
      description: 'Die Lahntal-Edition. Perfekt für Wanderungen entlang der Lahn.',
      features: [
        'Microfasertuch 20 x 30 cm',
        'Pouch mit Karabiner',
        'Lahntal-Logo',
        'Made in Germany',
        'Immer dabei',
      ],
      cta: 'Benachrichtigen',
      highlight: false,
      comingSoon: true,
    },
    {
      name: 'Westerwald Bankquischer',
      price: 'Bald verfügbar',
      description: 'Die Westerwald-Edition. Für Naturfreunde im Westerwald.',
      features: [
        'Microfasertuch 20 x 30 cm',
        'Pouch mit Karabiner',
        'Westerwald-Logo',
        'Made in Germany',
        'Immer dabei',
      ],
      cta: 'Benachrichtigen',
      highlight: false,
      comingSoon: true,
    },
  ];

  return (
    <section ref={ref} id="pricing" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">varianten</p>
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-4">
            Wählen Sie Ihre
            <br />
            Bankquischer-Edition
          </h2>
        </motion.div>


        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className={`bg-white rounded-2xl p-8 border-2 ${
                plan.highlight
                  ? 'border-gray-900 shadow-xl'
                  : plan.comingSoon
                  ? 'border-gray-200 opacity-75'
                  : 'border-gray-200'
              } space-y-6 ${plan.comingSoon ? 'relative' : ''}`}
            >
              {plan.comingSoon && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-[#9BC5E3]/20 text-[#9BC5E3] text-xs rounded-full font-medium border border-[#9BC5E3]/30">
                    Bald verfügbar
                  </span>
                </div>
              )}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-semibold text-gray-900">{plan.price}</span>
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 text-gray-700">
                    <span className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.div
                whileHover={plan.comingSoon ? {} : { scale: 1.05 }}
                whileTap={plan.comingSoon ? {} : { scale: 0.95 }}
              >
                {plan.comingSoon ? (
                  <div className="block w-full text-center py-4 rounded-full font-medium bg-gray-100 text-gray-400 cursor-not-allowed">
                    {plan.cta}
                  </div>
                ) : (
                  <Link
                    href="/contact-us"
                    className={`block w-full text-center py-4 rounded-full font-medium transition-colors ${
                      plan.highlight
                        ? 'bg-gray-900 text-white hover:bg-gray-800'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 1 }}
          className="text-center mt-16"
        >
          <p className="text-gray-500 text-sm uppercase tracking-wider mb-8">
            Immer dabei - trocken sitzt's sich besser!
          </p>
        </motion.div>
      </div>
    </section>
  );
}






