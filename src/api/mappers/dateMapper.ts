import { DateTime } from 'luxon';

/** Mapper between Luxon `DateTime` and ISO date DTO strings ("YYYY-MM-DD"). */
export namespace DateMapper {

  /**
   * Maps `DateTime` to an ISO date string ("YYYY-MM-DD").
   * @param dateTime Date to format.
   */
  export function toDto(dateTime: DateTime): string {
    return dateTime.toISODate() ?? '';
  }

  /**
   * Maps an ISO date string ("YYYY-MM-DD") to `DateTime`.
   * @param dto Date DTO.
   */
  export function fromDto(dto: string): DateTime | null {
    if (dto === '') {
      return null;
    }
    const dateTime = DateTime.fromISO(dto);
    return dateTime.isValid ? dateTime : null;
  }
}
