import { type ChatSummary } from 'src/models/chatSummary';

import { type ChatDto } from '../dtos/chatDto';

/**
 * Default chat title for a chat without a name: username, phone number or the chat id.
 * @param dto Chat DTO.
 */
function defaultTitle(dto: ChatDto): string {
  if (dto.username !== '') {
    return `@${dto.username}`;
  }
  return dto.phoneNumber ? `+${dto.phoneNumber}` : `Chat ${dto.chatId}`;
}

/** GREEN-API chat mapper. */
export namespace ChatMapper {

  /**
   * Maps chat DTO to domain model.
   * @param dto Chat DTO.
   */
  export function fromDto(dto: ChatDto): ChatSummary {
    return {
      id: dto.chatId,
      title: dto.name === '' ? defaultTitle(dto) : dto.name,
      type: dto.type,
      phoneNumber: dto.phoneNumber ? String(dto.phoneNumber) : undefined,
      username: dto.username === '' ? undefined : dto.username,
    };
  }
}
