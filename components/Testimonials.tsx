'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const featuredTestimonial = {
    quote: "Endlich können wir auch nach dem Regen trocken auf der Bank sitzen! Der Bankquischer ist immer dabei und funktioniert perfekt.",
    author: "Familie Müller",
    role: "Nordsee-Urlauber",
  };

  const testimonials = [
    {
      quote: "Als begeisterte Strandspaziergängerin liebe ich meinen Büsumer Bankquischer. Er ist klein, praktisch und saugt wirklich alles sofort auf.",
      author: "Petra Schmidt",
      role: "Strandliebhaberin",
      color: "bg-[#FFDB65]",
    },
    {
      quote: "Wir haben den Sylter Bankquischer als Geschenk bekommen und sind begeistert! Perfekt für unsere täglichen Spaziergänge am Meer.",
      author: "Hans und Greta",
      role: "Sylt-Besucher",
      color: "bg-[#9BC5E3]",
    },
    {
      quote: "Der Karabiner-Clip ist genial - ich habe den Bankquischer immer an meiner Tasche. So verpasse ich nie die Gelegenheit, eine trockene Bank zu haben.",
      author: "Michael Bauer",
      role: "Outdoor-Enthusiast",
      color: "bg-[#B7EDB4]",
    },
    {
      quote: "Klein, aber oho! Das Microfasertuch saugt wirklich in Sekunden auf. Ein Must-Have für jeden, der gerne draußen sitzt.",
      author: "Lisa Weber",
      role: "Naturfreundin",
      color: "bg-[#F5B8F5]",
    },
  ];

  return (
    <section ref={ref} className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-2xl md:text-3xl font-medium text-gray-900 mb-4">
            "{featuredTestimonial.quote}"
          </p>
          <div className="flex flex-col items-center gap-2">
            <p className="font-semibold text-gray-900">{featuredTestimonial.author}</p>
            <p className="text-gray-600">{featuredTestimonial.role}</p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-200 space-y-4"
            >
              <p className="text-gray-700 leading-relaxed">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center`}>
                  <span className="text-gray-900 text-sm font-semibold">{testimonial.author.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{testimonial.author}</p>
                  <p className="text-gray-600 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}






