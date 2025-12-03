'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  const pages = [
    { name: 'Startseite', href: '/' },
    { name: 'Produkt', href: '/#features' },
    { name: 'Varianten', href: '/#pricing' },
  ];

  const info = [
    { name: 'Kontakt', href: '/contact-us' },
    { name: 'Impressum', href: '/impressum' },
    { name: 'Datenschutz', href: '/datenschutz' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-semibold text-gray-900">Bankquischer</span>
            </Link>
            <p className="text-gray-600 mb-6">
              Das Aufsaugwunder - Microfasertuch der neuesten Generation für trockene Bänke.
            </p>
            <div className="text-gray-600 text-sm space-y-1">
              <p className="font-semibold text-gray-900">RADEJOKO GmbH</p>
              <p>Im Feldgarten 11</p>
              <p>D-56379 Scheidt</p>
              <p className="pt-2">
                <a href="mailto:info@radejoko.de" className="hover:text-gray-900 transition-colors">
                  info@radejoko.de
                </a>
              </p>
              <p>
                <a href="tel:+491606840983" className="hover:text-gray-900 transition-colors">
                  +49 160 6840983
                </a>
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Seiten</h4>
            <ul className="space-y-2">
              {pages.map((page) => (
                <li key={page.name}>
                  <Link
                    href={page.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Informationen</h4>
            <ul className="space-y-2">
              {info.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © 2025 RADEJOKO GmbH. Alle Rechte vorbehalten.
          </p>
          <div className="text-gray-600 text-sm text-center md:text-right">
            <p>GF: Dionysia A. van Herk</p>
            <p>HRB 25009 Amtsgericht Montabaur</p>
            <p>USt.-Id.: DE305612848</p>
            <p className="mt-2 font-medium">Exklusiv-Vertrieb: RADEJOKO GmbH</p>
          </div>
        </div>
      </div>
    </footer>
  );
}






