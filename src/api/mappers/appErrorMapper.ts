import { type AxiosError } from 'axios';

import { AppError, type EntityValidationErrors } from 'src/models/appError';

import { isValidationErrorDto, type ValidationErrorDto } from '../dtos/validationErrorDto';

/** Mapper of errors of DTO to domain model errors. */
type ValidationErrorMapper<TDto extends Record<string, unknown>, TModel extends Record<string, unknown>> = {

  /**
   * Maps validation error DTO to error for domain model.
   * @param errorDto Error DTO.
   */
  validationErrorFromDto(errorDto?: ValidationErrorDto<TDto> | null): EntityValidationErrors<TModel>;
};

/**
 * Error mapper type declaration.
 * Could be a simple function to transform errors from DTO to errors of domain model
 * or implementation of IMapper with implemented validationErrorFromDto method.
 */
export type ErrorMapper<TDto extends Record<string, unknown>, TEntity extends Record<string, unknown>> =
  | ValidationErrorMapper<TDto, TEntity>
  | ValidationErrorMapper<TDto, TEntity>['validationErrorFromDto'];

/** App error mapper. */
export namespace AppErrorMapper {

  /**
   * Converts default HttpErrorResponse object to custom application error.
   * @param httpError Http error response.
   */
  export function fromDto(httpError: AxiosError): AppError {
    const { message } = httpError;
    return new AppError({ message });
  }

  /**
   * Maps HTTP API error response to the appropriate API error model.
   * @param httpError HTTP error.
   * @param mapper Mapper function that transform validation DTO errors to the application validation model.
   * @returns AppError if httpError is not "Bad Request" error or AppValidationError if it is "Bad Request".
   */
  export function fromDtoWithValidationSupport<
    TErrorDto extends Record<string, unknown>,
    TEntity extends Record<string, unknown>,
  >(
    httpError: AxiosError<unknown>,
    mapper: ErrorMapper<TErrorDto, TEntity>,
  ): AppError<TEntity> {
    if (httpError.response?.status !== 400) {
      // It is not a validation error. Return simple AppError.
      return fromDto(httpError);
    }

    // TODO (template preparation):
    // Check that API sends you an error with the same field (detail, data, etc.) and change it if it's needed.

    const errors = httpError.response.data;

    if (errors == null || !isValidationErrorDto<TErrorDto>(errors)) {
      return fromDto(httpError);
    }

    const validationData = typeof mapper === 'function' ? mapper(errors) : mapper.validationErrorFromDto(errors);

    /** Throw the detail of first error in validation data. */
    return new AppError<TEntity>({
      message: errors.errors[0]?.detail ?? '',
      validationData,
    });
  }
}
