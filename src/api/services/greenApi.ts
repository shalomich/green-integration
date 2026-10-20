import { AppError } from 'src/models/appError';
import { type ChatSummary } from 'src/models/chatSummary';
import { type Message } from 'src/models/message';
import { type Notification } from 'src/models/notification';
import { type UserCredentials } from 'src/models/userCredentials';
import { isApiError } from 'src/utils/axiosErrorGuard';

import { apiUrlsConfig } from '../apiUrlsConfig';
import { type ChatDto } from '../dtos/chatDto';
import { type MessageDto } from '../dtos/messageDto';
import { type NotificationDto } from '../dtos/notificationDto';
import { type SendMessageResponseDto } from '../dtos/sendMessageResponseDto';
import { createHttp } from '../http';
import { AppErrorMapper } from '../mappers/appErrorMapper';
import { ChatMapper } from '../mappers/chatMapper';
import { MessageMapper } from '../mappers/messageMapper';
import { NotificationMapper } from '../mappers/notificationMapper';

/** Default number of messages in chat history. */
const DEFAULT_HISTORY_COUNT = 100;

/** Connection check timeout, milliseconds. */
const CONNECTION_TIMEOUT_MS = 10000;

/** Long polling timeout, seconds. */
const RECEIVE_TIMEOUT_SECONDS = 5;

/**
 * Convert an error to the application error.
 * @param error Error.
 */
function handleError(error: unknown): never {
  if (isApiError(error)) {
    throw AppErrorMapper.fromDto(error);
  }
  throw error;
}

/**
 * Convert journal DTOs to messages, skipping the ones without text.
 * @param dtos Journal message DTOs.
 */
function toMessages(dtos: readonly MessageDto[]): Message[] {
  return dtos.map(MessageMapper.fromDto).filter(message => message.text !== '');
}

/** GREEN-API (Telegram) service. */
export namespace GreenApi {

  /**
   * Check that the instance is reachable and authorized with the credentials.
   * @param credentials Credentials.
   */
  export async function checkConnection(credentials: UserCredentials): Promise<void> {
    try {
      const { data } = await createHttp(credentials).get<{ stateInstance?: string; }>(
        apiUrlsConfig.green.getStateInstance(credentials.apiTokenInstance),
        { timeout: CONNECTION_TIMEOUT_MS },
      );
      if (data.stateInstance !== 'authorized') {
        throw new AppError({ message: `Instance is not authorized (state: ${data.stateInstance ?? 'unknown'}).` });
      }
    } catch (error: unknown) {
      if (error instanceof AppError) {
        throw error;
      }
      if (isApiError(error) && error.response != null) {
        throw new AppError({ message: 'Wrong credentials. Check idInstance and apiTokenInstance.' });
      }
      handleError(error);
    }
  }

  /**
   * Enable incoming webhooks (notifications) in the instance settings.
   * @param credentials Credentials.
   */
  export async function enableIncomingWebhook(credentials: UserCredentials): Promise<void> {
    try {
      await createHttp(credentials).post(
        apiUrlsConfig.green.setSettings(credentials.apiTokenInstance),
        { incomingWebhook: 'yes' },
      );
    } catch (error: unknown) {
      handleError(error);
    }
  }

  /**
   * Send a text message and get its id.
   * @param credentials Credentials.
   * @param chatId Chat id.
   * @param message Message text.
   */
  export async function sendMessage(
    credentials: UserCredentials,
    chatId: string,
    message: string,
  ): Promise<Readonly<{ id: string; }>> {
    try {
      const { data } = await createHttp(credentials).post<SendMessageResponseDto>(
        apiUrlsConfig.green.sendMessage(credentials.apiTokenInstance),
        { chatId, message },
      );
      return { id: data.idMessage };
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  /**
   * Receive the next notification from the queue (long polling).
   * @param credentials Credentials.
   * @param signal Abort signal.
   */
  export async function receiveNotification(
    credentials: UserCredentials,
    signal?: AbortSignal,
  ): Promise<Notification | null> {
    try {
      const { data } = await createHttp(credentials).get<NotificationDto | null>(
        apiUrlsConfig.green.receiveNotification(credentials.apiTokenInstance),
        { params: { receiveTimeout: RECEIVE_TIMEOUT_SECONDS }, signal },
      );
      return data == null ? null : NotificationMapper.fromDto(data);
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  /**
   * Delete a notification from the queue.
   * @param credentials Credentials.
   * @param receiptId Receipt id.
   */
  export async function deleteNotification(credentials: UserCredentials, receiptId: number): Promise<void> {
    try {
      await createHttp(credentials).delete(
        apiUrlsConfig.green.deleteNotification(credentials.apiTokenInstance, receiptId),
      );
    } catch (error: unknown) {
      handleError(error);
    }
  }

  /**
   * Get all chats of the account. The method has no pagination.
   * @param credentials Credentials.
   */
  export async function getChats(credentials: UserCredentials): Promise<ChatSummary[]> {
    try {
      const { data } = await createHttp(credentials).get<ChatDto[]>(
        apiUrlsConfig.green.getChats(credentials.apiTokenInstance),
      );
      return data.map(ChatMapper.fromDto);
    } catch (error: unknown) {
      return handleError(error);
    }
  }

  /**
   * Get chat history.
   * @param credentials Credentials.
   * @param chatId Chat id.
   * @param count Number of messages.
   */
  export async function getChatHistory(
    credentials: UserCredentials,
    chatId: string,
    count = DEFAULT_HISTORY_COUNT,
  ): Promise<Message[]> {
    try {
      const { data } = await createHttp(credentials).post<MessageDto[]>(
        apiUrlsConfig.green.getChatHistory(credentials.apiTokenInstance),
        { chatId, count },
      );
      return toMessages(data);
    } catch (error: unknown) {
      return handleError(error);
    }
  }
}
