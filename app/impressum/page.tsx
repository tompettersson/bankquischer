import Link from 'next/link';

export default function Impressum() {
  return (
    <main className="min-h-screen bg-white py-24">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/" className="text-[#2E5A4B] hover:underline mb-8 inline-block">
          &larr; Zurück zur Startseite
        </Link>

        <h1 className="text-4xl font-heading font-semibold text-gray-900 mb-8">Impressum</h1>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Angaben gemäß § 5 TMG</h2>
            <p className="text-gray-700">
              RADEJOKO GmbH<br />
              Im Feldgarten 11<br />
              D-56379 Scheidt
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Vertreten durch</h2>
            <p className="text-gray-700">
              Geschäftsführerin: Dionysia A. van Herk
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Kontakt</h2>
            <p className="text-gray-700">
              Telefon: +49 160 6840983<br />
              E-Mail: info@radejoko.de
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Registereintrag</h2>
            <p className="text-gray-700">
              Eintragung im Handelsregister<br />
              Registergericht: Amtsgericht Montabaur<br />
              Registernummer: HRB 25009
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Umsatzsteuer-ID</h2>
            <p className="text-gray-700">
              Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
              DE305612848
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Exklusiv-Vertrieb</h2>
            <p className="text-gray-700">
              RADEJOKO GmbH
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Haftungsausschluss</h2>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Haftung für Inhalte</h3>
            <p className="text-gray-700 mb-4">
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Haftung für Links</h3>
            <p className="text-gray-700">
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
