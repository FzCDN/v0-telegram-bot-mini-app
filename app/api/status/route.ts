import { NextResponse } from "next/server"

export async function GET() {
  const botToken = process.env.BOT_TOKEN || "Not set"
  const webappUrl = process.env.NEXT_PUBLIC_WEBAPP_URL || "Not set"
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "Not set"

  // Mask the bot token for security
  const maskedToken =
    botToken !== "Not set" ? `${botToken.substring(0, 8)}...${botToken.substring(botToken.length - 5)}` : "Not set"

  return NextResponse.json({
    status: "ok",
    environment: process.env.NODE_ENV,
    config: {
      botToken: maskedToken,
      webappUrl,
      apiBaseUrl,
    },
    timestamp: new Date().toISOString(),
  })
}
