"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      title: "bankquischer sylt",
      heading: "Perfekt für die Nordsee",
      description:
        "Der Bankquischer Sylt ist Ihr zuverlässiger Begleiter für windige Tage an der Nordseeküste. Das hochwertige Microfasertuch (20 x 30 cm) saugt Regentropfen und Gischt in Sekunden auf. Mit praktischer Pouch und Karabiner - immer griffbereit.",
      items: [
        "20 x 30 cm Kompaktformat",
        "500% saugfähiger als Baumwolle",
        "Mit Pouch & Karabiner",
        "Perfekt für Nordsee-Wetter",
      ],
      image: "/sylter-produkt.png",
      gradient: "bg-[#9BC5E3]/40",
    },
    {
      title: "bankquischer büsum",
      heading: "Ideal für die Ostsee",
      description:
        "Der Bankquischer Büsum ist speziell für entspannte Tage an der Ostseeküste konzipiert. Das Microfasertuch der neuesten Generation trocknet nasse Bänke in Sekunden. Kompakt, wiederverwendbar und mit Karabiner-Clip - Ihr treuer Begleiter am Meer.",
      items: [
        "20 x 30 cm Kompaktformat",
        "Ultra-saugfähige Microfaser",
        "Pouch mit Karabiner-Clip",
        "Ideal für Ostsee-Abenteuer",
      ],
      image: "/buesumer-produkt.png",
      gradient: "bg-[#B7EDB4]/40",
    },
  ];

  return (
    <section ref={ref} className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 space-y-32">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-center gap-12`}
          >
            <div className="flex-1">
              <div className={`w-full h-96 ${feature.gradient} rounded-2xl flex items-center justify-center p-12 shadow-lg`}>
                <div className="relative w-full h-full">
                  <Image
                    src={feature.image}
                    alt={feature.heading}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <motion.p className="text-sm uppercase tracking-wider text-gray-500">
                {feature.title}
              </motion.p>

              <motion.h2 className="text-4xl md:text-5xl font-semibold text-gray-900">
                {feature.heading}
              </motion.h2>

              <motion.p className="text-lg text-gray-600 leading-relaxed">
                <strong>
                  {feature.description.split(" ").slice(0, 3).join(" ")}
                </strong>{" "}
                {feature.description.split(" ").slice(3).join(" ")}
              </motion.p>

              <motion.div className="flex flex-wrap gap-4 pt-4">
                {feature.items.map((item, itemIndex) => (
                  <motion.span
                    key={itemIndex}
                    className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 text-sm"
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>

              <motion.div className="pt-4">
                <motion.a
                  href="#pricing"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  Jetzt bestellen
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
