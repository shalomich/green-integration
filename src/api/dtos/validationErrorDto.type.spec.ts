import { type DeepValidationErrors } from 'src/utils/types/deepValidationErrors';
import { type NoneFieldErrorKey } from 'src/utils/extractErrorMessage';
import { type MaxErrorDepth, type ObjectPaths } from 'src/utils/types/objectPaths';

import { type ApiErrorType, type ApiErrorDto, type ValidationErrorDto } from './validationErrorDto';

type Dto = Readonly<{
  email: string;
}>;

describe('ValidationErrorDto', () => {
  it('contains standardized errors and mirrors the DTO shape with `string[]` leaves', () => {
    expectTypeOf<ValidationErrorDto<Dto>>().toEqualTypeOf<
      DeepValidationErrors<Dto, readonly string[]> & Readonly<{
        errors: readonly ApiErrorDto<Dto>[];
        type: ApiErrorType;
      }>
    >();
  });
});

describe('ApiErrorDto', () => {
  it('describes a standardized field error', () => {
    expectTypeOf<ApiErrorDto<Dto>>().toEqualTypeOf<Readonly<{
      detail: string;
      code: string;
      attr: ObjectPaths<Dto, MaxErrorDepth> | NoneFieldErrorKey;
    }>>();
  });
});
