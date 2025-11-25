"use client";

import Link from "next/link";
// import { useState, useEffect } from "react";

export default function Navigation() {
  // const [showBLogo, setShowBLogo] = useState(true);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setShowBLogo((prev) => !prev);
  //   }, 3000); // Switch every 3 seconds

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <nav className="w-full bg-[#F9F8F5]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/s-logo.svg"
            alt="Bankquischer Sylt Logo"
            className="h-24 w-auto"
          />
        </div>

        {/* Center Navigation */}
        <div className="hidden lg:flex items-center gap-8 text-base font-medium text-gray-700">
          <Link href="#features" className="hover:text-gray-900 transition-colors">
            Produkt
          </Link>
          <Link href="#pricing" className="hover:text-gray-900 transition-colors">
            Varianten
          </Link>
          <Link href="/contact-us" className="hover:text-gray-900 transition-colors">
            Kontakt
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <Link
            href="#pricing"
            className="px-5 py-2.5 bg-gray-900 text-white text-base font-medium rounded-full hover:bg-gray-800 transition-colors"
          >
            Jetzt bestellen
          </Link>
        </div>
      </div>
    </nav>
  );
}
