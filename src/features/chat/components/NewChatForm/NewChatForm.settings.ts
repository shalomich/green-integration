import { type DefaultValues } from 'react-hook-form';
import { z } from 'zod';

/** Matches a masked Russian phone number, e.g. `+7 (987) 654-32-10`. */
const PHONE_REGEX = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

/** Phone number input placeholder. */
export const PHONE_PLACEHOLDER = '+7 (999) 123-45-67';

/** Form validation schema. */
export const newChatFormSchema = z.object({
  phone: z.string().trim()
    .regex(PHONE_REGEX, {
      message: `Phone number must be like ${PHONE_PLACEHOLDER}`,
    }),
});

/** New chat form values. */
export type NewChatFormValues = z.infer<typeof newChatFormSchema>;

/** New chat form initial values. */
export const newChatFormInitialValues: DefaultValues<NewChatFormValues> = {
  phone: '',
};

/**
 * Applies the Russian phone mask `+7 (999) 123-45-67` to a raw input value.
 * @param value Raw input value.
 */
export function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits === '') {
    return '';
  }

  // Leading 7 or 8 is the country code, not a part of the national number.
  const national = digits.replace(/^[78]/, '').slice(0, 10);
  const area = national.slice(0, 3);
  const first = national.slice(3, 6);
  const second = national.slice(6, 8);
  const third = national.slice(8, 10);

  let result = '+7';
  if (area !== '') {
    result += ` (${area}`;
  }
  if (area.length === 3) {
    result += ')';
  }
  if (first !== '') {
    result += ` ${first}`;
  }
  if (second !== '') {
    result += `-${second}`;
  }
  if (third !== '') {
    result += `-${third}`;
  }
  return result;
}

/**
 * Converts a masked phone number to digits, e.g. `79876543210`.
 * @param phone Masked phone number.
 */
export function phoneToDigits(phone: string): string {
  return phone.replace(/\D/g, '');
}
