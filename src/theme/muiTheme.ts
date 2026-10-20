import { createTheme } from '@mui/material';

/**
 * Material UI theme with CSS variables support.
 * Learn more: https://mui.com/material-ui/customization/css-theme-variables/overview/.
 */
export const muiTheme = createTheme({
  cssVariables: {
    nativeColor: true,
  },
  typography: {
    fontFamily: 'var(--font-family)',
  },
  palette: {
    primary: {
      main: 'var(--schemes-primary)',
      contrastText: 'var(--schemes-on-primary)',
    },
    error: {
      main: 'var(--schemes-error)',
      contrastText: 'var(--schemes-on-error)',
    },
  },
});
