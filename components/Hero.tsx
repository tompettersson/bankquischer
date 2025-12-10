"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Sun, CloudRain, Leaf, CloudSun, Heart, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";

// Product slider component that alternates between products
const ProductSlider = ({ isMobile = false }: { isMobile?: boolean }) => {
  const [currentProduct, setCurrentProduct] = useState(0);

  const products = [
    {
      image: "/sylter-produkt.png",
      name: "Bankquischer Sylt",
      description: "Perfekt für die Nordsee",
    },
    {
      image: "/buesumer-produkt.png",
      name: "Bankquischer Büsum",
      description: "Das Original aus Büsum",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProduct((prev) => (prev + 1) % products.length);
    }, 3000); // Switch every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const product = products[currentProduct];

  return (
    <div className={`relative ${isMobile ? 'w-full h-full' : 'w-64 h-72'} overflow-visible`}>
      <div className="absolute inset-0 bg-white rounded-2xl shadow-lg"></div>
      {/* Product image - rotated opposite direction, larger, overflowing */}
      <motion.div
        key={currentProduct}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`absolute ${isMobile ? '-top-8 -left-4 -right-4 bottom-8 -rotate-6 scale-105' : '-top-12 -left-8 -right-8 bottom-12 -rotate-12 scale-110'}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes={isMobile ? "(max-width: 640px) 100vw, 384px" : "256px"}
          className="object-contain"
        />
      </motion.div>
      {/* Text at bottom left */}
      <motion.div
        key={`text-${currentProduct}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className={`absolute bottom-3 ${isMobile ? 'left-3 sm:left-4' : 'left-4'} z-10`}
      >
        <p className={`${isMobile ? 'text-sm sm:text-base' : 'text-xs'} font-medium text-gray-900`}>{product.name}</p>
        <p className={`${isMobile ? 'text-xs sm:text-sm' : 'text-xs'} text-gray-600`}>{product.description}</p>
      </motion.div>
      {/* Icons at bottom right */}
      <div className={`absolute bottom-3 ${isMobile ? 'right-3 sm:right-4' : 'right-3'} flex gap-2 z-10`}>
        <Heart className={`${isMobile ? 'w-6 h-6 sm:w-7 sm:h-7' : 'w-5 h-5'} text-[#F5403D] fill-[#F5403D]`} />
        <ShoppingCart className={`${isMobile ? 'w-6 h-6 sm:w-7 sm:h-7' : 'w-5 h-5'} text-gray-900`} />
      </div>
      {/* Slider dots indicator */}
      <div className={`absolute ${isMobile ? 'bottom-16 sm:bottom-20' : 'bottom-14'} left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10`}>
        {products.map((_, index) => (
          <div
            key={index}
            className={`${isMobile ? 'w-2 h-2 sm:w-2.5 sm:h-2.5' : 'w-1.5 h-1.5'} rounded-full transition-colors ${
              index === currentProduct ? "bg-gray-900" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const floatingCards = [
  {
    id: "lifestyle-left",
    content: (
      <div className="relative w-48 h-72 rounded-2xl overflow-hidden shadow-lg">
        <Image
          src="/an-hose.jpg"
          alt="Bankquischer an der Hose"
          fill
          sizes="(max-width: 640px) 100vw, 384px"
          className="object-cover"
        />
        {/* Optional overlay text */}
        <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg p-2">
          <p className="text-xs font-medium text-gray-900">Immer griffbereit</p>
        </div>
      </div>
    ),
    position: "left-[18%] top-[28%]",
    delay: 0.2,
    noPadding: true,
  },
  {
    id: "review",
    content: (
      <div className="bg-white px-6 py-3 rounded-full flex items-center gap-1 shadow-lg">
        <span className="text-2xl text-[#FFDB65]">★</span>
        <span className="text-2xl text-[#FFDB65]">★</span>
        <span className="text-2xl text-[#FFDB65]">★</span>
        <span className="text-2xl text-[#FFDB65]">★</span>
        <span className="text-2xl text-[#FFDB65]">★</span>
      </div>
    ),
    position: "left-[20%] top-[62%]",
    delay: 0.3,
    noPadding: true,
  },
  {
    id: "product-specs",
    content: (
      <div className="relative w-80 rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: '16/9' }}>
        <Image
          src="/tuch.tisch.jpg"
          alt="Bankquischer Tuch"
          fill
          sizes="(max-width: 1024px) 100vw, 640px"
          className="object-cover"
        />
        {/* Product specs overlay */}
        <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg p-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="font-semibold text-gray-900">20 x 30 cm</p>
              <p className="text-gray-600">Kompaktformat</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Microfaser</p>
              <p className="text-gray-600">Ultra-saugfähig</p>
            </div>
          </div>
        </div>
      </div>
    ),
    position: "right-[16%] top-[26%]",
    delay: 0.4,
    noPadding: true,
  },
  {
    id: "absorbency",
    content: (
      <div className="bg-[#FFDB65] p-5 rounded-3xl min-w-[240px]">
        <p className="text-gray-600 text-xs font-medium mb-2">Saugstärke</p>
        <div className="flex items-end gap-2">
          <span className="text-5xl font-semibold text-gray-900">500%</span>
          <div className="mb-1">
            <p className="text-gray-900 text-sm font-medium">mehr als</p>
            <p className="text-gray-900 text-sm font-medium">Baumwolle</p>
          </div>
        </div>
        <div className="mt-3 inline-block bg-white px-4 py-1.5 rounded-full">
          <p className="text-xs font-semibold text-gray-900">Microfaser-Technologie</p>
        </div>
      </div>
    ),
    position: "left-[16%] bottom-[22%]",
    delay: 0.5,
    noPadding: true,
  },
  {
    id: "product-slider",
    content: <ProductSlider isMobile={false} />,
    position: "right-[14%] bottom-[18%]",
    delay: 0.6,
    noPadding: true,
  },
];

// Weather icons scattered around - 3 icons in full yellow, blue, green
const weatherIcons = [
  { id: "sun", Icon: Sun, position: "left-[12%] top-[20%]", delay: 0.7, color: "text-[#FFDB65]", size: "w-14 h-14" },
  { id: "rain", Icon: CloudRain, position: "right-[12%] top-[16%]", delay: 0.8, color: "text-[#9BC5E3]", size: "w-16 h-16" },
  { id: "leaf", Icon: Leaf, position: "left-[10%] bottom-[35%]", delay: 0.9, color: "text-[#B7EDB4]", size: "w-14 h-14" },
];

export default function Hero() {
  return (
    <section className="relative bg-[#F9F8F5] overflow-hidden min-h-screen">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 md:pt-12 pb-6 sm:pb-8 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-gray-900 leading-tight tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Das <em className="italic">Aufsaugwunder</em>
          <br />
          für trockene Bänke
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 max-w-xl mx-auto px-2"
        >
          Das innovative Give-away für Hotels, Gastronomie und Unternehmen.
          Von nass zu trocken in Sekunden.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
        >
          <Link
            href="#pricing"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white rounded-full text-sm sm:text-base font-medium hover:bg-gray-800 transition-colors"
          >
            Regionale Editionen
          </Link>
          <Link
            href="#konfigurator"
            className="px-6 sm:px-8 py-3 sm:py-4 border border-gray-300 rounded-full text-sm sm:text-base font-medium text-gray-900 hover:bg-white transition-colors"
          >
            Individuelles Design
          </Link>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 text-center"
        >
          <Link
            href="#konfigurator"
            className="text-sm text-gray-600 hover:text-gray-900 underline underline-offset-2 transition-colors"
          >
            Auch mit eigenem Logo erhältlich →
          </Link>
        </motion.p>
      </div>

      {/* Center Tablet - Horizontal/Landscape */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative max-w-3xl mx-auto mt-6 sm:mt-8 mb-8 sm:mb-12 z-20 px-4 sm:px-6"
      >
        <div className="relative aspect-4/3 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-8 sm:border-12 border-gray-900 bg-gray-900">
          <Image
            src="/key-visual.jpg"
            alt="Bankquischer in Aktion"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 768px"
            className="object-cover"
          />

          {/* Weather overlay */}
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-sm px-2 sm:px-4 py-1.5 sm:py-2 rounded-full">
            <CloudSun className="w-4 h-4 sm:w-6 sm:h-6 text-gray-600" />
            <span className="text-xs sm:text-sm font-medium text-gray-700">Wechselhaft, 14°C</span>
          </div>

          {/* Location badge */}
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-white/90 backdrop-blur-sm text-gray-700 text-xs sm:text-sm font-medium px-2 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2">
            <span className="text-xs sm:text-sm">📍</span>
            <span>Nordsee</span>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-3 sm:p-6">
            <p className="text-white text-sm sm:text-lg font-medium">Perfektes Bankwetter?</p>
            <p className="text-white/80 text-xs sm:text-sm">Mit dem Bankquischer immer trocken sitzen.</p>
          </div>
        </div>

        {/* Decorative half-circle sun behind - using new yellow */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[130%] h-64 -z-10">
          <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMax meet">
            {/* Main sun circle - gradient from yellow to almost white */}
            <defs>
              <radialGradient id="sunGradient" cx="50%" cy="100%" r="80%">
                <stop offset="0%" stopColor="#FFDB65" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#FFF4D6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FFFEF8" stopOpacity="0.1" />
              </radialGradient>
            </defs>
            <ellipse cx="200" cy="200" rx="180" ry="180" fill="url(#sunGradient)" />
            {/* Subtle gray border */}
            <ellipse cx="200" cy="200" rx="195" ry="195" fill="none" stroke="#E5E5E5" strokeWidth="1" opacity="0.4" />
          </svg>
        </div>
      </motion.div>

      {/* Floating Cards - Desktop: Absolute positioned */}
      {/* Hidden on screens smaller than 1536px (2xl) to prevent overlap with center content */}
      <div className="absolute inset-0 pointer-events-none hidden 2xl:block">
        {floatingCards.map((card) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: card.delay }}
            className={`absolute ${card.position}`}
          >
            {card.content}
          </motion.div>
        ))}

        {/* Weather Icons - Desktop */}
        {weatherIcons.map((weather) => (
          <motion.div
            key={weather.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: weather.delay }}
            className={`absolute ${weather.position}`}
          >
            <weather.Icon className={`${weather.size} ${weather.color}`} />
          </motion.div>
        ))}
      </div>

      {/* Mobile/Tablet/Laptop: Cards layout (shown until 2xl breakpoint) */}
      <div className="2xl:hidden max-w-6xl mx-auto px-4 sm:px-6 mt-6 sm:mt-8 relative z-10">
        {/* Weather Icons Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-6 sm:gap-8 mb-6 sm:mb-8"
        >
          {weatherIcons.map((weather) => (
            <motion.div
              key={weather.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: weather.delay }}
            >
              <weather.Icon className={`${weather.size === "w-16 h-16" ? "w-12 h-12 sm:w-14 sm:h-14" : "w-10 h-10 sm:w-12 sm:h-12"} ${weather.color}`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Grid Layout for lg+ screens, stacked for smaller */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Lifestyle Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-none h-64 sm:h-80 lg:h-72 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/an-hose.jpg"
                alt="Bankquischer an der Hose"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 384px, 33vw"
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg p-2 sm:p-3">
                <p className="text-sm sm:text-base font-medium text-gray-900">Immer griffbereit</p>
              </div>
            </div>
          </motion.div>

          {/* Product Specs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-none h-64 sm:h-72 lg:h-72 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/tuch.tisch.jpg"
                alt="Bankquischer Tuch"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 576px, 33vw"
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg p-3 sm:p-4">
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
                  <div>
                    <p className="font-semibold text-gray-900">20 x 30 cm</p>
                    <p className="text-gray-600">Kompaktformat</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Microfaser</p>
                    <p className="text-gray-600">Ultra-saugfähig</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Absorbency Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center lg:col-span-2 xl:col-span-1"
          >
            <div className="bg-[#FFDB65] p-4 sm:p-6 rounded-3xl w-full max-w-sm lg:max-w-md xl:max-w-none">
              <p className="text-gray-600 text-sm sm:text-base font-medium mb-3 sm:mb-4">Saugstärke</p>
              <div className="flex items-end gap-2 sm:gap-3">
                <span className="text-4xl sm:text-5xl font-semibold text-gray-900">500%</span>
                <div className="mb-1">
                  <p className="text-gray-900 text-sm sm:text-base font-medium">mehr als</p>
                  <p className="text-gray-900 text-sm sm:text-base font-medium">Baumwolle</p>
                </div>
              </div>
              <div className="mt-3 sm:mt-4 inline-block bg-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full">
                <p className="text-xs sm:text-sm font-semibold text-gray-900">Microfaser-Technologie</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Second Row: Review Stars and Product Slider */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-6 lg:mt-8">
          {/* Review Stars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex justify-center items-center"
          >
            <div className="bg-white px-6 sm:px-8 py-3 sm:py-4 rounded-full flex items-center gap-1 sm:gap-2 shadow-lg">
              <span className="text-2xl sm:text-3xl text-[#FFDB65]">★</span>
              <span className="text-2xl sm:text-3xl text-[#FFDB65]">★</span>
              <span className="text-2xl sm:text-3xl text-[#FFDB65]">★</span>
              <span className="text-2xl sm:text-3xl text-[#FFDB65]">★</span>
              <span className="text-2xl sm:text-3xl text-[#FFDB65]">★</span>
            </div>
          </motion.div>

          {/* Product Slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex justify-center pb-6 sm:pb-8"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md h-80 sm:h-96 lg:h-80 overflow-visible">
              <ProductSlider isMobile={true} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slogan - Centered at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 relative z-10"
      >
        <p className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic text-gray-900 px-2" style={{ fontFamily: "var(--font-heading)" }}>
          "Trocken sitzt's sich besser."
        </p>
        {/* Logos vorübergehend ausgeblendet
        <div className="flex items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-24 flex-wrap mt-6 sm:mt-8">
          <div className="relative h-16 w-32 sm:h-20 sm:w-40 md:h-24 md:w-44 lg:h-28 lg:w-48">
            <Image
              src="/s-logo.svg"
              alt="Bankquischer Sylt"
              fill
              sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 176px, 192px"
              className="object-contain"
            />
          </div>
          <div className="relative h-16 w-32 sm:h-20 sm:w-40 md:h-24 md:w-44 lg:h-28 lg:w-48">
            <Image
              src="/b-logo.svg"
              alt="Bankquischer Büsum"
              fill
              sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 176px, 192px"
              className="object-contain"
            />
          </div>
        </div>
        */}
      </motion.div>
    </section>
  );
}
