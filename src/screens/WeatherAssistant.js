import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Button,
  Alert,
  AlertTitle,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
} from '@mui/material';
import {
  WbSunny as SunIcon,
  Cloud as CloudIcon,
  Thunderstorm as StormIcon,
  Water as RainIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingIcon,
  Phone as PhoneIcon,
  Sms as SmsIcon,
  LocationOn as LocationIcon,
  Agriculture as AgricultureIcon,
  Thermostat as ThermostatIcon,
  Speed as SpeedIcon,
  Visibility as VisibilityIcon,
  AcUnit as FrostIcon,
  WbTwilight as TwilightIcon,
  Nature as EcoIcon,
  Storage as StorageIcon,
  DirectionsCar as TransportIcon,
  AttachMoney as MoneyIcon,
  Download as DownloadIcon,
  Sync as SyncIcon,
  Notifications as NotificationIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const weatherData = {
  current: {
    temperature: 28,
    condition: 'Sunny',
    humidity: 65,
    windSpeed: 12,
    windDirection: 'NE',
    uvIndex: 8,
    visibility: 10,
    pressure: 1013,
    dewPoint: 20,
    soilMoisture: 75,
    soilTemperature: 24,
    frostRisk: 'Low',
    heatStress: 'Moderate',
    location: {
      lat: -1.2921,
      lng: 36.8219,
      address: 'Nairobi, Kenya',
      elevation: 1795
    }
  },
  forecast: [
    { day: 'Today', high: 32, low: 22, condition: 'Sunny', icon: '☀️', alert: null },
    { day: 'Tomorrow', high: 30, low: 20, condition: 'Partly Cloudy', icon: '⛅', alert: null },
    { day: 'Day 3', high: 28, low: 18, condition: 'Rain', icon: '🌧️', alert: 'Heavy rain expected' },
    { day: 'Day 4', high: 26, low: 16, condition: 'Thunderstorm', icon: '⛈️', alert: 'Severe weather warning' },
    { day: 'Day 5', high: 24, low: 14, condition: 'Cloudy', icon: '☁️', alert: null },
    { day: 'Day 6', high: 27, low: 17, condition: 'Sunny', icon: '☀️', alert: null },
    { day: 'Day 7', high: 29, low: 19, condition: 'Sunny', icon: '☀️', alert: null },
  ],
  alerts: [
    {
      type: 'warning',
      title: 'Heavy Rain Alert',
      message: 'Heavy rainfall expected in 2 days. Consider delaying planting.',
      severity: 'high',
      action: 'Delay planting by 3-5 days',
    },
    {
      type: 'info',
      title: 'Optimal Planting Window',
      message: 'Perfect conditions for maize planting in the next 3 days.',
      severity: 'medium',
      action: 'Plant maize seeds now',
    },
  ],
  recommendations: [
    {
      crop: 'Maize',
      action: 'Plant now',
      reason: 'Optimal soil moisture and temperature',
      priority: 'high',
    },
    {
      crop: 'Tomatoes',
      action: 'Delay planting',
      reason: 'Heavy rain expected in 2 days',
      priority: 'medium',
    },
    {
      crop: 'Beans',
      action: 'Harvest soon',
      reason: 'Perfect dry conditions for harvesting',
      priority: 'high',
    },
  ],
  smsAlerts: [
    {
      type: 'weather',
      message: 'Heavy rain expected in your area tomorrow. Consider covering crops.',
      sent: true,
    },
    {
      type: 'market',
      message: 'Maize prices up 15% this week. Good time to sell!',
      sent: true,
    },
  ],
  farmingIntelligence: {
    cropRotation: [
      { crop: 'Maize', nextCrop: 'Beans', reason: 'Nitrogen fixation for soil health', timing: 'Next season' },
      { crop: 'Tomatoes', nextCrop: 'Lettuce', reason: 'Different root depth prevents disease', timing: '3 months' }
    ],
    fertilizerTiming: [
      { crop: 'Maize', fertilizer: 'NPK 23:23:0', timing: 'Now', reason: 'Optimal soil moisture and temperature' },
      { crop: 'Tomatoes', fertilizer: 'Compost', timing: 'Next week', reason: 'Before heavy rain period' }
    ],
    harvestOptimization: [
      { crop: 'Maize', optimalHarvest: 'Next 5 days', reason: 'Dry conditions prevent mold', yield: '85% expected' },
      { crop: 'Beans', optimalHarvest: 'Next 2 weeks', reason: 'Perfect drying weather', yield: '90% expected' }
    ],
    storageConditions: [
      { crop: 'Maize', temperature: '15-20°C', humidity: '60-70%', duration: '6 months', alert: 'Monitor for pests' },
      { crop: 'Beans', temperature: '10-15°C', humidity: '50-60%', duration: '12 months', alert: 'Check for weevils' }
    ]
  },
  marketIntegration: {
    priceCorrelation: [
      { crop: 'Maize', currentPrice: '$2.50/kg', weatherImpact: '+6.4%', reason: 'Heavy rain expected' },
      { crop: 'Tomatoes', currentPrice: '$1.80/kg', weatherImpact: '-3.2%', reason: 'Good harvest conditions' }
    ],
    equipmentRental: [
      { equipment: 'Tractor', availability: 'Available', weatherDependency: 'Dry conditions needed', cost: '$50/day' },
      { equipment: 'Irrigation System', availability: 'Available', weatherDependency: 'No rain expected', cost: '$30/day' }
    ],
    transportScheduling: [
      { route: 'Farm to Market', weather: 'Clear', recommendation: 'Schedule transport now', cost: '$25' },
      { route: 'Market to Storage', weather: 'Rain expected', recommendation: 'Delay 2 days', cost: '$30' }
    ]
  },
  offlineCapabilities: {
    lastSync: '2 hours ago',
    cachedData: '7 days forecast',
    aiModels: 'Downloaded',
    coverage: '95% of Kenya',
    nextSync: 'In 4 hours'
  }
};

function WeatherAssistant() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [smsEnabled, setSmsEnabled] = useState(true);

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <SunIcon sx={{ color: '#FF9800' }} />;
      case 'rain': return <RainIcon sx={{ color: '#2196F3' }} />;
      case 'thunderstorm': return <StormIcon sx={{ color: '#9C27B0' }} />;
      case 'cloudy': return <CloudIcon sx={{ color: '#757575' }} />;
      default: return <SunIcon sx={{ color: '#FF9800' }} />;
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'warning': return 'error';
      case 'info': return 'info';
      case 'success': return 'success';
      default: return 'info';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#757575';
    }
  };

  return (
    <Box sx={{ height: '100%', overflow: 'auto', p: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ 
            width: 50, 
            height: 50, 
            borderRadius: '16px', 
            background: 'linear-gradient(135deg, #4CAF50, #45A049)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
            boxShadow: '0 4px 20px rgba(76, 175, 80, 0.3)'
          }}>
            <Typography sx={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 'bold' }}>M</Typography>
          </Box>
          <Box>
            <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold', mb: 0.5 }}>
              🌤️ MAONO AI Weather Assistant
            </Typography>
            <Typography variant="body1" sx={{ color: '#B0B0B0' }}>
              Offline weather predictions and farming recommendations
            </Typography>
          </Box>
        </Box>
        
        {/* Location Info */}
        <Box sx={{ 
          backgroundColor: 'rgba(76, 175, 80, 0.1)', 
          border: '1px solid rgba(76, 175, 80, 0.3)',
          borderRadius: '12px',
          p: 2,
          mb: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocationIcon sx={{ color: '#4CAF50', mr: 1 }} />
            <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
              {weatherData.current.location.address}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
              📍 Coordinates: {weatherData.current.location.lat}, {weatherData.current.location.lng}
            </Typography>
            <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
              🏔️ Elevation: {weatherData.current.location.elevation}m
            </Typography>
            <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
              🌡️ Soil Temp: {weatherData.current.soilTemperature}°C
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Current Weather */}
      <Card sx={{ 
        backgroundColor: 'rgba(45, 45, 45, 0.8)', 
        border: '1px solid rgba(76, 175, 80, 0.3)', 
        mb: 3,
        borderRadius: '16px',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 12px 40px rgba(76, 175, 80, 0.2)',
        }
      }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box sx={{ 
              width: 40, 
              height: 40, 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, #4CAF50, #45A049)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2
            }}>
              <ThermostatIcon sx={{ color: '#FFFFFF', fontSize: 20 }} />
            </Box>
            <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
              Current Conditions
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {getWeatherIcon(weatherData.current.condition)}
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h3" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                    {weatherData.current.temperature}°C
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#B0B0B0' }}>
                    {weatherData.current.condition}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper sx={{ 
                    p: 2, 
                    backgroundColor: 'rgba(76, 175, 80, 0.1)', 
                    border: '1px solid rgba(76, 175, 80, 0.2)',
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <Typography variant="body2" sx={{ color: '#B0B0B0', mb: 1 }}>Humidity</Typography>
                    <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>{weatherData.current.humidity}%</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ 
                    p: 2, 
                    backgroundColor: 'rgba(33, 150, 243, 0.1)', 
                    border: '1px solid rgba(33, 150, 243, 0.2)',
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <Typography variant="body2" sx={{ color: '#B0B0B0', mb: 1 }}>Wind</Typography>
                    <Typography variant="h6" sx={{ color: '#2196F3', fontWeight: 'bold' }}>{weatherData.current.windSpeed} km/h</Typography>
                    <Typography variant="caption" sx={{ color: '#B0B0B0' }}>{weatherData.current.windDirection}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ 
                    p: 2, 
                    backgroundColor: 'rgba(255, 152, 0, 0.1)', 
                    border: '1px solid rgba(255, 152, 0, 0.2)',
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <Typography variant="body2" sx={{ color: '#B0B0B0', mb: 1 }}>UV Index</Typography>
                    <Typography variant="h6" sx={{ color: '#FF9800', fontWeight: 'bold' }}>{weatherData.current.uvIndex}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ 
                    p: 2, 
                    backgroundColor: 'rgba(156, 39, 176, 0.1)', 
                    border: '1px solid rgba(156, 39, 176, 0.2)',
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <Typography variant="body2" sx={{ color: '#B0B0B0', mb: 1 }}>Visibility</Typography>
                    <Typography variant="h6" sx={{ color: '#9C27B0', fontWeight: 'bold' }}>{weatherData.current.visibility} km</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ 
                    p: 2, 
                    backgroundColor: 'rgba(76, 175, 80, 0.1)', 
                    border: '1px solid rgba(76, 175, 80, 0.2)',
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <Typography variant="body2" sx={{ color: '#B0B0B0', mb: 1 }}>Soil Moisture</Typography>
                    <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>{weatherData.current.soilMoisture}%</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ 
                    p: 2, 
                    backgroundColor: 'rgba(255, 193, 7, 0.1)', 
                    border: '1px solid rgba(255, 193, 7, 0.2)',
                    borderRadius: '12px',
                    textAlign: 'center'
                  }}>
                    <Typography variant="body2" sx={{ color: '#B0B0B0', mb: 1 }}>Frost Risk</Typography>
                    <Chip 
                      label={weatherData.current.frostRisk} 
                      color={weatherData.current.frostRisk === 'Low' ? 'success' : 'warning'} 
                      size="small"
                      sx={{ fontWeight: 'bold' }}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* 7-Day Forecast */}
      <Card sx={{ 
        backgroundColor: 'rgba(45, 45, 45, 0.8)', 
        border: '1px solid rgba(33, 150, 243, 0.3)', 
        mb: 3,
        borderRadius: '16px',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 12px 40px rgba(33, 150, 243, 0.2)',
        }
      }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box sx={{ 
              width: 40, 
              height: 40, 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, #2196F3, #1976D2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2
            }}>
              <CloudIcon sx={{ color: '#FFFFFF', fontSize: 20 }} />
            </Box>
            <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
              7-Day Weather Forecast
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {weatherData.forecast.map((day, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card
                  sx={{
                    backgroundColor: selectedDay === index 
                      ? 'linear-gradient(135deg, #4CAF50, #45A049)' 
                      : 'rgba(30, 30, 30, 0.8)',
                    border: selectedDay === index 
                      ? '2px solid #4CAF50' 
                      : '1px solid rgba(76, 175, 80, 0.2)',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)',
                    '&:hover': { 
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(76, 175, 80, 0.3)',
                      border: '2px solid #4CAF50'
                    },
                  }}
                  onClick={() => setSelectedDay(index)}
                >
                  <CardContent sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ 
                      color: selectedDay === index ? '#FFFFFF' : '#B0B0B0', 
                      mb: 1,
                      fontWeight: 'bold'
                    }}>
                      {day.day}
                    </Typography>
                    <Typography variant="h3" sx={{ mb: 1, fontSize: '2rem' }}>
                      {day.icon}
                    </Typography>
                    <Typography variant="h6" sx={{ 
                      color: selectedDay === index ? '#FFFFFF' : '#FFFFFF', 
                      fontWeight: 'bold',
                      mb: 1
                    }}>
                      {day.high}°/{day.low}°
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: selectedDay === index ? '#FFFFFF' : '#B0B0B0', 
                      fontSize: '0.75rem',
                      mb: 1
                    }}>
                      {day.condition}
                    </Typography>
                    {day.alert && (
                      <Chip
                        label="Alert"
                        color="error"
                        size="small"
                        sx={{ 
                          mt: 1, 
                          fontSize: '0.7rem',
                          fontWeight: 'bold',
                          backgroundColor: 'rgba(244, 67, 54, 0.2)',
                          color: '#F44336',
                          border: '1px solid #F44336'
                        }}
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Weather Alerts */}
      <Card sx={{ 
        backgroundColor: 'rgba(45, 45, 45, 0.8)', 
        border: '1px solid rgba(255, 152, 0, 0.3)', 
        mb: 3,
        borderRadius: '16px',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 12px 40px rgba(255, 152, 0, 0.2)',
        }
      }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box sx={{ 
              width: 40, 
              height: 40, 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, #FF9800, #F57C00)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2
            }}>
              <WarningIcon sx={{ color: '#FFFFFF', fontSize: 20 }} />
            </Box>
            <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
              Weather Alerts & Recommendations
            </Typography>
          </Box>
          {weatherData.alerts.map((alert, index) => (
            <Alert
              key={index}
              severity={getAlertColor(alert.type)}
              sx={{ mb: 2, backgroundColor: '#1E1E1E', color: '#FFFFFF' }}
            >
              <AlertTitle sx={{ color: '#FFFFFF' }}>{alert.title}</AlertTitle>
              {alert.message}
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                  <strong>Action:</strong> {alert.action}
                </Typography>
              </Box>
            </Alert>
          ))}
        </CardContent>
      </Card>

      {/* Crop Recommendations */}
      <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444', mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold', mb: 2 }}>
            AI Crop Recommendations
          </Typography>
          <List>
            {weatherData.recommendations.map((rec, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemIcon>
                  <CheckIcon sx={{ color: getPriorityColor(rec.priority) }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                        {rec.crop}
                      </Typography>
                      <Chip
                        label={rec.action}
                        size="small"
                        sx={{
                          backgroundColor: getPriorityColor(rec.priority),
                          color: '#FFFFFF',
                        }}
                      />
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                      {rec.reason}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* SMS Alerts */}
      <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444', mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
              SMS Alerts
            </Typography>
            <Button
              variant={smsEnabled ? 'contained' : 'outlined'}
              size="small"
              startIcon={<SmsIcon />}
              onClick={() => setSmsEnabled(!smsEnabled)}
              sx={{
                backgroundColor: smsEnabled ? '#4CAF50' : 'transparent',
                color: smsEnabled ? '#FFFFFF' : '#4CAF50',
                borderColor: '#4CAF50',
              }}
            >
              {smsEnabled ? 'Enabled' : 'Enable'}
            </Button>
          </Box>
          {weatherData.smsAlerts.map((alert, index) => (
            <Paper
              key={index}
              sx={{
                backgroundColor: '#1E1E1E',
                border: '1px solid #333',
                p: 2,
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <SmsIcon sx={{ color: '#4CAF50' }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                  {alert.message}
                </Typography>
                <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
                  Sent {alert.sent ? '✓' : 'Pending'}
                </Typography>
              </Box>
            </Paper>
          ))}
        </CardContent>
      </Card>

      {/* Farming Intelligence */}
      <Card sx={{ 
        backgroundColor: 'rgba(45, 45, 45, 0.8)', 
        border: '1px solid rgba(156, 39, 176, 0.3)', 
        mb: 3,
        borderRadius: '16px',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 12px 40px rgba(156, 39, 176, 0.2)',
        }
      }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box sx={{ 
              width: 40, 
              height: 40, 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, #9C27B0, #7B1FA2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2
            }}>
              <Typography sx={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 'bold' }}>M</Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                🧠 MAONO AI Farming Intelligence
              </Typography>
              <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                Powered by MAONO's proprietary AI algorithms
              </Typography>
            </Box>
          </Box>
          
          {/* Crop Rotation */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ color: '#FFFFFF', fontWeight: 600, mb: 1 }}>
              Crop Rotation Suggestions
            </Typography>
            {weatherData.farmingIntelligence.cropRotation.map((rotation, index) => (
              <Paper key={index} sx={{ backgroundColor: '#1E1E1E', p: 2, mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <AgricultureIcon sx={{ color: '#4CAF50' }} />
                  <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                    {rotation.crop} → {rotation.nextCrop}
                  </Typography>
                  <Chip label={rotation.timing} size="small" color="primary" />
                </Box>
                <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                  {rotation.reason}
                </Typography>
              </Paper>
            ))}
          </Box>

          {/* Fertilizer Timing */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ color: '#FFFFFF', fontWeight: 600, mb: 1 }}>
              Fertilizer Timing
            </Typography>
            {weatherData.farmingIntelligence.fertilizerTiming.map((fertilizer, index) => (
              <Paper key={index} sx={{ backgroundColor: '#1E1E1E', p: 2, mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <EcoIcon sx={{ color: '#FF9800' }} />
                  <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                    {fertilizer.crop} - {fertilizer.fertilizer}
                  </Typography>
                  <Chip label={fertilizer.timing} size="small" color="warning" />
                </Box>
                <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                  {fertilizer.reason}
                </Typography>
              </Paper>
            ))}
          </Box>

          {/* Harvest Optimization */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ color: '#FFFFFF', fontWeight: 600, mb: 1 }}>
              Harvest Optimization
            </Typography>
            {weatherData.farmingIntelligence.harvestOptimization.map((harvest, index) => (
              <Paper key={index} sx={{ backgroundColor: '#1E1E1E', p: 2, mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <ScheduleIcon sx={{ color: '#4CAF50' }} />
                  <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                    {harvest.crop} - {harvest.optimalHarvest}
                  </Typography>
                  <Chip label={harvest.yield} size="small" color="success" />
                </Box>
                <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                  {harvest.reason}
                </Typography>
              </Paper>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Market Integration */}
      <Card sx={{ 
        backgroundColor: 'rgba(45, 45, 45, 0.8)', 
        border: '1px solid rgba(255, 193, 7, 0.3)', 
        mb: 3,
        borderRadius: '16px',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 12px 40px rgba(255, 193, 7, 0.2)',
        }
      }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box sx={{ 
              width: 40, 
              height: 40, 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, #FFC107, #FF8F00)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2
            }}>
              <Typography sx={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 'bold' }}>M</Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                💰 MAONO AI Market Integration
              </Typography>
              <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                Real-time market analysis powered by MAONO AI
              </Typography>
            </Box>
          </Box>
          
          {/* Price Correlation */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ color: '#FFFFFF', fontWeight: 600, mb: 1 }}>
              Weather Impact on Prices
            </Typography>
            {weatherData.marketIntegration.priceCorrelation.map((price, index) => (
              <Paper key={index} sx={{ backgroundColor: '#1E1E1E', p: 2, mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <MoneyIcon sx={{ color: '#4CAF50' }} />
                  <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                    {price.crop} - {price.currentPrice}
                  </Typography>
                  <Chip 
                    label={price.weatherImpact} 
                    size="small" 
                    color={price.weatherImpact.startsWith('+') ? 'success' : 'error'}
                  />
                </Box>
                <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                  {price.reason}
                </Typography>
              </Paper>
            ))}
          </Box>

          {/* Equipment Rental */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ color: '#FFFFFF', fontWeight: 600, mb: 1 }}>
              Equipment Rental Recommendations
            </Typography>
            {weatherData.marketIntegration.equipmentRental.map((equipment, index) => (
              <Paper key={index} sx={{ backgroundColor: '#1E1E1E', p: 2, mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <TransportIcon sx={{ color: '#2196F3' }} />
                  <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                    {equipment.equipment} - {equipment.cost}
                  </Typography>
                  <Chip label={equipment.availability} size="small" color="success" />
                </Box>
                <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                  {equipment.weatherDependency}
                </Typography>
              </Paper>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Location & Micro-climate */}
      <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444', mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold', mb: 2 }}>
            📍 Location & Micro-climate
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <LocationIcon sx={{ color: '#4CAF50' }} />
                <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                  {weatherData.current.location.address}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#B0B0B0', mb: 1 }}>
                Elevation: {weatherData.current.location.elevation}m
              </Typography>
              <Typography variant="body2" sx={{ color: '#B0B0B0', mb: 1 }}>
                Coordinates: {weatherData.current.location.lat}, {weatherData.current.location.lng}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ color: '#FFFFFF', fontWeight: 600, mb: 1 }}>
                Micro-climate Data
              </Typography>
              <Typography variant="body2" sx={{ color: '#B0B0B0', mb: 1 }}>
                Soil Temperature: {weatherData.current.soilTemperature}°C
              </Typography>
              <Typography variant="body2" sx={{ color: '#B0B0B0', mb: 1 }}>
                Heat Stress: {weatherData.current.heatStress}
              </Typography>
              <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                Dew Point: {weatherData.current.dewPoint}°C
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Offline Capabilities */}
      <Card sx={{ 
        backgroundColor: 'rgba(45, 45, 45, 0.8)', 
        border: '1px solid rgba(76, 175, 80, 0.3)', 
        mb: 3,
        borderRadius: '16px',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 12px 40px rgba(76, 175, 80, 0.2)',
        }
      }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box sx={{ 
              width: 40, 
              height: 40, 
              borderRadius: '12px', 
              background: 'linear-gradient(135deg, #4CAF50, #45A049)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2
            }}>
              <Typography sx={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 'bold' }}>M</Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                📱 MAONO AI Offline Capabilities
              </Typography>
              <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                Advanced offline AI models for remote farming
              </Typography>
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <SyncIcon sx={{ color: '#4CAF50' }} />
                <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                  Last Sync: {weatherData.offlineCapabilities.lastSync}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#B0B0B0', mb: 1 }}>
                Cached Data: {weatherData.offlineCapabilities.cachedData}
              </Typography>
              <Typography variant="body2" sx={{ color: '#B0B0B0', mb: 1 }}>
                AI Models: {weatherData.offlineCapabilities.aiModels}
              </Typography>
              <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                Coverage: {weatherData.offlineCapabilities.coverage}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <DownloadIcon sx={{ color: '#2196F3' }} />
                <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                  Next Sync: {weatherData.offlineCapabilities.nextSync}
                </Typography>
              </Box>
              <Button
                variant="outlined"
                size="small"
                startIcon={<DownloadIcon />}
                sx={{ 
                  borderColor: '#4CAF50', 
                  color: '#4CAF50',
                  '&:hover': { borderColor: '#45A049' }
                }}
              >
                Download Updates
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Offline Status */}
      <Card sx={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CheckIcon sx={{ color: '#4CAF50' }} />
            <Box>
              <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                Offline Mode Active
              </Typography>
              <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                Weather data synced. Works without internet connection.
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default WeatherAssistant;
