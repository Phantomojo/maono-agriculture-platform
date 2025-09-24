import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Button,
  AppBar,
  Toolbar,
  Tabs,
  Tab,
} from '@mui/material';
import {
  TrendingUp as TrendingIcon,
  Store as StoreIcon,
  People as PeopleIcon,
  LocalShipping as ShippingIcon,
  Assessment as AnalyticsIcon,
  Verified as VerifiedIcon,
  Star as StarIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';

const buyerData = {
  totalOrders: 156,
  totalSpent: 45230,
  activeFarmers: 23,
  pendingDeliveries: 8,
  monthlyGrowth: 15.3,
};

const recentOrders = [
  {
    id: 'ORD-001',
    farmer: 'John Mwangi',
    product: 'Fresh Maize',
    quantity: '500kg',
    price: 1250,
    status: 'Delivered',
    date: '2024-09-20',
    rating: 5,
  },
  {
    id: 'ORD-002',
    farmer: 'Mary Wanjiku',
    product: 'Organic Tomatoes',
    quantity: '200kg',
    price: 600,
    status: 'In Transit',
    date: '2024-09-22',
    rating: 4,
  },
  {
    id: 'ORD-003',
    farmer: 'Peter Kiprop',
    product: 'Red Onions',
    quantity: '300kg',
    price: 540,
    status: 'Processing',
    date: '2024-09-23',
    rating: 5,
  },
];

const marketPrices = [
  { crop: 'Maize', price: 2.50, change: '+0.15', trend: 'up' },
  { crop: 'Tomatoes', price: 3.00, change: '-0.20', trend: 'down' },
  { crop: 'Onions', price: 1.80, change: '+0.05', trend: 'up' },
  { crop: 'Beans', price: 2.20, change: '+0.10', trend: 'up' },
];

const verifiedFarmers = [
  {
    name: 'John Mwangi',
    location: 'Nairobi',
    rating: 4.8,
    products: 15,
    verified: true,
    specialties: ['Maize', 'Beans'],
  },
  {
    name: 'Mary Wanjiku',
    location: 'Kisumu',
    rating: 4.9,
    products: 12,
    verified: true,
    specialties: ['Tomatoes', 'Onions'],
  },
  {
    name: 'Peter Kiprop',
    location: 'Nakuru',
    rating: 4.6,
    products: 8,
    verified: false,
    specialties: ['Wheat', 'Barley'],
  },
];

function BuyerDashboard() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'success';
      case 'In Transit': return 'info';
      case 'Processing': return 'warning';
      default: return 'default';
    }
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? '#4CAF50' : '#F44336';
  };

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#4CAF50', fontWeight: 'bold' }}>
            🛒 Agri-Business Dashboard
          </Typography>
          <IconButton>
            <FilterIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        {/* Key Metrics */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StoreIcon sx={{ color: '#4CAF50', mr: 1 }} />
                  <Box>
                    <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                      {buyerData.totalOrders}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                      Total Orders
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
                  <TrendingIcon sx={{ color: '#FF9800', mr: 1 }} />
                  <Box>
                    <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                      ${buyerData.totalSpent.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                      Total Spent
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
                  <PeopleIcon sx={{ color: '#2196F3', mr: 1 }} />
                  <Box>
                    <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                      {buyerData.activeFarmers}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                      Active Farmers
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
                  <ShippingIcon sx={{ color: '#9C27B0', mr: 1 }} />
                  <Box>
                    <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                      {buyerData.pendingDeliveries}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                      Pending Deliveries
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ '& .MuiTab-root': { color: '#B0B0B0' } }}>
            <Tab label="Orders" />
            <Tab label="Market Prices" />
            <Tab label="Verified Farmers" />
            <Tab label="Analytics" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        {tabValue === 0 && (
          <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: '#FFFFFF', fontWeight: 'bold' }}>
                Recent Orders
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Order ID</TableCell>
                      <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Farmer</TableCell>
                      <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Product</TableCell>
                      <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Quantity</TableCell>
                      <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Price</TableCell>
                      <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Status</TableCell>
                      <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Rating</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell sx={{ color: '#FFFFFF' }}>{order.id}</TableCell>
                        <TableCell sx={{ color: '#FFFFFF' }}>{order.farmer}</TableCell>
                        <TableCell sx={{ color: '#FFFFFF' }}>{order.product}</TableCell>
                        <TableCell sx={{ color: '#FFFFFF' }}>{order.quantity}</TableCell>
                        <TableCell sx={{ color: '#FFFFFF' }}>${order.price}</TableCell>
                        <TableCell>
                          <Chip
                            label={order.status}
                            color={getStatusColor(order.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <StarIcon sx={{ color: '#FFC107', mr: 0.5, fontSize: 16 }} />
                            <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                              {order.rating}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}

        {tabValue === 1 && (
          <Grid container spacing={2}>
            {marketPrices.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444' }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                      {item.crop}
                    </Typography>
                    <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                      ${item.price}/kg
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: getTrendColor(item.trend) }}
                    >
                      {item.change} ({item.trend === 'up' ? '↗' : '↘'})
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {tabValue === 2 && (
          <Grid container spacing={2}>
            {verifiedFarmers.map((farmer, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold', flexGrow: 1 }}>
                        {farmer.name}
                      </Typography>
                      {farmer.verified && (
                        <VerifiedIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
                      )}
                    </Box>
                    <Typography variant="body2" sx={{ color: '#B0B0B0', mb: 1 }}>
                      {farmer.location} • {farmer.products} products
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <StarIcon sx={{ color: '#FFC107', mr: 0.5, fontSize: 16 }} />
                      <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                        {farmer.rating}/5
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {farmer.specialties.map((specialty, idx) => (
                        <Chip
                          key={idx}
                          label={specialty}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {tabValue === 3 && (
          <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: '#FFFFFF', fontWeight: 'bold' }}>
                Analytics & Insights
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 1 }}>
                        Monthly Growth
                      </Typography>
                      <Typography variant="h3" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                        +{buyerData.monthlyGrowth}%
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                        Compared to last month
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card sx={{ backgroundColor: '#1E1E1E', border: '1px solid #333' }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 1 }}>
                        Top Performing
                      </Typography>
                      <Typography variant="h3" sx={{ color: '#FF9800', fontWeight: 'bold' }}>
                        Maize
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                        Most ordered crop
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
}

export default BuyerDashboard;
