import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Nachricht gesendet!",
      description: "Wir melden uns so schnell wie möglich bei Ihnen.",
    });

    setName("");
    setEmail("");
    setMessage("");
    setIsSubmitting(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-secondary/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              Kontakt
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Haben Sie Fragen? Wir sind für Sie da und helfen Ihnen gerne
              weiter.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Contact Info */}
              <div>
                <h2 className="font-display text-2xl font-semibold">
                  So erreichen Sie uns
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Wir sind persönlich für Sie da. Rufen Sie uns an, schreiben
                  Sie uns eine E-Mail oder nutzen Sie das Kontaktformular.
                </p>

                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">E-Mail</h3>
                      <a
                        href="mailto:nktkiev@gmail.com"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        nktkiev@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Telefon</h3>
                      <a
                        href="tel:+491234567890"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        +49 123 456 7890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Adresse</h3>
                      <p className="text-muted-foreground">
                        Musterstraße 123
                        <br />
                        10115 Berlin
                        <br />
                        Deutschland
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-lg border border-border bg-secondary/30 p-6">
                  <h3 className="font-semibold">Öffnungszeiten</h3>
                  <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <p>Montag – Freitag: 9:00 – 18:00 Uhr</p>
                    <p>Samstag: 10:00 – 14:00 Uhr</p>
                    <p>Sonntag: Geschlossen</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="rounded-lg border border-border bg-card p-6 md:p-8">
                <h2 className="font-display text-2xl font-semibold">
                  Schreiben Sie uns
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Füllen Sie das Formular aus und wir melden uns bei Ihnen.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Ihr Name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="ihre@email.de"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Nachricht</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      placeholder="Ihre Nachricht..."
                      rows={5}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Wird gesendet...
                      </>
                    ) : (
                      "Nachricht senden"
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
