import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sendContactEmail } from "./lib/contact-email";

function setCors(res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "method_not_allowed" });
    return;
  }

  let body: unknown = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      res.status(400).json({ ok: false, error: "invalid_json" });
      return;
    }
  }

  try {
    await sendContactEmail(body);
    res.status(200).json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "unknown";
    if (msg.startsWith("invalid_") || msg === "invalid_payload") {
      res.status(400).json({ ok: false, error: msg });
      return;
    }
    if (msg === "missing_resend_api_key") {
      res.status(500).json({ ok: false, error: "missing_resend_api_key" });
      return;
    }
    console.error("[contact]", err);
    res.status(500).json({ ok: false, error: "send_failed" });
  }
}
