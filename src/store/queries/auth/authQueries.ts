import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GreenApi } from 'src/api/services/greenApi';
import { UserCredentialsStorageService } from 'src/api/services/userCredentialsStorage';
import { type UserCredentials } from 'src/models/userCredentials';

import { userCredentialsKeys } from '../userCredentials/keys';

/** Mutation to log in: checks the connection with the instance and saves credentials in the storage. */
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(credentials: UserCredentials) {
      await GreenApi.checkConnection(credentials);
      await GreenApi.enableIncomingWebhook(credentials);
      await UserCredentialsStorageService.save(credentials);
      return credentials;
    },
    onSuccess(credentials) {
      queryClient.setQueryData(userCredentialsKeys.current(), credentials);
    },
  });
};

/** Mutation to log out: removes credentials from the storage. */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => UserCredentialsStorageService.remove(),
    onSuccess() {
      queryClient.setQueryData(userCredentialsKeys.current(), null);
    },
  });
};
