import { string, type z } from 'zod';

/**
 * Creates a required zod string.
 * @param message Required error message.
 */
export function requiredString(message = 'This field is required'): z.ZodString {
  return string({ message }).trim()
    .min(1, message);
}
