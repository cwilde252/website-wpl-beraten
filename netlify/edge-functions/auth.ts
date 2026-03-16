import type { Context } from "https://edge.netlify.com";
import { loginHtml } from "./lib/login-template.ts";

const PASSWORD = Deno.env.get("SITE_PASSWORD") ?? "fallback";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  
  const cookie = request.headers.get("cookie") || "";
  if (cookie.includes("auth=ok")) {
    const response = await context.next();
    if (response.status === 404) {
      return context.rewrite("/index.html");
    }
    return response;
  }

  if (request.method === "POST") {
    let password: string | null = null;

    try {
      const body = await request.formData();
      password = body.get("password") as string | null;
    } catch {
      const text = await request.text();
      const params = new URLSearchParams(text);
      password = params.get("password");
    }

    if (password === PASSWORD) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: url.pathname,
          "Set-Cookie": "auth=ok; Path=/; HttpOnly; SameSite=Strict",
        },
      });
    }
  }

  // ← das fehlte
  return new Response(loginHtml, { headers: { "Content-Type": "text/html" } });
};

export const config = { path: "/*" };