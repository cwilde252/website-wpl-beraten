import type { Context } from "https://edge.netlify.com";
import { loginHtml } from "./lib/login-template.ts";

const PASSWORD = Deno.env.get("SITE_PASSWORD") ?? "fallback";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  
  const cookie = request.headers.get("cookie") || "";
  if (cookie.includes("auth=ok")) {
    // SPA-Fallback selbst übernehmen
    const response = await context.next();
    if (response.status === 404) {
      return context.rewrite("/index.html");
    }
    return response;
  }

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

  return new Response(loginHtml, { headers: { "Content-Type": "text/html" } });
};