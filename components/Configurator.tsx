'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';

// Farbpaletten basierend auf den Stoffmustern (ohne zu helle Farben für weiße Schrift)
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
  { id: 9, name: 'Karmin', hex: '#D32F2F' },
  { id: 10, name: 'Gelb', hex: '#FFEB3B' },
  // Beige/Grün Töne (Reihe 3)
  { id: 11, name: 'Beige', hex: '#D4B896' },
  { id: 12, name: 'Sand', hex: '#C9B896' },
  { id: 13, name: 'Mint', hex: '#A8E6CF' },
  { id: 14, name: 'Türkis', hex: '#4DD0C4' },
  { id: 15, name: 'Petrol', hex: '#00838F' },
  { id: 16, name: 'Olive', hex: '#9E9D24' },
  { id: 17, name: 'Neongelb', hex: '#CCFF00' },
  // Lila/Grau Töne (Reihe 4)
  { id: 18, name: 'Violett', hex: '#7B1FA2' },
  { id: 19, name: 'Lila', hex: '#9C27B0' },
  { id: 20, name: 'Grau', hex: '#9E9E9E' },
  { id: 21, name: 'Altrosa', hex: '#D4A5A5' },
  { id: 22, name: 'Rosé', hex: '#E8C4C4' },
  // Grautöne (Palette 2, Reihe 1)
  { id: 23, name: 'Silber', hex: '#C0C0C0' },
  { id: 24, name: 'Mittelgrau', hex: '#757575' },
  { id: 25, name: 'Anthrazit', hex: '#424242' },
  { id: 26, name: 'Dunkelgrau', hex: '#616161' },
  { id: 27, name: 'Taupe', hex: '#8D6E63' },
  // Blau/Grün Töne (Palette 2, Reihe 2)
  { id: 28, name: 'Himmelblau', hex: '#87CEEB' },
  { id: 29, name: 'Königsblau', hex: '#4169E1' },
  { id: 30, name: 'Dunkelblau', hex: '#1A237E' },
  { id: 31, name: 'Navy', hex: '#0D1B2A' },
  { id: 32, name: 'Tannengrün', hex: '#1B5E20' },
  { id: 33, name: 'Waldgrün', hex: '#2E7D32' },
  { id: 34, name: 'Smaragd', hex: '#00695C' },
  // Braun/Orange Töne (Palette 2, Reihe 3)
  { id: 35, name: 'Dunkelbraun', hex: '#3E2723' },
  { id: 36, name: 'Schokolade', hex: '#4E342E' },
  { id: 37, name: 'Mokka', hex: '#5D4037' },
  { id: 38, name: 'Kastanie', hex: '#6D4C41' },
  { id: 39, name: 'Cognac', hex: '#8D6748' },
  { id: 40, name: 'Caramel', hex: '#A1887F' },
  // Bunt (Palette 2, Reihe 4)
  { id: 41, name: 'Koralle', hex: '#FF7043' },
  { id: 42, name: 'Apricot', hex: '#FFAB91' },
  { id: 43, name: 'Lindgrün', hex: '#AED581' },
  { id: 44, name: 'Grasgrün', hex: '#7CB342' },
  { id: 45, name: 'Aqua', hex: '#4FC3F7' },
  { id: 46, name: 'Azur', hex: '#29B6F6' },
  // Schwarz
  { id: 47, name: 'Schwarz', hex: '#000000' },
];

// Karabiner-Farben basierend auf dem Bild
const carabinerColors = [
  { id: 1, name: 'Grün', hex: '#4CAF50' },
  { id: 2, name: 'Blau', hex: '#2196F3' },
  { id: 3, name: 'Lila', hex: '#9C27B0' },
  { id: 4, name: 'Schwarz', hex: '#212121' },
  { id: 5, name: 'Pink', hex: '#E91E63' },
  { id: 6, name: 'Türkis', hex: '#00BCD4' },
  { id: 7, name: 'Silber', hex: '#BDBDBD' },
  { id: 8, name: 'Gelb', hex: '#FFC107' },
  { id: 9, name: 'Hellgrün', hex: '#8BC34A' },
  { id: 10, name: 'Rot', hex: '#F44336' },
];

