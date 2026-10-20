/** API urls config. */
export const apiUrlsConfig = {
  green: {
    getStateInstance: (token: string) => `/getStateInstance/${token}`,
    setSettings: (token: string) => `/setSettings/${token}`,
    sendMessage: (token: string) => `/sendMessage/${token}`,
    receiveNotification: (token: string) => `/receiveNotification/${token}`,
    deleteNotification: (token: string, receiptId: number) => `/deleteNotification/${token}/${receiptId}`,
    getChats: (token: string) => `/getChats/${token}`,
    getChatHistory: (token: string) => `/getChatHistory/${token}`,
  },
} as const;
