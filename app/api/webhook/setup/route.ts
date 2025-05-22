import { type NextRequest, NextResponse } from "next/server"

const BOT_TOKEN = process.env.BOT_TOKEN || ""

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  // Get the webhook URL from the query parameter or use the current host
  const webhookUrl =
    searchParams.get("url") ||
    `${request.headers.get("x-forwarded-proto") || "http"}://${request.headers.get("host")}/api/webhook`

  try {
    // Set the webhook
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: webhookUrl,
        allowed_updates: ["message", "callback_query"],
      }),
    })

    const data = await response.json()

    return NextResponse.json({
      ok: data.ok,
      message: data.ok ? "Webhook set successfully" : "Failed to set webhook",
      result: data,
      webhookUrl,
    })
  } catch (error) {
    console.error("Error setting webhook:", error)
    return NextResponse.json({ ok: false, error: "Failed to set webhook" }, { status: 500 })
  }
}
