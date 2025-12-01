import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";

const About = () => {
  const benefits = [
    "Hochwertige Thule Dachboxen",
    "Einfache Online-Buchung",
    "Flexible Mietzeiten",
    "TÜV-zertifizierte Ausrüstung",
    "Kostenlose Montage",
    "Faire Preise",
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-secondary/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              Über uns
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Ihr zuverlässiger Partner für die Dachbox-Vermietung in
              Deutschland.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                Unsere Geschichte
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  Was als kleine Idee begann, ist heute ein zuverlässiger
                  Service für alle, die mehr Stauraum für ihre Reisen benötigen.
                  Wir wissen aus eigener Erfahrung, wie wichtig zusätzlicher
                  Platz im Urlaub sein kann – ob für Skiausrüstung, Camping-Gear
                  oder einfach das Gepäck der ganzen Familie.
                </p>
                <p>
                  Deshalb haben wir uns darauf spezialisiert, hochwertige Thule
                  Dachboxen zu fairen Konditionen zu vermieten. Unsere Boxen
                  werden regelmäßig gewartet und sind immer in einwandfreiem
                  Zustand, wenn Sie sie abholen.
                </p>
                <p>
                  Unser Ziel ist es, Ihnen den Start in den Urlaub so einfach
                  wie möglich zu machen. Keine versteckten Kosten, keine
                  komplizierten Verträge – einfach buchen, abholen und losfahren.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-t border-border bg-secondary/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                Warum IQTechBox?
              </h2>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 shrink-0 text-accent" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-display text-3xl font-semibold tracking-tight">
                Unsere Mission
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                „Wir möchten, dass Sie sich auf das konzentrieren können, was
                wirklich zählt: Ihre Reise und die Zeit mit Ihren Liebsten.
                Um den Rest kümmern wir uns."
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
