import { type GeneralApiError } from 'src/api/dtos/apiErrorDto';
import { type ApiErrorDto } from 'src/api/dtos/validationErrorDto';

/**
 * Type guard for AxiosError.
 * @param error Source object.
 */
export function isApiError<TDto extends Record<string, unknown>>(
  error: unknown,
): error is GeneralApiError<ApiErrorDto<TDto>> {
  return (error as GeneralApiError<ApiErrorDto<TDto>>).isAxiosError === true;
}
