'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function MoreFeatures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const useCases = [
    'Strandbänke', 'Parkbänke', 'Fahrradsattel', 'Biergärten', 
    'Stadionbänke', 'Campingplätze', 'Strandkörbe', 'Bootsstege',
    'Picknickbänke', 'Schaukeln', 'Gartenmöbel', 'Terrassen',
    'Ruderbänke', 'Open-Air-Kinos', 'Außengastronomie', 'Tretboote'
  ];

  const featureCards = [
    {
      title: 'Schnelle Absorption',
      description: 'Das Microfasertuch saugt Regentropfen in Sekunden auf und sorgt sofort für eine trockene Sitzfläche.',
    },
    {
      title: 'Wiederverwendbar',
      description: 'Einfach auswringen und wieder verwenden. Der Bankquischer ist langlebig und umweltfreundlich.',
    },
    {
      title: 'Immer dabei',
      description: 'Dank der praktischen Pouch mit Karabiner-Clip haben Sie den Bankquischer immer griffbereit - an der Tasche, am Gürtel oder an der Jacke.',
    },
  ];

  return (
    <section ref={ref} id="features" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">weitere vorteile</p>
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-4">
            Perfekt für alle,
            <br />
            die gerne draußen sitzen
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h5 className="text-xl font-semibold text-gray-900">
              Ideal für alle Outdoor-Aktivitäten
            </h5>
            <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/bank2.jpg"
                alt="Bankquischer im Einsatz"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-gray-600">
              <strong>Vielseitig einsetzbar</strong>. Ob am Strand, im Park, beim Wandern oder Camping - der Bankquischer ist Ihr treuer Begleiter für trockenes Sitzen überall dort, wo Sie es brauchen.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h5 className="text-xl font-semibold text-gray-900">
              Perfekt für diese Einsatzorte
            </h5>
            <div className="flex flex-wrap gap-4">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 border border-gray-200"
                >
                  {useCase}
                </motion.div>
              ))}
            </div>
            <p className="text-gray-600">
              <strong>Überall einsetzbar</strong>. Der Bankquischer ist der perfekte Begleiter für alle Situationen, in denen Sie eine trockene Sitzfläche benötigen - ob beim Radfahren, im Biergarten oder beim Open-Air-Konzert.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {featureCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <h6 className="text-lg font-semibold text-gray-900">{card.title}</h6>
              <p className="text-gray-600">{card.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Karabiner-Sektion */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-12 items-center bg-[#F9F8F5] rounded-3xl p-8 md:p-12"
        >
          <div className="relative aspect-square max-w-md mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/karabiner.jpg"
              alt="Praktischer Karabinerhaken des Bankquischers"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-900">
              Immer griffbereit dank Karabiner
            </h3>
            <p className="text-lg text-gray-600">
              Der praktische Karabinerhaken macht den Bankquischer zum perfekten Begleiter für unterwegs.
              Befestigen Sie ihn einfach und schnell überall dort, wo Sie ihn brauchen:
            </p>
            <ul className="grid grid-cols-2 gap-3 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                Am Gürtel
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                Am Fahrradlenker
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                An der Handtasche
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                Am Rucksack
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                An der Gürtelschlaufe
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                Am Kinderwagen
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                Am Rollator
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                Am Campingstuhl
              </li>
            </ul>
            <p className="text-gray-600">
              So haben Sie Ihren Bankquischer immer dabei und sind jederzeit bereit für eine trockene Sitzfläche -
              egal ob beim Spaziergang, der Radtour oder dem Ausflug mit der Familie.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}






