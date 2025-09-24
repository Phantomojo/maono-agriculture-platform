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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Avatar,
  Rating,
} from '@mui/material';
import {
  Work as WorkIcon,
  LocalShipping as TransportIcon,
  Store as MarketIcon,
  Build as EquipmentIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  AttachMoney as MoneyIcon,
  Star as StarIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

const jobCategories = [
  { id: 'farm', name: 'Farm Work', icon: <WorkIcon />, color: '#4CAF50' },
  { id: 'transport', name: 'Transport', icon: <TransportIcon />, color: '#2196F3' },
  { id: 'market', name: 'Market Jobs', icon: <MarketIcon />, color: '#FF9800' },
  { id: 'equipment', name: 'Equipment', icon: <EquipmentIcon />, color: '#9C27B0' },
];

const jobListings = [
  {
    id: 1,
    title: 'Seasonal Farm Worker',
    company: 'Green Valley Farm',
    location: 'Nakuru',
    category: 'farm',
    type: 'Full-time',
    salary: 'KSh 15,000/month',
    description: 'Harvesting maize and beans. Experience preferred.',
    requirements: ['Physical fitness', 'Farming experience', 'Reliable'],
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
    category: 'transport',
    type: 'Part-time',
    salary: 'KSh 500/day',
    description: 'Transport farm produce to market. Own bike required.',
    requirements: ['Valid license', 'Own motorcycle', 'Local knowledge'],
    posted: '1 day ago',
    applicants: 8,
    rating: 4.2,
    urgent: false,
  },
  {
    id: 3,
    title: 'Market Vendor',
    company: 'Fresh Produce Market',
    location: 'Nairobi',
    category: 'market',
    type: 'Full-time',
    salary: 'KSh 20,000/month',
    description: 'Sell fresh vegetables at market stall.',
    requirements: ['Sales experience', 'Customer service', 'Math skills'],
    posted: '3 days ago',
    applicants: 15,
    rating: 4.0,
    urgent: false,
  },
  {
    id: 4,
    title: 'Tractor Operator',
    company: 'Machinery Rentals',
    location: 'Eldoret',
    category: 'equipment',
    type: 'Contract',
    salary: 'KSh 2,000/day',
    description: 'Operate tractors for land preparation and planting.',
    requirements: ['Tractor license', 'Experience', 'Safety conscious'],
    posted: '5 days ago',
    applicants: 6,
    rating: 4.7,
    urgent: true,
  },
  {
    id: 5,
    title: 'Delivery Driver',
    company: 'AgriLogistics',
    location: 'Mombasa',
    category: 'transport',
    type: 'Full-time',
    salary: 'KSh 25,000/month',
    description: 'Deliver farm produce to customers across the city.',
    requirements: ['Valid license', 'Clean record', 'Time management'],
    posted: '1 week ago',
    applicants: 20,
    rating: 4.3,
    urgent: false,
  },
  {
    id: 6,
    title: 'Farm Manager',
    company: 'Sunrise Agriculture',
    location: 'Thika',
    category: 'farm',
    type: 'Full-time',
    salary: 'KSh 45,000/month',
    description: 'Manage daily farm operations and supervise workers.',
    requirements: ['Agriculture degree', 'Management experience', 'Leadership'],
    posted: '4 days ago',
    applicants: 8,
    rating: 4.8,
    urgent: false,
  },
];

const equipmentListings = [
  {
    id: 1,
    name: 'John Deere Tractor',
    owner: 'Machinery Hub',
    location: 'Nakuru',
    price: 'KSh 3,000/day',
    availability: 'Available',
    rating: 4.6,
    image: '🚜',
    description: 'Heavy-duty tractor for land preparation and planting.',
  },
  {
    id: 2,
    name: 'Irrigation System',
    owner: 'Water Solutions',
    location: 'Kisumu',
    price: 'KSh 1,500/day',
    availability: 'Available',
    rating: 4.4,
    image: '💧',
    description: 'Complete irrigation system for crop watering.',
  },
  {
    id: 3,
    name: 'Harvesting Equipment',
    owner: 'Farm Tools Co.',
    location: 'Eldoret',
    price: 'KSh 2,000/day',
    availability: 'Booked',
    rating: 4.7,
    image: '🌾',
    description: 'Modern harvesting equipment for efficient crop collection.',
  },
];

function JobBoard() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [jobType, setJobType] = useState('all');
  const [showEquipment, setShowEquipment] = useState(false);

  const filteredJobs = jobListings.filter(job => {
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = jobType === 'all' || job.type.toLowerCase().includes(jobType.toLowerCase());
    return matchesCategory && matchesSearch && matchesType;
  });

  const getCategoryColor = (category) => {
    const cat = jobCategories.find(c => c.id === category);
    return cat ? cat.color : '#757575';
  };

  const getCategoryIcon = (category) => {
    const cat = jobCategories.find(c => c.id === category);
    return cat ? cat.icon : <WorkIcon />;
  };

  return (
    <Box sx={{ height: '100%', overflow: 'auto', p: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold', mb: 1 }}>
          💼 Agricultural Job Board
        </Typography>
        <Typography variant="body1" sx={{ color: '#B0B0B0' }}>
          Find jobs, workers, and equipment in the agricultural sector
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444', mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search jobs, companies, locations..."
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
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#B0B0B0' }}>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  sx={{
                    color: '#FFFFFF',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4CAF50' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4CAF50' },
                  }}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  {jobCategories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#B0B0B0' }}>Job Type</InputLabel>
                <Select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  sx={{
                    color: '#FFFFFF',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#444' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#4CAF50' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#4CAF50' },
                  }}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="full-time">Full-time</MenuItem>
                  <MenuItem value="part-time">Part-time</MenuItem>
                  <MenuItem value="contract">Contract</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant={showEquipment ? 'contained' : 'outlined'}
                onClick={() => setShowEquipment(!showEquipment)}
                sx={{
                  backgroundColor: showEquipment ? '#4CAF50' : 'transparent',
                  color: showEquipment ? '#FFFFFF' : '#4CAF50',
                  borderColor: '#4CAF50',
                }}
              >
                {showEquipment ? 'Jobs' : 'Equipment'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Category Chips */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 2 }}>
          Browse by Category
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {jobCategories.map((category) => (
            <Chip
              key={category.id}
              icon={category.icon}
              label={category.name}
              onClick={() => setSelectedCategory(category.id)}
              sx={{
                backgroundColor: selectedCategory === category.id ? category.color : '#1E1E1E',
                color: selectedCategory === category.id ? '#FFFFFF' : '#B0B0B0',
                border: `1px solid ${category.color}`,
                '&:hover': {
                  backgroundColor: category.color,
                  color: '#FFFFFF',
                },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Job Listings */}
      {!showEquipment ? (
        <Grid container spacing={2}>
          {filteredJobs.map((job) => (
            <Grid item xs={12} md={6} lg={4} key={job.id}>
              <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444', height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Avatar sx={{ backgroundColor: getCategoryColor(job.category), mr: 2 }}>
                      {getCategoryIcon(job.category)}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                        {job.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                        {job.company}
                      </Typography>
                    </Box>
                    {job.urgent && (
                      <Chip label="Urgent" color="error" size="small" />
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationIcon sx={{ color: '#B0B0B0', mr: 1, fontSize: 16 }} />
                    <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                      {job.location}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <MoneyIcon sx={{ color: '#4CAF50', mr: 1, fontSize: 16 }} />
                    <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                      {job.salary}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TimeIcon sx={{ color: '#B0B0B0', mr: 1, fontSize: 16 }} />
                    <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                      {job.posted} • {job.applicants} applicants
                    </Typography>
                  </Box>

                  <Typography variant="body2" sx={{ color: '#FFFFFF', mb: 2 }}>
                    {job.description}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <StarIcon sx={{ color: '#FFC107', mr: 0.5, fontSize: 16 }} />
                    <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                      {job.rating}/5
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    {job.requirements.slice(0, 2).map((req, index) => (
                      <Chip
                        key={index}
                        label={req}
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
      ) : (
        /* Equipment Listings */
        <Grid container spacing={2}>
          {equipmentListings.map((equipment) => (
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
                        {equipment.owner}
                      </Typography>
                    </Box>
                    <Chip
                      label={equipment.availability}
                      color={equipment.availability === 'Available' ? 'success' : 'warning'}
                      size="small"
                    />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationIcon sx={{ color: '#B0B0B0', mr: 1, fontSize: 16 }} />
                    <Typography variant="body2" sx={{ color: '#B0B0B0' }}>
                      {equipment.location}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <MoneyIcon sx={{ color: '#4CAF50', mr: 1, fontSize: 16 }} />
                    <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                      {equipment.price}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <StarIcon sx={{ color: '#FFC107', mr: 0.5, fontSize: 16 }} />
                    <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                      {equipment.rating}/5
                    </Typography>
                  </Box>

                  <Typography variant="body2" sx={{ color: '#FFFFFF', mb: 2 }}>
                    {equipment.description}
                  </Typography>

                  <Button
                    fullWidth
                    variant="contained"
                    disabled={equipment.availability === 'Booked'}
                    sx={{
                      backgroundColor: equipment.availability === 'Available' ? '#4CAF50' : '#757575',
                      '&:hover': { backgroundColor: equipment.availability === 'Available' ? '#45A049' : '#757575' },
                    }}
                  >
                    {equipment.availability === 'Available' ? 'Rent Now' : 'Unavailable'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Post Job Button */}
      <Box sx={{ position: 'fixed', bottom: 100, right: 20, zIndex: 1000 }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: '#4CAF50',
            borderRadius: '50px',
            px: 3,
            py: 1.5,
            '&:hover': { backgroundColor: '#45A049' },
          }}
        >
          + Post Job
        </Button>
      </Box>
    </Box>
  );
}

export default JobBoard;
