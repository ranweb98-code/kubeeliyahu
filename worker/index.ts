/// <reference types="@cloudflare/workers-types" />

interface Env {
  ASSETS: Fetcher;
  RESEND_API_KEY?: string;
}

const RECIPIENT = "kube8eliyahu@gmail.com";
const FROM = "קובה אליהו <noreply@kubeeliyahu.com>";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function getApiKey(env: Env): string | undefined {
  if (typeof process !== "undefined" && process.env && process.env.RESEND_API_KEY) {
    return process.env.RESEND_API_KEY;
  }
  return env.RESEND_API_KEY;
}

async function handleSend(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return json({ success: false, error: "method_not_allowed" }, 405);
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json({ success: false, error: "invalid_json" }, 400);
  }

  // Honeypot: real users leave this empty; bots tend to fill every field.
  if (typeof payload.company === "string" && payload.company.trim() !== "") {
    return json({ success: true });
  }

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const message = String(payload.message ?? "").trim();

  if (!name || !email || !message) {
    return json({ success: false, error: "missing_fields" }, 400);
  }
  if (name.length > 100 || email.length > 200 || message.length > 5000) {
    return json({ success: false, error: "too_long" }, 400);
  }
  if (!EMAIL_RE.test(email)) {
    return json({ success: false, error: "invalid_email" }, 400);
  }

  const apiKey = getApiKey(env);
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY");
    return json({ success: false, error: "server_misconfigured" }, 500);
  }

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#1a1a1a">
      <h2 style="margin:0 0 16px">פנייה חדשה מאתר קובה אליהו</h2>
      <p style="margin:0 0 8px"><strong>שם:</strong> ${escapeHtml(name)}</p>
      <p style="margin:0 0 8px"><strong>אימייל:</strong> ${escapeHtml(email)}</p>
      <p style="margin:16px 0 4px"><strong>הודעה:</strong></p>
      <p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>
  `.trim();

  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [RECIPIENT],
      reply_to: email,
      subject: `פנייה חדשה מאתר קובה אליהו — ${name}`,
      html,
    }),
  });

  if (!resendRes.ok) {
    const errText = await resendRes.text();
    console.error("Resend error:", resendRes.status, errText);
    return json({ success: false, error: "send_failed" }, 502);
  }

  return json({ success: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/send") {
      return handleSend(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
