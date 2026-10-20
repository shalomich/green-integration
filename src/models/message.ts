/** Message of a GREEN-API chat. */
export type Message = Readonly<{

  /** Message id. */
  id: string;

  /** Chat id. */
  chatId: string;

  /** Whether the message was sent by the current user. */
  outgoing: boolean;

  /** Message text. */
  text: string;

  /** Timestamp, ms. */
  timestamp: number;

  /** Sender name. */
  senderName?: string;
}>;
