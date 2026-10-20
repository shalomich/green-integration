import { ThemeProvider } from '@emotion/react';
import { type RenderOptions, render as rtlRender } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { type FC, type PropsWithChildren, type ReactElement } from 'react';
import { type Except } from 'type-fest';

import { muiTheme } from 'src/theme';

import { QueryClientWrapper } from './QueryClientWrapper';

type RenderConfiguration = Readonly<{

  /** Initial route of the rendered component. */
  initialRoute?: string;
}> & Except<RenderOptions, 'queries'>;

/**
 * Render function that provides integration with react query.
 * @param ui React element.
 * @param config Render options.
 */
export const render = (
  ui: ReactElement,
  {
    initialRoute = '/',
    ...renderOptions
  }: RenderConfiguration = {},
) => {
  window.history.pushState({}, 'Test page', initialRoute);

  const Wrapper: FC<PropsWithChildren> = ({ children }) => (
    <QueryClientWrapper>
      <ThemeProvider theme={muiTheme}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientWrapper>
  );

  return {
    ...rtlRender(
      ui,
      {
        wrapper: Wrapper,
        ...renderOptions,
      },
    ),
  };
};
