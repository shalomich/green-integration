import {
  skipToken, useMutation, useQuery, useQueryClient,
} from '@tanstack/react-query';

import { GreenApi } from 'src/api/services/greenApi';
import { type ChatSummary } from 'src/models/chatSummary';
import { type Message } from 'src/models/message';
import { type UserCredentials } from 'src/models/userCredentials';

import { greenApiKeys } from './keys';

/**
 * Query to get all chats. GREEN-API has no pagination for chats.
 * @param credentials Credentials.
 */
export const useChats = (credentials: UserCredentials | null) => useQuery({
  queryKey: greenApiKeys.chats(credentials),
  queryFn: credentials == null ? skipToken : () => GreenApi.getChats(credentials),
});

/**
 * Query to get the history of a chat.
 * @param credentials Credentials.
 * @param chatId Chat id.
 */
export const useChatHistory = (credentials: UserCredentials | null, chatId: string | null) => useQuery({
  queryKey: greenApiKeys.chatHistory(credentials, chatId),
  queryFn: credentials == null || chatId == null ? skipToken : () => GreenApi.getChatHistory(credentials, chatId),
});

/**
 * Mutation to send a text message. Adds the sent message to the cached chat history
 * (if the history is not loaded yet, it will contain the message after loading).
 * @param credentials Credentials.
 */
export const useSendMessage = (credentials: UserCredentials | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ chatId, message }: Readonly<{ chatId: string; message: string; }>) {
      if (credentials == null) {
        throw new Error('No credentials');
      }
      const { id } = await GreenApi.sendMessage(credentials, chatId, message);
      return { id, chatId, message };
    },
    async onSuccess({ id, chatId, message }) {
      const sent: Message = {
        id, chatId, outgoing: true, text: message, timestamp: Date.now(),
      };
      const historyKey = greenApiKeys.chatHistory(credentials, chatId);
      queryClient.setQueryData<Message[]>(
        historyKey,
        history => (history == null || history.some(item => item.id === id) ? history : [...history, sent]),
      );
      queryClient.setQueryData<ChatSummary[]>(
        greenApiKeys.chats(credentials),
        chats => {
          const existing = chats?.find(item => item.id === chatId);

          // The real id of a new chat is known only after the server creates it, so it is not added here.
          return existing == null ? chats : [existing, ...chats?.filter(item => item.id !== chatId) ?? []];
        },
      );
      await queryClient.invalidateQueries({ queryKey: historyKey });
    },
  });
};

/** Number of retries to find the created chat in the chat list. */
const FIND_CHAT_RETRIES = 4;

/** Delay between attempts to find the created chat, milliseconds. */
const FIND_CHAT_DELAY_MS = 1000;

/**
 * Mutation to get the real id of a chat created by the first message: the first chat of the list
 * (the server may add it to the chat list with a delay, so the request is retried).
 * @param credentials Credentials.
 */
export const useFindCreatedChatId = (credentials: UserCredentials | null) => useMutation({
  async mutationFn() {
    if (credentials == null) {
      throw new Error('No credentials');
    }
    const [chat] = await GreenApi.getChats(credentials);
    if (chat == null) {
      throw new Error('Created chat not found');
    }
    return chat.id;
  },
  retry: FIND_CHAT_RETRIES,
  retryDelay: FIND_CHAT_DELAY_MS,
});

/** Delay between long polling requests, milliseconds. */
const RECEIVE_INTERVAL_MS = 100;

/**
 * Query to poll the next notification from the queue (long polling).
 * @param credentials Credentials.
 */
export const useReceiveNotification = (credentials: UserCredentials | null) => useQuery({
  queryKey: greenApiKeys.notification(credentials),
  queryFn: credentials == null ? skipToken : ({ signal }) => GreenApi.receiveNotification(credentials, signal),
  refetchInterval: RECEIVE_INTERVAL_MS,
  refetchIntervalInBackground: true,
  gcTime: 0,
  retry: false,
});

/**
 * Mutation to delete a notification from the queue.
 * @param credentials Credentials.
 */
export const useDeleteNotification = (credentials: UserCredentials | null) => useMutation({
  async mutationFn(receiptId: number) {
    if (credentials != null) {
      await GreenApi.deleteNotification(credentials, receiptId);
    }
  },
});
