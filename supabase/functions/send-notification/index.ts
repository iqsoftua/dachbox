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

/**
 * Escapes HTML entities to prevent XSS attacks in email content.
 * This ensures user-provided content is safely displayed as text.
 */
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}

/**
 * Validates email format using a basic regex pattern.
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

/**
 * Validates and sanitizes the notification request.
 */
function validateRequest(data: NotificationRequest): { valid: boolean; error?: string } {
  if (data.type === "contact") {
    if (!data.name || data.name.length > 100) {
      return { valid: false, error: "Invalid name (max 100 characters)" };
    }
    if (!isValidEmail(data.email)) {
      return { valid: false, error: "Invalid email address" };
    }
    if (!data.message || data.message.length > 5000) {
      return { valid: false, error: "Invalid message (max 5000 characters)" };
    }
  } else if (data.type === "rental") {
    if (!data.firstName || data.firstName.length > 100) {
      return { valid: false, error: "Invalid first name" };
    }
    if (!data.lastName || data.lastName.length > 100) {
      return { valid: false, error: "Invalid last name" };
    }
    if (!isValidEmail(data.email)) {
      return { valid: false, error: "Invalid email address" };
    }
    if (!data.phone || data.phone.length > 30) {
      return { valid: false, error: "Invalid phone number" };
    }
    if (!data.productName || data.productName.length > 200) {
      return { valid: false, error: "Invalid product name" };
    }
  } else {
    return { valid: false, error: "Invalid notification type" };
  }
  return { valid: true };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: NotificationRequest = await req.json();
    console.log("Processing notification request");

    // Validate input data
    const validation = validateRequest(data);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    let subject: string;
    let html: string;

    if (data.type === "contact") {
      // Escape all user-provided content to prevent XSS
      const safeName = escapeHtml(data.name);
      const safeEmail = escapeHtml(data.email);
      const safeMessage = escapeHtml(data.message).replace(/\n/g, '<br>');
      
      subject = `Neue Kontaktanfrage von ${safeName}`;
      html = `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>E-Mail:</strong> ${safeEmail}</p>
        <p><strong>Nachricht:</strong></p>
        <p>${safeMessage}</p>
      `;
    } else {
      // Escape all user-provided content to prevent XSS
      const safeProductName = escapeHtml(data.productName);
      const safeFirstName = escapeHtml(data.firstName);
      const safeLastName = escapeHtml(data.lastName);
      const safeEmail = escapeHtml(data.email);
      const safePhone = escapeHtml(data.phone);
      const safeStartDate = escapeHtml(data.startDate);
      const safeEndDate = escapeHtml(data.endDate);
      
      subject = `Neue Mietanfrage: ${safeProductName}`;
      html = `
        <h2>Neue Mietanfrage</h2>
        <p><strong>Produkt:</strong> ${safeProductName}</p>
        <p><strong>Zeitraum:</strong> ${safeStartDate} bis ${safeEndDate} (${data.days} Tage)</p>
        <p><strong>Gesamtpreis:</strong> ${data.totalPrice}€</p>
        <hr>
        <h3>Kundendaten:</h3>
        <p><strong>Name:</strong> ${safeFirstName} ${safeLastName}</p>
        <p><strong>E-Mail:</strong> ${safeEmail}</p>
        <p><strong>Telefon:</strong> ${safePhone}</p>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "Dachbox Anfragen <anfragen@iqtechbox.de>",
      to: ["dachbox@iqtechbox.de"],
      subject,
      html,
    });

    console.log("Email sent successfully");

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    // Log error details server-side, return generic message to client
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process notification" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
