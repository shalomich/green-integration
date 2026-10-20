import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type FC, type PropsWithChildren } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

afterEach(() => {
  queryClient.clear();
});

/** React query wrapper component for tests. */
export const QueryClientWrapper: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);
