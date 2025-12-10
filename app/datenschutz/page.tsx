import Link from 'next/link';

export default function Datenschutz() {
  return (
    <main className="min-h-screen bg-white py-24">
      <div className="max-w-3xl mx-auto px-6">
        <Link href="/" className="text-[#2E5A4B] hover:underline mb-8 inline-block">
          &larr; Zurück zur Startseite
        </Link>

        <h1 className="text-4xl font-heading font-semibold text-gray-900 mb-8">Datenschutzerklärung</h1>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Datenschutz auf einen Blick</h2>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Allgemeine Hinweise</h3>
            <p className="text-gray-700">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Verantwortliche Stelle</h2>
            <p className="text-gray-700">
              RADEJOKO GmbH<br />
              Im Feldgarten 11<br />
              D-56379 Scheidt<br /><br />
              Telefon: +49 160 6840983<br />
              E-Mail: info@radejoko.de
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Datenerfassung auf unserer Website</h2>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Wer ist verantwortlich für die Datenerfassung?</h3>
            <p className="text-gray-700 mb-4">
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
            </p>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Wie erfassen wir Ihre Daten?</h3>
            <p className="text-gray-700 mb-4">
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
            </p>
            <p className="text-gray-700">
              Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Ihre Rechte</h2>
            <p className="text-gray-700">
              Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Hosting</h2>
            <p className="text-gray-700">
              Diese Website wird bei einem externen Dienstleister gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Kontaktformular</h2>
            <p className="text-gray-700">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. SSL-Verschlüsselung</h2>
            <p className="text-gray-700">
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von &quot;http://&quot; auf &quot;https://&quot; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
