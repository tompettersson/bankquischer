'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function VideoComparison() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">Der Unterschied</p>
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            Taschentuch vs. Bankquischer
          </h2>
          <p className="text-xl text-gray-600 max-w-lg mx-auto">
            Sehen Sie selbst, warum herkömmliche Taschentücher keine Chance haben
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Taschentuch Video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg bg-gray-100">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/taschentuch.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">Das Taschentuch</h3>
              <p className="text-gray-600">
                Zerreißt, verschmiert das Wasser und hinterlässt Rückstände.
                Am Ende ist die Bank immer noch nass.
              </p>
            </div>
          </motion.div>

          {/* Bankquischer Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg bg-gray-100">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/saugstark.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-gray-900">Der Bankquischer</h3>
              <p className="text-gray-600">
                Saugt das Wasser blitzschnell auf - ein Wisch und die Bank ist trocken.
                Einfach auswringen und wieder verwenden.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
