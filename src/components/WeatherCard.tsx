import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Skeleton, CircularProgress } from '@mui/material';
import { WeatherCardProps } from '../types';
import { Thermostat, Water, Air, LocationOn, Refresh } from '@mui/icons-material';

// WeatherCard component following React Native patterns
const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, onPress, loading = false, refreshing = false }) => {
  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return '#FFA726';
      case 'cloudy':
      case 'overcast':
        return '#90A4AE';
      case 'rainy':
      case 'rain':
        return '#42A5F5';
      default:
        return '#4CAF50';
    }
  };


  if (loading) {
    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width="40%" height={16} sx={{ mt: 0.5 }} />
            </Box>
            <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 2 }} />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Skeleton variant="circular" width={32} height={32} sx={{ mr: 1 }} />
            <Skeleton variant="text" width="30%" height={40} />
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Skeleton variant="circular" width={20} height={20} sx={{ mr: 1 }} />
              <Box>
                <Skeleton variant="text" width="50%" height={16} />
                <Skeleton variant="text" width="30%" height={20} />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Skeleton variant="circular" width={20} height={20} sx={{ mr: 1 }} />
              <Box>
                <Skeleton variant="text" width="50%" height={16} />
                <Skeleton variant="text" width="30%" height={20} />
              </Box>
            </Box>
          </Box>
          <Skeleton variant="text" width="70%" height={12} sx={{ mt: 2 }} />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      sx={{ 
        mb: 2, 
        cursor: onPress ? 'pointer' : 'default',
        position: 'relative',
        '&:hover': onPress ? { 
          boxShadow: 4,
          transform: 'translateY(-2px)',
          transition: 'all 0.2s ease-in-out'
        } : {}
      }}
      onClick={onPress}
    >
      {refreshing && (
        <Box sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: 1,
          px: 1,
          py: 0.5
        }}>
          <CircularProgress size={16} sx={{ color: 'white', mr: 0.5 }} />
          <Refresh sx={{ fontSize: 14, color: 'white' }} />
        </Box>
      )}
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
              {weatherData.location}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
              <LocationOn sx={{ fontSize: 16, color: '#666', mr: 0.5 }} />
              <Typography variant="body2" sx={{ color: '#666' }}>
                {weatherData.coordinates.latitude.toFixed(2)}, {weatherData.coordinates.longitude.toFixed(2)}
              </Typography>
            </Box>
          </Box>
          <Chip 
            label={weatherData.condition}
            sx={{ 
              backgroundColor: getConditionColor(weatherData.condition),
              color: 'white',
              fontWeight: 'bold'
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Thermostat sx={{ fontSize: 32, color: '#FF5722', mr: 1 }} />
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FF5722' }}>
            {weatherData.temperature}°C
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Water sx={{ fontSize: 20, color: '#2196F3', mr: 1 }} />
            <Box>
              <Typography variant="body2" sx={{ color: '#666' }}>Humidity</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {weatherData.humidity}%
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Air sx={{ fontSize: 20, color: '#4CAF50', mr: 1 }} />
            <Box>
              <Typography variant="body2" sx={{ color: '#666' }}>Wind Speed</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {weatherData.windSpeed} km/h
              </Typography>
            </Box>
          </Box>
        </Box>

        <Typography variant="caption" sx={{ color: '#999', mt: 2, display: 'block' }}>
          Last updated: {weatherData.timestamp.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;




