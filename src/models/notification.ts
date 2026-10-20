/** Notification received from GREEN-API. */
export type Notification = Readonly<{

  /** Receipt id, required to delete the notification. */
  receiptId: number;

  /** Webhook type. */
  type: string;

  /** Message id. */
  messageId?: string;

  /** Chat id. */
  chatId?: string;

  /** Sender name. */
  senderName?: string;

  /** Sender phone number. */
  senderPhone?: string;

  /** Text of the message, if any. */
  text?: string;
}>;
