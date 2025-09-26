import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { AgriculturalProvider } from './context/AgriculturalContext';
import HomeScreen from './screens/HomeScreen';

// Create modern ethereal green theme for MAONO
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7DD3FC', // Ethereal soft green-blue
      light: '#A7F3D0',
      dark: '#059669',
    },
    secondary: {
      main: '#6EE7B7', // Soft mint green
      light: '#A7F3D0',
      dark: '#047857',
    },
    background: {
      default: '#0F1419', // Deep forest dark
      paper: 'rgba(15, 20, 25, 0.8)', // Glass morphism effect
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0BEC5',
    },
    error: {
      main: '#F87171',
    },
    warning: {
      main: '#FBBF24',
    },
    info: {
      main: '#7DD3FC',
    },
    success: {
      main: '#6EE7B7',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      '@media (max-width: 600px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      '@media (max-width: 600px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4,
      '@media (max-width: 600px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
      '@media (max-width: 600px)': {
        fontSize: '1.25rem',
      },
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
      '@media (max-width: 600px)': {
        fontSize: '1.1rem',
      },
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
      '@media (max-width: 600px)': {
        fontSize: '0.9rem',
      },
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      '@media (max-width: 600px)': {
        fontSize: '0.9rem',
        lineHeight: 1.7,
      },
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      '@media (max-width: 600px)': {
        fontSize: '0.8rem',
        lineHeight: 1.7,
      },
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          background: 'rgba(15, 20, 25, 0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '@media (max-width: 600px)': {
            borderRadius: 12,
            margin: '8px',
            padding: '16px',
          },
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(125, 211, 252, 0.3)',
            '@media (max-width: 600px)': {
              transform: 'translateY(-2px)', // Reduced hover effect on mobile
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
          fontSize: '0.95rem',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          minHeight: '44px', // Minimum touch target size
          '@media (max-width: 600px)': {
            padding: '14px 20px',
            fontSize: '0.9rem',
            minHeight: '48px', // Larger touch targets on mobile
          },
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(125, 211, 252, 0.3)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #7DD3FC 0%, #059669 100%)',
          boxShadow: '0 4px 16px rgba(125, 211, 252, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #A7F3D0 0%, #7DD3FC 100%)',
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          background: 'linear-gradient(135deg, #7DD3FC 0%, #059669 100%)',
          boxShadow: '0 8px 24px rgba(125, 211, 252, 0.4)',
          '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: '0 12px 32px rgba(125, 211, 252, 0.5)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(15, 20, 25, 0.6)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(10, 11, 13, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
  },
});

// Main App component following React Native patterns
const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0
      }}>
        <AgriculturalProvider>
          <HomeScreen />
        </AgriculturalProvider>
      </Box>
    </ThemeProvider>
  );
};

export default App;
