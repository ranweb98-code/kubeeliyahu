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

  const sentAt = new Intl.DateTimeFormat("he-IL", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Jerusalem",
  }).format(new Date());

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  const html = `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f4f7f5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f7f5;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(31,81,65,0.10);font-family:Arial,Helvetica,sans-serif;">

        <tr><td style="background-color:#1F5141;padding:28px 32px;text-align:right;">
          <div style="color:#ffffff;font-size:22px;font-weight:bold;">קובה אליהו</div>
          <div style="color:#cfe0d8;font-size:14px;margin-top:4px;">פנייה חדשה מטופס יצירת הקשר באתר</div>
          <div style="height:3px;width:64px;background-color:#D1A639;margin-top:14px;border-radius:2px;"></div>
        </td></tr>

        <tr><td style="padding:20px 32px 0;text-align:right;">
          <span style="display:inline-block;background:#f0f4f1;color:#1F5141;font-size:12px;font-weight:bold;padding:6px 12px;border-radius:999px;">${escapeHtml(sentAt)}</span>
        </td></tr>

        <tr><td style="padding:20px 32px 0;text-align:right;color:#1a1a1a;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;">
            <tr>
              <td style="padding:8px 0;color:#6b7c74;width:90px;vertical-align:top;">שם</td>
              <td style="padding:8px 0;font-weight:bold;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#6b7c74;vertical-align:top;">אימייל</td>
              <td style="padding:8px 0;font-weight:bold;" dir="ltr"><a href="mailto:${safeEmail}" style="color:#1F5141;text-decoration:none;">${safeEmail}</a></td>
            </tr>
          </table>
        </td></tr>

        <tr><td style="padding:16px 32px 0;text-align:right;">
          <div style="color:#6b7c74;font-size:13px;font-weight:bold;margin-bottom:8px;">הודעה</div>
          <div style="background:#f7faf8;border:1px solid #e6ede9;border-radius:12px;padding:16px 18px;color:#1a1a1a;font-size:15px;line-height:1.7;white-space:pre-wrap;">${safeMessage}</div>
        </td></tr>

        <tr><td style="padding:24px 32px 8px;text-align:right;">
          <a href="mailto:${safeEmail}" style="display:inline-block;background-color:#D1A639;color:#1a1a1a;font-size:15px;font-weight:bold;text-decoration:none;padding:12px 28px;border-radius:999px;">השב לפונה ←</a>
        </td></tr>

        <tr><td style="padding:20px 32px 28px;text-align:right;">
          <hr style="border:none;border-top:1px solid #eef2ef;margin:0 0 14px;">
          <div style="color:#9aa8a1;font-size:12px;line-height:1.6;">הודעה זו נשלחה אוטומטית מטופס יצירת הקשר באתר <a href="https://kubeeliyahu.com" style="color:#1F5141;text-decoration:none;">kubeeliyahu.com</a>. ניתן להשיב ישירות לפונה בלחיצה על "השב".</div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();

  const text = `פנייה חדשה מאתר קובה אליהו\n${sentAt}\n\nשם: ${name}\nאימייל: ${email}\n\nהודעה:\n${message}`;

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
      text,
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
