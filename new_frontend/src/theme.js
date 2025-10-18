import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#c5fa50', // Green from old frontend
      contrastText: '#000000',
    },
    secondary: {
      main: '#f7cc2e', // Yellow accent from old frontend
      contrastText: '#000000',
    },
    background: {
      default: '#000000',
      paper: '#121212',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Monda", "Lora", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      fontFamily: 'Lora, serif',
      lineHeight: 1.7,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      fontFamily: 'Lora, serif',
      lineHeight: 1.7,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      fontFamily: 'Lora, serif',
      lineHeight: 1.7,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      fontFamily: 'Lora, serif',
      lineHeight: 1.7,
    },
    body1: {
      fontFamily: 'Monda, sans-serif',
      lineHeight: 2,
    },
    body2: {
      fontFamily: 'Monda, sans-serif',
      lineHeight: 2,
    },
    button: {
      fontFamily: 'Monda, sans-serif',
      textTransform: 'none',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#c5fa50 #121212",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#121212",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#c5fa50",
            minHeight: 24,
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#c5fa50",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#c5fa50",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#c5fa50",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#121212",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          backgroundColor: '#c5fa50',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#b3e546',
          },
        },
        outlined: {
          borderColor: '#c5fa50',
          color: '#c5fa50',
          '&:hover': {
            borderColor: '#b3e546',
            backgroundColor: 'rgba(197, 250, 80, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#121212',
          backgroundImage: 'none',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
          backgroundImage: 'none',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#000000',
          backgroundImage: 'none',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#121212',
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;
