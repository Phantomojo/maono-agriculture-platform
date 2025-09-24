import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Avatar,
  Rating,
  Badge,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  LinearProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  ShoppingCart as CartIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  LocationOn as LocationIcon,
  Star as StarIcon,
  AttachMoney as MoneyIcon,
  Store as StoreIcon,
  Person as PersonIcon,
  TrendingUp as TrendingUpIcon,
  Work as WorkIcon,
  People as PeopleIcon,
  Notifications as NotificationIcon,
  WbSunny as WeatherIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Build as EquipmentIcon,
  Sensors as SensorIcon,
} from '@mui/icons-material';
import EquipmentRental from './EquipmentRental';
import IoTDashboard from './IoTDashboard';

const products = [
  {
    id: 1,
    name: 'Fresh Maize',
    description: 'High-quality maize from local farmers',
    price: 2.50,
    unit: 'kg',
    category: 'Grains',
    vendor: 'John Mwangi',
    location: 'Nakuru',
    rating: 4.5,
    stock: 100,
    image: '🌽',
  },
  {
    id: 2,
    name: 'Organic Tomatoes',
    description: 'Fresh organic tomatoes from greenhouse',
    price: 3.20,
    unit: 'kg',
    category: 'Vegetables',
    vendor: 'Mary Wanjiku',
    location: 'Kisumu',
    rating: 4.8,
    stock: 50,
    image: '🍅',
  },
  {
    id: 3,
    name: 'Red Onions',
    description: 'Premium red onions, freshly harvested',
    price: 1.80,
    unit: 'kg',
    category: 'Vegetables',
    vendor: 'Peter Kiprop',
    location: 'Eldoret',
    rating: 4.2,
    stock: 75,
    image: '🧅',
  },
];

