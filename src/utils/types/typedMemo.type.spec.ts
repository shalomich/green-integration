import { type FC } from 'react';

import { typedMemo } from './typedMemo';

type GenericProps<T> = Readonly<{
  value: T;
}>;

const GenericComponent: FC<GenericProps<number>> = ({ value }) => value;

describe('typedMemo', () => {
  it('preserves the wrapped component type instead of widening it to `NamedExoticComponent`', () => {
    const Memoized = typedMemo(GenericComponent);

    expectTypeOf(Memoized).toEqualTypeOf<FC<GenericProps<number>>>();
  });
});
