'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';

// Farbpaletten basierend auf den Stoffmustern (210)
const colorPalette = [
  // Rot/Pink Töne (Reihe 1)
  { id: 1, name: 'Dunkelrot', hex: '#8B1538' },
  { id: 2, name: 'Rot', hex: '#C41E3A' },
  { id: 3, name: 'Pink', hex: '#E84887' },
  { id: 4, name: 'Magenta', hex: '#D64D8E' },
  { id: 5, name: 'Orange', hex: '#FF6B35' },
  // Rosa Töne (Reihe 2)
  { id: 6, name: 'Hellrosa', hex: '#F8B4C8' },
  { id: 7, name: 'Rosa', hex: '#F4A4B8' },
  { id: 8, name: 'Lachs', hex: '#F5A589' },
  { id: 9, name: 'Weiß', hex: '#FFFFFF' },
  { id: 10, name: 'Karmin', hex: '#D32F2F' },
  { id: 11, name: 'Gelb', hex: '#FFEB3B' },
  // Beige/Grün Töne (Reihe 3)
  { id: 12, name: 'Beige', hex: '#D4B896' },
  { id: 13, name: 'Sand', hex: '#C9B896' },
  { id: 14, name: 'Mint', hex: '#A8E6CF' },
  { id: 15, name: 'Türkis', hex: '#4DD0C4' },
  { id: 16, name: 'Petrol', hex: '#00838F' },
  { id: 17, name: 'Olive', hex: '#9E9D24' },
  { id: 18, name: 'Neongelb', hex: '#CCFF00' },
  // Lila/Grau Töne (Reihe 4)
  { id: 19, name: 'Violett', hex: '#7B1FA2' },
  { id: 20, name: 'Lila', hex: '#9C27B0' },
  { id: 21, name: 'Hellgrau', hex: '#BDBDBD' },
  { id: 22, name: 'Grau', hex: '#9E9E9E' },
  { id: 23, name: 'Altrosa', hex: '#D4A5A5' },
  { id: 24, name: 'Rosé', hex: '#E8C4C4' },
  // Grautöne (Palette 2, Reihe 1)
  { id: 25, name: 'Silber', hex: '#C0C0C0' },
  { id: 26, name: 'Hellgrau 2', hex: '#E0E0E0' },
  { id: 27, name: 'Mittelgrau', hex: '#757575' },
  { id: 28, name: 'Anthrazit', hex: '#424242' },
  { id: 29, name: 'Dunkelgrau', hex: '#616161' },
  { id: 30, name: 'Taupe', hex: '#8D6E63' },
  { id: 31, name: 'Creme', hex: '#FFF8E1' },
  // Blau/Grün Töne (Palette 2, Reihe 2)
  { id: 32, name: 'Himmelblau', hex: '#87CEEB' },
  { id: 33, name: 'Königsblau', hex: '#4169E1' },
  { id: 34, name: 'Dunkelblau', hex: '#1A237E' },
  { id: 35, name: 'Navy', hex: '#0D1B2A' },
  { id: 36, name: 'Tannengrün', hex: '#1B5E20' },
  { id: 37, name: 'Waldgrün', hex: '#2E7D32' },
  { id: 38, name: 'Smaragd', hex: '#00695C' },
  // Braun/Orange Töne (Palette 2, Reihe 3)
  { id: 39, name: 'Dunkelbraun', hex: '#3E2723' },
  { id: 40, name: 'Schokolade', hex: '#4E342E' },
  { id: 41, name: 'Mokka', hex: '#5D4037' },
  { id: 42, name: 'Kastanie', hex: '#6D4C41' },
  { id: 43, name: 'Cognac', hex: '#8D6748' },
  { id: 44, name: 'Caramel', hex: '#A1887F' },
  // Bunt (Palette 2, Reihe 4)
  { id: 45, name: 'Koralle', hex: '#FF7043' },
  { id: 46, name: 'Apricot', hex: '#FFAB91' },
  { id: 47, name: 'Lindgrün', hex: '#AED581' },
  { id: 48, name: 'Grasgrün', hex: '#7CB342' },
  { id: 49, name: 'Aqua', hex: '#4FC3F7' },
  { id: 50, name: 'Azur', hex: '#29B6F6' },
  // Schwarz
  { id: 51, name: 'Schwarz', hex: '#000000' },
];

