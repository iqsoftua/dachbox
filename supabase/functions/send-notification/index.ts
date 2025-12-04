import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactNotification {
  type: "contact";
  name: string;
  email: string;
  message: string;
}

interface RentalNotification {
  type: "rental";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  productName: string;
  startDate: string;
  endDate: string;
  days: number;
  totalPrice: number;
}

type NotificationRequest = ContactNotification | RentalNotification;

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: NotificationRequest = await req.json();
    console.log("Sending notification:", data);

    let subject: string;
    let html: string;

    if (data.type === "contact") {
      subject = `Neue Kontaktanfrage von ${data.name}`;
      html = `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>E-Mail:</strong> ${data.email}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `;
    } else {
      subject = `Neue Mietanfrage: ${data.productName}`;
      html = `
        <h2>Neue Mietanfrage</h2>
        <p><strong>Produkt:</strong> ${data.productName}</p>
        <p><strong>Zeitraum:</strong> ${data.startDate} bis ${data.endDate} (${data.days} Tage)</p>
        <p><strong>Gesamtpreis:</strong> ${data.totalPrice}€</p>
        <hr>
        <h3>Kundendaten:</h3>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>E-Mail:</strong> ${data.email}</p>
        <p><strong>Telefon:</strong> ${data.phone}</p>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "Dachbox Anfragen <anfragen@iqtechbox.de>",
      to: ["dachbox@iqtechbox.de"],
      subject,
      html,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
