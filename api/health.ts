import type { VercelRequest, VercelResponse } from "@vercel/node";

/** GET /api/health — בדיקה מהירה שה-API של Vercel נטען (אין תלות ב-Resend). */
export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ ok: true, route: "api/health" });
}
