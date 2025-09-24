import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Button,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Sensors as SensorIcon,
  WbSunny as WeatherIcon,
  Water as WaterIcon,
  Terrain as SoilIcon,
  LocalShipping as EquipmentIcon,
  TrendingUp as TrendingUpIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Refresh as RefreshIcon,
  Settings as SettingsIcon,
  Notifications as NotificationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

const sensorData = [
  {
    id: 1,
    name: 'Weather Station Alpha',
    type: 'weather',
    location: 'Nakuru Farm',
    status: 'online',
    lastUpdate: '2 minutes ago',
    data: {
      temperature: 28.5,
      humidity: 65,
      rainfall: 0,
      windSpeed: 12,
      pressure: 1013,
    },
    alerts: 0,
    battery: 85,
  },
  {
    id: 2,
    name: 'Soil Moisture Sensor',
    type: 'soil',
    location: 'Kisumu Farm',
    status: 'online',
    lastUpdate: '5 minutes ago',
    data: {
      moisture: 45,
      pH: 6.8,
      temperature: 26,
      nutrients: 'Good',
    },
    alerts: 1,
    battery: 72,
  },
  {
    id: 3,
    name: 'Irrigation Controller',
    type: 'irrigation',
    location: 'Eldoret Farm',
    status: 'offline',
    lastUpdate: '2 hours ago',
    data: {
      waterLevel: 0,
      flowRate: 0,
      pressure: 0,
      schedule: 'Disabled',
    },
    alerts: 2,
    battery: 15,
  },
  {
    id: 4,
    name: 'Tractor GPS Tracker',
    type: 'equipment',
    location: 'Thika Farm',
    status: 'online',
    lastUpdate: '1 minute ago',
    data: {
      speed: 8,
      fuel: 75,
      engineHours: 1250,
      location: 'Field A3',
    },
    alerts: 0,
    battery: 90,
  },
];

const dataInsights = [
  {
    title: 'Soil Moisture Alert',
    message: 'Soil moisture below 30% in Field B2. Irrigation recommended.',
    severity: 'high',
    time: '10 minutes ago',
    action: 'Start irrigation system',
  },
  {
    title: 'Weather Forecast',
    message: 'Heavy rain expected in 3 hours. Harvest crops in Field A1.',
    severity: 'medium',
    time: '1 hour ago',
    action: 'Schedule harvesting',
  },
  {
    title: 'Equipment Maintenance',
    message: 'Tractor engine hours approaching service interval.',
    severity: 'low',
    time: '2 hours ago',
    action: 'Schedule maintenance',
  },
];

const predictiveAnalytics = [
  {
    metric: 'Crop Yield Prediction',
    current: '2.5 tons/ha',
    predicted: '3.2 tons/ha',
    change: '+28%',
    confidence: 85,
    trend: 'up',
  },
  {
    metric: 'Water Usage Efficiency',
    current: '65%',
    predicted: '78%',
    change: '+13%',
    confidence: 92,
    trend: 'up',
  },
  {
    metric: 'Equipment Utilization',
    current: '45%',
    predicted: '62%',
    change: '+17%',
    confidence: 88,
    trend: 'up',
  },
];

