import { type UserCredentials } from 'src/models/userCredentials';

/** GREEN-API keys factory. */
export const greenApiKeys = {
  /** Root key. */
  all: ['greenApi'] as const,

  /** Notification polling key. */
  notification: (credentials: UserCredentials | null) => [...greenApiKeys.all, 'notification', credentials] as const,

  /** Chats key. */
  chats: (credentials: UserCredentials | null) => [...greenApiKeys.all, 'chats', credentials] as const,

  /** Chat history key. */
  chatHistory: (credentials: UserCredentials | null, chatId: string | null) =>
    [...greenApiKeys.all, 'history', credentials, chatId] as const,
} as const;
