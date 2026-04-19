import "dotenv/config";

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

/** Uses Resend HTTP API directly — no `resend` npm package (avoids Vercel MODULE_NOT_FOUND). */
async function sendViaResendApi(params: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${params.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: params.from,
      to: [params.to],
      subject: params.subject,
      text: params.text,
      html: params.html,
    }),
  });

  if (res.ok) {
    return;
  }

  const raw = await res.text();
  let detail = raw;
  try {
    const errJson = JSON.parse(raw) as { message?: string };
    detail = errJson.message ?? raw;
  } catch {
    /* keep raw body */
  }
  throw new Error(`resend_api_${res.status}: ${detail || res.statusText}`);
}

export async function sendContactEmail(rawBody: unknown): Promise<void> {
  const payload = assertContactPayload(rawBody);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("missing_resend_api_key");
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "kube8eliyahu@gmail.com";
  const from = process.env.RESEND_FROM ?? "Kube Eliyahu <onboarding@resend.dev>";

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

  await sendViaResendApi({
    apiKey,
    from,
    to,
    subject,
    text,
    html,
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
