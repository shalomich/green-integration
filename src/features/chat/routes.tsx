import { lazy } from 'react';
import { type RouteObject } from 'react-router';

import { AuthGuard } from 'src/routes/guards/authGuard';

import { EmptyChat } from './components/EmptyChat';

const ChatsPage = lazy(() => import('./pages').then(module => ({ default: module.ChatsPage })));
const ChatPage = lazy(() => import('./pages').then(module => ({ default: module.ChatPage })));

/** Chat routes. */
export const chatRoutes: RouteObject[] = [
  {
    element: <AuthGuard />,
    children: [
      {
        path: '/',
        element: <ChatsPage />,
        children: [
          {
            index: true,
            element: <EmptyChat />,
          },
          {
            path: 'chat/:id',
            element: <ChatPage />,
          },
        ],
      },
    ],
  },
];
