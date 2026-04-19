import type { IncomingMessage, ServerResponse } from "http";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { sendContactEmail } from "./api/lib/contact-email";

function readRawBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c: Buffer) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

/** Dev-only: mirrors Vercel `/api/health` + `/api/contact` */
function contactApiPlugin(): Plugin {
  return {
    name: "contact-api",
    configureServer(server) {
      server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
        const pathname = req.url?.split("?")[0] ?? "";
        if (pathname === "/api/health" && req.method === "GET") {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ ok: true, route: "api/health" }));
          return;
        }
        if (pathname !== "/api/contact" || req.method !== "POST") {
          next();
          return;
        }
        void (async () => {
          try {
            const raw = await readRawBody(req);
            let parsed: unknown;
            try {
              parsed = JSON.parse(raw) as unknown;
            } catch {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: false, error: "invalid_json" }));
              return;
            }
            await sendContactEmail(parsed);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: true }));
          } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "unknown";
            if (msg.startsWith("invalid")) {
              res.statusCode = 400;
            } else if (msg === "missing_resend_api_key") {
              res.statusCode = 500;
            } else {
              res.statusCode = 500;
            }
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: false, error: msg }));
          }
        })();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), contactApiPlugin(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