const priceData = [
  {
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
];

const communityPosts = [
  {
    id: 1,
    author: 'John Mwangi',
    title: 'Best practices for maize farming',
    content: 'Sharing my experience with maize farming techniques that have increased my yield by 40%.',
    likes: 24,
    comments: 8,
    time: '2 hours ago',
    category: 'Farming Tips',
  },
  {
    id: 2,
    author: 'Mary Wanjiku',
    title: 'Weather alert for this week',
    content: 'Heavy rains expected in Kisumu region. Farmers should prepare for potential flooding.',
    likes: 15,
    comments: 12,
    time: '4 hours ago',
    category: 'Weather',
  },
  {
    id: 3,
    author: 'Peter Kiprop',
    title: 'Market prices update',
    content: 'Onion prices are up 15% this week. Good time to sell if you have stock.',
    likes: 18,
    comments: 6,
    time: '6 hours ago',
    category: 'Market Info',
  },
];

const jobListings = [
  {
    id: 1,
    title: 'Seasonal Farm Worker',
    company: 'Green Valley Farm',
    location: 'Nakuru',
    salary: 'KSh 15,000/month',
    type: 'Full-time',
    posted: '2 days ago',
    applicants: 12,
    rating: 4.5,
    urgent: true,
  },
  {
    id: 2,
    title: 'Boda-Boda Driver',
    company: 'Farm Transport Co.',
    location: 'Kisumu',
    salary: 'KSh 500/day',
    type: 'Part-time',
    posted: '1 day ago',
    applicants: 8,
    rating: 4.2,
    urgent: false,
  },
];

function ComprehensiveMarketplace() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Memoize filtered products for mobile performance
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Memoize price data for mobile performance
  const optimizedPriceData = useMemo(() => {
    if (isMobile) {
      // Show only top 5 price items on mobile
      return priceData.slice(0, 5);
    }
    return priceData;
  }, [isMobile]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUpIcon sx={{ color: '#4CAF50' }} />;
      case 'down': return <TrendingUpIcon sx={{ color: '#F44336', transform: 'rotate(180deg)' }} />;
      case 'flat': return <TrendingUpIcon sx={{ color: '#FF9800', transform: 'rotate(90deg)' }} />;
      default: return <TrendingUpIcon sx={{ color: '#FF9800' }} />;
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
              🛒 MAONO Marketplace
            </Typography>
            <Typography variant="body1" sx={{ color: '#B0B0B0' }}>
              Buy, sell, track prices, find jobs, and connect with the agricultural community
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Tabs */}
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
        <CardContent sx={{ p: 0 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                color: '#B0B0B0',
                fontWeight: 'bold',
                textTransform: 'none',
                minHeight: 60,
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#4CAF50',
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                },
                '&.Mui-selected': {
                  color: '#4CAF50',
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#4CAF50',
                height: 3,
                borderRadius: '2px',
              },
            }}
          >
            <Tab label="Products" icon={<StoreIcon />} />
            <Tab label="Price Dashboard" icon={<TrendingUpIcon />} />
            <Tab label="Equipment" icon={<EquipmentIcon />} />
            <Tab label="IoT Data" icon={<SensorIcon />} />
            <Tab label="Community" icon={<PeopleIcon />} />
            <Tab label="Jobs" icon={<WorkIcon />} />
          </Tabs>
        </CardContent>
      </Card>

      {/* Tab Content */}
      {activeTab === 0 && (
        <Box>
          {/* Search and Filters */}
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
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    placeholder="Search products, farmers, locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ color: '#4CAF50', mr: 1 }} />,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#FFFFFF',
                        backgroundColor: 'rgba(76, 175, 80, 0.05)',
                        borderRadius: '12px',
                        '& fieldset': { 
                          borderColor: 'rgba(76, 175, 80, 0.3)',
                          borderWidth: '2px'
                        },
                        '&:hover fieldset': { 
                          borderColor: '#4CAF50',
                          borderWidth: '2px'
                        },
                        '&.Mui-focused fieldset': { 
                          borderColor: '#4CAF50',
                          borderWidth: '2px'
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {['All', 'Grains', 'Vegetables', 'Fruits'].map((category) => (
                      <Chip
                        key={category}
                        label={category}
                        onClick={() => setSelectedCategory(category)}
                        sx={{
                          backgroundColor: selectedCategory === category ? '#4CAF50' : 'transparent',
                          color: selectedCategory === category ? '#FFFFFF' : '#B0B0B0',
                          border: selectedCategory === category ? '2px solid #4CAF50' : '2px solid rgba(76, 175, 80, 0.3)',
                          borderRadius: '20px',
                          fontWeight: 'bold',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: selectedCategory === category ? '#45A049' : 'rgba(76, 175, 80, 0.1)',
                            transform: 'scale(1.05)',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Products Grid */}
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card sx={{ 
                  backgroundColor: 'rgba(45, 45, 45, 0.8)', 
                  border: '1px solid rgba(76, 175, 80, 0.3)', 
                  height: '100%',
                  borderRadius: '16px',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 16px 48px rgba(76, 175, 80, 0.3)',
                    border: '2px solid #4CAF50',
                  }
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box sx={{ 
                        width: 60, 
                        height: 60, 
                        borderRadius: '16px', 
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        border: '2px solid rgba(76, 175, 80, 0.3)'
                      }}>
                        <Typography variant="h3" sx={{ fontSize: '32px' }}>
                          {product.image}
                        </Typography>
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold', mb: 0.5 }}>
                          {product.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <LocationIcon sx={{ color: '#4CAF50', mr: 0.5, fontSize: 16 }} />
                          <Typography variant="body2" sx={{ color: '#B0B0B0', fontSize: '12px' }}>
                            {product.vendor} • {product.location}
                          </Typography>
                        </Box>
                        <Chip 
                          label={product.category} 
                          size="small" 
                          sx={{ 
                            backgroundColor: 'rgba(76, 175, 80, 0.2)',
                            color: '#4CAF50',
                            fontSize: '10px',
                            height: '20px'
                          }} 
                        />
                      </Box>
                    </Box>

                    <Typography variant="body2" sx={{ color: '#E0E0E0', mb: 3, lineHeight: 1.5 }}>
                      {product.description}
                    </Typography>

                    <Box sx={{ 
                      backgroundColor: 'rgba(76, 175, 80, 0.1)', 
                      border: '1px solid rgba(76, 175, 80, 0.3)',
                      borderRadius: '12px',
                      p: 2,
                      mb: 3
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <MoneyIcon sx={{ color: '#4CAF50', mr: 1 }} />
                          <Typography variant="h5" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                            KSh {product.price}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                          per {product.unit}
                        </Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
                        💰 Best price in {product.location}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <StarIcon sx={{ color: '#FFC107', mr: 0.5 }} />
                        <Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                          {product.rating}/5
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: '#B0B0B0', fontSize: '12px' }}>
                          📦 {product.stock} available
                        </Typography>
                      </Box>
                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<CartIcon />}
                      sx={{
                        backgroundColor: '#4CAF50',
                        borderRadius: '12px',
                        py: 1.5,
                        fontWeight: 'bold',
                        fontSize: '14px',
                        textTransform: 'none',
                        '&:hover': { 
                          backgroundColor: '#45A049',
                          transform: 'scale(1.02)',
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          {/* Price Dashboard Header */}
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
                  <TrendingUpIcon sx={{ color: '#FFFFFF', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                    📊 MAONO Live Market Prices
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                    Real-time agricultural commodity prices across Kenya
                  </Typography>
                </Box>
              </Box>
              
              {/* Market Stats */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ 
                    backgroundColor: 'rgba(76, 175, 80, 0.1)', 
                    border: '1px solid rgba(76, 175, 80, 0.3)',
                    borderRadius: '12px',
                    p: 2,
                    textAlign: 'center'
                  }}>
                    <Typography variant="h4" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>12</Typography>
                    <Typography variant="body2" sx={{ color: '#B0B0B0' }}>Active Markets</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ 
                    backgroundColor: 'rgba(33, 150, 243, 0.1)', 
                    border: '1px solid rgba(33, 150, 243, 0.3)',
                    borderRadius: '12px',
                    p: 2,
                    textAlign: 'center'
                  }}>
                    <Typography variant="h4" sx={{ color: '#2196F3', fontWeight: 'bold' }}>45</Typography>
                    <Typography variant="body2" sx={{ color: '#B0B0B0' }}>Commodities</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ 
                    backgroundColor: 'rgba(255, 152, 0, 0.1)', 
                    border: '1px solid rgba(255, 152, 0, 0.3)',
                    borderRadius: '12px',
                    p: 2,
                    textAlign: 'center'
                  }}>
                    <Typography variant="h4" sx={{ color: '#FF9800', fontWeight: 'bold' }}>2.5K</Typography>
                    <Typography variant="body2" sx={{ color: '#B0B0B0' }}>Updates Today</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ 
                    backgroundColor: 'rgba(156, 39, 176, 0.1)', 
                    border: '1px solid rgba(156, 39, 176, 0.3)',
                    borderRadius: '12px',
                    p: 2,
                    textAlign: 'center'
                  }}>
                    <Typography variant="h4" sx={{ color: '#9C27B0', fontWeight: 'bold' }}>98%</Typography>
                    <Typography variant="body2" sx={{ color: '#B0B0B0' }}>Accuracy Rate</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Stock-like Price Table */}
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
            <CardContent sx={{ p: 0 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'rgba(76, 175, 80, 0.1)' }}>
                      <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '14px', py: 2 }}>🌾 Commodity</TableCell>
                      <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '14px', py: 2 }}>📍 Market Location</TableCell>
                      <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '14px', py: 2 }}>💰 Price per kg</TableCell>
                      <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '14px', py: 2 }}>📈 Change</TableCell>
                      <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '14px', py: 2 }}>📊 Volume</TableCell>
                      <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '14px', py: 2 }}>⏰ Updated</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {optimizedPriceData.map((item, index) => (
                      <TableRow 
                        key={index}
                        sx={{ 
                          '&:hover': { 
                            backgroundColor: 'rgba(76, 175, 80, 0.05)',
                            transform: 'scale(1.01)',
                            transition: 'all 0.2s ease'
                          },
                          borderBottom: '1px solid rgba(76, 175, 80, 0.1)'
                        }}
                      >
                        <TableCell sx={{ py: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ 
                              width: 32, 
                              height: 32, 
                              borderRadius: '8px', 
                              backgroundColor: getTrendColor(item.trend) === '#4CAF50' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mr: 2
                            }}>
                              <Typography sx={{ fontSize: '16px' }}>
                                {item.crop === 'Maize' ? '🌽' : item.crop === 'Tomatoes' ? '🍅' : '🫘'}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="body1" sx={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '16px' }}>
                                {item.crop}
                              </Typography>
                              <Typography variant="body2" sx={{ color: '#B0B0B0', fontSize: '12px' }}>
                                {item.market} • {item.quality}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationIcon sx={{ color: '#4CAF50', mr: 1, fontSize: 18 }} />
                            <Box>
                              <Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                                {item.location}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
                                Kenya
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: 2 }}>
                          <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '18px' }}>
                            KSh {item.currentPrice.toFixed(2)}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
                            per kilogram
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {getTrendIcon(item.trend)}
                            <Box sx={{ ml: 1 }}>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: getTrendColor(item.trend),
                                  fontWeight: 'bold',
                                  fontSize: '14px'
                                }}
                              >
                                {item.change > 0 ? '+' : ''}{item.change.toFixed(2)} KSh
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: getTrendColor(item.trend),
                                  fontWeight: 'bold'
                                }}
                              >
                                ({item.changePercent > 0 ? '+' : ''}{item.changePercent.toFixed(1)}%)
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ py: 2 }}>
                          <Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                            {item.volume}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
                            available
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 2 }}>
                          <Typography variant="body2" sx={{ color: '#B0B0B0', fontSize: '12px' }}>
                            {item.lastUpdate}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#4CAF50' }}>
                            Live
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      )}

      {activeTab === 2 && (
        <EquipmentRental />
      )}

      {activeTab === 3 && (
        <IoTDashboard />
      )}

      {activeTab === 4 && (
        <Box>
          {/* Community Posts */}
          <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold', mb: 2 }}>
                Community Discussions
              </Typography>
              <List>
                {communityPosts.map((post) => (
                  <ListItem key={post.id} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <Avatar sx={{ backgroundColor: '#4CAF50' }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box>
                          <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                            {post.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                            by {post.author} • {post.time}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" sx={{ color: '#FFFFFF', mb: 1 }}>
                            {post.content}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Chip label={post.category} size="small" color="primary" />
                            <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                              {post.likes} likes • {post.comments} comments
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
        </Box>
      )}

      {activeTab === 5 && (
        <Box>
          {/* Job Listings */}
          <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold', mb: 2 }}>
                Available Jobs
              </Typography>
              <Grid container spacing={2}>
                {jobListings.map((job) => (
                  <Grid item xs={12} md={6} key={job.id}>
                    <Card sx={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <WorkIcon sx={{ color: '#4CAF50', mr: 1 }} />
                          <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                            {job.title}
                          </Typography>
                          {job.urgent && (
                            <Chip label="Urgent" color="error" size="small" sx={{ ml: 1 }} />
                          )}
                        </Box>
                        <Typography variant="body2" sx={{ color: '#B0B0B0', mb: 1 }}>
                          {job.company} • {job.location}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 'bold', mb: 1 }}>
                          {job.salary}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#B0B0B0', mb: 2 }}>
                          {job.type} • {job.posted} • {job.applicants} applicants
                        </Typography>
                        <Button
                          fullWidth
                          variant="contained"
                          sx={{
                            backgroundColor: '#4CAF50',
                            '&:hover': { backgroundColor: '#45A049' },
                          }}
                        >
                          Apply Now
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
}

export default ComprehensiveMarketplace;
