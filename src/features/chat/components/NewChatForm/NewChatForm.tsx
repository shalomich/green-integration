import { memo, type FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField } from '@mui/material';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import {
  maskPhone,
  newChatFormInitialValues,
  newChatFormSchema,
  type NewChatFormValues,
  PHONE_PLACEHOLDER,
  phoneToDigits,
} from './NewChatForm.settings';

type Props = Readonly<{

  /** Called with phone number digits (e.g. `79876543210`) on valid submit. */
  onSubmit: (phone: string) => void;
}>;

const NewChatFormComponent: FC<Props> = ({ onSubmit }) => {
  const { control, handleSubmit, reset } = useForm<NewChatFormValues>({
    resolver: zodResolver(newChatFormSchema),
    defaultValues: newChatFormInitialValues,
  });

  const handleFormSubmit: SubmitHandler<NewChatFormValues> = values => {
    onSubmit(phoneToDigits(values.phone));
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} sx={{ p: 2, display: 'grid', gap: 1 }}>
      <Controller
        control={control}
        name="phone"
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            onChange={event => field.onChange(maskPhone(event.target.value))}
            size="small"
            label="Phone number"
            placeholder={PHONE_PLACEHOLDER}
            type="tel"
            autoComplete="off"
            error={fieldState.error != null}
            helperText={fieldState.error?.message}
            slotProps={{
              inputLabel: { shrink: true },
            }}
          />
        )}
      />
      <Button type="submit" variant="contained">Add Chat</Button>
    </Box>
  );
};

/** Phone number field with a button to start a new chat. */
export const NewChatForm = memo(NewChatFormComponent);
