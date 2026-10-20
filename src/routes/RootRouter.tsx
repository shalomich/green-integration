import { type FC } from 'react';
import { Navigate, type RouteObject, useRoutes } from 'react-router';

import { authRoutes } from 'src/features/auth/routes';
import { chatRoutes } from 'src/features/chat/routes';

const routes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/" />,
  },
  ...authRoutes,
  ...chatRoutes,
];

/** Root router. */
export const RootRouter: FC = () => useRoutes(routes);