// SVG Wireframe des Bankquischers - geometrisch sauber, zusammengefaltete Tasche
function BankquischerPreview({
  color,
  text,
  logoUrl
}: {
  color: string;
  text: string;
  logoUrl: string | null;
}) {
  // Berechne dunklere Farbe für Schatten/Kanten
  const darkerColor = color === '#FFFFFF' ? '#E0E0E0' : color;

  return (
    <svg
      viewBox="0 0 400 280"
      className="w-full h-auto max-w-md mx-auto"
      style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.15))' }}
    >
      <defs>
        {/* Stofftextur */}
        <pattern id="fabricPattern" patternUnits="userSpaceOnUse" width="3" height="3">
          <rect width="3" height="3" fill={color}/>
          <rect width="1.5" height="1.5" fill="rgba(255,255,255,0.04)"/>
          <rect x="1.5" y="1.5" width="1.5" height="1.5" fill="rgba(0,0,0,0.04)"/>
        </pattern>
        <filter id="innerShadow">
          <feOffset dx="0" dy="2"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite operator="out" in="SourceGraphic"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.15 0"/>
          <feBlend in="SourceGraphic"/>
        </filter>
      </defs>

      {/* Hintergrund */}
      <rect width="400" height="280" fill="#FDF8F3" rx="12"/>

      {/* === BANKQUISCHER TASCHE === */}
      <g transform="translate(70, 30)">

        {/* Obere Schlaufe */}
        <rect x="20" y="0" width="30" height="20" fill={darkerColor} rx="2"/>
        <rect x="20" y="0" width="30" height="20" fill="url(#fabricPattern)" rx="2"/>

        {/* Hauptkörper - Rechteck mit abgeschrägten Ecken */}
        <path
          d="M0 20
             L0 200
             L15 220
             L245 220
             L260 200
             L260 20
             L245 8
             L15 8
             Z"
          fill={color}
        />
        <path
          d="M0 20
             L0 200
             L15 220
             L245 220
             L260 200
             L260 20
             L245 8
             L15 8
             Z"
          fill="url(#fabricPattern)"
        />

        {/* Linke Kante (leichter Schatten) */}
        <path
          d="M0 20 L15 8 L15 220 L0 200 Z"
          fill="rgba(0,0,0,0.08)"
        />

        {/* Untere Kante */}
        <path
          d="M0 200 L15 220 L245 220 L260 200 Z"
          fill="rgba(0,0,0,0.06)"
        />

        {/* Untere Schlaufe */}
        <rect x="20" y="220" width="30" height="20" fill={darkerColor} rx="2"/>
        <rect x="20" y="220" width="30" height="20" fill="url(#fabricPattern)" rx="2"/>

        {/* === DRUCKKNOPF (rechts) === */}
        <circle cx="240" cy="140" r="10" fill="#E8E8E8"/>
        <circle cx="240" cy="140" r="7" fill="#F5F5F5"/>
        <circle cx="240" cy="140" r="4" fill="#D0D0D0"/>

        {/* === KARABINER-RING (rechts unten) === */}
        <g transform="translate(248, 185)">
          <ellipse cx="12" cy="12" rx="10" ry="12" fill="none" stroke="#4A90D9" strokeWidth="3"/>
          <line x1="5" y1="3" x2="19" y2="3" stroke="#4A90D9" strokeWidth="2"/>
        </g>

        {/* === LOGO BEREICH (links) === */}
        {logoUrl ? (
          <image
            href={logoUrl}
            x="25"
            y="50"
            width="70"
            height="90"
            preserveAspectRatio="xMidYMid meet"
          />
        ) : (
          <g>
            {/* Platzhalter-Silhouette (stilisierte Sylt-Form als Beispiel) */}
            <path
              d="M60 55
                 C65 60, 70 65, 68 80
                 C66 95, 55 110, 50 125
                 C48 135, 52 140, 55 145
                 L50 150
                 C45 140, 42 130, 45 115
                 C48 100, 55 85, 55 70
                 C55 60, 58 55, 60 55Z"
              fill="rgba(255,255,255,0.85)"
            />
            <text
              x="55"
              y="170"
              textAnchor="middle"
              fill="rgba(255,255,255,0.5)"
              fontSize="8"
              fontFamily="sans-serif"
            >
              Ihr Logo
            </text>
          </g>
        )}

        {/* === TEXT BEREICH (rechts vom Logo) === */}
        <g>
          {/* Regionsname / Firmenname */}
          <text
            x="100"
            y="75"
            textAnchor="start"
            fill="white"
            fontSize={text.length > 12 ? "22" : "28"}
            fontFamily="Georgia, serif"
            fontStyle="italic"
          >
            {text || 'Sylter'}
          </text>

          {/* "Bankquischer" */}
          <text
            x="100"
            y="105"
            textAnchor="start"
            fill="white"
            fontSize="22"
            fontFamily="Arial, sans-serif"
            fontWeight="bold"
          >
            Bankquischer
          </text>

          {/* Slogan Zeile 1 */}
          <text
            x="100"
            y="140"
            textAnchor="start"
            fill="white"
            fontSize="14"
            fontFamily="Georgia, serif"
            fontStyle="italic"
          >
            Das Aufsaugwunder !
          </text>

          {/* Slogan Zeile 2 */}
          <text
            x="100"
            y="175"
            textAnchor="start"
            fill="white"
            fontSize="13"
            fontFamily="Georgia, serif"
            fontStyle="italic"
          >
            Kein Taschentuch, saubere Sache
          </text>
        </g>
      </g>
    </svg>
  );
}

