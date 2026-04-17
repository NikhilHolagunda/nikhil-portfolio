import { NextRequest, NextResponse } from "next/server";

const SHEET_ID = "1Ts_jEF3BVwqBzpsBBf-JFhZUgHeBJsrh9NRHo8JIT8U";
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN!;

async function getAccessToken(): Promise<string> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  if (!data.access_token) throw new Error("Failed to get access token");
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, type, message, timestamp } = body;

    const accessToken = await getAccessToken();

    // First, check if headers exist (get current row count)
    const checkRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A1:E1`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const checkData = await checkRes.json();

    const values: string[][] = [];

    // Add headers if sheet is empty
    if (!checkData.values || checkData.values.length === 0) {
      values.push(["Timestamp", "Name", "Email", "Type", "Message"]);
    }

    values.push([
      timestamp || new Date().toISOString(),
      name || "",
      email || "",
      type || "",
      message || "",
    ]);

    // Append the row(s)
    const appendRes = await fetch(
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

    const appendData = await appendRes.json();

    if (appendData.error) {
      console.error("Sheets error:", appendData.error);
      return NextResponse.json({ error: appendData.error.message }, { status: 500 });
    }

    return NextResponse.json({ result: "success" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Contact API error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
