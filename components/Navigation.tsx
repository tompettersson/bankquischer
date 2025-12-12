"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent) => {
    // Wenn wir auf der Startseite sind, scroll nach oben
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    // Sonst navigiert der Link zur Startseite
  };

  return (
    <nav className="w-full bg-[#F9F8F5] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo - klickbar zum Hochscrollen */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="flex items-center flex-shrink-0 cursor-pointer"
        >
          <img
            src="/logo.svg"
            alt="Bankquischer Logo"
            className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 text-base font-medium text-gray-700">
          <Link href="#features" className="hover:text-gray-900 transition-colors">
            Produkt
          </Link>
          <Link href="#pricing" className="hover:text-gray-900 transition-colors">
            Editionen
          </Link>
          <Link href="#konfigurator" className="hover:text-gray-900 transition-colors">
            Individualisierung
          </Link>
          <Link href="/contact-us" className="hover:text-gray-900 transition-colors">
            Kontakt
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* CTA Button */}
          <Link
            href="#pricing"
            className="px-3 sm:px-5 py-2 sm:py-2.5 bg-gray-900 text-white text-sm sm:text-base font-medium rounded-full hover:bg-gray-800 transition-colors whitespace-nowrap"
          >
            Angebot anfordern
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-[#F9F8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-4">
            <Link
              href="#features"
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-medium text-gray-700 hover:text-gray-900 transition-colors py-2"
            >
              Produkt
            </Link>
            <Link
              href="#pricing"
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-medium text-gray-700 hover:text-gray-900 transition-colors py-2"
            >
              Editionen
            </Link>
            <Link
              href="#konfigurator"
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-medium text-gray-700 hover:text-gray-900 transition-colors py-2"
            >
              Individualisierung
            </Link>
            <Link
              href="/contact-us"
              onClick={() => setIsMenuOpen(false)}
              className="text-base font-medium text-gray-700 hover:text-gray-900 transition-colors py-2"
            >
              Kontakt
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