export default function Configurator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [selectedColor, setSelectedColor] = useState(colorPalette[34]); // Dunkelblau als Default
  const [customText, setCustomText] = useState('');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoFileName, setLogoFileName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [quantity, setQuantity] = useState('1000');
  const [message, setMessage] = useState('');

  const handleLogoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validiere Dateityp
      const validTypes = ['image/png', 'image/svg+xml', 'application/postscript', 'application/illustrator'];
      const validExtensions = ['.png', '.svg', '.eps', '.ai'];
      const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));

      if (validTypes.includes(file.type) || validExtensions.includes(fileExtension)) {
        setLogoFileName(file.name);

        // Für Preview nur PNG und SVG anzeigen
        if (file.type === 'image/png' || file.type === 'image/svg+xml') {
          const reader = new FileReader();
          reader.onload = (event) => {
            setLogoUrl(event.target?.result as string);
          };
          reader.readAsDataURL(file);
        } else {
          // EPS/AI können nicht im Browser angezeigt werden
          setLogoUrl(null);
        }
      } else {
        alert('Bitte laden Sie eine PNG, SVG, EPS oder AI Datei hoch.');
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hier würde normalerweise die Anfrage versendet werden
    alert(`Vielen Dank für Ihre Anfrage!\n\nFarbe: ${selectedColor.name}\nText: ${customText}\nMenge: ${quantity} Stück\n\nWir melden uns zeitnah bei Ihnen.`);
  };

  return (
    <section ref={ref} id="konfigurator" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-wider text-[#2E5A4B] font-semibold mb-4">
            Für Firmenkunden
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-semibold text-gray-900 mb-4">
            Ihr individueller Bankquischer
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ab 1.000 Stück mit Ihrem Logo und Text für Ihre Firma, Region oder Gemeinde
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Live Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-8"
          >
            <div className="bg-[#FDF8F3] rounded-2xl p-8 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
                Live-Vorschau
              </h3>
              <BankquischerPreview
                color={selectedColor.hex}
                text={customText}
                logoUrl={logoUrl}
              />
              <p className="text-center text-gray-500 text-sm mt-4">
                Farbe: {selectedColor.name}
              </p>
            </div>
          </motion.div>

          {/* Konfigurator Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Farbauswahl */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  1. Farbe wählen
                </label>
                <div className="grid grid-cols-10 sm:grid-cols-12 gap-1.5 p-4 bg-gray-50 rounded-xl">
                  {colorPalette.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md transition-all hover:scale-110 ${
                        selectedColor.id === color.id
                          ? 'ring-2 ring-offset-2 ring-[#2E5A4B] scale-110'
                          : 'ring-1 ring-gray-200'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Text Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  2. Text eingeben
                </label>
                <input
                  type="text"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="z.B. Sylter, Rügener, Münchner..."
                  maxLength={25}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2E5A4B] focus:ring-2 focus:ring-[#2E5A4B]/20 outline-none transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">{customText.length}/25 Zeichen</p>
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  3. Logo hochladen
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".png,.svg,.eps,.ai"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="flex items-center justify-center gap-3 w-full px-4 py-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-[#2E5A4B] hover:bg-gray-50 transition-all"
                  >
                    <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-gray-600">
                      {logoFileName || 'PNG, SVG, EPS oder AI'}
                    </span>
                  </label>
                </div>
                {logoFileName && (
                  <p className="text-sm text-[#2E5A4B] mt-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {logoFileName}
                  </p>
                )}
              </div>

              <hr className="border-gray-200" />

              {/* Kontaktdaten */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-900">Anfrage senden</h4>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Firma *</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#2E5A4B] focus:ring-2 focus:ring-[#2E5A4B]/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">E-Mail *</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#2E5A4B] focus:ring-2 focus:ring-[#2E5A4B]/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Gewünschte Menge</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#2E5A4B] focus:ring-2 focus:ring-[#2E5A4B]/20 outline-none transition-all bg-white"
                  >
                    <option value="1000">1.000 Stück</option>
                    <option value="2500">2.500 Stück</option>
                    <option value="5000">5.000 Stück</option>
                    <option value="10000">10.000 Stück</option>
                    <option value="mehr">Mehr als 10.000</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Nachricht (optional)</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    placeholder="Besondere Wünsche oder Fragen..."
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#2E5A4B] focus:ring-2 focus:ring-[#2E5A4B]/20 outline-none transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-[#2E5A4B] text-white rounded-xl font-semibold text-lg hover:bg-[#234539] transition-colors shadow-lg shadow-[#2E5A4B]/20"
              >
                Unverbindlich anfragen
              </motion.button>

              <p className="text-center text-sm text-gray-500">
                Mindestbestellmenge: 1.000 Stück
              </p>
            </form>
          </motion.div>
        </div>

        {/* Exklusiv-Vertrieb Hinweis */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center text-sm text-gray-400 mt-16"
        >
          Exklusiv-Vertriebsrechte RADEJOKO UG
        </motion.p>
      </div>
    </section>
  );
}
