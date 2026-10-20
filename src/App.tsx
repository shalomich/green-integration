import { type FC, Suspense } from 'react';

import { AppLoadingSpinner } from './components/AppLoadingSpinner';
import { RootRouter } from './routes/RootRouter';
import './theme';

/** App component. */
export const App: FC = () => (
  <Suspense fallback={<AppLoadingSpinner />}>
    <RootRouter />
  </Suspense>
);
