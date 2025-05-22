interface WebAppUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
  photo_url?: string
}

interface WebAppChat {
  id: number
  type: string
  title?: string
  username?: string
  photo_url?: string
}

interface WebAppInitData {
  query_id?: string
  user?: WebAppUser
  receiver?: WebAppUser
  chat?: WebAppChat
  start_param?: string
  can_send_after?: number
  auth_date: number
  hash: string
}

interface ThemeParams {
  bg_color?: string
  text_color?: string
  hint_color?: string
  link_color?: string
  button_color?: string
  button_text_color?: string
  secondary_bg_color?: string
}

interface WebApp {
  initData: string
  initDataUnsafe: WebAppInitData
  colorScheme: "light" | "dark"
  themeParams: ThemeParams
  isExpanded: boolean
  viewportHeight: number
  viewportStableHeight: number
  headerColor: string
  backgroundColor: string
  isClosingConfirmationEnabled: boolean
  BackButton: {
    isVisible: boolean
    onClick: (callback: () => void) => void
    offClick: (callback: () => void) => void
    show: () => void
    hide: () => void
  }
  MainButton: {
    text: string
    color: string
    textColor: string
    isVisible: boolean
    isProgressVisible: boolean
    isActive: boolean
    setText: (text: string) => void
    onClick: (callback: () => void) => void
    offClick: (callback: () => void) => void
    show: () => void
    hide: () => void
    enable: () => void
    disable: () => void
    showProgress: (leaveActive: boolean) => void
    hideProgress: () => void
  }
  HapticFeedback: {
    impactOccurred: (style: "light" | "medium" | "heavy" | "rigid" | "soft") => void
    notificationOccurred: (type: "error" | "success" | "warning") => void
    selectionChanged: () => void
  }
  close: () => void
  expand: () => void
  unexpand: () => void
  ready: () => void
  sendData: (data: string) => void
  switchInlineQuery: (query: string, choose_chat_types?: string[]) => void
  openLink: (url: string, options?: { try_instant_view?: boolean }) => void
  openTelegramLink: (url: string) => void
  openInvoice: (url: string, callback?: (status: "paid" | "cancelled" | "failed" | "pending") => void) => void
  showPopup: (
    params: {
      title?: string
      message: string
      buttons?: Array<{ id: string; type?: "default" | "ok" | "close" | "cancel" | "destructive"; text: string }>
    },
    callback?: (button_id: string) => void,
  ) => void
  showAlert: (message: string, callback?: () => void) => void
  showConfirm: (message: string, callback?: (confirmed: boolean) => void) => void
  enableClosingConfirmation: () => void
  disableClosingConfirmation: () => void
  onEvent: (eventType: string, eventHandler: () => void) => void
  offEvent: (eventType: string, eventHandler: () => void) => void
  setHeaderColor: (color: "bg_color" | "secondary_bg_color" | string) => void
  setBackgroundColor: (color: "bg_color" | "secondary_bg_color" | string) => void
  isVersionAtLeast: (version: string) => boolean
  setTitle: (title: string) => void
  readTextFromClipboard: (callback: (text: string) => void) => void
  requestWriteAccess: (callback: (access_granted: boolean) => void) => void
  requestContact: (callback: (shared: boolean) => void) => void
  showScanQrPopup: (params: { text?: string }, callback: (text: string) => void) => void
  closeScanQrPopup: () => void
  showPopup: (
    params: {
      title?: string
      message: string
      buttons?: Array<{ id: string; type?: "default" | "ok" | "close" | "cancel" | "destructive"; text: string }>
    },
    callback?: (button_id: string) => void,
  ) => void
}

interface Telegram {
  WebApp: WebApp
}

declare global {
  interface Window {
    Telegram: Telegram
  }
}
