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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  LocalShipping as TransportIcon,
  Build as EquipmentIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  AttachMoney as MoneyIcon,
  Star as StarIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Directions as DirectionsIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

const equipmentCategories = [
  { id: 'tractor', name: 'Tractors', icon: '🚜', color: '#4CAF50' },
  { id: 'irrigation', name: 'Irrigation', icon: '💧', color: '#2196F3' },
  { id: 'harvesting', name: 'Harvesting', icon: '🌾', color: '#FF9800' },
  { id: 'planting', name: 'Planting', icon: '🌱', color: '#9C27B0' },
  { id: 'transport', name: 'Transport', icon: '🚚', color: '#F44336' },
];

const equipmentListings = [
  {
    id: 1,
    name: 'John Deere 5055D Tractor',
    owner: 'Machinery Hub Ltd',
    location: 'Nakuru',
    price: 3000,
    unit: 'day',
    category: 'tractor',
    rating: 4.8,
    reviews: 24,
    availability: 'Available',
    image: '🚜',
    description: 'Heavy-duty tractor perfect for land preparation and planting. 55HP engine with 4WD.',
    features: ['4WD', 'Air Conditioning', 'GPS Ready', 'Hydraulic System'],
    distance: '5.2 km',
    responseTime: '2 hours',
    verified: true,
    insurance: true,
    maintenance: 'Last service: 2 weeks ago',
  },
  {
    id: 2,
    name: 'Drip Irrigation System',
    owner: 'Water Solutions Co',
    location: 'Kisumu',
    price: 1500,
    unit: 'day',
    category: 'irrigation',
    rating: 4.6,
    reviews: 18,
    availability: 'Available',
    image: '💧',
    description: 'Complete drip irrigation system for efficient water delivery to crops.',
    features: ['Water Efficient', 'Timer Control', 'Easy Setup', 'Durable'],
    distance: '8.1 km',
    responseTime: '4 hours',
    verified: true,
    insurance: true,
    maintenance: 'Last service: 1 week ago',
  },
  {
    id: 3,
    name: 'Combine Harvester',
    owner: 'Harvest Pro',
    location: 'Eldoret',
    price: 5000,
    unit: 'day',
    category: 'harvesting',
    rating: 4.9,
    reviews: 31,
    availability: 'Booked',
    image: '🌾',
    description: 'Modern combine harvester for efficient crop collection and processing.',
    features: ['Auto Steering', 'Yield Monitoring', 'Grain Storage', 'High Capacity'],
    distance: '12.3 km',
    responseTime: '6 hours',
    verified: true,
    insurance: true,
    maintenance: 'Last service: 3 days ago',
  },
  {
    id: 4,
    name: 'Seed Drill Planter',
    owner: 'Precision Farming',
    location: 'Thika',
    price: 2000,
    unit: 'day',
    category: 'planting',
    rating: 4.4,
    reviews: 15,
    availability: 'Available',
    image: '🌱',
    description: 'Precision seed drill for accurate planting and optimal seed spacing.',
    features: ['Precision Planting', 'Variable Rate', 'Seed Monitoring', 'GPS Ready'],
    distance: '6.7 km',
    responseTime: '3 hours',
    verified: true,
    insurance: true,
    maintenance: 'Last service: 1 week ago',
  },
];

const bookingHistory = [
  {
    id: 1,
    equipment: 'John Deere Tractor',
    owner: 'Machinery Hub Ltd',
    date: '2024-09-20',
    duration: '2 days',
    total: 6000,
    status: 'Completed',
    rating: 5,
  },
  {
    id: 2,
    equipment: 'Drip Irrigation',
    owner: 'Water Solutions Co',
    date: '2024-09-18',
    duration: '1 day',
    total: 1500,
    status: 'In Progress',
    rating: null,
  },
];