// SVG basierend auf dem Original bankquischer-tz.svg
// ViewBox: 0 0 2270.1 1536
// Hauptfläche: von x=350.4 bis x=1769.3, y=274.9 bis y=1280 (Höhe ~1005.1)
function BankquischerPreview({
  color,
  textLine1,
  textLine2,
  logoUrl,
  carabinerColor
}: {
  color: string;
  textLine1: string;
  textLine2: string;
  logoUrl: string | null;
  carabinerColor: string;
}) {
  // Paddings für Text und Logo innerhalb der Hauptfläche
  // Hauptfläche: x=350.4 bis 1769.3 (Breite ~1419), y=274.9 bis 1280 (Höhe ~1005)
  const mainAreaX = 350.4;
  const mainAreaY = 274.9;
  const mainAreaWidth = 1418.9;
  const mainAreaHeight = 1005.1;
  const padding = 80; // Padding zum Rand
  
  // Logo-Bereich (links) - Hochformat 9:16, vertikal zentriert
  const logoX = mainAreaX + padding;
  const logoWidth = 280;
  const logoHeight = 498; // 280 * (16/9) ≈ 498 für 9:16 Hochformat
  const logoY = mainAreaY + (mainAreaHeight - logoHeight) / 2; // vertikal zentriert
  
  // Text-Bereich (rechts vom Logo) - mit limitierter Breite für Umbrüche, vertikal zentriert
  const textX = logoX + logoWidth + 60; // 60px Abstand zwischen Logo und Text
  const textBlockHeight = 600; // geschätzte Höhe des Textblocks
  const textY = mainAreaY + (mainAreaHeight - textBlockHeight) / 2;
  const textMaxWidth = 1000; // Feste maximale Breite für Text, damit Überschrift richtig umbricht

  return (
    <svg
      viewBox="0 0 2270.1 1536"
      className="w-full h-auto"
      style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.15))' }}
    >
      <defs>
        <style>
          {`
            .st0 {
              fill: none;
              stroke-dasharray: 12;
              stroke-width: 4px;
              stroke: #1c1b1b;
              stroke-miterlimit: 10;
            }
            .st1 {
              fill: ${color};
              stroke: #1c1b1b;
              stroke-width: 7px;
              stroke-miterlimit: 10;
            }
            .st2 {
              fill: #edead7;
            }
          `}
        </style>
      </defs>


      <g>
        {/* Obere Lasche */}
        <rect className="st1" x="794.7" y="76.4" width="276.8" height="198.4"/>
        
        {/* Untere Lasche */}
        <rect className="st1" x="794.7" y="1280" width="276.8" height="198.4"/>
        
        {/* Linke Lasche (rotiert) */}
        <rect 
          className="st1" 
          x="112.8" 
          y="678.2" 
          width="276.8" 
          height="198.4" 
          transform="translate(-526.3 1028.6) rotate(-90)"
        />

        {/* Gestrichelte Faltlinien */}
        <line className="st0" x1="350.4" y1="671.8" x2="151.9" y2="671.8"/>
        <line className="st0" x1="350.4" y1="887.8" x2="151.9" y2="887.8"/>
        <line className="st0" x1="1041.1" y1="274.9" x2="1041.1" y2="76.4"/>
        <line className="st0" x1="825.1" y1="274.9" x2="825.1" y2="76.4"/>
        <line className="st0" x1="1041.1" y1="1478.4" x2="1041.1" y2="1280"/>
        <line className="st0" x1="825.1" y1="1478.4" x2="825.1" y2="1280"/>

        {/* Hauptfläche mit abgerundeten Ecken und Druckknopf */}
        <path 
          className="st1" 
          d="M1769.3,274.9H350.4v1005.1h1418.9s307.3-269.3,307.3-269.3v-468.5s-307.3-267.3-307.3-267.3ZM1940.9,834.7c-37.8,0-68.5-30.7-68.5-68.5s30.7-68.5,68.5-68.5,68.5,30.7,68.5,68.5-30.7,68.5-68.5,68.5Z"
        />

        {/* === LOGO BEREICH (links innerhalb der Hauptfläche) === */}
        {logoUrl ? (
          <image
            href={logoUrl}
            x={logoX}
            y={logoY}
            width={logoWidth}
            height={logoHeight}
            preserveAspectRatio="xMidYMid meet"
          />
        ) : (
          <g>
            {/* Platzhalter für Logo */}
            <rect
              x={logoX}
              y={logoY}
              width={logoWidth}
              height={logoHeight}
              fill="rgba(255,255,255,0.3)"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="2"
              strokeDasharray="8,4"
            />
            <text
              x={logoX + logoWidth / 2}
              y={logoY + logoHeight / 2}
              textAnchor="middle"
              fill="rgba(255,255,255,0.6)"
              fontSize="80"
              fontFamily="sans-serif"
            >
              Ihr Logo
            </text>
          </g>
        )}

        {/* === TEXT BEREICH (rechts vom Logo, innerhalb der Hauptfläche) === */}
        <foreignObject x={textX} y={textY} width={textMaxWidth} height="800">
          <div style={{ 
            color: 'white', 
            fontFamily: 'Georgia, serif',
            width: '100%',
            maxWidth: `${textMaxWidth}px`
          }}>
            {/* Zeile 1 - Große Schrift (konfigurierbar) - 30% kleiner, mit Umbrüchen */}
            <div style={{
              fontSize: textLine1.length > 25 ? "101px" : textLine1.length > 18 ? "118px" : "135px",
              fontWeight: "bold",
              lineHeight: "1.2",
              marginBottom: "20px",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              maxWidth: `${textMaxWidth}px`
            }}>
              {textLine1 || 'Sylter Bankquischer'}
            </div>

            {/* Zeile 2 - Kleine Schrift (konfigurierbar) - 30% kleiner */}
            <div style={{
              fontSize: textLine2.length > 35 ? "73px" : "84px",
              fontStyle: "italic",
              lineHeight: "1.2",
              marginBottom: "20px",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              maxWidth: `${textMaxWidth}px`
            }}>
              {textLine2 || 'Das Aufsaugwunder!'}
            </div>

            {/* Feste URL unten - 30% kleiner */}
            <div style={{
              fontSize: "67px",
              fontFamily: "Arial, sans-serif",
              lineHeight: "1.2",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              maxWidth: `${textMaxWidth}px`
            }}>
              www.bankquischer.de
            </div>
          </div>
        </foreignObject>

      </g>
    </svg>
  );
}

