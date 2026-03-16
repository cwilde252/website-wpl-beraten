import type { Context } from "https://edge.netlify.com";
import { loginHtml } from "./lib/login-template.ts";

const PASSWORD = Deno.env.get("SITE_PASSWORD") ?? "fallback";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  
  // Cookie prüfen
  const cookie = request.headers.get("cookie") || "";
  if (cookie.includes("auth=ok")) return context.next();

  // POST: Passwort-Check
  if (request.method === "POST") {
    const body = await request.formData();
    if (body.get("password") === PASSWORD) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: url.pathname,
          "Set-Cookie": "auth=ok; Path=/; HttpOnly; SameSite=Strict",
        },
      });
    }
  }

  // Login-Formular anzeigen
  return new Response(loginHtml, { headers: { "Content-Type": "text/html" } });
};

export const config = { path: "/*" };