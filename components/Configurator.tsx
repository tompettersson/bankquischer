'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { toPng } from 'html-to-image';

// Stofffarben mit Produktionsnummern (für chinesische Produzenten)
// Basierend auf den tatsächlichen Stoffmustern aus WhatsApp-Bildern
const colorPalette = [
  // === GELB/ORANGE (145-156) ===
  { id: 145, name: 'Hellgelb', hex: '#FFF9C4', code: '145' },
  { id: 146, name: 'Zitronengelb', hex: '#FFF176', code: '146' },
  { id: 147, name: 'Sonnengelb', hex: '#FFEE58', code: '147' },
  { id: 148, name: 'Goldgelb', hex: '#FFEB3B', code: '148' },
  { id: 149, name: 'Senfgelb', hex: '#FDD835', code: '149' },
  { id: 150, name: 'Bernstein', hex: '#FBC02D', code: '150' },
  { id: 151, name: 'Orange-Gelb', hex: '#F9A825', code: '151' },
  { id: 152, name: 'Hellorange', hex: '#FF9800', code: '152' },
  { id: 153, name: 'Orange', hex: '#FB8C00', code: '153' },
  { id: 154, name: 'Dunkelorange', hex: '#F57C00', code: '154' },
  { id: 155, name: 'Tieforange', hex: '#EF6C00', code: '155' },
  { id: 156, name: 'Rostrot', hex: '#E65100', code: '156' },

  // === KORALLE/LACHS (157-160) ===
  { id: 157, name: 'Koralle', hex: '#FFAB91', code: '157' },
  { id: 158, name: 'Lachs', hex: '#FF8A65', code: '158' },
  { id: 159, name: 'Hellrot-Orange', hex: '#FF7043', code: '159' },
  { id: 160, name: 'Tomatenrot', hex: '#FF5722', code: '160' },

  // === GRAU/WEISS/SCHWARZ (161-170) ===
  { id: 161, name: 'Weiß', hex: '#FFFFFF', code: '161' },
  { id: 162, name: 'Cremeweiß', hex: '#FAFAFA', code: '162' },
  { id: 163, name: 'Hellgrau', hex: '#E0E0E0', code: '163' },
  { id: 164, name: 'Silbergrau', hex: '#BDBDBD', code: '164' },
  { id: 165, name: 'Mittelgrau', hex: '#9E9E9E', code: '165' },
  { id: 166, name: 'Dunkelgrau', hex: '#757575', code: '166' },
  { id: 167, name: 'Anthrazit', hex: '#616161', code: '167' },
  { id: 168, name: 'Schiefergrau', hex: '#424242', code: '168' },
  { id: 169, name: 'Kohle', hex: '#212121', code: '169' },
  { id: 170, name: 'Schwarz', hex: '#000000', code: '170' },

  // === BLAU/TÜRKIS (171-177) ===
  { id: 171, name: 'Hellblau', hex: '#B3E5FC', code: '171' },
  { id: 172, name: 'Himmelblau', hex: '#81D4FA', code: '172' },
  { id: 173, name: 'Türkis hell', hex: '#4DD0E1', code: '173' },
  { id: 174, name: 'Türkis', hex: '#26C6DA', code: '174' },
  { id: 175, name: 'Türkis dunkel', hex: '#00BCD4', code: '175' },
  { id: 176, name: 'Petrol', hex: '#00ACC1', code: '176' },
  { id: 177, name: 'Petrol dunkel', hex: '#00838F', code: '177' },

  // === GRÜN (178-186) ===
  { id: 178, name: 'Mintgrün', hex: '#C8E6C9', code: '178' },
  { id: 179, name: 'Hellgrün', hex: '#A5D6A7', code: '179' },
  { id: 180, name: 'Frühlingsgrün', hex: '#81C784', code: '180' },
  { id: 181, name: 'Grasgrün', hex: '#66BB6A', code: '181' },
  { id: 182, name: 'Grün', hex: '#4CAF50', code: '182' },
  { id: 183, name: 'Waldgrün', hex: '#43A047', code: '183' },
  { id: 184, name: 'Tannengrün', hex: '#388E3C', code: '184' },
  { id: 185, name: 'Dunkelgrün', hex: '#2E7D32', code: '185' },
  { id: 186, name: 'Jägergrün', hex: '#1B5E20', code: '186' },

  // === ROT (187-192) ===
  { id: 187, name: 'Hellrot', hex: '#EF5350', code: '187' },
  { id: 188, name: 'Rot', hex: '#F44336', code: '188' },
  { id: 189, name: 'Karminrot', hex: '#E53935', code: '189' },
  { id: 190, name: 'Dunkelrot', hex: '#D32F2F', code: '190' },
  { id: 191, name: 'Weinrot', hex: '#C62828', code: '191' },
  { id: 192, name: 'Bordeaux', hex: '#B71C1C', code: '192' },

  // === ROSA/PINK/LILA (193-201) ===
  { id: 193, name: 'Hellrosa', hex: '#F8BBD9', code: '193' },
  { id: 194, name: 'Rosa', hex: '#F48FB1', code: '194' },
  { id: 195, name: 'Pink hell', hex: '#F06292', code: '195' },
  { id: 196, name: 'Pink', hex: '#EC407A', code: '196' },
  { id: 197, name: 'Pink dunkel', hex: '#E91E63', code: '197' },
  { id: 198, name: 'Magenta', hex: '#D81B60', code: '198' },
  { id: 199, name: 'Fuchsia', hex: '#C2185B', code: '199' },
  { id: 200, name: 'Beere', hex: '#AD1457', code: '200' },
  { id: 201, name: 'Weinrot-Pink', hex: '#880E4F', code: '201' },
];

// Schriftfarben (Schwarz und Weiß)
const textColors = [
  { id: 1, name: 'Weiß', hex: '#FFFFFF' },
  { id: 2, name: 'Schwarz', hex: '#000000' },
];