// Preset-Konfigurationen für regionale Editionen
const presets: Record<string, { textLine1: string; textLine2: string }> = {
  buesumer: { textLine1: 'Büsumer Bankquischer', textLine2: 'Das Aufsaugwunder!' },
  sylter: { textLine1: 'Sylter Bankquischer', textLine2: 'Das Aufsaugwunder!' },
  norderneyer: { textLine1: 'Norderneyer Bankquischer', textLine2: 'Das Aufsaugwunder!' },
  ruegener: { textLine1: 'Rügener Bankquischer', textLine2: 'Das Aufsaugwunder!' },
};

export default function Configurator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [selectedColor, setSelectedColor] = useState(colorPalette[29]); // Dunkelblau als Default
  const [selectedCarabiner, setSelectedCarabiner] = useState(carabinerColors[1]); // Blau als Default
  const [textLine1, setTextLine1] = useState('');
  const [textLine2, setTextLine2] = useState('');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoFileName, setLogoFileName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [quantity, setQuantity] = useState('1000');
  const [message, setMessage] = useState('');

  // URL-Parameter auswerten für Presets
  useEffect(() => {
    const loadPreset = () => {
      const hash = window.location.hash;
      const match = hash.match(/konfigurator\?preset=(\w+)/);
      if (match) {
        const presetKey = match[1];
        const preset = presets[presetKey];
        if (preset) {
          setTextLine1(preset.textLine1);
          setTextLine2(preset.textLine2);
        }
      }
    };

    // Initial laden
    loadPreset();

    // Bei Hash-Änderung neu laden
    window.addEventListener('hashchange', loadPreset);
    return () => window.removeEventListener('hashchange', loadPreset);
  }, []);

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
    alert(`Vielen Dank für Ihre Anfrage!\n\nFarbe: ${selectedColor.name}\nKarabiner: ${selectedCarabiner.name}\nText: ${textLine1} / ${textLine2}\nMenge: ${quantity} Stück\n\nWir melden uns zeitnah bei Ihnen.`);
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

        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-start">
          {/* Live Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-8"
          >
            <div className="bg-[#F9F8F5] rounded-2xl p-8 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
                Live-Vorschau
              </h3>
              <BankquischerPreview
                color={selectedColor.hex}
                textLine1={textLine1}
                textLine2={textLine2}
                logoUrl={logoUrl}
                carabinerColor={selectedCarabiner.hex}
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
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 1. Text Inputs */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-900">
                  1. Text eingeben
                </label>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Große Schrift (Zeile 1)</label>
                  <input
                    type="text"
                    value={textLine1}
                    onChange={(e) => setTextLine1(e.target.value)}
                    placeholder="z.B. Sylter Bankquischer, Firmenname..."
                    maxLength={30}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2E5A4B] focus:ring-2 focus:ring-[#2E5A4B]/20 outline-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">{textLine1.length}/30 Zeichen</p>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Kleine Schrift (Zeile 2)</label>
                  <input
                    type="text"
                    value={textLine2}
                    onChange={(e) => setTextLine2(e.target.value)}
                    placeholder="z.B. Das Aufsaugwunder!, Slogan..."
                    maxLength={40}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2E5A4B] focus:ring-2 focus:ring-[#2E5A4B]/20 outline-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">{textLine2.length}/40 Zeichen</p>
                </div>
              </div>

              {/* 2. Logo Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  2. Logo hochladen
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
                      {logoFileName || 'PNG, SVG, EPS oder AI (Hochformat empfohlen)'}
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

              {/* 3. Farbauswahl */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  3. Farbe wählen
                </label>
                <div className="grid gap-1 p-3 bg-gray-50 rounded-xl" style={{ gridTemplateColumns: 'repeat(13, minmax(0, 1fr))' }}>
                  {colorPalette.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`w-5 h-5 rounded transition-all hover:scale-110 ${
                        selectedColor.id === color.id
                          ? 'ring-2 ring-offset-1 ring-[#2E5A4B] scale-110'
                          : 'ring-1 ring-gray-200'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* 4. Karabiner-Farbauswahl */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  4. Karabiner-Farbe wählen
                </label>
                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-xl">
                  {carabinerColors.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedCarabiner(color)}
                      className={`w-7 h-7 rounded-full transition-all hover:scale-110 ${
                        selectedCarabiner.id === color.id
                          ? 'ring-2 ring-offset-1 ring-[#2E5A4B] scale-110'
                          : 'ring-1 ring-gray-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Gewählt: {selectedCarabiner.name}</p>
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

      </div>
    </section>
  );
}
