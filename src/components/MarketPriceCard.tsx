import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Skeleton, CircularProgress } from '@mui/material';
import { MarketPriceCardProps } from '../types';
import { TrendingUp, TrendingDown, TrendingFlat, LocationOn, AttachMoney, Refresh } from '@mui/icons-material';

// MarketPriceCard component following React Native patterns
const MarketPriceCard: React.FC<MarketPriceCardProps> = ({ marketPrice, onPress, loading = false, refreshing = false }) => {
  const getChangeColor = (change: number) => {
    return change > 0 ? '#4CAF50' : change < 0 ? '#F44336' : '#666';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp sx={{ fontSize: 16 }} />;
    if (change < 0) return <TrendingDown sx={{ fontSize: 16 }} />;
    return <TrendingFlat sx={{ fontSize: 16 }} />;
  };

  const getChangeText = (change: number) => {
    const sign = change > 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1 }} />
              <Skeleton variant="text" width="30%" height={32} />
              <Skeleton variant="text" width="20%" height={20} sx={{ ml: 1 }} />
            </Box>
            <Skeleton variant="rectangular" width={80} height={32} sx={{ borderRadius: 2 }} />
          </Box>
          <Skeleton variant="text" width="70%" height={12} />
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
              {marketPrice.marketName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
              <LocationOn sx={{ fontSize: 16, color: '#666', mr: 0.5 }} />
              <Typography variant="body2" sx={{ color: '#666' }}>
                {marketPrice.coordinates.latitude.toFixed(2)}, {marketPrice.coordinates.longitude.toFixed(2)}
              </Typography>
            </Box>
          </Box>
          <Chip 
            label={marketPrice.crop}
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 'bold' }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AttachMoney sx={{ fontSize: 24, color: '#4CAF50', mr: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4CAF50' }}>
              {marketPrice.price.toFixed(2)}
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', ml: 1 }}>
              /{marketPrice.unit}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              color: getChangeColor(marketPrice.change),
              backgroundColor: `${getChangeColor(marketPrice.change)}20`,
              padding: '4px 8px',
              borderRadius: '12px'
            }}>
              {getChangeIcon(marketPrice.change)}
              <Typography variant="body2" sx={{ fontWeight: 'bold', ml: 0.5 }}>
                {getChangeText(marketPrice.change)}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Typography variant="caption" sx={{ color: '#999' }}>
          Last updated: {marketPrice.lastUpdated.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MarketPriceCard;



