/** Chat item of the chat list. */
export type ChatSummary = Readonly<{

  /** Chat id. */
  id: string;

  /** Chat title. */
  title: string;

  /** Chat type. */
  type: 'user' | 'group' | 'supergroup' | 'channel';

  /** Phone number, if it is not hidden. */
  phoneNumber?: string;

  /** Telegram username, if any. */
  username?: string;
}>;
