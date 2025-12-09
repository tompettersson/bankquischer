'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function Community() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">
      {/* Hintergrundbild */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Overlay für besseren Kontrast */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Text - zentriert */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="space-y-6 text-center"
        >
          <p className="text-sm uppercase tracking-wider text-white/90 font-semibold">
            Unsere Geschichte
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-semibold text-white leading-tight">
            Wie der Bankquischer entstand
          </h2>
          <div className="space-y-4 text-white/90 text-base sm:text-lg leading-relaxed max-w-4xl mx-auto">
            <p>
              Seit Jahrzehnten gehören die Nord- und Ostsee zu unseren liebsten Urlaubszielen. Kaum etwas ist schöner, als nach einem ausgedehnten Spaziergang auf einer Bank Platz zu nehmen, den Blick über das Meer schweifen zu lassen und in aller Ruhe einen Sonnenuntergang zu genießen. Genau diese kleinen Momente machen einen Urlaub unvergesslich.
            </p>
            <p>
              Doch immer wieder gab es ein Problem: <strong className="text-white">nasse Bänke.</strong>
            </p>
            <p>
              Ein kurzer Regenschauer – und die ersehnte Pause fiel buchstäblich ins Wasser. Papiertaschentücher gaben schnell auf, Baumwolltücher waren selten zur Hand und niemand möchte anschließend ein feuchtes Tuch in der Tasche herumtragen.
            </p>
            <p>
              Die Lösung kam aus einer ganz anderen Ecke: moderne High-Tech-Textilien. Hochsaugfähig, schnelltrocknend und erstaunlich leicht. Warum, dachten wir, sollte es keine praktische, hochwertige Lösung speziell für solche alltäglichen Situationen geben?
            </p>
            <p className="font-semibold text-white">
              So entstand der Bankquischer.
            </p>
            <p>
              Ein Tuch in Spitzenqualität, gefertigt aus modernen Funktionsfasern – handlich, effizient, langlebig. Gefaltet in einem smarten, stilvollen Täschchen, das dank integriertem Karabinerhaken überall Platz findet: an der Handtasche, am Rucksack, am Fahrradkorb oder direkt am Gürtel. <strong className="text-white">Immer dabei. Immer bereit.</strong>
            </p>
            <p>
              Schon die ersten Erstmuster sorgten bei unseren Testerinnen und Testern für Begeisterung. Viele erzählten uns, wie der Bankquischer endlich etwas löst, das sie seit Jahren im Alltag stört – und das mit überraschend wenig Aufwand.
            </p>
            <p className="text-xl font-semibold text-white italic pt-4">
              Bankquischer – für trockene Pausen.
              <br />
              Damit schöne Momente nicht länger warten müssen.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
