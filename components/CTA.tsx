'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-32 bg-[#1a1a2e]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-5xl md:text-6xl font-semibold text-white">
            Bereit für trockene Bänke?
          </h2>
          <p className="text-xl text-gray-300">
            Fragen Sie jetzt Ihren Bankquischer an und genießen Sie trockenes Sitzen - immer und überall.
          </p>
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="#pricing"
              className="inline-block px-8 py-4 bg-white text-gray-900 rounded-full font-medium text-lg hover:bg-gray-100 transition-colors"
            >
              Jetzt anfragen
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}






