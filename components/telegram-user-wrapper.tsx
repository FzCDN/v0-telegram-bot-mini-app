"use client"

import { TelegramInit } from "@/components/telegram-init"
import { UserProfile } from "@/components/user-profile"

export default function TelegramUserWrapper() {
  return <TelegramInit>{(user, loading) => <UserProfile user={user} loading={loading} />}</TelegramInit>
}
