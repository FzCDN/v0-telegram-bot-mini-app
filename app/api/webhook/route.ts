import { type NextRequest, NextResponse } from "next/server"

// Bot token from environment variable
const BOT_TOKEN = process.env.BOT_TOKEN || ""
const WEBAPP_URL = process.env.NEXT_PUBLIC_WEBAPP_URL || "https://your-deployed-app-url.vercel.app"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Check if this is a message update
    if (data.message && data.message.text) {
      const chatId = data.message.chat.id
      const text = data.message.text

      // Handle /start command
      if (text === "/start") {
        // Send a message with a button to open the mini app
        await sendStartMessage(chatId)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ ok: false, error: "Failed to process webhook" }, { status: 500 })
  }
}

async function sendStartMessage(chatId: number) {
  const message = "Silahkan Dibuka"

  // Create inline keyboard with web_app button
  const keyboard = {
    inline_keyboard: [
      [
        {
          text: "Buka",
          web_app: { url: WEBAPP_URL },
        },
      ],
    ],
  }

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      reply_markup: keyboard,
    }),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(`Telegram API error: ${JSON.stringify(errorData)}`)
  }

  return await response.json()
}

// For Telegram webhook setup (GET request)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const action = searchParams.get("action")

  if (action === "delete") {
    // Delete the webhook
    try {
      const deleteResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/deleteWebhook`)
      const deleteData = await deleteResponse.json()

      return NextResponse.json({
        ok: deleteData.ok,
        message: deleteData.ok ? "Webhook deleted successfully" : "Failed to delete webhook",
        result: deleteData,
      })
    } catch (error) {
      console.error("Error deleting webhook:", error)
      return NextResponse.json({ ok: false, error: "Failed to delete webhook" }, { status: 500 })
    }
  } else {
    // Get webhook info
    try {
      const infoResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`)
      const infoData = await infoResponse.json()

      return NextResponse.json({
        ok: true,
        message: "Webhook information retrieved",
        webhookInfo: infoData.result,
        endpoint: "Webhook endpoint is working",
      })
    } catch (error) {
      console.error("Error getting webhook info:", error)
      return NextResponse.json({ ok: false, error: "Failed to get webhook info" }, { status: 500 })
    }
  }
}
