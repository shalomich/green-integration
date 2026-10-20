import { type ValidationErrorDto } from 'src/api/dtos/validationErrorDto';

import { extractErrorMessageByErrorKey } from './extractErrorMessage';

type FormDto = Readonly<{
  email: string;
  recipients: readonly {
    name: string;
  }[];
}>;

function buildValidationError(
  errors: ValidationErrorDto<FormDto>['errors'],
): ValidationErrorDto<FormDto> {
  return {
    errors,
    type: 'validation_error',
  };
}

describe('extractErrorMessageByErrorKey', () => {
  it('returns `undefined` when no error matches the key', () => {
    const error = buildValidationError([]);

    expect(extractErrorMessageByErrorKey(error, 'email')).toBeUndefined();
  });

  it('returns the first matching field error', () => {
    const error = buildValidationError([
      {
        attr: 'email',
        code: 'invalid',
        detail: 'Enter a valid email address.',
      },
    ]);

    expect(extractErrorMessageByErrorKey(error, 'email')).toBe('Enter a valid email address.');
  });

  it('returns array errors at their corresponding indexes', () => {
    const error = buildValidationError([
      {
        attr: 'recipients.1',
        code: 'required',
        detail: 'This field is required.',
      },
      {
        attr: 'recipients.2',
        code: 'invalid',
        detail: 'Enter a valid email address.',
      },
    ]);

    expect(extractErrorMessageByErrorKey(error, 'recipients')).toEqual([
      undefined,
      'This field is required.',
      'Enter a valid email address.',
    ]);
  });
});
