'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function Community() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const platforms = [
    {
      name: 'X/Twitter',
      followers: '15.2K followers',
      description: 'Stay updated on new features and discover how others are using Dreelio.',
      link: 'https://x.com/Leonc7303',
      icon: '𝕏',
    },
    {
      name: 'YouTube',
      followers: '32k subscribers',
      description: 'Tips, tutorials, and in-depth feature guides to inspire and enhance your Dreelio workflow.',
      link: 'https://www.youtube.com/@Framer',
      icon: '▶',
    },
  ];

  return (
    <section ref={ref} className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">Community</p>
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900">
            Stay in the loop
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {platforms.map((platform, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-200 space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                  {platform.icon}
                </div>
                <p className="text-gray-600 text-sm">{platform.followers}</p>
              </div>
              <div>
                <h5 className="text-xl font-semibold text-gray-900 mb-2">{platform.name}</h5>
                <p className="text-gray-600">{platform.description}</p>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  {platform.name === 'X/Twitter' ? 'Follow us' : 'Subscribe'}
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}






