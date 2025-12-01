import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-secondary/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              Datenschutzerklärung
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Informationen zur Verarbeitung Ihrer personenbezogenen Daten.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="prose prose-neutral mx-auto max-w-3xl">
              <h2 className="font-display text-2xl font-semibold">
                1. Verantwortlicher
              </h2>
              <p className="text-muted-foreground">
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
              </p>
              <p className="text-muted-foreground">
                IQTechBox – Denys Makarenko
                <br />
                Demmeringstraße 74
                <br />
                04177 Leipzig
                <br />
                E-Mail: nktkiev@gmail.com
                <br />
                Telefon: +49 171 8177236
              </p>

              <h2 className="mt-8 font-display text-2xl font-semibold">
                2. Erhebung und Speicherung personenbezogener Daten
              </h2>
              <p className="text-muted-foreground">
                Beim Besuch unserer Website werden automatisch Informationen
                allgemeiner Natur erfasst. Diese Informationen (Server-Logfiles)
                beinhalten etwa die Art des Webbrowsers, das verwendete
                Betriebssystem, den Domainnamen Ihres Internet-Service-Providers
                und ähnliches. Hierbei handelt es sich ausschließlich um
                Informationen, welche keine Rückschlüsse auf Ihre Person
                zulassen.
              </p>

              <h2 className="mt-8 font-display text-2xl font-semibold">
                3. Kontaktformular und Buchungsanfragen
              </h2>
              <p className="text-muted-foreground">
                Wenn Sie uns per Kontaktformular oder E-Mail kontaktieren oder
                eine Buchungsanfrage stellen, werden Ihre Angaben aus dem
                Anfrageformular inklusive der von Ihnen dort angegebenen
                Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von
                Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht
                ohne Ihre Einwilligung weiter.
              </p>
              <p className="text-muted-foreground">
                Die von Ihnen im Kontaktformular und bei Buchungsanfragen
                eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung
                auffordern, Ihre Einwilligung zur Speicherung widerrufen oder
                der Zweck für die Datenspeicherung entfällt.
              </p>

              <h2 className="mt-8 font-display text-2xl font-semibold">
                4. Ihre Rechte
              </h2>
              <p className="text-muted-foreground">
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über
                Herkunft, Empfänger und Zweck Ihrer gespeicherten
                personenbezogenen Daten zu erhalten. Sie haben außerdem ein
                Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
                Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie
                sich jederzeit an uns wenden.
              </p>

              <h2 className="mt-8 font-display text-2xl font-semibold">
                5. Cookies
              </h2>
              <p className="text-muted-foreground">
                Unsere Website verwendet Cookies. Das sind kleine Textdateien,
                die Ihr Webbrowser auf Ihrem Endgerät speichert. Cookies helfen
                uns dabei, unser Angebot nutzerfreundlicher, effektiver und
                sicherer zu machen. Einige Cookies sind "Session-Cookies" und
                werden nach Ende Ihrer Browser-Sitzung automatisch gelöscht.
              </p>

              <h2 className="mt-8 font-display text-2xl font-semibold">
                6. SSL-Verschlüsselung
              </h2>
              <p className="text-muted-foreground">
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
                Übertragung vertraulicher Inhalte, wie zum Beispiel
                Buchungsanfragen, die Sie an uns als Seitenbetreiber senden,
                eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung
                erkennen Sie daran, dass die Adresszeile des Browsers von
                "http://" auf "https://" wechselt und an dem Schloss-Symbol in
                Ihrer Browserzeile.
              </p>

              <h2 className="mt-8 font-display text-2xl font-semibold">
                7. Änderung der Datenschutzbestimmungen
              </h2>
              <p className="text-muted-foreground">
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen,
                damit sie stets den aktuellen rechtlichen Anforderungen
                entspricht oder um Änderungen unserer Leistungen in der
                Datenschutzerklärung umzusetzen. Für Ihren erneuten Besuch gilt
                dann die neue Datenschutzerklärung.
              </p>

              <p className="mt-8 text-sm text-muted-foreground">
                Stand: November 2024
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
