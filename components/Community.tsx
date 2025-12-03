'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Community() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-[#FDF8F3]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Platzhalter für zukünftiges Bild */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-[#2E5A4B]/10 aspect-[6/5] flex items-center justify-center">
              <div className="text-center text-[#2E5A4B]/40">
                <svg className="w-20 h-20 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
                <p className="text-sm font-medium">Bild folgt</p>
              </div>
            </div>
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
