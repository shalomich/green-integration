import { type DefaultValues } from 'react-hook-form';
import { z } from 'zod';

import { requiredString } from 'src/utils/zod/requiredString';

/** Form validation schema. */
export const loginFormSchema = z.object({
  idInstance: z.number({ message: 'This field is required' }),
  apiTokenInstance: requiredString(),
});

/** Login form values. */
export type LoginFormValues = z.infer<typeof loginFormSchema>;

/** Login form initial values. */
export const loginFormInitialValues: DefaultValues<LoginFormValues> = {
  idInstance: undefined,
  apiTokenInstance: '',
};
