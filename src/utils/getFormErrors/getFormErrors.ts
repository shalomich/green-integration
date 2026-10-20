import { type FieldValues, type FieldError, type FieldErrors } from 'react-hook-form';

import { AppError } from 'src/models/appError';

/**
 * Gets external errors for `useForm` hook.
 * @param error Error. Usually it's error from the query.
 * @example
 * ```
 * useForm({
 *  errors: getFormErrors(error),
 * })
 * ```
 */
// TODO (template preparation): Add nested errors support if it's presented in API.
export function getFormErrors<TFieldValues extends FieldValues>(
  error: Error | null,
): FieldErrors<TFieldValues> | undefined {
  if (error == null || !(error instanceof AppError) || error.validationData == null) {
    return undefined;
  }

  const formErrors: Record<string, FieldError> = {};

  for (const [field, message] of Object.entries(error.validationData)) {
    if (typeof message === 'string') {
      formErrors[field] = { type: 'server', message };
    }
  }
  return formErrors as FieldErrors<TFieldValues>;
}
