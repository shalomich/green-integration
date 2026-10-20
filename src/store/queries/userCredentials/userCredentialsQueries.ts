import { useQuery } from '@tanstack/react-query';

import { UserCredentialsStorageService } from 'src/api/services/userCredentialsStorage';

import { userCredentialsKeys } from './keys';

/** Query to get the credentials saved in the storage. */
export const useUserCredentials = () => useQuery({
  queryKey: userCredentialsKeys.current(),
  queryFn: () => UserCredentialsStorageService.get(),
  staleTime: Infinity,
});
