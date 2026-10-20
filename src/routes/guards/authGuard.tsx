import { type FC } from 'react';
import {
  Navigate, Outlet, type To, useLocation,
} from 'react-router';

import { useUserCredentials } from 'src/store/queries/userCredentials/userCredentialsQueries';

/** Auth guard. */
export const AuthGuard: FC = () => {
  const { isPending, data: credentials } = useUserCredentials();
  const location = useLocation();

  const redirect: To = {
    pathname: 'login',
    search: new URLSearchParams({
      next: location.pathname.concat(location.search),
    }).toString(),
  };

  if (credentials == null && !isPending) {
    return <Navigate to={redirect} replace />;
  }

  return <Outlet />;
};