function EquipmentRental() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('distance');
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [bookingDialog, setBookingDialog] = useState(false);
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    duration: 1,
    total: 0,
  });

  const filteredEquipment = equipmentListings.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.owner.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedEquipment = [...filteredEquipment].sort((a, b) => {
    switch (sortBy) {
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance);
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const handleBookEquipment = (equipment) => {
    setSelectedEquipment(equipment);
    setBookingData({
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      duration: 1,
      total: equipment.price,
    });
    setBookingDialog(true);
  };

  const handleBookingSubmit = () => {
    // Handle booking submission
    console.log('Booking submitted:', bookingData);
    setBookingDialog(false);
  };

  const getCategoryIcon = (category) => {
    const cat = equipmentCategories.find(c => c.id === category);
    return cat ? cat.icon : '🔧';
  };

  const getCategoryColor = (category) => {
    const cat = equipmentCategories.find(c => c.id === category);
    return cat ? cat.color : '#757575';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'success';
      case 'Booked': return 'error';
      case 'Maintenance': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ height: '100%', overflow: 'auto', p: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold', mb: 1 }}>
          🚜 Equipment Rental Platform
        </Typography>
        <Typography variant="body1" sx={{ color: '#B0B0B0' }}>
          Rent farming equipment like Hello Tractor - Pay-as-you-go services for all agricultural needs
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444', mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search equipment, owners, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: '#B0B0B0', mr: 1 }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#FFFFFF',
                    '& fieldset': { borderColor: '#444' },
                    '&:hover fieldset': { borderColor: '#4CAF50' },
                    '&.Mui-focused fieldset': { borderColor: '#4CAF50' },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {['all', 'tractor', 'irrigation', 'harvesting', 'planting'].map((category) => (
                  <Chip
                    key={category}
                    label={category === 'all' ? 'All' : equipmentCategories.find(c => c.id === category)?.name}
                    onClick={() => setSelectedCategory(category)}
                    sx={{
                      backgroundColor: selectedCategory === category ? '#4CAF50' : '#1E1E1E',
                      color: selectedCategory === category ? '#FFFFFF' : '#B0B0B0',
                      border: '1px solid #444',
                    }}
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {['distance', 'price', 'rating'].map((sort) => (
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
          </Grid>
        </CardContent>
      </Card>

      {/* Equipment Grid */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {sortedEquipment.map((equipment) => (
          <Grid item xs={12} md={6} lg={4} key={equipment.id}>
            <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444', height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h2" sx={{ mr: 2 }}>
                    {equipment.image}
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                      {equipment.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                      {equipment.owner} • {equipment.location}
                    </Typography>
                  </Box>
                  <Chip
                    label={equipment.availability}
                    color={getStatusColor(equipment.availability)}
                    size="small"
                  />
                </Box>

                <Typography variant="body2" sx={{ color: '#FFFFFF', mb: 2 }}>
                  {equipment.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <MoneyIcon sx={{ color: '#4CAF50', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                    KSh {equipment.price.toLocaleString()}/{equipment.unit}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationIcon sx={{ color: '#B0B0B0', mr: 1, fontSize: 16 }} />
                  <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                    {equipment.distance} away
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <StarIcon sx={{ color: '#FFC107', mr: 0.5 }} />
                  <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                    {equipment.rating}/5 ({equipment.reviews} reviews)
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
                  {equipment.features.slice(0, 2).map((feature, index) => (
                    <Chip
                      key={index}
                      label={feature}
                      size="small"
                      sx={{
                        backgroundColor: '#1E1E1E',
                        color: '#B0B0B0',
                        border: '1px solid #444',
                      }}
                    />
                  ))}
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  disabled={equipment.availability === 'Booked'}
                  onClick={() => handleBookEquipment(equipment)}
                  sx={{
                    backgroundColor: equipment.availability === 'Available' ? '#4CAF50' : '#757575',
                    '&:hover': { backgroundColor: equipment.availability === 'Available' ? '#45A049' : '#757575' },
                  }}
                >
                  {equipment.availability === 'Available' ? 'Book Now' : 'Unavailable'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Booking History */}
      <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444' }}>
        <CardContent>
          <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold', mb: 2 }}>
            Recent Bookings
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Equipment</TableCell>
                  <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Owner</TableCell>
                  <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Duration</TableCell>
                  <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Total</TableCell>
                  <TableCell sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookingHistory.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell sx={{ color: '#FFFFFF' }}>{booking.equipment}</TableCell>
                    <TableCell sx={{ color: '#FFFFFF' }}>{booking.owner}</TableCell>
                    <TableCell sx={{ color: '#FFFFFF' }}>{booking.date}</TableCell>
                    <TableCell sx={{ color: '#FFFFFF' }}>{booking.duration}</TableCell>
                    <TableCell sx={{ color: '#FFFFFF' }}>KSh {booking.total.toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip
                        label={booking.status}
                        color={booking.status === 'Completed' ? 'success' : 'info'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Booking Dialog */}
      <Dialog open={bookingDialog} onClose={() => setBookingDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: '#FFFFFF', backgroundColor: '#2D2D2D' }}>
          Book Equipment
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: '#2D2D2D' }}>
          {selectedEquipment && (
            <Box>
              <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 2 }}>
                {selectedEquipment.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#B0B0B0', mb: 2 }}>
                {selectedEquipment.owner} • {selectedEquipment.location}
              </Typography>
              <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                KSh {selectedEquipment.price.toLocaleString()}/{selectedEquipment.unit}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ backgroundColor: '#2D2D2D' }}>
          <Button onClick={() => setBookingDialog(false)} sx={{ color: '#B0B0B0' }}>
            Cancel
          </Button>
          <Button
            onClick={handleBookingSubmit}
            variant="contained"
            sx={{ backgroundColor: '#4CAF50' }}
          >
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default EquipmentRental;
