/** GREEN-API chat DTO. */
export type ChatDto = Readonly<{
  chatId: string;
  name: string;
  type: 'user' | 'group' | 'supergroup' | 'channel';

  /** Is 0 if hidden or if the chat is a group. */
  phoneNumber: number;
  username: string;
}>;
