import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { reportWebVitals } from './reportWebVitals';
import { App } from './App';
import { muiTheme } from './theme';

const rootElement = document.getElementById('root');
if (rootElement == null) {
  throw new Error('Failed to find root element');
}

// TODO (template preparation): Setup query client for your needs in the project.
const queryClient = new QueryClient();

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={muiTheme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
