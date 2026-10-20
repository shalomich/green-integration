import { type Notification } from 'src/models/notification';

import { type NotificationDto } from '../dtos/notificationDto';

/** GREEN-API notification mapper. */
export namespace NotificationMapper {

  /**
   * Maps notification DTO to domain model.
   * @param dto Notification DTO.
   */
  export function fromDto({ receiptId, body }: NotificationDto): Notification {
    const data = body.messageData;
    return {
      receiptId,
      type: body.typeWebhook,
      messageId: body.idMessage,
      chatId: body.senderData?.chatId,
      senderName: body.senderData?.senderName,
      senderPhone: body.senderData?.senderPhoneNumber?.toString(),
      text: data?.textMessageData?.textMessage ?? data?.extendedTextMessageData?.text,
    };
  }
}
