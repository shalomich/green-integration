/** Message DTO. */
export type MessageDto = Readonly<{
  type: 'incoming' | 'outgoing';
  idMessage: string;

  /** Timestamp, seconds. */
  timestamp: number;
  typeMessage: string;
  chatId: string;
  senderName?: string;
  textMessage?: string;
}>;
