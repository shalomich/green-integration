import { type Message } from 'src/models/message';

import { type MessageDto } from '../dtos/messageDto';

/** GREEN-API message mapper. */
export namespace MessageMapper {

  /**
   * Maps message DTO to domain model.
   * @param dto Message DTO.
   */
  export function fromDto(dto: MessageDto): Message {
    return {
      id: dto.idMessage,
      chatId: dto.chatId,
      outgoing: dto.type === 'outgoing',
      text: dto.textMessage ?? '',
      timestamp: dto.timestamp * 1000,
      senderName: dto.senderName,
    };
  }
}
