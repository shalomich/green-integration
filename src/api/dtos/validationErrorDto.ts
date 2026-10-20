import { type NoneFieldErrorKey } from 'src/utils/extractErrorMessage';
import { type DeepValidationErrors } from 'src/utils/types/deepValidationErrors';
import { type MaxErrorDepth, type ObjectPaths } from 'src/utils/types/objectPaths';

/**
 * Error types related to response error status.
 * @see {@link [Client Errors](https://drf-standardized-errors.readthedocs.io/en/latest/error_response.html#client-errors)}.
 */
export type ApiErrorType =
  | 'parse_error'
  | 'authentication_failed'
  | 'not_authenticated'
  | 'permission_denied'
  | 'not_found'
  | 'method_not_allowed'
  | 'not_acceptable'
  | 'unsupported_media_type'
  | 'throttled'
  | 'server_error'
  | 'validation_error';

/**
 * Validation error DTO.
 * If a property has primitive type (number, string), then errors - is an array of strings.
 * If a property is an object, then errors is an array of strings if property is null but required e.g.
 * Or is nested ValidationErrorDto<T> object.
 * If a property is an array, then errors is an object where key is name of property
 * and value is array of errors (index in this array corresponds to index of item in the original array).
 */
export type ValidationErrorDto<T extends Record<string, unknown>> = DeepValidationErrors<T, readonly string[]> & Readonly<{

  /** Array of errors. */
  errors: readonly ApiErrorDto<T>[];

  /** Error type. */
  type: ApiErrorType;
}>;

/** Returned error with api. */
export type ApiErrorDto<TDto extends Record<string, unknown>> = Readonly<{

  /** Error detail error. */
  detail: string;

  /** Error code. */
  code: string;

  /**
   * Key of error. The form field for which the error occurred.
   * @example What the error key might look like.
   * `form.field` or `form.1` or `form.filed1.field2`.
   * @todo (Template): The name of the field may be different from the current one.
   */
  attr: ObjectPaths<TDto, MaxErrorDepth> | NoneFieldErrorKey;
}>;

/**
 * Is error a ValidationErrorDto.
 * @param error Some error.
 */
export function isValidationErrorDto<T extends Record<string, unknown>>(
  error: unknown,
): error is ValidationErrorDto<T> {
  return (
    (error as ValidationErrorDto<T>).type != null &&
    (error as ValidationErrorDto<T>).errors != null
  );
}
