import { DateTime } from 'luxon';

import { DateMapper } from './dateMapper';

describe('DateMapper', () => {
  describe('toDto', () => {
    it('returns ISO date string', () => {
      const dateTime = DateTime.fromObject({ year: 2026, month: 2, day: 14 });

      expect(DateMapper.toDto(dateTime)).toBe('2026-02-14');
    });
  });

  describe('fromDto', () => {
    it('returns DateTime when DTO is a valid ISO date string', () => {
      const dateTime = DateMapper.fromDto('2026-02-14');

      expect(dateTime?.isValid).toBe(true);
      expect(dateTime?.toISODate()).toBe('2026-02-14');
    });

    it('returns null when DTO is an empty string', () => {
      expect(DateMapper.fromDto('')).toBeNull();
    });

    it('returns null when DTO is not a valid date', () => {
      expect(DateMapper.fromDto('not-a-date')).toBeNull();
    });
  });
});
