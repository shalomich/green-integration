import { type Paths } from 'type-fest';

/** Max error depth. */
export type MaxErrorDepth = 3;

/**
 * Recursively find all keys of an object.
 * @example
 * ```ts
 *  type Test = ObjectPaths<{
 *    a: number,
 *    b: {
 *      c: string,
 *      v: {
 *        t: string;
 *      }[],
 *    },
 *  }>
 *
 * // type Test = "a" | "b" | "b.c" | "b.v" | `b.v.${number}` | `b.v.${number}.t`
 * ```
 */
// eslint-disable-next-line jsdoc/require-jsdoc
export type ObjectPaths<T, D extends number = MaxErrorDepth> = Paths<T, { maxRecursionDepth: D; }>;
