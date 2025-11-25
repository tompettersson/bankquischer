'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 bg-gradient-to-b from-blue-50 via-white to-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900">
            Bereit für trockene Bänke?
          </h2>
          <p className="text-xl text-gray-600">
            Bestellen Sie jetzt Ihren Bankquischer und genießen Sie trockenes Sitzen - immer und überall.
          </p>
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="#pricing"
              className="inline-block px-8 py-4 bg-gray-900 text-white rounded-full font-medium text-lg hover:bg-gray-800 transition-colors"
            >
              Jetzt bestellen
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}






