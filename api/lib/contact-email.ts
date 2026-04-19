import "dotenv/config";
import { Resend } from "resend";

export type ContactPayload = {
  name: string;
  phone: string;
  message: string;
};

function assertContactPayload(body: unknown): ContactPayload {
  if (!body || typeof body !== "object") {
    throw new Error("invalid_payload");
  }
  const { name, phone, message } = body as Record<string, unknown>;
  if (typeof name !== "string" || !name.trim() || name.length > 100) {
    throw new Error("invalid_name");
  }
  if (typeof phone !== "string" || !/^[\d\-+() ]{7,15}$/.test(phone.trim())) {
    throw new Error("invalid_phone");
  }
  if (typeof message !== "string" || !message.trim() || message.length > 1000) {
    throw new Error("invalid_message");
  }
  return {
    name: name.trim(),
    phone: phone.trim(),
    message: message.trim(),
  };
}

export async function sendContactEmail(rawBody: unknown): Promise<void> {
  const payload = assertContactPayload(rawBody);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("missing_resend_api_key");
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "kube8eliyahu@gmail.com";
  const from = process.env.RESEND_FROM ?? "Kube Eliyahu <onboarding@resend.dev>";

  const resend = new Resend(apiKey);

  const subject = `פנייה מאתר — ${payload.name}`;
  const text = [
    `שם: ${payload.name}`,
    `טלפון: ${payload.phone}`,
    "",
    "הודעה:",
    payload.message,
  ].join("\n");

  const html = `
    <p><strong>שם:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>טלפון:</strong> ${escapeHtml(payload.phone)}</p>
    <p><strong>הודעה:</strong></p>
    <p>${escapeHtml(payload.message).replace(/\n/g, "<br/>")}</p>
  `;

  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject,
    text,
    html,
  });

  if (error) {
    throw new Error(error.message || "resend_error");
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
