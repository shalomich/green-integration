import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { type Message } from 'src/models/message';
import { type UserCredentials } from 'src/models/userCredentials';
import { useDeleteNotification, useReceiveNotification } from 'src/store/queries/greenApi/greenApiQueries';
import { greenApiKeys } from 'src/store/queries/greenApi/keys';

/**
 * Poll GREEN-API for incoming text messages while credentials are set.
 * @param credentials Credentials.
 */
export function useReceiveMessages(credentials: UserCredentials | null): void {
  const queryClient = useQueryClient();
  const { data: notification } = useReceiveNotification(credentials);
  const { mutate: deleteNotification } = useDeleteNotification(credentials);

  useEffect(() => {
    if (notification == null) {
      return;
    }
    const { chatId, text, messageId, receiptId, senderName, type } = notification;
    if (type === 'incomingMessageReceived' && chatId != null && text != null) {
      const id = messageId ?? `in-${receiptId}`;
      const received: Message = {
        id, chatId, outgoing: false, text, timestamp: Date.now(), senderName,
      };
      const historyKey = greenApiKeys.chatHistory(credentials, chatId);
      queryClient.setQueryData<Message[]>(
        historyKey,
        history => (history == null || history.some(item => item.id === id) ? history : [...history, received]),
      );
      Promise.all([
        queryClient.invalidateQueries({ queryKey: historyKey }),
        queryClient.invalidateQueries({ queryKey: greenApiKeys.chats(credentials) }),
      ]).catch(() => undefined);
    }
    deleteNotification(receiptId);
  }, [notification, deleteNotification, queryClient, credentials]);
}
