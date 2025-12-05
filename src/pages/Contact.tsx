import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("=== CONTACT FORM SUBMIT START ===");
    setIsSubmitting(true);

    try {
      console.log("Inserting contact message...", { name, email, message });
      const { error } = await supabase.from("contact_messages").insert({
        name,
        email,
        message,
        status: "new",
      });
      console.log("Insert result, error:", error);

      if (error) {
        console.error("Error submitting contact message:", error);
        toast({
          title: "Fehler",
          description: "Ihre Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
          variant: "destructive",
        });
      } else {
        // Send email notification
        console.log("=== CONTACT INSERT SUCCESS, CALLING EDGE FUNCTION ===");
        alert("Kontakt gespeichert! Edge function wird aufgerufen...");
        try {
          const notificationData = {
            type: "contact" as const,
            name,
            email,
            message,
          };
          console.log("Calling send-notification with:", notificationData);
          const { data, error: fnError } = await supabase.functions.invoke("send-notification", {
            body: notificationData,
          });
          console.log("=== EMAIL RESULT ===", { data, fnError });
          if (fnError) {
            console.error("Edge function error:", fnError);
            alert("Edge function Fehler: " + JSON.stringify(fnError));
          } else {
            alert("Email erfolgreich gesendet! ID: " + JSON.stringify(data));
          }
        } catch (err: any) {
          console.error("Email notification error:", err);
          alert("Catch Error: " + (err?.message || err));
        }

        toast({
          title: "Nachricht gesendet!",
          description: "Wir melden uns so schnell wie möglich bei Ihnen.",
        });
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Fehler",
        description: "Ein unerwarteter Fehler ist aufgetreten.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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

                <p className="mt-4 text-sm font-medium text-foreground">
                  IQTechBox – Denys Makarenko
                </p>

                <div className="mt-6 space-y-6">
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
                        href="tel:+491718177236"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        +49 171 8177236
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
                        Demmeringstraße 74
                        <br />
                        04177 Leipzig
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
