import { type EntityValidationErrors } from 'src/models/appError';
import { type Login } from 'src/models/loginValues';
import { extractErrorMessageByErrorKey } from 'src/utils/extractErrorMessage';

import { type LoginDto } from '../dtos/loginDto';
import { type ValidationErrorDto } from '../dtos/validationErrorDto';

/** Login mapper. */
export namespace LoginMapper {

  export function fromDto(dto: LoginDto): Login {
    return {
      email: dto.email,
      password: dto.password,
    };
  }

  export function toDto(data: Login): LoginDto {
    return {
      email: data.email,
      password: data.password,
    };
  }

  export function validationErrorFromDto(
    errorDto: ValidationErrorDto<LoginDto>,
  ): EntityValidationErrors<Login> {
    return {
      email: extractErrorMessageByErrorKey(errorDto, 'email'),
      password:
        extractErrorMessageByErrorKey(errorDto, 'password') ??
        extractErrorMessageByErrorKey(errorDto, 'non_field_errors'),
    };
  }
}
