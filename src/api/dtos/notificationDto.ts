/** Notification DTO. */
export type NotificationDto = Readonly<{

  /** Receipt id. */
  receiptId: number;
  body: {
    typeWebhook: string;
    idMessage?: string;
    senderData?: {
      chatId: string;
      senderName?: string;
      senderPhoneNumber?: number;
    };
    messageData?: {
      typeMessage: string;
      textMessageData?: { textMessage: string };
      extendedTextMessageData?: { text: string };
    };
  };
}>;
