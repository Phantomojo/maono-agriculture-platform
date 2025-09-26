import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Container, 
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Fab,
  Button
} from '@mui/material';
import { 
  Notifications as NotificationsIcon,
  Add as AddIcon,
  Dashboard as DashboardIcon
} from '@mui/icons-material';
import WeatherCard from '../components/WeatherCard';
import MarketPriceCard from '../components/MarketPriceCard';
import { useWeatherData, useMarketPrices } from '../hooks';
import { 
  GetStartedPresentation,
  WeatherIntelligencePresentation,
  MarketIntelligencePresentation,
  FarmManagementPresentation,
  AnalyticsPresentation,
  PresentationIndex
} from '../presentations';
import JudgePresentation from '../presentations/JudgePresentation';
import ORUNStylePresentation from '../presentations/ORUNStylePresentation';

// HomeScreen component with modern biotech-inspired design
const HomeScreen: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | undefined>();
  const [currentView, setCurrentView] = useState<'home' | 'weather' | 'markets' | 'farms' | 'analytics'>('home');
  const [showPresentations, setShowPresentations] = useState(false);
  const [currentPresentation, setCurrentPresentation] = useState<string | null>(null);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  
  // Check if this is a first visit and show presentation
  useEffect(() => {
    const hasSeenPresentation = localStorage.getItem('maono-presentation-seen');
    if (!hasSeenPresentation) {
      setIsFirstVisit(true);
      setCurrentPresentation('orun-style-presentation');
    }
  }, []);

  // Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Default to Nairobi coordinates
          setCurrentLocation({ latitude: -1.2921, longitude: 36.8219 });
        }
      );
    }
  }, []);

  const { weather, loading: weatherLoading, error: weatherError } = useWeatherData(currentLocation);
  const { prices, loading: pricesLoading, error: pricesError } = useMarketPrices();

  // Handle presentation navigation
  const handleStartPresentation = (presentationType: string) => {
    setCurrentPresentation(presentationType);
    setShowPresentations(false);
  };

  const handleClosePresentation = () => {
    setCurrentPresentation(null);
    setShowPresentations(false);
    // Mark presentation as seen for future visits
    if (isFirstVisit) {
      localStorage.setItem('maono-presentation-seen', 'true');
      setIsFirstVisit(false);
    }
  };

  // Render presentations
  if (showPresentations) {
    return <PresentationIndex onClose={() => setShowPresentations(false)} onStartPresentation={handleStartPresentation} />;
  }

  if (currentPresentation === 'orun-style-presentation') {
    return <ORUNStylePresentation onClose={handleClosePresentation} onOpenDashboard={() => {
      handleClosePresentation();
      // Mark presentation as seen and open dashboard
      localStorage.setItem('maono-presentation-seen', 'true');
      setIsFirstVisit(false);
    }} />;
  }

  if (currentPresentation === 'judge-presentation') {
    return <JudgePresentation onClose={handleClosePresentation} />;
  }

  if (currentPresentation === 'get-started') {
    return <GetStartedPresentation onClose={handleClosePresentation} />;
  }

  if (currentPresentation === 'weather-intelligence') {
    return <WeatherIntelligencePresentation onClose={handleClosePresentation} />;
  }

  if (currentPresentation === 'market-intelligence') {
    return <MarketIntelligencePresentation onClose={handleClosePresentation} />;
  }

  if (currentPresentation === 'farm-management') {
    return <FarmManagementPresentation onClose={handleClosePresentation} />;
  }

  if (currentPresentation === 'analytics') {
    return <AnalyticsPresentation onClose={handleClosePresentation} />;
  }

  // Render different pages based on current view
  if (currentView === 'weather') {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Weather Intelligence</Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>AI-powered weather predictions for better farming decisions.</Typography>
        <Button variant="contained" onClick={() => setCurrentView('home')}>Back to Home</Button>
      </Box>
    );
  }
  
  if (currentView === 'markets') {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Market Intelligence</Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>Real-time market prices and trading opportunities.</Typography>
        <Button variant="contained" onClick={() => setCurrentView('home')}>Back to Home</Button>
      </Box>
    );
  }
  
  if (currentView === 'farms') {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Farm Management</Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>Comprehensive farm management and optimization tools.</Typography>
        <Button variant="contained" onClick={() => setCurrentView('home')}>Back to Home</Button>
      </Box>
    );
  }
  
  if (currentView === 'analytics') {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Analytics Dashboard</Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>Data-driven insights and performance analytics.</Typography>
        <Button variant="contained" onClick={() => setCurrentView('home')}>Back to Home</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      flexGrow: 1, 
      backgroundColor: 'background.default', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0A0D0F 0%, #0F1A0F 50%, #0A0D0F 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Agricultural Background Animations */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(125, 211, 252, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(110, 231, 183, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(125, 211, 252, 0.04) 0%, transparent 50%)
        `,
        animation: 'float 20s ease-in-out infinite',
        '@keyframes float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(1deg)' },
        }
      }} />
      
      {/* Floating Agricultural Particles */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        '&::before': {
          content: '"🌱"',
          position: 'absolute',
          top: '10%',
          left: '10%',
          fontSize: '20px',
          animation: 'floatParticle 15s ease-in-out infinite',
          opacity: 0.3,
        },
        '&::after': {
          content: '"🌾"',
          position: 'absolute',
          top: '20%',
          right: '15%',
          fontSize: '18px',
          animation: 'floatParticle 18s ease-in-out infinite 2s',
          opacity: 0.3,
        },
        '@keyframes floatParticle': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: 0.3 },
          '50%': { transform: 'translateY(-30px) rotate(5deg)', opacity: 0.6 },
        }
      }} />
      
      {/* Additional floating elements */}
      {[...Array(6)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: '16px',
            opacity: 0.2,
            animation: `floatParticle ${15 + Math.random() * 10}s ease-in-out infinite ${Math.random() * 5}s`,
            '@keyframes floatParticle': {
              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: 0.2 },
              '50%': { transform: 'translateY(-40px) rotate(10deg)', opacity: 0.4 },
            }
          }}
        >
          {['🌱', '🌾', '🌿', '🌾', '🌱', '🌿'][i]}
        </Box>
      ))}

      {/* Modern Header */}
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box sx={{
              width: 40,
              height: 40,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #7DD3FC 0%, #6EE7B7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
              boxShadow: '0 4px 16px rgba(0, 212, 255, 0.3)'
            }}>
              <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>M</Typography>
            </Box>
            <Typography variant="h5" sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #7DD3FC 0%, #6EE7B7 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em'
            }}>
              MAONO
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setShowPresentations(true)}
              sx={{ 
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': { 
                  backgroundColor: 'rgba(125, 211, 252, 0.1)',
                  borderColor: 'primary.light'
                }
              }}
            >
              📚 Presentations
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                localStorage.removeItem('maono-presentation-seen');
                setCurrentPresentation('orun-style-presentation');
                setIsFirstVisit(true);
              }}
              sx={{ 
                borderColor: 'secondary.main',
                color: 'secondary.main',
                '&:hover': { 
                  backgroundColor: 'rgba(110, 231, 183, 0.1)',
                  borderColor: 'secondary.light'
                }
              }}
            >
              🔄 Reset Presentation
            </Button>
            <IconButton 
              onClick={() => setCurrentView('analytics')}
              sx={{ 
                color: 'primary.main',
                '&:hover': { 
                  backgroundColor: 'rgba(0, 212, 255, 0.1)',
                  transform: 'scale(1.1)'
                }
              }}
            >
              <DashboardIcon />
            </IconButton>
            <IconButton sx={{ 
              color: 'text.secondary',
              '&:hover': { 
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'scale(1.1)'
              }
            }}>
              <NotificationsIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
        {/* Hero Section */}
        <Box sx={{ 
          textAlign: 'center', 
          mb: 8,
          position: 'relative',
          zIndex: 2
        }}>
          <Typography variant="h1" sx={{ 
            mb: 3,
            background: 'linear-gradient(135deg, #FFFFFF 0%, #7DD3FC 50%, #6EE7B7 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
            letterSpacing: '-0.03em'
          }}>
            Agricultural Intelligence
          </Typography>
          <Typography variant="h4" sx={{ 
            mb: 4, 
            color: 'text.secondary',
            fontWeight: 400,
            maxWidth: '800px',
            mx: 'auto',
            lineHeight: 1.4
          }}>
            Transform your farming operations with AI-powered insights, 
            real-time weather monitoring, and global market intelligence.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => setCurrentView('analytics')}
              sx={{ 
                px: 4, 
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600
              }}
            >
              🌍 Explore Global Network
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{ 
                px: 4, 
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  borderColor: 'primary.light',
                  backgroundColor: 'rgba(0, 212, 255, 0.1)'
                }
              }}
            >
              📊 View Analytics
            </Button>
          </Box>
        </Box>

        {/* Weather Section */}
        <Typography variant="h5" sx={{ 
          fontWeight: 'bold', 
          mb: 2, 
          color: 'text.primary',
          fontSize: { xs: '1.3rem', md: '1.5rem' }
        }}>
          Current Weather
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
          {weather && (
            <Grid size={{ xs: 12, md: 6 }}>
              <WeatherCard 
                weatherData={weather} 
                loading={weatherLoading}
                refreshing={weatherLoading}
                onPress={() => setCurrentView('weather')}
              />
            </Grid>
          )}
          {weatherLoading && !weather && (
            <Grid size={{ xs: 12, md: 6 }}>
              <WeatherCard 
                weatherData={weather || {
                  id: 'loading',
                  location: 'Loading...',
                  temperature: 0,
                  humidity: 0,
                  windSpeed: 0,
                  condition: 'Loading',
                  icon: '⏳',
                  timestamp: new Date(),
                  coordinates: { latitude: 0, longitude: 0 }
                }}
                loading={true}
                onPress={() => setCurrentView('weather')}
              />
            </Grid>
          )}
          {weatherError && (
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ 
                p: 3, 
                textAlign: 'center', 
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                border: '1px solid rgba(244, 67, 54, 0.3)',
                borderRadius: 2
              }}>
                <Typography color="error" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                  Error loading weather: {weatherError}
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>

        {/* Market Prices Section */}
        <Typography variant="h5" sx={{ 
          fontWeight: 'bold', 
          mb: 2, 
          color: 'text.primary',
          fontSize: { xs: '1.3rem', md: '1.5rem' }
        }}>
          Market Prices
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
          {prices.map((price) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={price.id}>
              <MarketPriceCard 
                marketPrice={price} 
                loading={pricesLoading}
                refreshing={pricesLoading}
                onPress={() => setCurrentView('markets')}
              />
            </Grid>
          ))}
          {pricesLoading && prices.length === 0 && (
            <>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <MarketPriceCard 
                  marketPrice={{
                    id: 'loading1',
                    marketName: 'Loading...',
                    crop: 'Loading',
                    price: 0,
                    unit: 'kg',
                    change: 0,
                    lastUpdated: new Date(),
                    coordinates: { latitude: 0, longitude: 0 }
                  }}
                  loading={true}
                  onPress={() => setCurrentView('markets')}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <MarketPriceCard 
                  marketPrice={{
                    id: 'loading2',
                    marketName: 'Loading...',
                    crop: 'Loading',
                    price: 0,
                    unit: 'kg',
                    change: 0,
                    lastUpdated: new Date(),
                    coordinates: { latitude: 0, longitude: 0 }
                  }}
                  loading={true}
                  onPress={() => setCurrentView('markets')}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <MarketPriceCard 
                  marketPrice={{
                    id: 'loading3',
                    marketName: 'Loading...',
                    crop: 'Loading',
                    price: 0,
                    unit: 'kg',
                    change: 0,
                    lastUpdated: new Date(),
                    coordinates: { latitude: 0, longitude: 0 }
                  }}
                  loading={true}
                  onPress={() => setCurrentView('markets')}
                />
              </Grid>
            </>
          )}
          {pricesError && (
            <Grid size={{ xs: 12 }}>
              <Paper sx={{ 
                p: 3, 
                textAlign: 'center', 
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                border: '1px solid rgba(244, 67, 54, 0.3)',
                borderRadius: 2
              }}>
                <Typography color="error" sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}>
                  Error loading market prices: {pricesError}
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>

        {/* Quick Actions */}
        <Paper sx={{ p: 3, backgroundColor: 'background.paper' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper 
                onClick={() => setCurrentView('weather')}
                sx={{ 
                  p: 2, 
                  textAlign: 'center', 
                  cursor: 'pointer', 
                  '&:hover': { 
                    backgroundColor: 'primary.dark', 
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(125, 211, 252, 0.3)'
                  } 
                }}
              >
                <Typography variant="h6">🌦️ Weather</Typography>
                <Typography variant="body2">Check weather conditions</Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper 
                onClick={() => setCurrentView('markets')}
                sx={{ 
                  p: 2, 
                  textAlign: 'center', 
                  cursor: 'pointer', 
                  '&:hover': { 
                    backgroundColor: 'secondary.dark', 
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(110, 231, 183, 0.3)'
                  } 
                }}
              >
                <Typography variant="h6">💰 Markets</Typography>
                <Typography variant="body2">View market prices</Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper 
                onClick={() => setCurrentView('farms')}
                sx={{ 
                  p: 2, 
                  textAlign: 'center', 
                  cursor: 'pointer', 
                  '&:hover': { 
                    backgroundColor: 'warning.dark', 
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(251, 191, 36, 0.3)'
                  } 
                }}
              >
                <Typography variant="h6">🚜 Farms</Typography>
                <Typography variant="body2">Manage your farms</Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper 
                onClick={() => setCurrentView('analytics')}
                sx={{ 
                  p: 2, 
                  textAlign: 'center', 
                  cursor: 'pointer', 
                  '&:hover': { 
                    backgroundColor: 'info.dark', 
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(125, 211, 252, 0.3)'
                  } 
                }}
              >
                <Typography variant="h6">📊 Analytics</Typography>
                <Typography variant="body2">View insights</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Floating Action Button */}
      <Fab 
        color="primary" 
        aria-label="add" 
        sx={{ 
          position: 'fixed', 
          bottom: 16, 
          right: 16,
          backgroundColor: 'primary.main',
          '&:hover': { backgroundColor: 'primary.dark', transform: 'scale(1.1)' }
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default HomeScreen;


