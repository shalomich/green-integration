import { type DeepValidationErrors } from 'src/utils/types/deepValidationErrors';

/**
 * Entity validation errors type.
 * Describes validation items for target entity.
 */
export type EntityValidationErrors<T extends Record<string, unknown>> = DeepValidationErrors<T, string | readonly string[]> & Readonly<{

  /** Error message by non field. */
  nonFieldErrors?: string | readonly string[];
}>;

/** Common application error. */
export class AppError<TEntity extends Record<string, unknown> = never> extends Error {
  /** Error message. */
  public override readonly message: string;

  /** Validation errors for entity fields. */
  public readonly validationData?: EntityValidationErrors<TEntity>;

  public constructor(error: AppErrorConstructorData<TEntity>) {
    super(error.message);
    this.message = error.message;
    this.validationData = error.validationData;
  }
}

type AppErrorConstructorData<TEntity extends Record<string, unknown> = never> = Pick<
  AppError<TEntity>,
  'message' | 'validationData'
>;
