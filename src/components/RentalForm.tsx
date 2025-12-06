import { useState, useEffect } from "react";
import { X, Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Product } from "./ProductCard";
import { differenceInDays, format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

interface RentalFormProps {
  product: Product | null;
  onClose: () => void;
}

const RentalForm = ({ product, onClose }: RentalFormProps) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalDays, setTotalDays] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = differenceInDays(end, start);
      if (days > 0) {
        setTotalDays(days);
        setTotalPrice(days * (product?.pricePerDay || 0));
      } else {
        setTotalDays(0);
        setTotalPrice(0);
      }
    } else {
      setTotalDays(0);
      setTotalPrice(0);
    }
  }, [startDate, endDate, product?.pricePerDay]);

  const submitForm = async () => {
    console.log("=== RENTAL FORM SUBMIT STARTED ===");
    alert("Form submit gestartet!");

    if (!privacyAccepted) {
      toast({
        title: "Fehler",
        description: "Bitte akzeptieren Sie die Datenschutzerklärung.",
        variant: "destructive",
      });
      return;
    }

    if (totalDays <= 0) {
      toast({
        title: "Fehler",
        description: "Bitte wählen Sie gültige Mietdaten.",
        variant: "destructive",
      });
      return;
    }

    if (!product) return;

    setIsSubmitting(true);

    try {
      // Save to database
      const { error } = await supabase.from("rental_requests").insert({
        product_id: product.id,
        product_name: product.name,
        start_date: startDate,
        end_date: endDate,
        days: totalDays,
        total_price: totalPrice,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        email: email,
        privacy_accepted: privacyAccepted,
        status: "pending",
      });

      if (error) {
        console.error("Error submitting rental request:", error);
        toast({
          title: "Fehler",
          description: "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      // Send email notification
      console.log("=== CALLING EDGE FUNCTION ===");
      const notificationData = {
        type: "rental" as const,
        firstName,
        lastName,
        email,
        phone,
        productName: product.name,
        startDate,
        endDate,
        days: totalDays,
        totalPrice,
      };
      
      const { data, error: fnError } = await supabase.functions.invoke("send-notification", {
        body: notificationData,
      });
      
      console.log("=== EMAIL RESULT ===", { data, fnError });
      
      if (fnError) {
        console.error("Edge function error:", fnError);
        alert("Email Fehler: " + JSON.stringify(fnError));
      } else {
        alert("Email gesendet! " + JSON.stringify(data));
      }

      toast({
        title: "Vielen Dank!",
        description: "Wir bearbeiten Ihre Anfrage und melden uns in Kürze bei Ihnen.",
      });
      onClose();
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

  if (!product) return null;

  const today = format(new Date(), "yyyy-MM-dd");

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-foreground/20 backdrop-blur-sm">
      <div className="h-full w-full max-w-lg animate-slide-in-right overflow-y-auto bg-background p-6 shadow-2xl md:p-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-display text-2xl font-semibold">
              Dachbox mieten
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {product.name}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Form */}
        <div className="mt-8 space-y-6">
          {/* Selected Product */}
          <div className="rounded-lg border border-border bg-secondary/30 p-4">
            <div className="flex items-center gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="h-16 w-20 rounded object-contain"
              />
              <div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {product.pricePerDay}€ / Tag
                </p>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Startdatum</Label>
              <div className="relative">
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  min={today}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Enddatum</Label>
              <div className="relative">
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  min={startDate || today}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Price Calculation */}
          {totalDays > 0 && (
            <div className="rounded-lg border border-accent/30 bg-accent/5 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Mietdauer</span>
                <span className="font-medium">{totalDays} Tage</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span className="font-semibold">Gesamtpreis</span>
                <span className="text-xl font-bold">{totalPrice}€</span>
              </div>
            </div>
          )}

          {/* Personal Info */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">Vorname</Label>
              <Input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="Max"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nachname</Label>
              <Input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Mustermann"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefonnummer</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="+49 171 8177236"
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
              placeholder="max@example.de"
            />
          </div>

          {/* Privacy Checkbox */}
          <div className="flex items-start gap-3">
            <Checkbox
              id="privacy"
              checked={privacyAccepted}
              onCheckedChange={(checked) =>
                setPrivacyAccepted(checked as boolean)
              }
              className="mt-0.5"
            />
            <Label
              htmlFor="privacy"
              className="text-sm font-normal leading-relaxed text-muted-foreground"
            >
              Ich stimme der Verarbeitung meiner personenbezogenen Daten gemäß
              der{" "}
              <a
                href="/datenschutz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline"
                onClick={(e) => e.stopPropagation()}
              >
                Datenschutzerklärung
              </a>{" "}
              zu.
            </Label>
          </div>

          {/* Submit */}
          <Button
            type="button"
            className="w-full"
            disabled={isSubmitting || !privacyAccepted || totalDays <= 0}
            onClick={() => submitForm()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Wird gesendet...
              </>
            ) : (
              "Anfrage senden"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RentalForm;
