'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Produkt-Mapping für URL-Parameter
const productNames: Record<string, string> = {
  buesumer: 'Büsumer Bankquischer',
  sylter: 'Sylter Bankquischer',
  norderneyer: 'Norderneyer Bankquischer',
  ruegener: 'Rügener Bankquischer',
};

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    product: '',
    quantity: '1000',
    message: '',
  });

  // URL-Parameter auswerten für Produkt-Vorauswahl und zum Formular scrollen
  useEffect(() => {
    const loadProduct = () => {
      const hash = window.location.hash;
      const match = hash.match(/kontakt\?product=(\w+)/);
      if (match) {
        const productKey = match[1];
        const productName = productNames[productKey];
        if (productName) {
          setFormData(prev => ({ ...prev, product: productName }));
          // Zum Formular scrollen
          setTimeout(() => {
            const element = document.getElementById('kontakt');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }
      }
    };

    loadProduct();
    window.addEventListener('hashchange', loadProduct);
    return () => window.removeEventListener('hashchange', loadProduct);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Vielen Dank für Ihre Anfrage!\n\nWir melden uns zeitnah bei Ihnen.`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section ref={ref} id="kontakt" className="py-24 md:py-32 bg-[#F9F8F5]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-semibold text-gray-900 mb-4">
            Kontakt aufnehmen
          </h2>
          <p className="text-xl text-gray-600">
            Wir beraten Sie gerne zu Ihrem individuellen Bankquischer
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 shadow-lg space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2E5A4B] focus:ring-2 focus:ring-[#2E5A4B]/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Firma</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2E5A4B] focus:ring-2 focus:ring-[#2E5A4B]/20 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-Mail *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2E5A4B] focus:ring-2 focus:ring-[#2E5A4B]/20 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2E5A4B] focus:ring-2 focus:ring-[#2E5A4B]/20 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Produkt</label>
              <select
                name="product"
                value={formData.product}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2E5A4B] focus:ring-2 focus:ring-[#2E5A4B]/20 outline-none transition-all bg-white"
              >
                <option value="">Bitte wählen...</option>
                <option value="Büsumer Bankquischer">Büsumer Bankquischer</option>
                <option value="Sylter Bankquischer">Sylter Bankquischer</option>
                <option value="Norderneyer Bankquischer">Norderneyer Bankquischer</option>
                <option value="Rügener Bankquischer">Rügener Bankquischer</option>
                <option value="Individuelles Design">Individuelles Design</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gewünschte Menge</label>
              <select
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2E5A4B] focus:ring-2 focus:ring-[#2E5A4B]/20 outline-none transition-all bg-white"
              >
                <option value="1000">1.000 Stück</option>
                <option value="2500">2.500 Stück</option>
                <option value="5000">5.000 Stück</option>
                <option value="10000">10.000 Stück</option>
                <option value="mehr">Mehr als 10.000</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nachricht *</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Beschreiben Sie Ihr Projekt oder Ihre Wünsche..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2E5A4B] focus:ring-2 focus:ring-[#2E5A4B]/20 outline-none transition-all resize-none"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-[#2E5A4B] text-white rounded-xl font-semibold text-lg hover:bg-[#234539] transition-colors shadow-lg shadow-[#2E5A4B]/20"
          >
            Anfrage senden
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
