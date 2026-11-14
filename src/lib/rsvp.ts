import type { GoogleFormConfig } from "./site";

export type RsvpAnswers = {
  name: string;
  contact: string;
  email: string;
  attending: "yes" | "no";
  message: string;
};

export function isFormConfigured(form: GoogleFormConfig): boolean {
  if (form.actionUrl.includes("YOUR_FORM_ID")) return false;
  return Object.values(form.entries).every((id) => !id.includes("XXXX"));
}

export function buildRsvpBody(a: RsvpAnswers, form: GoogleFormConfig): URLSearchParams {
  const body = new URLSearchParams();
  body.set(form.entries.name, a.name.trim());
  body.set(form.entries.contact, a.contact.trim());
  body.set(form.entries.email, a.email.trim());
  body.set(form.entries.attending, form.attendingLabels[a.attending]);
  body.set(form.entries.message, a.message.trim());
  return body;
}

export async function submitRsvp(
  a: RsvpAnswers,
  form: GoogleFormConfig,
  fetchImpl: typeof fetch = fetch,
): Promise<"sent" | "skipped"> {
  if (!isFormConfigured(form)) {
    console.warn("RSVP form is not configured; response was not sent.", buildRsvpBody(a, form).toString());
    return "skipped";
  }
  await fetchImpl(form.actionUrl, { method: "POST", mode: "no-cors", body: buildRsvpBody(a, form) });
  return "sent";
}
