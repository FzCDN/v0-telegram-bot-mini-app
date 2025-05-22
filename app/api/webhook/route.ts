import { type NextRequest, NextResponse } from "next/server"

// Bot token from environment variable
const BOT_TOKEN = process.env.BOT_TOKEN || "7553819695:AAHcCKqynlYNYGdqAydjq9gtw8_FQRwWHno"
const WEBAPP_URL = process.env.NEXT_PUBLIC_WEBAPP_URL || "https://v0-bott5.vercel.app"

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const data = await request.json()

    // Simple logging
    console.log("Webhook received data:", JSON.stringify(data).slice(0, 200) + "...")

    // Check if this is a message update
    if (data.message && data.message.text) {
      const chatId = data.message.chat.id
      const text = data.message.text

      // Handle /start command
      if (text === "/start") {
        try {
          await sendStartMessage(chatId)
          console.log("Start message sent successfully")
        } catch (error) {
          console.error("Error sending start message:", error)
          // Continue execution even if sending fails
        }
      }
    }

    // Always return success to Telegram
    return NextResponse.json({ ok: true })
  } catch (error) {
    // Log the error but still return success to Telegram
    console.error("Error in webhook handler:", error)
    return NextResponse.json({ ok: true })
  }
}

async function sendStartMessage(chatId: number) {
  try {
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
      const errorText = await response.text()
      console.error(`Telegram API error (${response.status}):`, errorText)
      return false
    }

    return true
  } catch (error) {
    console.error("Error in sendStartMessage:", error)
    return false
  }
}

// For Telegram webhook setup (GET request)
export async function GET(request: NextRequest) {
  return NextResponse.json({ ok: true, message: "Webhook endpoint is working" })
}
