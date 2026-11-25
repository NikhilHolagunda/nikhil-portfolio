import { NextRequest, NextResponse } from "next/server";

const SHEET_ID = "1Ts_jEF3BVwqBzpsBBf-JFhZUgHeBJsrh9NRHo8JIT8U";
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFY_EMAIL = "nikhilholagunda07@gmail.com";

// n8n lead workflow: validates, filters spam/duplicates, and posts the lead
// to the #sales_team Discord channel (with retries + a saved fallback).
const N8N_LEAD_WEBHOOK_URL =
  process.env.N8N_LEAD_WEBHOOK_URL ?? "https://nikhil-demo.app.n8n.cloud/webhook/lead";

type ContactBody = {
  name?: string;
  email?: string;
  type?: string;
  message?: string;
  timestamp?: string;
  website?: string; // honeypot: hidden from humans, filled by bots
};

async function sendToN8n(body: ContactBody): Promise<void> {
  if (!N8N_LEAD_WEBHOOK_URL) return;
  const res = await fetch(N8N_LEAD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: body.name ?? "",
      email: body.email ?? "",
      company: body.type ?? "",
      message: body.message ?? "",
      website: body.website ?? "",
      source: "portfolio",
    }),
    signal: AbortSignal.timeout(8000),
  });
  // 422 = rejected by the workflow's validation (spam/duplicate) — expected, not an error.
  if (!res.ok && res.status !== 422) {
    throw new Error(`n8n webhook failed: ${res.status}`);
  }
}

async function sendEmail(body: ContactBody): Promise<void> {
  if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");

  const { name = "", email = "", type = "", message = "" } = body;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#fafafa;border-radius:8px;">
      <h2 style="color:#E50914;margin:0 0 16px;">New portfolio contact</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#666;width:100px;">Name</td><td style="padding:8px 0;font-weight:600;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:8px 0;color:#666;">Type</td><td style="padding:8px 0;">${escapeHtml(type)}</td></tr>
      </table>
      <div style="margin-top:20px;padding:16px;background:#fff;border-left:3px solid #E50914;border-radius:4px;white-space:pre-wrap;font-size:14px;line-height:1.6;">${escapeHtml(message)}</div>
      <p style="margin-top:24px;color:#999;font-size:12px;">Reply to this email to respond directly to ${escapeHtml(name)}.</p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [NOTIFY_EMAIL],
      reply_to: email || undefined,
      subject: `[Portfolio] ${type || "Contact"} — ${name || "Anonymous"}`,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend failed: ${res.status} ${err}`);
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function writeToSheet(body: ContactBody): Promise<void> {
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) return;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;
  if (!accessToken) throw new Error("Failed to get Google access token");

  const values = [[
    body.timestamp || new Date().toISOString(),
    body.name || "",
    body.email || "",
    body.type || "",
    body.message || "",
  ]];

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A:E:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values }),
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactBody = await req.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Honeypot filled → a bot. Still hand it to n8n (which logs the rejection),
    // but skip the email and pretend success so the bot learns nothing.
    if (body.website) {
      await sendToN8n(body).catch(() => {});
      return NextResponse.json({ result: "success" });
    }

    // Email is the critical path — must succeed.
    await sendEmail(body);

    // Sheet log and n8n → Discord are best-effort — don't fail the request if they error.
    const [sheet, n8n] = await Promise.allSettled([writeToSheet(body), sendToN8n(body)]);
    if (sheet.status === "rejected") console.error("Sheet log failed (non-fatal):", sheet.reason);
    if (n8n.status === "rejected") console.error("n8n lead webhook failed (non-fatal):", n8n.reason);

    return NextResponse.json({ result: "success" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Contact API error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
