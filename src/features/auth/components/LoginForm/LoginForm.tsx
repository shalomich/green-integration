import { memo, type FC } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField, Typography } from '@mui/material';
import { type SubmitHandler, useForm, Controller } from 'react-hook-form';

import { AppForm } from 'src/components/AppForm';
import { useLogin } from 'src/store/queries/auth/authQueries';

import {
  loginFormInitialValues,
  loginFormSchema,
  type LoginFormValues,
} from './LoginForm.settings';
import styles from './LoginForm.module.css';

const LoginFormComponent: FC = () => {
  const { mutate: login, isPending, error } = useLogin();

  const { control, ...form } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginFormInitialValues,
  });

  const handleUserLogin: SubmitHandler<LoginFormValues> = values => {
    const credentials = {
      idInstance: values.idInstance,
      apiTokenInstance: values.apiTokenInstance.trim(),
    };
    login(credentials);
  };

  return (
    <AppForm
      {...form}
      control={control}
      onSubmit={handleUserLogin}
    >
      <Controller
        control={control}
        name="idInstance"
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            value={field.value ?? ''}
            onChange={event => field.onChange(event.target.value === '' ? undefined : Number(event.target.value))}
            margin="normal"
            fullWidth
            id="idInstance"
            label="ID instance"
            placeholder="Enter ID instance"
            type="number"
            autoComplete="off"
            error={fieldState.error != null}
            helperText={fieldState.error?.message}
            slotProps={{
              inputLabel: { required: true, shrink: true },
            }}
          />
        )}
      />

      <Controller
        control={control}
        name="apiTokenInstance"
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            label="API token instance"
            placeholder="Enter API token instance"
            type="password"
            id="apiTokenInstance"
            autoComplete="new-password"
            error={fieldState.error != null}
            helperText={fieldState.error?.message}
            slotProps={{
              inputLabel: { required: true, shrink: true },
            }}
          />
        )}
      />

      <Button
        disabled={isPending}
        type="submit"
        fullWidth
        variant="contained"
        className={styles.submitButton}
      >
        Sign In
      </Button>

      {error != null && (
        <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
          { error.message }
        </Typography>
      )}
    </AppForm>
  );
};

/** Login form. */
export const LoginForm = memo(LoginFormComponent);