function IoTDashboard() {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastRefresh(new Date());
      }, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const getSensorIcon = (type) => {
    switch (type) {
      case 'weather': return <WeatherIcon sx={{ color: '#FF9800' }} />;
      case 'soil': return <SoilIcon sx={{ color: '#8BC34A' }} />;
      case 'irrigation': return <WaterIcon sx={{ color: '#2196F3' }} />;
      case 'equipment': return <EquipmentIcon sx={{ color: '#9C27B0' }} />;
      default: return <SensorIcon sx={{ color: '#757575' }} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return '#4CAF50';
      case 'offline': return '#F44336';
      case 'maintenance': return '#FF9800';
      default: return '#757575';
    }
  };

  const getBatteryColor = (battery) => {
    if (battery > 50) return '#4CAF50';
    if (battery > 20) return '#FF9800';
    return '#F44336';
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#757575';
    }
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? <TrendingUpIcon sx={{ color: '#4CAF50' }} /> : <TrendingUpIcon sx={{ color: '#F44336', transform: 'rotate(180deg)' }} />;
  };

  return (
    <Box sx={{ height: '100%', overflow: 'auto', p: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
            📡 IoT Data Collection Dashboard
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  sx={{ '& .MuiSwitch-thumb': { backgroundColor: '#4CAF50' } }}
                />
              }
              label="Auto Refresh"
              sx={{ color: '#B0B0B0' }}
            />
            <IconButton onClick={() => setLastRefresh(new Date())} sx={{ color: '#4CAF50' }}>
              <RefreshIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ color: '#B0B0B0' }}>
          Real-time data collection from IoT sensors - Like Hello Tractor's SIM-enabled meters
        </Typography>
      </Box>

      {/* Overview Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SensorIcon sx={{ color: '#4CAF50', mr: 1 }} />
                <Box>
                  <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                    {sensorData.length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                    Active Sensors
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckIcon sx={{ color: '#4CAF50', mr: 1 }} />
                <Box>
                  <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                    {sensorData.filter(s => s.status === 'online').length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                    Online Now
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WarningIcon sx={{ color: '#FF9800', mr: 1 }} />
                <Box>
                  <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                    {sensorData.reduce((sum, s) => sum + s.alerts, 0)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                    Active Alerts
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon sx={{ color: '#2196F3', mr: 1 }} />
                <Box>
                  <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                    2.4GB
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                    Data Collected
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Sensor Status */}
      <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444', mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold', mb: 2 }}>
            Sensor Status
          </Typography>
          <Grid container spacing={2}>
            {sensorData.map((sensor) => (
              <Grid item xs={12} sm={6} md={3} key={sensor.id}>
                <Card
                  sx={{
                    backgroundColor: '#1E1E1E',
                    border: '1px solid #333',
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: '#2D2D2D' },
                  }}
                  onClick={() => setSelectedSensor(sensor)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {getSensorIcon(sensor.type)}
                      <Box sx={{ flexGrow: 1, ml: 1 }}>
                        <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                          {sensor.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                          {sensor.location}
                        </Typography>
                      </Box>
                      <Chip
                        label={sensor.status}
                        size="small"
                        sx={{
                          backgroundColor: getStatusColor(sensor.status),
                          color: '#FFFFFF',
                        }}
                      />
                    </Box>
                    <Typography variant="body2" sx={{ color: '#B0B0B0', mb: 1 }}>
                      Last update: {sensor.lastUpdate}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                        Battery: {sensor.battery}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={sensor.battery}
                        sx={{
                          width: 60,
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: getBatteryColor(sensor.battery),
                          },
                        }}
                      />
                    </Box>
                    {sensor.alerts > 0 && (
                      <Chip
                        label={`${sensor.alerts} alerts`}
                        size="small"
                        color="error"
                        sx={{ mt: 1 }}
                      />
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Data Insights */}
      <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444', mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold', mb: 2 }}>
            Data Insights & Alerts
          </Typography>
          <List>
            {dataInsights.map((insight, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemIcon>
                  <WarningIcon sx={{ color: getSeverityColor(insight.severity) }} />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                      {insight.title}
                    </Typography>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" sx={{ color: '#B0B0B0', mb: 1 }}>
                        {insight.message}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          label={insight.severity}
                          size="small"
                          sx={{
                            backgroundColor: getSeverityColor(insight.severity),
                            color: '#FFFFFF',
                          }}
                        />
                        <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                          {insight.time}
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Predictive Analytics */}
      <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444' }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold', mb: 2 }}>
            Predictive Analytics
          </Typography>
          <Grid container spacing={2}>
            {predictiveAnalytics.map((metric, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold', mb: 1 }}>
                      {metric.metric}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                        {metric.current}
                      </Typography>
                      {getTrendIcon(metric.trend)}
                    </Box>
                    <Typography variant="body2" sx={{ color: '#B0B0B0', mb: 1 }}>
                      Predicted: {metric.predicted}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 'bold', mb: 1 }}>
                      {metric.change} improvement
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={metric.confidence}
                      sx={{
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#4CAF50',
                        },
                      }}
                    />
                    <Typography variant="body2" sx={{ color: '#B0B0B0', mt: 1 }}>
                      Confidence: {metric.confidence}%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default IoTDashboard;
