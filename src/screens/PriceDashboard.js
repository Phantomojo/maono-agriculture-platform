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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
  Avatar,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  TrendingFlat as TrendingFlatIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Refresh as RefreshIcon,
  Star as StarIcon,
  AttachMoney as MoneyIcon,
  ShowChart as ChartIcon,
  Notifications as NotificationIcon,
} from '@mui/icons-material';

const marketData = [
  {
    id: 1,
    crop: 'Maize',
    location: 'Nairobi',
    currentPrice: 2.50,
    previousPrice: 2.35,
    change: 0.15,
    changePercent: 6.38,
    volume: '1,250 tons',
    trend: 'up',
    market: 'City Market',
    quality: 'Grade A',
    lastUpdate: '2 min ago',
  },
  {
    id: 2,
    crop: 'Tomatoes',
    location: 'Kisumu',
    currentPrice: 3.20,
    previousPrice: 3.50,
    change: -0.30,
    changePercent: -8.57,
    volume: '850 tons',
    trend: 'down',
    market: 'Kisumu Market',
    quality: 'Grade A',
    lastUpdate: '5 min ago',
  },
  {
    id: 3,
    crop: 'Beans',
    location: 'Nakuru',
    currentPrice: 1.80,
    previousPrice: 1.80,
    change: 0.00,
    changePercent: 0.00,
    volume: '650 tons',
    trend: 'flat',
    market: 'Nakuru Market',
    quality: 'Grade B',
    lastUpdate: '1 min ago',
  },
  {
    id: 4,
    crop: 'Onions',
    location: 'Eldoret',
    currentPrice: 2.10,
    previousPrice: 1.95,
    change: 0.15,
    changePercent: 7.69,
    volume: '420 tons',
    trend: 'up',
    market: 'Eldoret Market',
    quality: 'Grade A',
    lastUpdate: '3 min ago',
  },
  {
    id: 5,
    crop: 'Cabbage',
    location: 'Mombasa',
    currentPrice: 1.50,
    previousPrice: 1.60,
    change: -0.10,
    changePercent: -6.25,
    volume: '320 tons',
    trend: 'down',
    market: 'Mombasa Market',
    quality: 'Grade B',
    lastUpdate: '4 min ago',
  },
  {
    id: 6,
    crop: 'Carrots',
    location: 'Thika',
    currentPrice: 2.80,
    previousPrice: 2.75,
    change: 0.05,
    changePercent: 1.82,
    volume: '180 tons',
    trend: 'up',
    market: 'Thika Market',
    quality: 'Grade A',
    lastUpdate: '1 min ago',
  },
];

const marketLocations = [
  { name: 'Nairobi', code: 'NBI', active: true },
  { name: 'Kisumu', code: 'KSM', active: true },
  { name: 'Nakuru', code: 'NKR', active: true },
  { name: 'Eldoret', code: 'ELD', active: false },
  { name: 'Mombasa', code: 'MBA', active: false },
  { name: 'Thika', code: 'THK', active: false },
];

const priceAlerts = [
  {
    id: 1,
    crop: 'Maize',
    condition: 'above',
    price: 2.40,
    status: 'active',
    created: '2 hours ago',
  },
  {
    id: 2,
    crop: 'Tomatoes',
    condition: 'below',
    price: 3.00,
    status: 'triggered',
    created: '1 day ago',
  },
];

