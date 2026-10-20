import { type DeepValidationErrors } from './deepValidationErrors';

describe('DeepValidationErrors', () => {
  it('maps flat properties to the leaf type', () => {
    type Entity = Readonly<{
      name: string;
      age: number;
    }>;

    expectTypeOf<DeepValidationErrors<Entity, string>>().toEqualTypeOf<Readonly<{
      name?: string;
      age?: string;
    }>>();
  });

  it('recurses into nested object properties', () => {
    type Entity = Readonly<{
      address: {
        city: string;
      };
    }>;

    expectTypeOf<DeepValidationErrors<Entity, string>>().toEqualTypeOf<Readonly<{
      address?: {
        city?: string;
      };
    }>>();
  });

  it('recurses into arrays of nested objects', () => {
    type Entity = Readonly<{
      items: readonly { title: string; }[];
    }>;

    expectTypeOf<DeepValidationErrors<Entity, string>>().toEqualTypeOf<Readonly<{
      items?: readonly { title?: string; }[];
    }>>();
  });

  it('supports a leaf type other than `string`', () => {
    type Entity = Readonly<{
      name: string;
    }>;

    expectTypeOf<DeepValidationErrors<Entity, readonly string[]>>().toEqualTypeOf<Readonly<{
      name?: readonly string[];
    }>>();
  });
});
