import { type AppError, type EntityValidationErrors } from './appError';

type Entity = Readonly<{
  name: string;
  address: {
    city: string;
  };
}>;

type ExpectedEntityValidationErrors = Readonly<{
  name?: string | readonly string[];
  address?: {
    city?: string | readonly string[];
  };
  nonFieldErrors?: string | readonly string[];
}>;

describe('EntityValidationErrors', () => {
  it('supports field, nested, and non-field validation errors', () => {
    expectTypeOf<EntityValidationErrors<Entity>>().toMatchTypeOf<ExpectedEntityValidationErrors>();
    expectTypeOf<ExpectedEntityValidationErrors>().toMatchTypeOf<EntityValidationErrors<Entity>>();
  });
});

describe('AppError', () => {
  it('types `validationData` using the error entity generic', () => {
    expectTypeOf<AppError<Entity>['validationData']>().toEqualTypeOf<EntityValidationErrors<Entity> | undefined>();
  });

  it('defaults `validationData` to `undefined` when no entity generic is provided', () => {
    expectTypeOf<AppError['validationData']>().toEqualTypeOf<undefined>();
  });
});
