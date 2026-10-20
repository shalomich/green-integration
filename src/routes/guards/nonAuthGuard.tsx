import { type FC } from 'react';
import { Navigate, Outlet, useSearchParams } from 'react-router';

import { useUserCredentials } from 'src/store/queries/userCredentials/userCredentialsQueries';

/** Non auth guard. */
export const NonAuthGuard: FC = () => {
  const { isPending, data: credentials } = useUserCredentials();
  const [search] = useSearchParams();

  if (credentials != null && !isPending) {
    const redirect = search.get('next') ?? '';
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
