'use client';

import { motion } from 'framer-motion';

export default function TrustedBy() {
  const variants = [
    { name: 'Büsumer Bankquischer', available: true },
    { name: 'Sylter Bankquischer', available: true },
    { name: 'Helgoländer Bankquischer', available: false },
    { name: 'Ostsee Bankquischer', available: false },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 1 }}
          className="text-center text-gray-500 text-sm uppercase tracking-wider mb-8"
        >
          Verfügbar in verschiedenen Regionen
        </motion.p>
        
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
          {variants.map((variant, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              className={`px-6 py-3 rounded-full font-medium ${
                variant.available
                  ? 'bg-gray-100 text-gray-700'
                  : 'bg-blue-50 text-blue-600 border border-blue-200'
              } relative`}
            >
              {variant.name}
              {!variant.available && (
                <span className="ml-2 text-xs text-blue-500">Coming Soon</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}






