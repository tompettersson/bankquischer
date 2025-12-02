'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function Community() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#FDF8F3]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Bild */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/gruender.jpg"
                alt="Hannelore und Jochen Slaby - Die Gründer von Bankquischer"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Untertitel unter dem Bild */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 text-center text-gray-600 italic font-primary"
            >
              Das Original von Hannelore und Jochen Slaby
            </motion.p>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-sm uppercase tracking-wider text-[#2E5A4B] font-semibold">
              Unsere Geschichte
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-semibold text-gray-900 leading-tight">
              Qualität aus Tradition
            </h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Was 1987 in einer kleinen Werkstatt begann, ist heute ein Qualitätsversprechen,
                das Generationen verbindet. Hannelore und Jochen Slaby entwickelten den
                Bankquischer aus der einfachen Überzeugung heraus, dass Reinigung keine
                Kompromisse kennen sollte.
              </p>
              <p>
                Ihr Anspruch an höchste Materialqualität und deutsche Handwerkskunst
                prägt unser Produkt bis heute. Jeder Bankquischer trägt das Erbe
                dieser Leidenschaft in sich.
              </p>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="w-12 h-1 bg-[#2E5A4B] rounded-full" />
              <span className="text-[#2E5A4B] font-semibold">Seit 1987</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
