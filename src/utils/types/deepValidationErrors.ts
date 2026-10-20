/**
 * Recursively mirrors an entity's shape, replacing every leaf property with `TLeaf`
 * and every nested object/array-of-objects property with a nested validation shape.
 */
export type DeepValidationErrors<T extends Record<string, unknown>, TLeaf> = {
  [P in keyof T]?: T[P] extends readonly (infer K extends Record<string, unknown>)[] ?
    readonly DeepValidationErrors<K, TLeaf>[] :
    T[P] extends Record<string, unknown> ?
      DeepValidationErrors<T[P], TLeaf> :
      TLeaf;
};