function PriceDashboard() {
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('change');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastRefresh(new Date());
      }, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const filteredData = marketData.filter(item => 
    selectedLocation === 'all' || item.location === selectedLocation
  );

  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case 'change':
        return Math.abs(b.change) - Math.abs(a.change);
      case 'price':
        return b.currentPrice - a.currentPrice;
      case 'volume':
        return parseInt(b.volume.replace(/[^\d]/g, '')) - parseInt(a.volume.replace(/[^\d]/g, ''));
      default:
        return 0;
    }
  });

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUpIcon sx={{ color: '#4CAF50' }} />;
      case 'down': return <TrendingDownIcon sx={{ color: '#F44336' }} />;
      case 'flat': return <TrendingFlatIcon sx={{ color: '#FF9800' }} />;
      default: return <TrendingFlatIcon sx={{ color: '#FF9800' }} />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return '#4CAF50';
      case 'down': return '#F44336';
      case 'flat': return '#FF9800';
      default: return '#757575';
    }
  };

  const getQualityColor = (quality) => {
    switch (quality) {
      case 'Grade A': return '#4CAF50';
      case 'Grade B': return '#FF9800';
      case 'Grade C': return '#F44336';
      default: return '#757575';
    }
  };

  return (
    <Box sx={{ height: '100%', overflow: 'auto', p: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
            📊 Live Price Dashboard
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              icon={<TimeIcon />}
              label={`Last updated: ${lastRefresh.toLocaleTimeString()}`}
              size="small"
              sx={{ backgroundColor: '#2D2D2D', color: '#B0B0B0' }}
            />
            <IconButton
              onClick={() => setLastRefresh(new Date())}
              sx={{ color: '#4CAF50' }}
            >
              <RefreshIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ color: '#B0B0B0' }}>
          Real-time produce prices across different markets - like a stock market for agriculture
        </Typography>
      </Box>

      {/* Market Overview */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon sx={{ color: '#4CAF50', mr: 1 }} />
                <Box>
                  <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                    +12.5%
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                    Market Growth
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
                <MoneyIcon sx={{ color: '#FF9800', mr: 1 }} />
                <Box>
                  <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                    KSh 2.15
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                    Avg Price/kg
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
                <ChartIcon sx={{ color: '#2196F3', mr: 1 }} />
                <Box>
                  <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                    3,670
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                    Total Volume
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
                <LocationIcon sx={{ color: '#9C27B0', mr: 1 }} />
                <Box>
                  <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                    6
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                    Active Markets
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Controls */}
      <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444', mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" sx={{ color: '#B0B0B0', mb: 1 }}>
                Filter by Location:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  label="All"
                  onClick={() => setSelectedLocation('all')}
                  sx={{
                    backgroundColor: selectedLocation === 'all' ? '#4CAF50' : '#1E1E1E',
                    color: selectedLocation === 'all' ? '#FFFFFF' : '#B0B0B0',
                    border: '1px solid #444',
                  }}
                />
                {marketLocations.map((location) => (
                  <Chip
                    key={location.code}
                    label={location.name}
                    onClick={() => setSelectedLocation(location.name)}
                    sx={{
                      backgroundColor: selectedLocation === location.name ? '#4CAF50' : '#1E1E1E',
                      color: selectedLocation === location.name ? '#FFFFFF' : '#B0B0B0',
                      border: '1px solid #444',
                    }}
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="body2" sx={{ color: '#B0B0B0', mb: 1 }}>
                Sort by:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {['change', 'price', 'volume'].map((sort) => (
                  <Chip
                    key={sort}
                    label={sort.charAt(0).toUpperCase() + sort.slice(1)}
                    onClick={() => setSortBy(sort)}
                    sx={{
                      backgroundColor: sortBy === sort ? '#4CAF50' : '#1E1E1E',
                      color: sortBy === sort ? '#FFFFFF' : '#B0B0B0',
                      border: '1px solid #444',
                    }}
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant={autoRefresh ? 'contained' : 'outlined'}
                onClick={() => setAutoRefresh(!autoRefresh)}
                sx={{
                  backgroundColor: autoRefresh ? '#4CAF50' : 'transparent',
                  color: autoRefresh ? '#FFFFFF' : '#4CAF50',
                  borderColor: '#4CAF50',
                }}
              >
                Auto Refresh
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="outlined"
                startIcon={<NotificationIcon />}
                sx={{ color: '#4CAF50', borderColor: '#4CAF50' }}
              >
                Price Alerts
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Price Table */}
      <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444', mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold', mb: 2 }}>
            Live Market Prices
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Crop</TableCell>
                  <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Location</TableCell>
                  <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Current Price</TableCell>
                  <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Change</TableCell>
                  <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Volume</TableCell>
                  <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Quality</TableCell>
                  <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Last Update</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ backgroundColor: getTrendColor(item.trend), mr: 2, width: 32, height: 32 }}>
                          {getTrendIcon(item.trend)}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                            {item.crop}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                            {item.market}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationIcon sx={{ color: '#B0B0B0', mr: 1, fontSize: 16 }} />
                        <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                          {item.location}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                        KSh {item.currentPrice}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {getTrendIcon(item.trend)}
                        <Typography
                          variant="body2"
                          sx={{
                            color: getTrendColor(item.trend),
                            fontWeight: 'bold',
                            ml: 1,
                          }}
                        >
                          {item.change > 0 ? '+' : ''}{item.change} ({item.changePercent > 0 ? '+' : ''}{item.changePercent}%)
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                        {item.volume}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={item.quality}
                        size="small"
                        sx={{
                          backgroundColor: getQualityColor(item.quality),
                          color: '#FFFFFF',
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                        {item.lastUpdate}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Price Alerts */}
      <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444' }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold', mb: 2 }}>
            Price Alerts
          </Typography>
          {priceAlerts.map((alert) => (
            <Paper
              key={alert.id}
              sx={{
                backgroundColor: '#1E1E1E',
                border: '1px solid #333',
                p: 2,
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                  {alert.crop} {alert.condition} KSh {alert.price}
                </Typography>
                <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                  Created {alert.created}
                </Typography>
              </Box>
              <Chip
                label={alert.status}
                color={alert.status === 'active' ? 'success' : 'warning'}
                size="small"
              />
            </Paper>
          ))}
        </CardContent>
      </Card>
    </Box>
  );
}

export default PriceDashboard;
