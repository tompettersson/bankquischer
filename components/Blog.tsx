'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const featuredPost = {
    title: 'How to start a 100k creative agency in 2025',
    description: 'Learn how to kickstart your journey into agency ownership with our comprehensive guide.',
    category: 'Must Read',
    author: 'Dhyna Phils',
    role: 'Head of Marketing',
    tag: 'Featured',
  };

  const posts = [
    {
      title: 'Top 10 digital agency software',
      category: 'Tools',
    },
    {
      title: 'A complete guide to project success in 2026',
      category: 'Insight',
    },
    {
      title: 'What Are Billable Hours',
      category: 'Management',
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
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">blog</p>
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900">
            Ideas to level-up your freelance game
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Link href="/blog/how-to-start-a-100k-creative-agency-in-2025">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 cursor-pointer"
              >
                <div className="w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Featured Image</span>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-gray-900 text-white text-xs rounded-full">
                      {featuredPost.category}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {featuredPost.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600">{featuredPost.description}</p>
                  <div className="flex items-center gap-4 pt-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 text-xs">{featuredPost.author.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{featuredPost.author}</p>
                      <p className="text-gray-600 text-xs">{featuredPost.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Link href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-200 cursor-pointer h-full"
                >
                  <div className="w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Image</span>
                  </div>
                  <div className="p-6 space-y-3">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full inline-block">
                      {post.category}
                    </span>
                    <h6 className="text-lg font-semibold text-gray-900">{post.title}</h6>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

