
import { Box } from '@mui/material';
import {
  FormProvider,
  type FormProviderProps,
  type FieldValues,
  type SubmitHandler,
} from 'react-hook-form';

import { type AppError } from 'src/models/appError';
import { typedMemo } from 'src/utils/types/typedMemo';

/** Form props. */
export type FormProps<T extends FieldValues> = Readonly<{

  /** Submit handler. */
  onSubmit?: SubmitHandler<T>;

  /** Error. */
  error?: AppError<T>;

  /** Classname. */
  className?: string;
}> & FormProviderProps<T>;

const AppFormComponent = <T extends FieldValues>({
  children,
  className,
  onSubmit,
  ...form
}: FormProps<T>): React.JSX.Element => {
  const { handleSubmit } = form;
  const handleFormSubmit = onSubmit !== undefined ? handleSubmit(onSubmit) : undefined;

  return (
    <FormProvider {...form}>
      <Box component="form" onSubmit={handleFormSubmit} className={className}>
        {children}
      </Box>
    </FormProvider>
  );
};

/** Form component. */
export const AppForm = typedMemo(AppFormComponent);