// Schriftarten-Optionen
const fontOptions = [
  { id: 1, name: 'Klassisch (Serif)', family: 'Georgia, serif', preview: 'Aa' },
  { id: 2, name: 'Modern (Sans-Serif)', family: 'Arial, Helvetica, sans-serif', preview: 'Aa' },
  { id: 3, name: 'Technisch (Monospace)', family: 'Courier New, monospace', preview: 'Aa' },
  { id: 4, name: 'Elegant (Script)', family: 'Brush Script MT, cursive', preview: 'Aa' },
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

// Hilfsfunktion: Hex zu RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

// Hilfsfunktion: RGB zu Hex
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

// Hilfsfunktion: Farbe aufhellen/abdunkeln basierend auf Faktor (0-1 für dunkel, 1+ für hell)
function adjustColor(hex: string, factor: number): string {
  const rgb = hexToRgb(hex);
  if (factor < 1) {
    // Abdunkeln
    return rgbToHex(rgb.r * factor, rgb.g * factor, rgb.b * factor);
  } else {
    // Aufhellen (Richtung Weiß)
    const f = factor - 1;
    return rgbToHex(
      rgb.r + (255 - rgb.r) * f,
      rgb.g + (255 - rgb.g) * f,
      rgb.b + (255 - rgb.b) * f
    );
  }
}

// Karabiner-Farbvarianten generieren
// S-Körper = Karabiner-Farbe mit Schattierungen (aufgehellt, da Original fast schwarz war)
// Federdrähte = Silber/Metall (unverändert)
function getCarabinerColors(baseColor: string) {
  return {
    // S-KÖRPER - deutlich aufgehellt, damit die Farbe sichtbar ist
    veryDark: adjustColor(baseColor, 0.6),     // Schatten
    dark: adjustColor(baseColor, 0.75),        // Dunkle Bereiche
    mediumDark: adjustColor(baseColor, 0.9),   // Mittel-dunkel
    medium: baseColor,                          // Hauptfarbe
    mediumLight: adjustColor(baseColor, 1.15), // Leicht aufgehellt
    highlight: adjustColor(baseColor, 1.3),    // Highlights

    // FEDERDRÄHTE (metallisch - bleiben silber/grau)
    metalDark: '#70716e',
    metalMedium: '#868580',
    metalMediumLight: '#797975',
    metalHighlight: '#a4a3a1',
    metalBright: '#e3e3de',
  };
}

// SVG basierend auf dem Original bankquischer-tz.svg
// ViewBox: 0 0 2270.1 1536
// Hauptfläche: von x=350.4 bis x=1769.3, y=274.9 bis y=1280 (Höhe ~1005.1)
function BankquischerPreview({
  color,
  textLine1,
  textLine2,
  logoUrl,
  carabinerColor,
  textColor,
  showBack = false,
  logoRotation = 0,
  fontFamily = 'Georgia, serif'
}: {
  color: string;
  textLine1: string;
  textLine2: string;
  logoUrl: string | null;
  carabinerColor: string;
  textColor: string;
  showBack?: boolean;
  logoRotation?: number;
  fontFamily?: string;
}) {
  // Paddings für Text und Logo innerhalb der Hauptfläche
  // Hauptfläche: x=350.4 bis 1769.3 (Breite ~1419), y=274.9 bis 1280 (Höhe ~1005)
  const mainAreaX = 350.4;
  const mainAreaY = 274.9;
  const mainAreaWidth = 1418.9;
  const mainAreaHeight = 1005.1;
  const padding = 40; // Weniger Padding zum Rand

  // Logo-Bereich (links) - QUADRATISCH, mit Abstand links und zum Text
  const logoSize = 420; // Quadratisch, größer
  const logoX = mainAreaX + padding + 35; // Weniger Abstand nach links
  const logoWidth = logoSize;
  const logoHeight = logoSize;
  const logoY = mainAreaY + (mainAreaHeight - logoHeight) / 2; // vertikal zentriert
  const logoCenterX = logoX + logoWidth / 2;
  const logoCenterY = logoY + logoHeight / 2;

  // Text-Bereich (rechts vom Logo) - weniger Abstand zum Logo
  const textX = logoX + logoWidth + 45; // Weniger Abstand zum Logo
  const textBlockHeight = 500; // etwas kompakter
  const textY = mainAreaY + (mainAreaHeight - textBlockHeight) / 2;
  const textMaxWidth = 920; // Breiter damit "Bankquischer" nicht umbricht

  // Rückseite: 180° gedreht mit URL zentriert
  if (showBack) {
    return (
      <svg
        viewBox="0 0 2270.1 1536"
        className="w-full h-auto"
        style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.15))' }}
      >
        <defs>
          <style>
            {`
              .st0-back {
                fill: none;
                stroke-dasharray: 12;
                stroke-width: 4px;
                stroke: #1c1b1b;
                stroke-miterlimit: 10;
              }
              .st1-back {
                fill: ${color};
                stroke: #1c1b1b;
                stroke-width: 7px;
                stroke-miterlimit: 10;
              }
            `}
          </style>
        </defs>

        {/* Gesamte Gruppe 180° um Mittelpunkt gedreht */}
        <g transform="rotate(180 1135 768)">
          {/* Obere Lasche */}
          <rect className="st1-back" x="794.7" y="76.4" width="276.8" height="198.4"/>

          {/* Untere Lasche */}
          <rect className="st1-back" x="794.7" y="1280" width="276.8" height="198.4"/>

          {/* Linke Lasche (rotiert) */}
          <rect
            className="st1-back"
            x="112.8"
            y="678.2"
            width="276.8"
            height="198.4"
            transform="translate(-526.3 1028.6) rotate(-90)"
          />

          {/* Rechte Lasche (an der Spitze, für Karabiner) */}
          <rect
            className="st1-back"
            x="2076.6"
            y="679"
            width="198.4"
            height="176.8"
          />

          {/* Gestrichelte Faltlinien */}
          {/* Linke Lasche */}
          <line className="st0-back" x1="350.4" y1="671.8" x2="151.9" y2="671.8"/>
          <line className="st0-back" x1="350.4" y1="887.8" x2="151.9" y2="887.8"/>
          {/* Obere Lasche */}
          <line className="st0-back" x1="1041.1" y1="274.9" x2="1041.1" y2="76.4"/>
          <line className="st0-back" x1="825.1" y1="274.9" x2="825.1" y2="76.4"/>
          {/* Untere Lasche */}
          <line className="st0-back" x1="1041.1" y1="1478.4" x2="1041.1" y2="1280"/>
          <line className="st0-back" x1="825.1" y1="1478.4" x2="825.1" y2="1280"/>
          {/* Rechte Lasche (an der Spitze) */}
          <line className="st0-back" x1="2076.6" y1="679" x2="2275" y2="679"/>
          <line className="st0-back" x1="2076.6" y1="855.8" x2="2275" y2="855.8"/>

          {/* Hauptfläche mit abgerundeten Ecken und Druckknopf */}
          <path
            className="st1-back"
            d="M1769.3,274.9H350.4v1005.1h1418.9s307.3-269.3,307.3-269.3v-468.5s-307.3-267.3-307.3-267.3ZM1940.9,834.7c-37.8,0-68.5-30.7-68.5-68.5s30.7-68.5,68.5-68.5,68.5,30.7,68.5,68.5-30.7,68.5-68.5,68.5Z"
          />
        </g>

        {/* URL Text 90° gedreht (W unten, .de oben), am rechten Rand der Hauptfläche */}
        <text
          x="1730"
          y="780"
          textAnchor="middle"
          fill={textColor}
          fontSize="75"
          fontFamily="Arial, sans-serif"
          fontWeight="normal"
          transform="rotate(-90 1730 780)"
        >
          www.bankquischer.de
        </text>
      </svg>
    );
  }

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

        {/* Rechte Lasche (an der Spitze, für Karabiner) */}
        <rect
          className="st1"
          x="2076.6"
          y="679"
          width="198.4"
          height="176.8"
        />

        {/* Gestrichelte Faltlinien */}
        {/* Linke Lasche */}
        <line className="st0" x1="350.4" y1="671.8" x2="151.9" y2="671.8"/>
        <line className="st0" x1="350.4" y1="887.8" x2="151.9" y2="887.8"/>
        {/* Obere Lasche */}
        <line className="st0" x1="1041.1" y1="274.9" x2="1041.1" y2="76.4"/>
        <line className="st0" x1="825.1" y1="274.9" x2="825.1" y2="76.4"/>
        {/* Rechte Lasche (an der Spitze) */}
        <line className="st0" x1="2076.6" y1="679" x2="2275" y2="679"/>
        <line className="st0" x1="2076.6" y1="855.8" x2="2275" y2="855.8"/>
        <line className="st0" x1="1041.1" y1="1478.4" x2="1041.1" y2="1280"/>
        <line className="st0" x1="825.1" y1="1478.4" x2="825.1" y2="1280"/>

        {/* Hauptfläche mit abgerundeten Ecken und Druckknopf */}
        <path 
          className="st1" 
          d="M1769.3,274.9H350.4v1005.1h1418.9s307.3-269.3,307.3-269.3v-468.5s-307.3-267.3-307.3-267.3ZM1940.9,834.7c-37.8,0-68.5-30.7-68.5-68.5s30.7-68.5,68.5-68.5,68.5,30.7,68.5,68.5-30.7,68.5-68.5,68.5Z"
        />

        {/* === LOGO BEREICH (links innerhalb der Hauptfläche) === */}
        {logoUrl ? (
          <g transform={`rotate(${logoRotation} ${logoCenterX} ${logoCenterY})`}>
            <image
              href={logoUrl}
              x={logoX}
              y={logoY}
              width={logoWidth}
              height={logoHeight}
              preserveAspectRatio="xMidYMid meet"
            />
          </g>
        ) : (
          <g transform={`rotate(${logoRotation} ${logoCenterX} ${logoCenterY})`}>
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

        {/* === S-KARABINER ILLUSTRATION (unten links in der Ecke, liegend) === */}
        {(() => {
          const cc = getCarabinerColors(carabinerColor);
          return (
            <g transform="translate(1500, 1150) scale(0.46)">
              <g>
                {/* st3 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M1392.9,602.3c-2.1,1-5.2.2-6,4-1.8.3-4.6-.5-6,0v-6c121.5-54.3,167.6-203.3,116.4-323.4s-239.4-214.2-349.4-102.7c-56.1,56.9-109.8,122.6-163.9,182.1-82.3,90.4-164,181.3-246,272-16.3,18-34.4,34.6-49,54l22,2c-65.8,3.3-132.1-1.7-198,0-9.9.3-25-2.1-33.1,3.9-11.5,8.6-6,24.4,8,26.1s38.1-.4,55,0,1.3,0,2,0,1.3,0,2,0c1.1,0,4.5,1.9,8,2,5,.1,11-2,12-2,4,.1,8-.1,12,0,12,.4,25.7,1.2,38,2s28.2.8,34,6l-27,34c-28,40.1-71.4,37.5-115.9,40.1-128,7.3-234.2,13.7-343.7-62.5C-120,536.1-15.4,98.4,324.9,46.3v6c-28.7,3.6-57.7,13.4-84,24s-62.5,27.2-86,50c-10.5,6.7-16.4,10.9-26,20C-13.3,280.9-5.6,521.1,125.9,660.4c111.4,118,255.3,125,408,108,24-2.7,52.1-6,68-26l15-20c-34.7,3.6-75.2-6.4-109.1-2.1-6,.8-7.9,4.6-12.3,5.7-42.9,10.1-47.6-58.5-1.7-51.5,21.5,3.3,43.9,5.3,66,6,32.2,1,64.9,0,97.1-1.1,109.3-119.5,216-241.3,325-361s154.4-184,220.3-211.7c92-38.7,210.9-.1,275.7,71.7,124,137.3,80.9,345.3-85,424Z"/>
                {/* st7 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M1048.9,48.3c14.7-.1,47.3-1,60.6,2s34.6,5.5,52.4,6.1,22.4-6.4,33,4.8c11.9,12.4,5.1,30.2-2.3,42.7-6.8.6-13.8.5-20.7.3-19.3-.5-33.2-6-50-8-35.1-4.2-78.7-2.5-115.1-3.9-5.3-.2-9.8-.7-15-2l-4.1,1.9c-44.6,51.3-90.1,101.9-135.8,152.2-108.3,119.1-216.3,239.3-327,356l-2-2c4.4-6,8.4-14.6,15-22,124.8-141.4,255.7-277.9,382.1-417.9,10.6-11.7,20.8-24,31-36l-201.1-5.9c-37.7-3.7-76-4.1-113.9-6.1-37-2-87.5-12-123-4l-6-6c50.2-22.3,100.7-16.5,155.1-17.9,156.4-4.2,327.1-2.9,482.9,7.9,12.5.9,42.6,12.5,44-9.1,1.3-20-30.1-17.9-42-18.9-151.9-12.3-316.2-13.5-468.9-9.9-86.4,2-133.2-5.5-213.1,33.9v-6c1.8-.9,9.9-6.2,10-7-1.5-1.9-3.4-3.2-5.3-4.7-26.9-20.4-111.4-20.5-144.7-16.3v-6c39-6,91.1-6.6,129.1,5.9,8.3,2.7,25.9,15.8,30,16.1s27.8-10.6,35.3-12.6c40.9-10.7,88.4-8.1,130.6-9.4,74.9-2.2,151-4.4,225.8,0,48-2.7,96.8,5.8,144.2,0C1047.8-.2,1097.1,6.1,1144.3,3l2.6,1.3v6c-23.6,1.5-67,1-87,10s-22.3,19.7-32.9,29.1c6.5,3.9,16.9-1,22-1ZM864.9,88.3c-67.7-1.5-136.1-3.6-204-2-11.7.3-24.1,1.5-36,2-32.8,1.3-65.9.9-98,8-.5,3.5,4.5,1.9,7,2,28.6,1.1,56.5,2.3,85,4,92.8,5.4,185,9.5,278,12,19.7.5,39.3,1.6,59,2,7-.2,9-9.8,11-12,4.1-4.3,11.1-8.1,14-14-38.6-.8-77.4-1.2-116-2ZM514.9,99.3h-2c.7,1.3,1.3,1.3,2,0Z"/>
                {/* st0 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M1644.9,352.3c0,.4-1.4.9-1.4,1.6,0,1.6,1.3,2.3,1.4,2.4,3.5,103.7-25.5,186.2-92,264-3.9-.7-4.7.1-4,4-.2.2.5,2.3-.5,3.4-82.2,90.6-228.6,143.7-349.5,113.6-15.4-3.8-21.9-13.6-35.9-17.1.2-.4,0-1.3,0-2,.3-1.9-.1-4.1,0-6-3.8-.9-7.7,1.8-11.1,1.7s-2.7-1.7-2.9-1.7c20.6-7.2,40.2-16,60-25.1,2.1-1,4.9-.4,6-.9.9,9-21.8,7.6-20,15,8.4,7.7,20.3,10.6,31.3,12.7,124.1,24.3,252.6-25.5,334.7-117.7.5-.5.6.7,4-4s5.8-8.4,8-12c2-.7,2.8-2.4,4-4,26.3-36.7,42.4-82.3,52-126,13.3-60.1,14-109.8-1-170-35.8-144.1-164.7-259.4-313-274-39.4-10.5-124-2.7-168,0v-6l104-4c.3,3,5.7,3,6,0,200.9-8.8,377.9,151,388,352Z"/>
                {/* st16 - METALL highlight */}
                <path fill={cc.metalHighlight} d="M840.9,722.3c-12.6-.1-25.4.2-38,0-47.3-.8-96.1-5.4-144-4h-4s0,4,0,4c-1-.4-3.5.4-4,0-5.8-5.2-23-5.3-34-6,1.7-4.1,1.7-7.9,0-12,73.9,2.1,148.1,3.3,222,4l2,14Z"/>
                {/* st0 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M1044.9,722.3c1.1,6.1-3.1,3.8-6.9,4-24.2,1-48.8-.1-73.1,0s-21.4,0-32,0l8,8c-11.3-.5-22.4-1.8-34-2,1.1-6.1-3.1-3.8-6.9-4-8.7-.4-17,1.8-23.1,2-24.7.7-49.7-3.5-74-4v-4c12.6.2,25.4-.1,38,0,18,.2,36,0,54,0,39.3.2,78.7.5,118,0,10.6-.1,21.4.2,32,0Z"/>
                {/* st22 - Körper dunkel */}
                <path fill={cc.dark} d="M802.9,726.3c-4,0-10.7,0-15,0h-92c-8.8,0-27.8-1-37-2v-6c47.9-1.4,96.7,3.2,144,4v4Z"/>
                {/* st22 - Körper dunkel */}
                <path fill={cc.dark} d="M1162.9,724.3c-1.4,3-16.7,9.4-20.4,10.6-40.3,12.6-85.8,5.7-127.6,3.4v-6c56.2,2.5,84.4,6.9,140-8l1,2,1-2c1-.2,3.2-3.2,6-2,0,.7.2,1.6,0,2Z"/>
                {/* st0 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M1014.9,738.3c-23.3-1.2-46.7-3-70-4v-4c6.6-.1,13.3.1,20,0,17.2-.3,33,1.2,50,2v6Z"/>
                {/* st22 - Körper dunkel */}
                <path fill={cc.dark} d="M964.9,730.3c-6.7.1-13.4-.1-20,0v4c-1.3,0-2.7,0-4,0l-8-8c10.6,0,21.3,0,32,0v4Z"/>
                {/* st22 - Körper dunkel */}
                <path fill={cc.dark} d="M906.9,732.3c-9.7-.2-21.5,1.8-30-2,6.1-.2,14.3-2.4,23.1-2s8-2.1,6.9,4Z"/>
                {/* st3 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M658.9,724.3c-2-.2-2.9-1.6-4-2v-4s4,0,4,0v6Z"/>
                {/* st7 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M1250.9.3h6c-.3,3-5.7,3-6,0Z"/>
                {/* st7 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M1644.9,356.3c0-.1-1.3-.8-1.4-2.4s1.4-1.2,1.4-1.6l2,1-2,3Z"/>
                {/* st7 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M1552.9,620.3c-.5.5.5,3.5,0,4s-3.5-.4-4,0c-.7-3.9.1-4.7,4-4Z"/>
                {/* st14 - Körper dunkel */}
                <path fill={cc.dark} d="M1620.9,452.3c-7.1,41.4-25.4,91.5-46,128-.8,1.4-1.4,3-2,4-2.2,3.6-5.5,8.5-8,12-3.8-.7-4.6.2-4,4-82.1,92.2-210.6,142-334.7,117.7-11-2.1-22.9-5-31.3-12.7-1.8-7.4,20.9-6,20-15,1.3-.6,2.7-1.3,4-2,2.3,4.8,7.7-1,12-2s6.9.5,10,0v-2c-1.5,0-2.9-1.1-4-2,1.4-.6,2.6-1.5,4-2,5.4-1.9,15.3-7.6,19.2-8,6.4-.6,9.9,3.7,15.8,4.1,22.2,1.7,19.8-15.3,28.1-28.1s30.9-29.6,50.9-24.1l-4-6c8.9-.9,16.9-5,25.2-7.9s4.5-4,4.8-4.1c1.4-.5,4.2.3,6,0,3.1-.5,6.8.3,10,0l-4-4c166-78.7,209.1-286.7,85-424-64.8-71.8-183.8-110.4-275.7-71.7-65.9,27.7-168.7,155-220.3,211.7-108.9,119.7-215.7,241.5-325,361-32.2,1-64.8,2.1-97.1,1.1-22.1-.7-44.5-2.7-66-6-45.9-7-41.2,61.6,1.7,51.5s6.3-4.9,12.3-5.7c33.9-4.3,74.4,5.7,109.1,2.1l-15,20c-15.9,19.9-44.1,23.3-68,26-152.7,17-296.6,10.1-408-108C-5.6,521.1-13.3,280.9,128.9,146.3l24.7-15.9c1.9-.7,1.1-3.9,1.3-4.1,22.2-14.2,62.2-35.2,86-44,49.8-18.4,118.2-23.8,170.4-15.4s32,5.8,43.6,15.4c-.2,0,.5,3-1.4,4-7.1,3.8-43.7,23.1-48.1,23.7s-19.1-7.7-27.5-7.7-16.2,3.6-21.3,6.7c-14.4,8.8-15.7,29.6-26.7,39.3-11.2,10-43.1,16.8-58.4,23.6-40.5,18-81.8,60.2-106.6,96.4-5.7-1.1-5.9,6.4-8,10s-4.2,6.6-6,10l-8.9,8.1c-14.1,21.4-20.3,39.9-27.1,63.9-41,143.4,44.6,284.9,186,325,86.6,24.6,163.4,10.8,222-59.9L1006.9,92.3c36.4,1.5,80-.3,115.1,3.9s30.7,7.5,50,8,13.9.3,20.7-.3c7.4-12.6,14.2-30.3,2.3-42.7-10.7-11.2-21.8-4.4-33-4.8-17.8-.6-37-2.7-52.4-6.1s-45.9-2.1-60.6-2c13.1-20.1,41-21.8,63-24,52.9-5.2,119-6.8,172.1-4.1,7.1.4,18.1,1.2,24.9,2.1,204.1,26.2,346.7,228.3,312,430Z"/>
                {/* st23 - Körper dunkel */}
                <path fill={cc.dark} d="M1380.9,606.3c-.3,0-1.7,3-4.8,4.1-8.3,2.9-16.2,7.1-25.2,7.9l4,6c-20-5.5-40.2,7.7-50.9,24.1s-5.8,29.8-28.1,28.1c-5.9-.5-9.4-4.8-15.8-4.1s-13.8,6-19.2,8v-2c-.6-5.2,14.7-10.8,20-12,7.9-1.8,10.6,1.5,17.9-3.1s17.5-21.2,6.2-30c-9.3-7.3-22.6-.3-32.2,3.2-58.1,21-80,48.4-149,54-91.2,7.4-193.9,1.8-285.9,0-29.5-.6-58.8,1.7-88.1-2-3.7-.5-8.1,2.5-7-3.9,13.8-1.1,20.2,0,32.9,0,99.5.6,198.5,3.4,298-.2,31.8-1.1,63.9.8,95.2-6.8,2.3-13.8,4-24.3,11.5-36.5,16.1-26.1,79.3-51.8,90.4-10.6,11.2-6.6,34.8-10.5,42.9,2.1s1.6,9.9,5,11.9c14.8-31,53.8-31.3,82-44v6ZM1214.9,624.3c-30.1-6.1-40.6,15.5-41,42l64.1-31.9c4.1-8.9-9.2-6.5-6-16-8.1,1.3-15.3-5.4-25,0l8,6Z"/>
                {/* st21 - METALL highlight */}
                <path fill={cc.metalHighlight} d="M604.9,694.3c-24.4-.6-48.7-1.2-73.1-1.9-5-.1-15-5.2-15,2.9s26.4,6.9,34.1,7c.5,4.1-4.5,7.5-8,8-6.7,1.1-28.5-5.1-31.6-10.4s.6-11.5,1.6-15.6c65.9-1.7,132.2,3.3,198,0,4-.2,8,.3,12,0-1.1,6.4,3.3,3.4,7,3.9,29.3,3.7,58.6,1.4,88.1,2,92,1.9,194.7,7.5,285.9,0,69-5.6,90.9-33,149-54,2.1,1.5,3.1,3.7,4,6-24.1,7.1-45.5,22.5-68.7,32.3-87,37.1-214,24.5-308.3,23.6-91.8-1-183.2-1.5-275.1-3.9Z"/>
                {/* st25 - Körper mittel-dunkel */}
                <path fill={cc.mediumDark} d="M464.9,80.3c-3.9,1.8-8.9,1.5-10,2-11.5-9.6-28.9-13-43.6-15.4-52.2-8.4-120.6-2.9-170.4,15.4v-6c26.3-10.6,55.3-20.4,84-24s117.8-4.1,144.7,16.3c1.9,1.4,3.8,2.8,5.3,4.7,0,.8-8.1,6.1-10,7Z"/>
                {/* st8 - METALL mittel */}
                <path fill={cc.metalMediumLight} d="M542.9,714.3c-17-.4-37.9,2-55,0s-19.5-17.5-8-26.1c8.1-6,23.2-3.7,33.1-3.9-1,4.1-3.7,12-1.6,15.6,3.1,5.3,24.9,11.4,31.6,10.4v4Z"/>
                {/* st21 - METALL highlight */}
                <path fill={cc.metalHighlight} d="M616.9,716.3c-12.3-.8-26-1.6-38-2,.8-5.7-8-4.6-6-12,12,.3,24.4,1.7,36,2s5.3,0,8,0c1.7,4.1,1.7,7.9,0,12Z"/>
                {/* st12 - Körper mittel-dunkel */}
                <path fill={cc.mediumDark} d="M240.9,82.3c-23.8,8.8-63.8,29.8-86,44,23.5-22.8,55.7-37.8,86-50v6Z"/>
                {/* st16 - METALL highlight */}
                <path fill={cc.metalHighlight} d="M578.9,714.3c-4-.1-8,.1-12,0-1.7-5.2-7.6-4.1-12-4v6c-3.5-.1-6.9-2-8-2l-1-2-1,2c-.7,0-1.3,0-2,0v-4c3.5-.5,8.5-3.9,8-8,7.3.1,14.7-.2,22,0-2,7.4,6.8,6.3,6,12Z"/>
                {/* st21 - METALL highlight */}
                <path fill={cc.metalHighlight} d="M554.9,716.3v-6c4.4,0,10.3-1.2,12,4-1,0-7,2.1-12,2Z"/>
                {/* st7 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M154.9,126.3c-.2.2.6,3.4-1.3,4.1l-24.7,15.9c9.6-9.1,15.5-13.3,26-20Z"/>
                {/* st23 - Körper dunkel */}
                <path fill={cc.dark} d="M1386.9,606.3c.8-3.8,3.9-3,6-4l4,4c-3.2.4-6.8-.4-10,0Z"/>
                {/* st8 - METALL mittel */}
                <path fill={cc.metalMediumLight} d="M544.9,714.3l1-2,1,2c-.7,0-1.3,0-2,0Z"/>
                {/* st11 - Körper mittel-dunkel */}
                <path fill={cc.mediumDark} d="M114.9,360.3l2.2,7.9h3.8c-11.6,59.7-2.8,112.5,24,166.1.7,1.3,1.3,2.7,2,4,42.8,81.1,124.5,136.8,217.1,144,3.8.3,8,1.9,6.9-4,1.1.2,2.7,0,4,0l1.1,4h6.9s0-4,0-4c1.3-.1,2.7,0,4,0,7,6.9,26.9,1.3,36.1-.9,37.5-9.3,58.7-30.8,83.9-57.1,1.9-2,4-4,6-6,4.9-5,8.3-10.1,12-14,110.7-116.7,218.7-236.9,327-356,45.7-50.3,91.2-100.9,135.8-152.2l4.1-1.9c5.1,1.3,9.7,1.8,15,2l-483.9,533.1c-58.6,70.7-135.4,84.5-222,59.9-141.4-40.1-227-181.6-186-325Z"/>
                {/* st24 - METALL highlight */}
                <path fill={cc.metalHighlight} d="M1144.9,90.3c-155.9-10.9-326.5-12.1-482.9-7.9-54.4,1.4-104.9-4.4-155.1,17.9-17.9,8-34.6,17.1-52,26-1.6-10.9,10.1-8.5,4-22,42.8-18.1,66.5-30.7,114.9-34.1,136.2-9.4,275.8-2,412,2.2,54.4,1.6,108.9,1.2,163.1,5.9-1.3,4-2.9,7.9-4,12Z"/>
                {/* st26 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M464.9,86.3c-17.8,8.8-37.1,21.9-54,30s-27.8,11-42,15c-3.3,2.8-1.8,9.1-2,13h-6c-.3-1.8-.3-6.3,0-8s3.2-5.2,4-7l-.9-.9c-2.2,1.6-3.5,3.8-5,6-15.5,21.6-14.2,34.9-44,47-57.5,23.1-97.4,29-137.9,82.1-60.4,79.1-70.8,176.6-28.1,266.9v4s-4,0-4,0c-26.8-53.6-35.6-106.4-24-166,5.5-28.2,16.7-54.8,30-80s4.1-6.7,6-10c3.9-2.1,5.6-6.5,8-10,24.9-36.2,66.1-78.4,106.6-96.4s47.2-13.6,58.4-23.6c10.9-9.7,12.2-30.5,26.7-39.3,5.1-3.1,15.5-6.7,21.3-6.7,8.4,0,24.3,8.1,27.5,7.7s41.1-19.9,48.1-23.7,1.2-3.9,1.4-4c1.1-.5,6.1-.2,10-2v6Z"/>
                {/* st21 - METALL highlight */}
                <path fill={cc.metalHighlight} d="M1146.9,66.3c-15.3-1.5-33.3.6-49.1,0-172.3-5.5-353.7-17.6-525.9-6.1-45.2,3-112.1,28.8-149.7,54.3-2,1.4-3.8,2.8-5.3,4.7,13.5-.4,28.7-9.4,42-15,6.1,13.5-5.6,11.1-4,22-18.2,9.3-31,15.6-50,24-8.4-15.1-1-21.3,6-34,16.9-8.1,36.2-21.2,54-30,79.9-39.4,126.7-31.9,213.1-33.9,152.7-3.6,317-2.4,468.9,9.9v4Z"/>
                {/* st9 - METALL mittel */}
                <path fill={cc.metalMediumLight} d="M896.9,114.3c-93-2.5-185.2-6.6-278-12,.7-6.6,8.8-5.1,6-14,11.9-.5,24.3-1.7,36-2-1.1,6,3,3.9,6.9,4,65.6,2.4,131.4,5.3,197.1,8,7.7.3,17.3,1.6,26,2-1.3,6.2,5.5,8.2,6,14Z"/>
                {/* st15 - Körper mittel-dunkel */}
                <path fill={cc.mediumDark} d="M1308.9,22.3c-6.9-.9-17.8-1.7-24.9-2.1-53.1-2.7-119.2-1.1-172.1,4.1-22.1,2.2-49.9,3.9-63,24-5.1,0-15.5,5-22,1,10.7-9.4,19.7-23.2,32.9-29.1,20.1-8.9,63.5-8.5,87-10,44-2.7,128.6-10.5,168,0s8.4,2,8,4l-14,8Z"/>
                {/* st0 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M512.9,106.3c-4.1.9-7.9,2.6-11.7,4.3,4.1,32-30.4,72.5-61.4,75.6-18.5,1.9-44.8-1.8-35-26h4s0-3,0-3c-1-3.1-3.8.9-4,1-1.7.4-4.1-.2-6,0v-2c1.4-.7,3.8-5,6-6,19-8.4,31.8-14.7,50-24s34.1-18,52-26l6,6ZM484.9,118.3c-6.8,2.7-10.1,5-16,8-8.3,4.2-35.8,15.8-39.8,21.2-9,12.1,17.9,13.4,24.9,12.9s18.4-3.5,24.9-8.1c10.3-7.2,16.6-25.8,16-38-4.1-.7-7,2.8-10,4Z"/>
                {/* st19 - METALL highlight */}
                <path fill={cc.metalHighlight} d="M864.9,98.3c-65.7-2.7-131.5-5.6-197.1-8-3.9-.1-8,2-6.9-4,67.9-1.6,136.3.5,204,2v10Z"/>
                {/* st13 - METALL highlight */}
                <path fill={cc.metalHighlight} d="M966.9,104.3c-6.5,2.1-16.6-2-21-2h-40c-2.6,0-10-1.8-15-2-8.7-.4-18.3-1.7-26-2v-10c38.6.8,77.4,1.2,116,2-2.9,5.9-9.9,9.6-14,14Z"/>
                {/* st8 - METALL mittel */}
                <path fill={cc.metalMediumLight} d="M1144.9,90.3c1.1-4.1,2.7-8,4-12s8.4-11-2-12v-4c11.9,1,43.3-1.2,42,18.9-1.4,21.6-31.5,10-44,9.1Z"/>
                {/* st1 - METALL dunkel */}
                <path fill={cc.metalDark} d="M896.9,114.3c-.5-5.8-7.3-7.8-6-14,5,.2,12.4,2,15,2h40c4.4,0,14.5,4.1,21,2-2.1,2.2-4.1,11.8-11,12-19.7-.4-39.3-1.4-59-2Z"/>
                {/* st1 - METALL dunkel */}
                <path fill={cc.metalDark} d="M624.9,88.3c2.8,8.9-5.3,7.4-6,14-28.5-1.7-56.5-2.9-85-4s-7.4,1.5-7-2c32.1-7.2,65.2-6.7,98-8Z"/>
                {/* st26 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M512.9,614.3h-6c3.2-11.1,13.6-12.7,16-16l2,2c-3.7,3.9-7.1,9-12,14Z"/>
                {/* st0 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M514.9,99.3c-.7,1.3-1.3,1.3-2,0h2Z"/>
                {/* st4 - Körper mittel-dunkel */}
                <path fill={cc.mediumDark} d="M1628.9,454.3l-8-2c34.7-201.7-107.9-403.8-312-430l14-8c.4-1.9-6.4-3.5-8-4,148.3,14.6,277.2,129.9,313,274,14.9,60.2,14.3,109.9,1,170Z"/>
                {/* st20 - METALL highlight */}
                <path fill={cc.metalHighlight} d="M1260.9,666.3c-5.3,1.2-20.6,6.8-20,12-1.9.2-4.3-.4-6,0-3,.6-4.4,3.2-6,4-4.5,2.2-7.9,5-10,6s-2.7,1.4-4,2-3.9,0-6,.9c-19.8,9.1-39.4,17.8-60,25.1-1.3,0-2.7,0-4,0-9.5.5-19.3,3.6-28,4s-2.7,0-4,0c-18.3.8-38.3,1.5-56,2s-8,0-12,0c-10.6.2-21.4-.1-32,0v-14c56-1.2,119.6,0,172-21s46.5-26.1,72-33c-.6,8,5.3,4.7,4,12Z"/>
                {/* st17 - METALL dunkel */}
                <path fill={cc.metalDark} d="M1162.9,722.3c-2.8-1.2-5,1.8-6,2s-1.4-.2-2,0c-55.6,14.9-83.8,10.5-140,8-17-.8-32.8-2.3-50-2v-4c24.2-.1,48.9,1,73.1,0s8,2.1,6.9-4c4,0,8,.1,12,0-1.1,6.1,3.1,3.9,6.9,4,14.3.6,28-.8,42.2-2,3.8-.3,8,2.3,6.9-4,1.3,0,2.7,0,4,0-.9,6.4,2.3,3.6,6.1,3.1s10.9-1.3,16-2.2,7.1.2,6-4.9c1.3,0,2.7,0,4,0s1.2,1.7,2.9,1.7c3.3,0,7.3-2.6,11.1-1.7-.1,1.9.3,4.1,0,6Z"/>
                {/* st15 - Körper mittel-dunkel */}
                <path fill={cc.mediumDark} d="M1576.9,580.3h-2c20.6-36.5,38.9-86.6,46-128l8,2c-9.6,43.7-25.7,89.3-52,126Z"/>
                {/* st7 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M1564.9,596.3c-3.4,4.7-3.5,3.5-4,4-.6-3.8.2-4.7,4-4Z"/>
                {/* st7 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M1572.9,584.3c.6-1,1.2-2.6,2-4h2c-1.2,1.6-2,3.3-4,4Z"/>
                {/* st6 - METALL hell/bright */}
                <path fill={cc.metalBright} d="M1256.9,654.3c-25.6,6.8-47.8,23.2-72,33-52.4,21.1-115.9,19.8-172,21-38.2.8-78.3,2-116,2s-38.8-1.8-58-2c-73.9-.7-148.1-1.9-222-4-2.7,0-5.3,0-8,0l-4-10c91.8,2.4,183.2,3,275.1,3.9,94.3,1,221.2,13.5,308.3-23.6,23.1-9.8,44.5-25.2,68.7-32.3,2.8,7.5.5,5.9,0,12Z"/>
                {/* st20 - METALL highlight */}
                <path fill={cc.metalHighlight} d="M894.9,722.3c-18,0-36,.2-54,0l-2-14c19.2.2,39.2,2,58,2l-2,12Z"/>
                {/* st16 - METALL highlight */}
                <path fill={cc.metalHighlight} d="M1012.9,722.3c-39.3.5-78.7.2-118,0l2-12c37.7,0,77.8-1.2,116-2v14Z"/>
                {/* st0 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M1154.9,724.3c.6-.2,1.4.1,2,0l-1,2-1-2Z"/>
                {/* st12 - Körper mittel-dunkel */}
                <path fill={cc.mediumDark} d="M120.9,368.3h-3.8c0-.1-2.2-8-2.2-8,6.9-24,13-42.5,27.1-63.9l8.9-8.1c-13.3,25.2-24.5,51.8-30,80Z"/>
                {/* st0 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M1230.9,686.3c-4.3,1-9.7,6.8-12,2,2.1-1,5.5-3.8,10-6l2,4Z"/>
                {/* st23 - Körper dunkel */}
                <path fill={cc.dark} d="M1230.9,686.3l-2-4c1.6-.8,3-3.4,6-4-.2,2.1.6,2.8,2,4s2.5,2.1,4,2v2c-3.1.5-7.2-.6-10,0Z"/>
                {/* st0 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M1236.9,682.3c-1.4-1.2-2.2-1.9-2-4,1.7-.4,4.1.2,6,0v2c-1.4.5-2.6,1.4-4,2Z"/>
                {/* st7 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M156.9,278.3c2.1-3.6,2.3-11.1,8-10-2.4,3.5-4.1,7.9-8,10Z"/>
                {/* st2 - METALL mittel */}
                <path fill={cc.metalMedium} d="M1260.9,666.3c1.3-7.3-4.6-4-4-12s2.8-4.5,0-12-1.9-4.5-4-6c9.6-3.5,22.9-10.5,32.2-3.2,11.2,8.8,3.7,23.8-6.2,30s-10.1,1.4-17.9,3.1Z"/>
                {/* st14 - Körper dunkel */}
                <path fill={cc.dark} d="M1214.9,624.3l-8-6c9.8-5.4,17,1.3,25,0-3.2,9.4,10.2,7.1,6,16l-64.1,31.9c.5-26.5,10.9-48,41-42Z"/>
                {/* st5 - METALL hell/bright */}
                <path fill={cc.metalBright} d="M608.9,704.3c-11.6-.3-24-1.7-36-2s-14.7.1-22,0-34.1,3.4-34.1-7,10-3,15-2.9c24.4.7,48.7,1.3,73.1,1.9l4,10Z"/>
                {/* st26 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M370.9,678.3c1.1,5.8-3.1,4.3-6.9,4-92.6-7.1-174.2-62.8-217.1-144h6c51.8,89.8,121.4,120.1,218,140Z"/>
                {/* st26 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M506.9,620.3c-25.3,26.2-46.5,47.8-83.9,57.1-9.2,2.3-29,7.9-36.1.9,6.5-.4,26.8-5.1,34-7,35.1-9.3,59-32.7,86-55,0,1.3,0,2.7,0,4Z"/>
                {/* st0 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M392.9,162.3c-6,.9-12.3-.4-18-2l2-2c2.2.6,13.2.4,16,0v4Z"/>
                {/* st22 - Körper dunkel */}
                <path fill={cc.dark} d="M374.9,160.3c-3.9-1.1-4.9-.7-8-4v-6c3,.9,8.2,7.5,10,8l-2,2Z"/>
                {/* st26 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M382.9,678.3v4s-6.9,0-6.9,0l-1.1-4c.8,0,7.6,0,8,0Z"/>
                {/* st0 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M366.9,150.3v6c-2.3-2.4-5.5-8.7-6-12h6c0,2,0,4,0,6Z"/>
                {/* st7 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M152.9,538.3h-6c-.7-1.3-1.3-2.7-2-4h4s0-4,0-4l4,8Z"/>
                {/* st22 - Körper dunkel */}
                <path fill={cc.dark} d="M392.9,162.3v-4c.3,0,5.7-1.9,6-2v2c-1.2,3.1-3,3.6-6,4Z"/>
                {/* st7 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M506.9,620.3c0-1.3,0-2.7,0-4s-.2-1.5,0-2h6c-2,2-4.1,4-6,6Z"/>
                {/* st22 - Körper dunkel */}
                <path fill={cc.dark} d="M404.9,158.3c.2,0,3-4,4-1v3s-4,0-4,0v-2Z"/>
                {/* st2 - METALL mittel */}
                <path fill={cc.metalMedium} d="M360.9,136.3l-2-2c1.5-2.1,2.8-4.3,5-6l.9.9c-.8,1.8-3.7,5.7-4,7Z"/>
                {/* st18 - METALL hell/bright */}
                <path fill={cc.metalBright} d="M1148.9,78.3c-54.2-4.7-108.7-4.3-163.1-5.9-136.2-4.1-275.8-11.5-412-2.2-48.4,3.3-72.1,16-114.9,34.1-13.2,5.6-28.5,14.6-42,15,1.6-1.8,3.3-3.3,5.3-4.7,37.6-25.5,104.5-51.3,149.7-54.3,172.2-11.5,353.6.6,525.9,6.1,15.8.5,33.8-1.6,49.1,0s3.4,7.9,2,12Z"/>
                {/* st8 - METALL mittel */}
                <path fill={cc.metalMediumLight} d="M404.9,150.3c-2.2,1-4.6,5.3-6,6s-5.7,2-6,2c-2.8.4-13.8.6-16,0s-7-7.1-10-8c0-2,0-4,0-6,.1-3.9-1.4-10.2,2-13,14.2-4,28.7-8.6,42-15-7,12.7-14.4,18.9-6,34Z"/>
                {/* st10 - Körper dunkel */}
                <path fill={cc.dark} d="M478.9,152.3c-6.5,4.6-17,7.5-24.9,8.1s-33.9-.8-24.9-12.9c4-5.3,31.5-17,39.8-21.2,4.3,2.6,8.8,4.7,14,4-.9,7.3.9,14.9-4,22Z"/>
                {/* st12 - Körper mittel-dunkel */}
                <path fill={cc.mediumDark} d="M478.9,152.3c4.9-7.1,3.1-14.7,4-22s3.9-7.5,2-12c3-1.2,5.8-4.7,10-4,.6,12.2-5.7,30.8-16,38Z"/>
                {/* st7 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M482.9,130.3c-5.2.7-9.7-1.4-14-4,5.9-3,9.2-5.3,16-8,1.9,4.5-1.7,9.4-2,12Z"/>
                {/* st0 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M1112.9,720.3c1.1,6.2-3.1,3.7-6.9,4-14.2,1.2-27.9,2.6-42.2,2s-8,2.1-6.9-4c17.7-.5,37.7-1.2,56-2Z"/>
                {/* st0 - Körper sehr dunkel */}
                <path fill={cc.veryDark} d="M1144.9,716.3c1.1,5.1-2.5,4.3-6,4.9-5.1.9-10.8,1.5-16,2.2s-7,3.3-6.1-3.1c8.7-.4,18.5-3.5,28-4Z"/>
              </g>
            </g>
          );
        })()}

        {/* === TEXT BEREICH (rechts vom Logo, innerhalb der Hauptfläche) === */}
        <foreignObject x={textX} y={textY} width={textMaxWidth} height="800">
          <div style={{
            color: textColor,
            fontFamily: fontFamily,
            width: '100%',
            maxWidth: `${textMaxWidth}px`
          }}>
            {/* Zeile 1 - Große Schrift (konfigurierbar) */}
            <div style={{
              fontSize: textLine1.length > 25 ? "92px" : textLine1.length > 18 ? "108px" : "124px",
              fontWeight: "bold",
              lineHeight: "1.15",
              marginBottom: "15px",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              maxWidth: `${textMaxWidth}px`
            }}>
              {textLine1 || 'Sylter Bankquischer'}
            </div>

            {/* Zeile 2 - Kleine Schrift (konfigurierbar) */}
            <div style={{
              fontSize: textLine2.length > 35 ? "68px" : "80px",
              fontStyle: "italic",
              lineHeight: "1.2",
              marginBottom: "15px",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              maxWidth: `${textMaxWidth}px`
            }}>
              {textLine2 || 'Das Aufsaugwunder!'}
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
  const previewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedColor, setSelectedColor] = useState(colorPalette[2]); // Sonnengelb (147) als Default
  const [selectedCarabiner, setSelectedCarabiner] = useState(carabinerColors[1]); // Blau als Default
  const [selectedTextColor, setSelectedTextColor] = useState(textColors[0]); // Weiß als Default
  const [textLine1, setTextLine1] = useState('');
  const [textLine2, setTextLine2] = useState('');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoFileName, setLogoFileName] = useState<string>('');
  const [logoRotation, setLogoRotation] = useState(0); // 0, 90, 180, 270 Grad
  const [contactEmail, setContactEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [quantity, setQuantity] = useState('1000');
  const [message, setMessage] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showBackSide, setShowBackSide] = useState(false);
  const [selectedFont, setSelectedFont] = useState(fontOptions[0]); // Klassisch (Serif) als Default

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Screenshot der Vorschau erstellen
      let screenshotDataUrl = '';
      if (previewRef.current) {
        try {
          screenshotDataUrl = await toPng(previewRef.current, {
            quality: 0.95,
            pixelRatio: 2,
          });
        } catch (err) {
          console.error('Screenshot konnte nicht erstellt werden:', err);
        }
      }

      // Konfigurationsdaten zusammenstellen
      const configData = {
        contactEmail,
        companyName,
        quantity,
        message,
        selectedColor: selectedColor.name,
        selectedColorHex: selectedColor.hex,
        selectedColorCode: selectedColor.code,
        selectedCarabiner: selectedCarabiner.name,
        selectedCarabinerHex: selectedCarabiner.hex,
        selectedTextColor: selectedTextColor.name,
        selectedFont: selectedFont.name,
        selectedFontFamily: selectedFont.family,
        textLine1,
        textLine2,
        logoFileName,
        logoRotation,
        screenshot: screenshotDataUrl,
      };

      // API-Anfrage senden
      const response = await fetch('/api/configurator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(configData),
      });

      if (response.ok) {
        alert(`Vielen Dank für Ihre Anfrage!\n\nFarbe: ${selectedColor.name}\nSchriftart: ${selectedFont.name}\nKarabiner: ${selectedCarabiner.name}\nText: ${textLine1} / ${textLine2}\nMenge: ${quantity} Stück\n\nWir melden uns zeitnah bei Ihnen.`);
      } else {
        throw new Error('Fehler beim Senden der Anfrage');
      }
    } catch (error) {
      console.error('Fehler:', error);
      alert('Leider ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt.');
    } finally {
      setIsSubmitting(false);
    }
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
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Live-Vorschau
                </h3>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowBackSide(false)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      !showBackSide
                        ? 'bg-[#2E5A4B] text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Vorderseite
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBackSide(true)}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      showBackSide
                        ? 'bg-[#2E5A4B] text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Rückseite
                  </button>
                </div>
              </div>
              <div ref={previewRef} className="bg-white rounded-xl p-4">
                <BankquischerPreview
                  color={selectedColor.hex}
                  textLine1={textLine1}
                  textLine2={textLine2}
                  logoUrl={logoUrl}
                  carabinerColor={selectedCarabiner.hex}
                  textColor={selectedTextColor.hex}
                  showBack={showBackSide}
                  logoRotation={logoRotation}
                  fontFamily={selectedFont.family}
                />
              </div>
              <p className="text-center text-gray-500 text-sm mt-4">
                Farbe: {selectedColor.name} • Schrift: {selectedFont.name} • {showBackSide ? 'Rückseite' : 'Vorderseite'}
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
                  <p className={`text-xs mt-1 ${textLine1.length >= 25 ? 'text-orange-500' : 'text-gray-500'}`}>
                    {textLine1.length}/30 Zeichen
                    {textLine1.length > 18 && textLine1.length <= 25 && ' (wird 2-zeilig dargestellt)'}
                    {textLine1.length > 25 && ' (Maximum fast erreicht!)'}
                  </p>
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
                  <p className={`text-xs mt-1 ${textLine2.length >= 35 ? 'text-orange-500' : 'text-gray-500'}`}>
                    {textLine2.length}/40 Zeichen
                    {textLine2.length > 35 && ' (Maximum fast erreicht!)'}
                  </p>
                </div>

                {/* Schriftart-Auswahl */}
                <div className="mt-4">
                  <label className="block text-xs text-gray-500 mb-2">Schriftart wählen</label>
                  <div className="grid grid-cols-2 gap-2">
                    {fontOptions.map((font) => (
                      <button
                        key={font.id}
                        type="button"
                        onClick={() => setSelectedFont(font)}
                        className={`px-3 py-2 rounded-lg border-2 transition-all text-left ${
                          selectedFont.id === font.id
                            ? 'border-[#2E5A4B] bg-[#2E5A4B]/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span
                          style={{ fontFamily: font.family }}
                          className="text-lg font-medium"
                        >
                          {font.preview}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">{font.name}</span>
                      </button>
                    ))}
                  </div>
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
                <div className="mt-2 flex items-center justify-between">
                  {logoFileName ? (
                    <p className="text-sm text-[#2E5A4B] flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {logoFileName}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500">Logo-Bereich drehen:</p>
                  )}
                  <button
                    type="button"
                    onClick={() => setLogoRotation((prev) => (prev + 90) % 360)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    title="Logo um 90° drehen"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Drehen ({logoRotation}°)
                  </button>
                </div>
              </div>

              {/* 3. Farbauswahl */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  3. Tuchfarbe wählen
                </label>
                <p className="text-xs text-gray-500 mb-2">Standard-Tuchfarbe: Gelb (nicht konfigurierbar für Einzelbestellungen)</p>
                <div className="grid gap-1 p-3 bg-gray-50 rounded-xl" style={{ gridTemplateColumns: 'repeat(10, minmax(0, 1fr))' }}>
                  {colorPalette.map((color) => {
                    // Bestimme ob die Nummer hell oder dunkel sein soll basierend auf der Hintergrundfarbe
                    const rgb = hexToRgb(color.hex);
                    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
                    const textColorClass = luminance > 0.5 ? 'text-gray-700' : 'text-white';

                    return (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`relative w-8 h-8 rounded transition-all hover:scale-110 flex items-center justify-center ${
                          selectedColor.id === color.id
                            ? 'ring-2 ring-offset-1 ring-[#2E5A4B] scale-110'
                            : 'ring-1 ring-gray-300'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={`${color.name} (${color.code})`}
                      >
                        <span className={`text-[9px] font-semibold ${textColorClass}`}>
                          {color.code}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Schriftfarbe */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  4. Schriftfarbe wählen
                </label>
                <div className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                  {textColors.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedTextColor(color)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        selectedTextColor.id === color.id
                          ? 'ring-2 ring-[#2E5A4B] bg-white shadow-sm'
                          : 'bg-white/50 hover:bg-white'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full ring-1 ring-gray-300"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-sm font-medium text-gray-700">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 5. Karabiner-Farbauswahl */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  5. Karabiner-Farbe wählen
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

              {/* Datenschutz-Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  required
                  className="mt-1 w-4 h-4 text-[#2E5A4B] border-gray-300 rounded focus:ring-[#2E5A4B]"
                />
                <label htmlFor="privacy" className="text-sm text-gray-600">
                  Ich habe die{' '}
                  <a href="/datenschutz" className="text-[#2E5A4B] underline hover:text-[#234539]">
                    Datenschutzerklärung
                  </a>{' '}
                  gelesen und bin mit der Verarbeitung meiner Daten einverstanden. *
                </label>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={!isSubmitting && privacyAccepted ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting && privacyAccepted ? { scale: 0.98 } : {}}
                disabled={!privacyAccepted || isSubmitting}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg flex items-center justify-center gap-2 ${
                  privacyAccepted && !isSubmitting
                    ? 'bg-[#2E5A4B] text-white hover:bg-[#234539] shadow-[#2E5A4B]/20'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-gray-200'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Wird gesendet...
                  </>
                ) : (
                  'Unverbindlich anfragen'
                )}
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
