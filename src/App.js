import React, { useState, Suspense, lazy } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Box,
  Container,
  Button,
  Fade,
  Slide,
  Chip,
  Avatar,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  Map as MapIcon,
  Store as StoreIcon,
  People as PeopleIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  WbSunny as WeatherIcon,
  Work as WorkIcon,
  TrendingUp as TrendingUpIcon,
  Email as EmailIcon,
  Badge as BadgeIcon,
} from '@mui/icons-material';

// Lazy load screens for better mobile performance
const MapScreen = lazy(() => import('./screens/MapScreen'));
const ComprehensiveMarketplace = lazy(() => import('./screens/ComprehensiveMarketplace'));
const ProfileScreen = lazy(() => import('./screens/ProfileScreen'));
const BuyerDashboard = lazy(() => import('./screens/BuyerDashboard'));
const WeatherAssistant = lazy(() => import('./screens/WeatherAssistant'));
import TestScreen from './screens/TestScreen';

function App() {
  const [currentTab, setCurrentTab] = useState(0);
  const [userRole, setUserRole] = useState('farmer'); // 'farmer' or 'buyer'
  const [isLoaded, setIsLoaded] = useState(false);

  // Prevent layout shift by waiting for styles to load
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleRoleChange = (role) => {
    setUserRole(role);
    setCurrentTab(0); // Reset to first tab when switching roles
  };

  const renderScreen = () => {
    if (userRole === 'buyer') {
      switch (currentTab) {
        case 0:
          return <BuyerDashboard />;
        case 1:
          return <ComprehensiveMarketplace />;
        case 2:
          return <ProfileScreen />;
        default:
          return <BuyerDashboard />;
      }
    } else {
      switch (currentTab) {
        case 0:
          return <MapScreen />;
        case 1:
          return <WeatherAssistant />;
        case 2:
          return <ComprehensiveMarketplace />;
        case 3:
          return <ProfileScreen />;
        default:
          return <MapScreen />;
      }
    }
  };

  if (!isLoaded) {
    return (
      <Box sx={{ 
        flexGrow: 1, 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
      }}>
        <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 600 }}>
          🌱 Loading MAONO...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header - Ultrahuman Style */}
      <AppBar 
        position="static" 
        sx={{ 
          backgroundColor: '#0A0A0A', 
          borderBottom: '1px solid #1A1A1A',
          backdropFilter: 'blur(20px)',
          background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Avatar 
              sx={{ 
                backgroundColor: '#4CAF50', 
                mr: 2, 
                width: 32, 
                height: 32,
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              M
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
              MAONO
            </Typography>
            <Chip 
              label={userRole === 'farmer' ? 'Farmer' : 'Buyer'} 
              size="small" 
              sx={{ 
                ml: 2, 
                backgroundColor: '#4CAF50', 
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '12px'
              }} 
            />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Messages & Notifications */}
            <IconButton 
              size="small"
              sx={{ 
                color: '#B0B0B0',
                '&:hover': { color: '#4CAF50' }
              }}
            >
              <BadgeIcon />
            </IconButton>
            <IconButton 
              size="small"
              sx={{ 
                color: '#B0B0B0',
                '&:hover': { color: '#4CAF50' }
              }}
            >
              <EmailIcon />
            </IconButton>
            <IconButton 
              size="small"
              sx={{ 
                color: '#B0B0B0',
                '&:hover': { color: '#4CAF50' }
              }}
            >
              <NotificationsIcon />
            </IconButton>
            
            {/* Role Buttons */}
            <Button
              variant={userRole === 'farmer' ? 'contained' : 'text'}
              size="small"
              onClick={() => handleRoleChange('farmer')}
              sx={{ 
                backgroundColor: userRole === 'farmer' ? '#4CAF50' : 'transparent',
                color: userRole === 'farmer' ? '#FFFFFF' : '#B0B0B0',
                borderRadius: '20px',
                px: 2,
                py: 0.5,
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: userRole === 'farmer' ? '#45A049' : 'rgba(76, 175, 80, 0.1)',
                }
              }}
            >
              👨‍🌾 Farmer
            </Button>
            <Button
              variant={userRole === 'buyer' ? 'contained' : 'text'}
              size="small"
              onClick={() => handleRoleChange('buyer')}
              sx={{ 
                backgroundColor: userRole === 'buyer' ? '#4CAF50' : 'transparent',
                color: userRole === 'buyer' ? '#FFFFFF' : '#B0B0B0',
                borderRadius: '20px',
                px: 2,
                py: 0.5,
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: userRole === 'buyer' ? '#45A049' : 'rgba(76, 175, 80, 0.1)',
                }
              }}
            >
              🛒 Buyer
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content - Ultrahuman Style */}
      <Fade in={true} timeout={500}>
        <Box sx={{ 
          flexGrow: 1, 
          overflow: 'auto', 
          pb: 7,
          background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
          minHeight: 'calc(100vh - 64px - 56px)',
        }}>
          <Suspense fallback={
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '50vh',
              flexDirection: 'column',
              gap: 2
            }}>
              <CircularProgress sx={{ color: '#4CAF50' }} />
              <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                Loading...
              </Typography>
            </Box>
          }>
            {renderScreen()}
          </Suspense>
        </Box>
      </Fade>

      {/* Bottom Navigation - Ultrahuman Style */}
      <Slide direction="up" in={true} timeout={300}>
        <Paper 
          sx={{ 
            position: 'fixed', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            zIndex: 1000, 
            backgroundColor: '#0A0A0A', 
            borderTop: '1px solid #1A1A1A',
            backdropFilter: 'blur(20px)',
            background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
            borderRadius: '20px 20px 0 0',
          }} 
          elevation={8}
        >
          <BottomNavigation
            value={currentTab}
            onChange={handleTabChange}
            showLabels
            sx={{
              backgroundColor: 'transparent',
              '& .MuiBottomNavigationAction-root': {
                color: '#6B6B6B',
                fontSize: '10px',
                fontWeight: 500,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&.Mui-selected': {
                  color: '#4CAF50',
                  fontSize: '11px',
                  fontWeight: 600,
                },
                '&:hover': {
                  color: '#4CAF50',
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                },
              },
              '& .MuiBottomNavigationAction-label': {
                fontSize: '10px',
                fontWeight: 500,
                mt: 0.5,
                '&.Mui-selected': {
                  fontSize: '11px',
                  fontWeight: 600,
                },
              },
            }}
          >
          {userRole === 'farmer' ? (
            <>
              <BottomNavigationAction
                label="Map"
                icon={<MapIcon />}
                onClick={() => handleTabChange(null, 0)}
              />
              <BottomNavigationAction
                label="Weather"
                icon={<WeatherIcon />}
                onClick={() => handleTabChange(null, 1)}
              />
              <BottomNavigationAction
                label="Marketplace"
                icon={<StoreIcon />}
                onClick={() => handleTabChange(null, 2)}
              />
              <BottomNavigationAction
                label="Profile"
                icon={<PersonIcon />}
                onClick={() => handleTabChange(null, 3)}
              />
            </>
          ) : (
            <>
              <BottomNavigationAction
                label="Dashboard"
                icon={<MapIcon />}
                onClick={() => handleTabChange(null, 0)}
              />
              <BottomNavigationAction
                label="Marketplace"
                icon={<StoreIcon />}
                onClick={() => handleTabChange(null, 1)}
              />
              <BottomNavigationAction
                label="Profile"
                icon={<PersonIcon />}
                onClick={() => handleTabChange(null, 2)}
              />
            </>
          )}
        </BottomNavigation>
      </Paper>
      </Slide>
    </Box>
  );
}

export default App;

