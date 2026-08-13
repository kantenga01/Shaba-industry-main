import { supabase } from "@/integrations/supabase/client";

export type QuoteInput = {
  name: string;
  company?: string | undefined;
  phone: string;
  email: string;
  service: string;
  message: string;
};

export async function submitQuote(input: QuoteInput) {
  const { error } = await supabase.from("quote_requests").insert({
    name: input.name,
    company: input.company ?? null,
    phone: input.phone,
    email: input.email,
    service: input.service,
    message: input.message,
  });
  if (error) throw error;
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
  if (error) throw error;
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
  if (error) throw error;
}
