import { supabase } from "@/integrations/supabase/client";
import { sendNotificationEmail } from "./email.functions";

export type QuoteAttachment = {
  filename: string;
  content: string;
  contentType: string;
};

export type QuoteInput = {
  name: string;
  company?: string | undefined;
  phone: string;
  email: string;
  service: string;
  message: string;
  attachments?: QuoteAttachment[];
};

export async function submitQuote(input: QuoteInput) {
  // 1. Enregistrer la demande dans Supabase
  const { error } = await supabase.from("quote_requests").insert({
    name: input.name,
    company: input.company ?? null,
    phone: input.phone,
    email: input.email,
    service: input.service,
    message: input.message,
  });

  if (error) {
    console.error("Erreur Supabase - devis :", error);
    throw error;
  }

  // 2. Envoyer la notification par email
  await sendNotificationEmail({
    data: {
      type: "quote",
      name: input.name,
      company: input.company,
      phone: input.phone,
      email: input.email,
      service: input.service,
      message: input.message,
      attachments: input.attachments ?? [],
    },
  });
}

export type ContactInput = {
  name: string;
  email: string;
  phone?: string | undefined;
  subject?: string | undefined;
  message: string;
};

export async function submitContact(input: ContactInput) {
  const { error } = await supabase.from("contact_messages").insert({
    name: input.name,
    email: input.email,
    phone: input.phone ?? null,
    subject: input.subject ?? null,
    message: input.message,
  });

  if (error) {
    console.error("Erreur Supabase - contact :", error);
    throw error;
  }

  await sendNotificationEmail({
    data: {
      type: "contact",
      name: input.name,
      email: input.email,
      phone: input.phone,
      message: input.message,
    },
  });
}

export type ApplicationInput = {
  name: string;
  email: string;
  phone?: string | undefined;
  position: string;
  message?: string | undefined;
  cv_url?: string | undefined;
};

export async function submitApplication(input: ApplicationInput) {
  const { error } = await supabase.from("job_applications").insert({
    name: input.name,
    email: input.email,
    phone: input.phone ?? null,
    position: input.position,
    message: input.message ?? null,
    cv_url: input.cv_url ?? null,
  });

  if (error) {
    console.error("Erreur Supabase - candidature :", error);
    throw error;
  }
}

export type NewsletterInput = {
  email: string;
};

export async function submitNewsletter(input: NewsletterInput) {
  await sendNotificationEmail({
    data: {
      type: "newsletter",
      email: input.email,
    },
  });
}