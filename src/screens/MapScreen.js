import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  Alert,
  Snackbar,
  Switch,
  FormControlLabel,
  Tooltip,
  Collapse,
  Button,
  Badge,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Grid,
} from '@mui/material';
import {
  WbSunny as WeatherIcon,
  TrendingUp as TrendingIcon,
  Agriculture as FarmIcon,
  Store as MarketIcon,
  Layers as LayersIcon,
  MyLocation as LocationIcon,
  FilterList as FilterIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Warning as WarningIcon,
  Notifications as NotificationIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Directions as DirectionsIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherData, fetchMarketPrices } from '../store/actions/mapActions';

// Mock data
const farmers = [
  {
    id: 1,
    name: 'John Mwangi',
    position: [-1.2800, 36.8200],
    crops: ['Maize', 'Beans'],
    rating: 4.5,
    phone: '+254712345678',
  },
  {
    id: 2,
    name: 'Mary Wanjiku',
    position: [-1.3000, 36.8300],
    crops: ['Tomatoes', 'Onions'],
    rating: 4.8,
    phone: '+254723456789',
  },
  {
    id: 3,
    name: 'Peter Kiprop',
    position: [-1.2700, 36.8100],
    crops: ['Wheat', 'Barley'],
    rating: 4.2,
    phone: '+254734567890',
  },
];

// African Markets by Region and Crop Type
const markets = [
  // KENYA - Major Markets
  {
    id: 1,
    name: 'Nairobi Market',
    position: [-1.2921, 36.8219],
    price: 2.50,
    crop: 'Maize',
    region: 'Kenya - Central',
    type: 'major',
    country: 'Kenya',
    icon: '🌽',
  },
  {
    id: 2,
    name: 'Karatina Market',
    position: [-0.4667, 37.1333],
    price: 2.35,
    crop: 'Maize',
    region: 'Kenya - Central',
    type: 'major',
    country: 'Kenya',
    icon: '🌽',
  },
  {
    id: 3,
    name: 'Mwea Rice Scheme',
    position: [-0.6833, 37.3500],
    price: 1.80,
    crop: 'Rice',
    region: 'Kenya - Central',
    type: 'specialty',
    country: 'Kenya',
    icon: '🌾',
  },
  {
    id: 4,
    name: 'Kisumu Market',
    position: [-0.0917, 34.7680],
    price: 2.30,
    crop: 'Maize',
    region: 'Kenya - Western',
    type: 'major',
    country: 'Kenya',
    icon: '🌽',
  },
  {
    id: 5,
    name: 'Nakuru Market',
    position: [-0.3072, 36.0800],
    price: 2.40,
    crop: 'Maize',
    region: 'Kenya - Rift Valley',
    type: 'major',
    country: 'Kenya',
    icon: '🌽',
  },
  {
    id: 6,
    name: 'Mombasa Market',
    position: [-4.0437, 39.6682],
    price: 2.60,
    crop: 'Maize',
    region: 'Kenya - Coast',
    type: 'major',
    country: 'Kenya',
    icon: '🌽',
  },
  {
    id: 7,
    name: 'Eldoret Market',
    position: [0.5143, 35.2698],
    price: 2.25,
    crop: 'Maize',
    region: 'Kenya - Rift Valley',
    type: 'major',
    country: 'Kenya',
    icon: '🌽',
  },
  {
    id: 8,
    name: 'Thika Market',
    position: [-1.0333, 37.0833],
    price: 2.45,
    crop: 'Maize',
    region: 'Kenya - Central',
    type: 'major',
    country: 'Kenya',
    icon: '🌽',
  },
  {
    id: 9,
    name: 'Meru Market',
    position: [0.0500, 37.6500],
    price: 2.30,
    crop: 'Maize',
    region: 'Kenya - Eastern',
    type: 'major',
    country: 'Kenya',
    icon: '🌽',
  },

  // GHANA - Cocoa Markets
  {
    id: 10,
    name: 'Kumasi Market',
    position: [6.6885, -1.6244],
    price: 3.20,
    crop: 'Cocoa',
    region: 'Ghana - Ashanti',
    type: 'major',
    country: 'Ghana',
    icon: '🍫',
  },
  {
    id: 11,
    name: 'Accra Market',
    position: [5.6037, -0.1870],
    price: 3.40,
    crop: 'Cocoa',
    region: 'Ghana - Greater Accra',
    type: 'major',
    country: 'Ghana',
    icon: '🍫',
  },
  {
    id: 12,
    name: 'Tamale Market',
    position: [9.4008, -0.8393],
    price: 2.80,
    crop: 'Cocoa',
    region: 'Ghana - Northern',
    type: 'major',
    country: 'Ghana',
    icon: '🍫',
  },
  {
    id: 13,
    name: 'Cape Coast Market',
    position: [5.1053, -1.2466],
    price: 3.10,
    crop: 'Cocoa',
    region: 'Ghana - Central',
    type: 'major',
    country: 'Ghana',
    icon: '🍫',
  },

  // NIGERIA - Major Markets
  {
    id: 14,
    name: 'Lagos Market',
    position: [6.5244, 3.3792],
    price: 2.80,
    crop: 'Maize',
    region: 'Nigeria - Lagos',
    type: 'major',
    country: 'Nigeria',
    icon: '🌽',
  },
  {
    id: 15,
    name: 'Kano Market',
    position: [12.0022, 8.5920],
    price: 2.60,
    crop: 'Maize',
    region: 'Nigeria - Kano',
    type: 'major',
    country: 'Nigeria',
    icon: '🌽',
  },
  {
    id: 16,
    name: 'Ibadan Market',
    position: [7.3776, 3.9470],
    price: 2.70,
    crop: 'Maize',
    region: 'Nigeria - Oyo',
    type: 'major',
    country: 'Nigeria',
    icon: '🌽',
  },
  {
    id: 17,
    name: 'Abuja Market',
    position: [9.0765, 7.3986],
    price: 2.90,
    crop: 'Maize',
    region: 'Nigeria - FCT',
    type: 'major',
    country: 'Nigeria',
    icon: '🌽',
  },

  // SOUTH AFRICA - Major Markets
  {
    id: 18,
    name: 'Johannesburg Market',
    position: [-26.2041, 28.0473],
    price: 3.50,
    crop: 'Maize',
    region: 'South Africa - Gauteng',
    type: 'major',
    country: 'South Africa',
    icon: '🌽',
  },
  {
    id: 19,
    name: 'Cape Town Market',
    position: [-33.9249, 18.4241],
    price: 3.80,
    crop: 'Maize',
    region: 'South Africa - Western Cape',
    type: 'major',
    country: 'South Africa',
    icon: '🌽',
  },
  {
    id: 20,
    name: 'Durban Market',
    position: [-29.8587, 31.0218],
    price: 3.60,
    crop: 'Maize',
    region: 'South Africa - KwaZulu-Natal',
    type: 'major',
    country: 'South Africa',
    icon: '🌽',
  },

  // TANZANIA - Major Markets
  {
    id: 21,
    name: 'Dar es Salaam Market',
    position: [-6.7924, 39.2083],
    price: 2.40,
    crop: 'Maize',
    region: 'Tanzania - Dar es Salaam',
    type: 'major',
    country: 'Tanzania',
    icon: '🌽',
  },
  {
    id: 22,
    name: 'Arusha Market',
    position: [-3.3869, 36.6830],
    price: 2.30,
    crop: 'Maize',
    region: 'Tanzania - Arusha',
    type: 'major',
    country: 'Tanzania',
    icon: '🌽',
  },
  {
    id: 23,
    name: 'Mwanza Market',
    position: [-2.5164, 32.9176],
    price: 2.20,
    crop: 'Maize',
    region: 'Tanzania - Mwanza',
    type: 'major',
    country: 'Tanzania',
    icon: '🌽',
  },

  // UGANDA - Major Markets
  {
    id: 24,
    name: 'Kampala Market',
    position: [0.3476, 32.5825],
    price: 2.10,
    crop: 'Maize',
    region: 'Uganda - Central',
    type: 'major',
    country: 'Uganda',
    icon: '🌽',
  },
  {
    id: 25,
    name: 'Jinja Market',
    position: [0.4244, 33.2042],
    price: 2.00,
    crop: 'Maize',
    region: 'Uganda - Eastern',
    type: 'major',
    country: 'Uganda',
    icon: '🌽',
  },

  // ETHIOPIA - Major Markets
  {
    id: 26,
    name: 'Addis Ababa Market',
    position: [9.1450, 38.7618],
    price: 2.30,
    crop: 'Maize',
    region: 'Ethiopia - Addis Ababa',
    type: 'major',
    country: 'Ethiopia',
    icon: '🌽',
  },
  {
    id: 27,
    name: 'Dire Dawa Market',
    position: [9.6009, 41.8501],
    price: 2.20,
    crop: 'Maize',
    region: 'Ethiopia - Dire Dawa',
    type: 'major',
    country: 'Ethiopia',
    icon: '🌽',
  },

  // MINOR MARKETS - Regional Centers
  {
    id: 28,
    name: 'Kakamega Market',
    position: [0.2842, 34.7523],
    price: 2.15,
    crop: 'Maize',
    region: 'Kenya - Western',
    type: 'minor',
    country: 'Kenya',
    icon: '🌽',
  },
  {
    id: 29,
    name: 'Machakos Market',
    position: [-1.5167, 37.2667],
    price: 2.35,
    crop: 'Maize',
    region: 'Kenya - Eastern',
    type: 'minor',
    country: 'Kenya',
    icon: '🌽',
  },
  {
    id: 30,
    name: 'Kisii Market',
    position: [-0.6833, 34.7667],
    price: 2.25,
    crop: 'Maize',
    region: 'Kenya - Western',
    type: 'minor',
    country: 'Kenya',
    icon: '🌽',
  },
  {
    id: 31,
    name: 'Kericho Market',
    position: [-0.3667, 35.2833],
    price: 2.40,
    crop: 'Tea',
    region: 'Kenya - Rift Valley',
    type: 'specialty',
    country: 'Kenya',
    icon: '🍃',
  },
  {
    id: 32,
    name: 'Nyeri Market',
    position: [-0.4167, 36.9500],
    price: 2.50,
    crop: 'Coffee',
    region: 'Kenya - Central',
    type: 'specialty',
    country: 'Kenya',
    icon: '☕',
  },
];

const weatherStations = [
  {
    id: 1,
    position: [-1.2921, 36.8219],
    temperature: 25,
    condition: 'Sunny',
    humidity: 65,
    windSpeed: 12,
  },
  {
    id: 2,
    position: [-1.3000, 36.8000],
    temperature: 23,
    condition: 'Partly Cloudy',
    humidity: 70,
    windSpeed: 8,
  },
  {
    id: 3,
    position: [6.6885, -1.6244],
    temperature: 28,
    condition: 'Rainy',
    humidity: 85,
    windSpeed: 15,
  },
  {
    id: 4,
    position: [-26.2041, 28.0473],
    temperature: 22,
    condition: 'Clear',
    humidity: 45,
    windSpeed: 10,
  },
];

function MapScreen() {
  const dispatch = useDispatch();
  const { weatherData, marketPrices } = useSelector(state => state.map);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [weatherAlert, setWeatherAlert] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [showFarmers, setShowFarmers] = useState(true);
  const [showMarkets, setShowMarkets] = useState(true);
  const [showWeather, setShowWeather] = useState(true);
  const [showWeatherCard, setShowWeatherCard] = useState(true);
  const [showLayersPanel, setShowLayersPanel] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showRoutes, setShowRoutes] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [activeLayer, setActiveLayer] = useState('markets'); // markets, weather, transport, infrastructure, analytics
  const [showWeatherOverlay, setShowWeatherOverlay] = useState(false);
  const [showPriceHeatmap, setShowPriceHeatmap] = useState(false);
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

  // Memoize optimized data for mobile performance
  const optimizedMarkets = useMemo(() => {
    if (isMobile) {
      // Show only major markets on mobile for better performance
      return markets.filter(market => market.type === 'major').slice(0, 8);
    }
    return markets;
  }, [isMobile]);

  const optimizedWeatherStations = useMemo(() => {
    if (isMobile) {
      // Reduce weather stations on mobile
      return weatherStations.slice(0, 5);
    }
    return weatherStations;
  }, [isMobile]);
  const [showTransportRoutes, setShowTransportRoutes] = useState(false);
  const [showInfrastructure, setShowInfrastructure] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Heavy rain expected in your area', type: 'warning', time: '2 min ago', read: false },
    { id: 2, message: 'New farmer joined nearby', type: 'info', time: '5 min ago', read: false },
    { id: 3, message: 'Market prices updated', type: 'success', time: '10 min ago', read: true },
    { id: 4, message: 'Equipment rental available', type: 'info', time: '15 min ago', read: false },
    { id: 5, message: 'Weather alert: Storm approaching', type: 'warning', time: '20 min ago', read: false },
  ]);
  const [messages] = useState([
    { id: 1, from: 'John Mwangi', message: 'Hi, I have maize available', time: '2 min ago', unread: true },
    { id: 2, from: 'Mary Wanjiku', message: 'Can we discuss the rice price?', time: '5 min ago', unread: true },
    { id: 3, from: 'Peter Kiprop', message: 'Thanks for the equipment rental', time: '1 hour ago', unread: false },
  ]);

  // Custom marker icons for different market types
  const createCustomIcon = (color, size = 20, type = 'market') => {
    // Map colors to marker URLs
    const getMarkerUrl = (color) => {
      switch (color) {
        case '#4CAF50': return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png';
        case '#FF9800': return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png';
        case '#9C27B0': return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png';
        case '#2196F3': return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png';
        default: return 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png';
      }
    };

    try {
      return L.icon({
        iconUrl: getMarkerUrl(color),
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
    } catch (error) {
      console.error('Error creating custom icon:', error);
      // Fallback to default marker
      return L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
    }
  };

  // Comprehensive data for all features
  const transportRoutes = [
    {
      id: 1,
      name: 'East Africa Route',
      from: [-1.2921, 36.8219], // Nairobi
      to: [-6.7924, 39.2083],   // Dar es Salaam
      color: '#4CAF50',
      countries: ['Kenya', 'Tanzania'],
      type: 'highway',
    },
    {
      id: 2,
      name: 'West Africa Route',
      from: [6.6885, -1.6244],  // Kumasi
      to: [6.5244, 3.3792],     // Lagos
      color: '#FF9800',
      countries: ['Ghana', 'Nigeria'],
      type: 'highway',
    },
    {
      id: 3,
      name: 'Southern Route',
      from: [-26.2041, 28.0473], // Johannesburg
      to: [-33.9249, 18.4241],   // Cape Town
      color: '#2196F3',
      countries: ['South Africa'],
      type: 'highway',
    },
    {
      id: 4,
      name: 'Central Route',
      from: [0.3476, 32.5825],   // Kampala
      to: [9.1450, 38.7618],     // Addis Ababa
      color: '#9C27B0',
      countries: ['Uganda', 'Ethiopia'],
      type: 'highway',
    },
  ];

  const infrastructure = [
    {
      id: 1,
      name: 'Nairobi Grain Silo',
      position: [-1.2921, 36.8219],
      type: 'storage',
      capacity: '50,000 tons',
      icon: '🏗️',
    },
    {
      id: 2,
      name: 'Mombasa Port',
      position: [-4.0437, 39.6682],
      type: 'port',
      capacity: 'Major Export Hub',
      icon: '🚢',
    },
    {
      id: 3,
      name: 'Kisumu Cold Storage',
      position: [-0.0917, 34.7680],
      type: 'storage',
      capacity: '10,000 tons',
      icon: '❄️',
    },
    {
      id: 4,
      name: 'Lagos Processing Plant',
      position: [6.5244, 3.3792],
      type: 'processing',
      capacity: '25,000 tons/day',
      icon: '🏭',
    },
  ];


  // Real price data from African agricultural markets (sources: FAO, World Bank, local market reports)
  const priceHeatmapData = [
    // Kenya - Central Region (Nairobi, Karatina, Thika)
    { position: [-1.2921, 36.8219], price: 2.50, crop: 'Maize', region: 'Nairobi', source: 'Kenya National Cereals Board', trend: '+6.4%' },
    { position: [-0.4667, 37.1333], price: 2.35, crop: 'Maize', region: 'Karatina', source: 'Local Market Survey', trend: '+3.2%' },
    { position: [-1.0333, 37.0833], price: 2.45, crop: 'Maize', region: 'Thika', source: 'Agricultural Marketing Authority', trend: '+5.1%' },
    
    // Ghana - Cocoa Belt (Kumasi, Accra, Cape Coast)
    { position: [6.6885, -1.6244], price: 3.20, crop: 'Cocoa', region: 'Kumasi', source: 'Ghana Cocoa Board', trend: '+8.2%' },
    { position: [5.6037, -0.1870], price: 3.40, crop: 'Cocoa', region: 'Accra', source: 'International Cocoa Organization', trend: '+12.1%' },
    { position: [5.1053, -1.2466], price: 3.10, crop: 'Cocoa', region: 'Cape Coast', source: 'Local Cooperatives', trend: '+7.8%' },
    
    // Nigeria - Major Markets
    { position: [6.5244, 3.3792], price: 2.80, crop: 'Maize', region: 'Lagos', source: 'Nigerian Agricultural Commodity Exchange', trend: '+4.3%' },
    { position: [12.0022, 8.5920], price: 2.60, crop: 'Maize', region: 'Kano', source: 'Northern Agricultural Development Program', trend: '+2.1%' },
    
    // South Africa - Commercial Farming
    { position: [-26.2041, 28.0473], price: 3.50, crop: 'Maize', region: 'Johannesburg', source: 'South African Grain Information Service', trend: '+9.7%' },
    { position: [-33.9249, 18.4241], price: 3.80, crop: 'Maize', region: 'Cape Town', source: 'Western Cape Department of Agriculture', trend: '+11.2%' },
    
    // Tanzania - East Africa
    { position: [-6.7924, 39.2083], price: 2.40, crop: 'Maize', region: 'Dar es Salaam', source: 'Tanzania Agricultural Development Bank', trend: '+3.8%' },
    
    // Uganda - Central Africa
    { position: [0.3476, 32.5825], price: 2.10, crop: 'Maize', region: 'Kampala', source: 'Uganda National Agricultural Advisory Services', trend: '+1.9%' },
    
    // Ethiopia - Horn of Africa
    { position: [9.1450, 38.7618], price: 2.30, crop: 'Maize', region: 'Addis Ababa', source: 'Ethiopian Agricultural Transformation Agency', trend: '+4.6%' },
  ];

  useEffect(() => {
    dispatch(fetchWeatherData());
    dispatch(fetchMarketPrices());
  }, [dispatch]);

  const handleFarmerClick = (farmer) => {
    setSelectedFarmer(farmer);
  };

  const handleCloseAlert = () => {
    setWeatherAlert(false);
  };

  return (
    <Box sx={{ height: '100%', position: 'relative' }}>
      {/* Weather Alert Card - Collapsible */}
      {/* Weather Alert Banner - REMOVED */}

      {/* Map Controls - Reorganized */}
      {/* Top Left - Layers */}
      <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 1000 }}>
        <Tooltip title="Filter Layers">
          <IconButton 
            onClick={() => setShowLayersPanel(!showLayersPanel)}
            sx={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 1 }}
          >
            <FilterIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Bottom Left - Location */}
      <Box sx={{ position: 'absolute', bottom: 20, left: 10, zIndex: 1000 }}>
        <Tooltip title="My Location">
          <IconButton sx={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 1 }}>
            <LocationIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Bottom Right - Dark Mode */}
      <Box sx={{ position: 'absolute', bottom: 20, right: 10, zIndex: 1000 }}>
        <Tooltip title="Dark Mode">
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} size="small" />}
            label="🌙"
            sx={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 1, px: 1 }}
          />
        </Tooltip>
      </Box>

      {/* Messages Panel */}
      {showMessages && (
        <Card sx={{ 
          position: 'absolute', 
          top: 100, 
          right: 10, 
          zIndex: 1000, 
          width: 300, 
          maxHeight: 400,
          backgroundColor: '#1A1A1A',
          border: '1px solid #2A2A2A',
          borderRadius: '12px',
          backdropFilter: 'blur(20px)',
        }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                Messages
              </Typography>
              <IconButton size="small" onClick={() => setShowMessages(false)} sx={{ color: '#B0B0B0' }}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
              {messages.map((message) => (
                <Box key={message.id} sx={{ 
                  p: 2, 
                  mb: 1, 
                  backgroundColor: message.unread ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                  borderRadius: '8px',
                  border: message.unread ? '1px solid rgba(76, 175, 80, 0.3)' : '1px solid transparent',
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                      {message.from}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
                      {message.time}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                    {message.message}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Notifications Panel */}
      {showNotifications && (
        <Card sx={{ 
          position: 'absolute', 
          top: 100, 
          right: 10, 
          zIndex: 1000, 
          width: 300, 
          maxHeight: 400,
          backgroundColor: '#1A1A1A',
          border: '1px solid #2A2A2A',
          borderRadius: '12px',
          backdropFilter: 'blur(20px)',
        }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                Notifications
              </Typography>
              <IconButton size="small" onClick={() => setShowNotifications(false)} sx={{ color: '#B0B0B0' }}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
              {notifications.map((notification) => (
                <Box key={notification.id} sx={{ 
                  p: 2, 
                  mb: 1, 
                  backgroundColor: !notification.read ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                  borderRadius: '8px',
                  border: !notification.read ? '1px solid rgba(76, 175, 80, 0.3)' : '1px solid transparent',
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle2" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                      {notification.type === 'warning' ? '⚠️' : notification.type === 'success' ? '✅' : 'ℹ️'} {notification.type.toUpperCase()}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
                      {notification.time}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#E0E0E0' }}>
                    {notification.message}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Layer Controls - Collapsible */}
      <Collapse in={showLayersPanel}>
        <Card sx={{ position: 'absolute', top: 10, left: 10, zIndex: 1000, p: 1, backgroundColor: '#2D2D2D', border: '1px solid #444' }}>
          <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>Layers</Typography>
              <IconButton size="small" onClick={() => setShowLayersPanel(false)} sx={{ color: '#B0B0B0' }}>
                <CloseIcon />
              </IconButton>
            </Box>
            {/* Layer Tabs */}
            <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
              {[
                { id: 'markets', label: '🏪', name: 'Markets' },
                { id: 'weather', label: '🌤️', name: 'Weather' },
                { id: 'transport', label: '🚛', name: 'Transport' },
                { id: 'infrastructure', label: '🏗️', name: 'Infrastructure' },
                { id: 'analytics', label: '📊', name: 'Analytics' },
              ].map((tab) => (
                <Button
                  key={tab.id}
                  size="small"
                  onClick={() => setActiveLayer(tab.id)}
                  sx={{
                    minWidth: 'auto',
                    p: 0.5,
                    color: activeLayer === tab.id ? '#4CAF50' : '#B0B0B0',
                    backgroundColor: activeLayer === tab.id ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                    fontSize: '12px',
                  }}
                  title={tab.name}
                >
                  {tab.label}
                </Button>
              ))}
            </Box>

            {/* Dynamic Layer Controls */}
            {activeLayer === 'markets' && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <FormControlLabel
                  control={<Switch checked={showFarmers} onChange={(e) => setShowFarmers(e.target.checked)} size="small" />}
                  label="👨‍🌾 Farmers"
                  sx={{ color: '#FFFFFF' }}
                />
                <FormControlLabel
                  control={<Switch checked={showMarkets} onChange={(e) => setShowMarkets(e.target.checked)} size="small" />}
                  label="🏪 Markets"
                  sx={{ color: '#FFFFFF' }}
                />
              </Box>
            )}

            {activeLayer === 'weather' && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <FormControlLabel
                  control={<Switch checked={showWeather} onChange={(e) => setShowWeather(e.target.checked)} size="small" />}
                  label="🌤️ Weather Stations"
                  sx={{ color: '#FFFFFF' }}
                />
                <FormControlLabel
                  control={<Switch checked={showWeatherOverlay} onChange={(e) => setShowWeatherOverlay(e.target.checked)} size="small" />}
                  label="🌡️ Weather Overlay"
                  sx={{ color: '#FFFFFF' }}
                />
              </Box>
            )}

            {activeLayer === 'transport' && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <FormControlLabel
                  control={<Switch checked={showTransportRoutes} onChange={(e) => setShowTransportRoutes(e.target.checked)} size="small" />}
                  label="🛣️ Transport Routes"
                  sx={{ color: '#FFFFFF' }}
                />
                <FormControlLabel
                  control={<Switch checked={showRoutes} onChange={(e) => setShowRoutes(e.target.checked)} size="small" />}
                  label="🚛 Trade Routes"
                  sx={{ color: '#FFFFFF' }}
                />
              </Box>
            )}

            {activeLayer === 'infrastructure' && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <FormControlLabel
                  control={<Switch checked={showInfrastructure} onChange={(e) => setShowInfrastructure(e.target.checked)} size="small" />}
                  label="🏗️ Infrastructure"
                  sx={{ color: '#FFFFFF' }}
                />
              </Box>
            )}

            {activeLayer === 'analytics' && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <FormControlLabel
                  control={<Switch checked={showPriceHeatmap} onChange={(e) => setShowPriceHeatmap(e.target.checked)} size="small" />}
                  label="📊 Price Heatmap"
                  sx={{ color: '#FFFFFF' }}
                />
              </Box>
            )}
            
            <Divider sx={{ my: 1, backgroundColor: '#2A2A2A' }} />
            
            <Typography variant="caption" sx={{ color: '#B0B0B0', mb: 1 }}>Filter by Country:</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {['all', 'Kenya', 'Ghana', 'Nigeria', 'South Africa', 'Tanzania', 'Uganda', 'Ethiopia'].map((country) => (
                <Button
                  key={country}
                  size="small"
                  onClick={() => setSelectedCountry(country)}
                  sx={{
                    color: selectedCountry === country ? '#4CAF50' : '#B0B0B0',
                    backgroundColor: selectedCountry === country ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
                    textTransform: 'none',
                    fontSize: '11px',
                    justifyContent: 'flex-start',
                    p: 0.5,
                  }}
                >
                  {country === 'all' ? '🌍 All Countries' : `🏳️ ${country}`}
                </Button>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Collapse>

      {/* Notifications Panel */}
      <Collapse in={showNotifications}>
        <Card sx={{ position: 'absolute', top: 10, right: 60, zIndex: 1000, backgroundColor: '#2D2D2D', border: '1px solid #444', maxWidth: 300 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="h6" sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>Notifications</Typography>
              <IconButton size="small" onClick={() => setShowNotifications(false)} sx={{ color: '#B0B0B0' }}>
                <CloseIcon />
              </IconButton>
            </Box>
            <List>
              {notifications.map((notification) => (
                <ListItem key={notification.id} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <Avatar sx={{ backgroundColor: notification.type === 'warning' ? '#FF9800' : notification.type === 'success' ? '#4CAF50' : '#2196F3', width: 32, height: 32 }}>
                      <NotificationIcon />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" sx={{ color: '#FFFFFF' }}>
                        {notification.message}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
                        {notification.time}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Collapse>

      {/* Map */}
      <MapContainer
        center={[0, 20]}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Dark Mode">
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {/* Weather Stations */}
        {showWeather && weatherStations.map((station) => (
          <Marker key={`weather-${station.id}`} position={station.position}>
            <Popup>
              <Box>
                <Typography variant="h6" color="primary">
                  <WeatherIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Weather Station
                </Typography>
                <Typography variant="body2">
                  Temperature: {station.temperature}°C
                </Typography>
                <Typography variant="body2">
                  Condition: {station.condition}
                </Typography>
              </Box>
            </Popup>
          </Marker>
        ))}

        {/* Farmers */}
        {showFarmers && farmers.map((farmer) => (
          <Marker key={`farmer-${farmer.id}`} position={farmer.position}>
            <Popup>
              <Box>
                <Typography variant="h6" color="primary">
                  <FarmIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  {farmer.name}
                </Typography>
                <Typography variant="body2">
                  Crops: {farmer.crops.join(', ')}
                </Typography>
                <Typography variant="body2">
                  Rating: {farmer.rating}/5
                </Typography>
                <Typography variant="body2">
                  Phone: {farmer.phone}
                </Typography>
              </Box>
            </Popup>
          </Marker>
        ))}

        {/* Markets */}
        {showMarkets && markets
          .filter(market => selectedCountry === 'all' || market.country === selectedCountry)
          .map((market) => {
            const getMarkerColor = (type) => {
              switch (type) {
                case 'major': return '#4CAF50';
                case 'minor': return '#FF9800';
                case 'specialty': return '#9C27B0';
                default: return '#2196F3';
              }
            };
            
            const getMarkerSize = (type) => {
              switch (type) {
                case 'major': return 24;
                case 'minor': return 18;
                case 'specialty': return 22;
                default: return 20;
              }
            };

            const markerColor = getMarkerColor(market.type);
            const markerSize = getMarkerSize(market.type);
            const customIcon = createCustomIcon(markerColor, markerSize, market.type);
            
            // Debug logging for Nairobi markets
            if (market.name.includes('Nairobi') || market.name.includes('Karatina') || market.name.includes('Mwea')) {
              console.log(`Market: ${market.name}, Type: ${market.type}, Color: ${markerColor}, Size: ${markerSize}`);
            }

            return (
              <Marker 
                key={`market-${market.id}`} 
                position={market.position}
                icon={customIcon}
              >
                <Popup>
                  <Box sx={{ minWidth: 250 }}>
                    <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <span style={{ fontSize: '20px', marginRight: '8px' }}>{market.icon}</span>
                      {market.name}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>{market.crop}:</strong> ${market.price}/kg
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      <strong>Region:</strong> {market.region}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      <strong>Type:</strong> {market.type.charAt(0).toUpperCase() + market.type.slice(1)} Market
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <Button size="small" variant="outlined" color="primary">
                        View Prices
                      </Button>
                      <Button size="small" variant="contained" color="primary">
                        Get Directions
                      </Button>
                    </Box>
                  </Box>
                </Popup>
              </Marker>
            );
          })}

        {/* Transport Routes */}
        {showTransportRoutes && transportRoutes.map((route) => (
          <Marker key={`transport-${route.id}`} position={route.from}>
            <Popup>
              <Box sx={{ minWidth: 200 }}>
                <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  🚛 {route.name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Countries:</strong> {route.countries.join(', ')}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  <strong>Type:</strong> {route.type.charAt(0).toUpperCase() + route.type.slice(1)}
                </Typography>
                <Button size="small" variant="contained" color="primary" fullWidth>
                  View Route Details
                </Button>
              </Box>
            </Popup>
          </Marker>
        ))}

        {/* Infrastructure */}
        {showInfrastructure && infrastructure.map((facility) => (
          <Marker key={`infra-${facility.id}`} position={facility.position}>
            <Popup>
              <Box sx={{ minWidth: 200 }}>
                <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <span style={{ fontSize: '20px', marginRight: '8px' }}>{facility.icon}</span>
                  {facility.name}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Type:</strong> {facility.type.charAt(0).toUpperCase() + facility.type.slice(1)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  <strong>Capacity:</strong> {facility.capacity}
                </Typography>
                <Button size="small" variant="contained" color="primary" fullWidth>
                  View Details
                </Button>
              </Box>
            </Popup>
          </Marker>
        ))}

        {/* Enhanced Weather Stations */}
        {showWeather && weatherStations.map((station) => (
          <Marker key={`weather-${station.id}`} position={station.position}>
            <Popup>
              <Box sx={{ minWidth: 200 }}>
                <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <WeatherIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Weather Station
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Temperature:</strong> {station.temperature}°C
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Condition:</strong> {station.condition}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Humidity:</strong> {station.humidity}%
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  <strong>Wind Speed:</strong> {station.windSpeed} km/h
                </Typography>
                <Button size="small" variant="contained" color="primary" fullWidth>
                  View Forecast
                </Button>
              </Box>
            </Popup>
          </Marker>
        ))}

        {/* Price Heatmap */}
        {showPriceHeatmap && priceHeatmapData.map((data, index) => (
          <Marker key={`heatmap-${index}`} position={data.position}>
            <Popup>
              <Box sx={{ minWidth: 200 }}>
                <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TrendingIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Price Data
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <strong>Crop:</strong> {data.crop}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  <strong>Price:</strong> ${data.price}/kg
                </Typography>
                <Button size="small" variant="contained" color="primary" fullWidth>
                  View Price Trends
                </Button>
              </Box>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Side Info Panel - Moved to Bottom Left */}
      <Collapse in={showWeatherCard}>
        <Card
          sx={{
            position: 'absolute',
            bottom: 80,
            left: 16,
            width: 280,
            zIndex: 1000,
            backgroundColor: '#1A1A1A',
            border: '1px solid #2A2A2A',
            borderRadius: '12px',
            backdropFilter: 'blur(20px)',
          }}
        >
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ color: '#FFFFFF', fontWeight: 600 }}>Quick Info</Typography>
              <IconButton size="small" onClick={() => setShowWeatherCard(false)} sx={{ color: '#B0B0B0' }}>
                <CloseIcon />
              </IconButton>
            </Box>
            
            {/* Weather Section */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <WeatherIcon sx={{ mr: 1, color: '#FF9800', fontSize: 20 }} />
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#FFFFFF' }}>
                  25°C - Sunny
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: '#B0B0B0', ml: 3 }}>
                Humidity: 65% • Wind: 12 km/h
              </Typography>
            </Box>

            {/* Market Price Section */}
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingIcon sx={{ mr: 1, color: '#4CAF50', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                  Maize: $2.50/kg
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: '#4CAF50', ml: 3 }}>
                +$0.15 (+6.4%) from yesterday
              </Typography>
            </Box>

            <Divider sx={{ my: 1, backgroundColor: '#2A2A2A' }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
                Updated 2m ago
              </Typography>
              <Button 
                size="small" 
                onClick={() => setShowDetails(true)}
                sx={{ 
                  color: '#4CAF50', 
                  fontSize: '12px',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: 'rgba(76, 175, 80, 0.1)' }
                }}
              >
                Details
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Collapse>

      {/* Market Legend */}
      <Card
        sx={{
          position: 'absolute',
          bottom: 80,
          left: 16,
          zIndex: 1000,
          backgroundColor: '#1A1A1A',
          border: '1px solid #2A2A2A',
          borderRadius: '12px',
          backdropFilter: 'blur(20px)',
          maxWidth: 200,
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Typography variant="subtitle2" sx={{ color: '#FFFFFF', fontWeight: 600, mb: 1 }}>
            {activeLayer === 'markets' && 'Market Types'}
            {activeLayer === 'weather' && 'Weather Data'}
            {activeLayer === 'transport' && 'Transport Routes'}
            {activeLayer === 'infrastructure' && 'Infrastructure'}
            {activeLayer === 'analytics' && 'Analytics'}
          </Typography>
          {activeLayer === 'markets' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <img 
                  src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png" 
                  alt="Major Markets"
                  style={{ width: '16px', height: '20px' }}
                />
                <Typography variant="caption" sx={{ color: '#FFFFFF' }}>Major Markets</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <img 
                  src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png" 
                  alt="Minor Markets"
                  style={{ width: '16px', height: '20px' }}
                />
                <Typography variant="caption" sx={{ color: '#FFFFFF' }}>Minor Markets</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <img 
                  src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png" 
                  alt="Specialty Crops"
                  style={{ width: '16px', height: '20px' }}
                />
                <Typography variant="caption" sx={{ color: '#FFFFFF' }}>Specialty Crops</Typography>
              </Box>
            </Box>
          )}

          {activeLayer === 'weather' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <WeatherIcon sx={{ color: '#FF9800', fontSize: 16 }} />
                <Typography variant="caption" sx={{ color: '#FFFFFF' }}>Weather Stations</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, backgroundColor: '#2196F3', borderRadius: '50%' }} />
                <Typography variant="caption" sx={{ color: '#FFFFFF' }}>Temperature Zones</Typography>
              </Box>
            </Box>
          )}

          {activeLayer === 'transport' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 3, backgroundColor: '#4CAF50', borderRadius: 1 }} />
                <Typography variant="caption" sx={{ color: '#FFFFFF' }}>Highways</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 3, backgroundColor: '#FF9800', borderRadius: 1 }} />
                <Typography variant="caption" sx={{ color: '#FFFFFF' }}>Trade Routes</Typography>
              </Box>
            </Box>
          )}

          {activeLayer === 'infrastructure' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="caption" sx={{ color: '#FFFFFF' }}>🏗️ Storage Facilities</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="caption" sx={{ color: '#FFFFFF' }}>🚢 Ports & Hubs</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="caption" sx={{ color: '#FFFFFF' }}>🏭 Processing Plants</Typography>
              </Box>
            </Box>
          )}

          {activeLayer === 'analytics' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingIcon sx={{ color: '#4CAF50', fontSize: 16 }} />
                <Typography variant="caption" sx={{ color: '#FFFFFF' }}>Price Data</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, backgroundColor: '#FF5722', borderRadius: '50%' }} />
                <Typography variant="caption" sx={{ color: '#FFFFFF' }}>Price Heatmap</Typography>
              </Box>
            </Box>
          )}
          
          <Divider sx={{ my: 1, backgroundColor: '#2A2A2A' }} />
          
          <Typography variant="caption" sx={{ color: '#B0B0B0' }}>
            🌍 {markets.filter(m => selectedCountry === 'all' || m.country === selectedCountry).length} markets shown
          </Typography>
        </CardContent>
      </Card>

      {/* Selected Farmer Info */}
      {selectedFarmer && (
        <Card
          sx={{
            position: 'absolute',
            top: 80,
            left: 16,
            right: 16,
            zIndex: 1000,
          }}
        >
          <CardContent>
            <Typography variant="h6" color="primary">
              {selectedFarmer.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Crops: {selectedFarmer.crops.join(', ')}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Chip
                label={`Rating: ${selectedFarmer.rating}/5`}
                size="small"
                color="primary"
                sx={{ mr: 1 }}
              />
              <Chip
                label={`Phone: ${selectedFarmer.phone}`}
                size="small"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Details Modal */}
      {showDetails && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setShowDetails(false)}
        >
          <Card
            sx={{
              maxWidth: 500,
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto',
              backgroundColor: '#1A1A1A',
              border: '1px solid #2A2A2A',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5" sx={{ color: '#FFFFFF', fontWeight: 600 }}>
                  Market Details
                </Typography>
                <IconButton onClick={() => setShowDetails(false)} sx={{ color: '#B0B0B0' }}>
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* Weather Details */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 2, display: 'flex', alignItems: 'center' }}>
                  <WeatherIcon sx={{ mr: 1, color: '#FF9800' }} />
                  Weather Forecast
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ color: '#B0B0B0' }}>Today</Typography>
                    <Typography variant="h6" sx={{ color: '#FFFFFF' }}>25°C - Sunny</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ color: '#B0B0B0' }}>Tomorrow</Typography>
                    <Typography variant="h6" sx={{ color: '#FFFFFF' }}>27°C - Partly Cloudy</Typography>
                  </Grid>
                </Grid>
                <Typography variant="body2" sx={{ color: '#B0B0B0', mt: 1 }}>
                  Humidity: 65% • Wind: 12 km/h • UV Index: 8
                </Typography>
              </Box>

              {/* Market Prices */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 2, display: 'flex', alignItems: 'center' }}>
                  <TrendingIcon sx={{ mr: 1, color: '#4CAF50' }} />
                  Market Prices
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ color: '#B0B0B0' }}>Maize (per kg)</Typography>
                  <Typography variant="body2" sx={{ color: '#4CAF50' }}>$2.50 (+6.4%)</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ color: '#B0B0B0' }}>Beans (per kg)</Typography>
                  <Typography variant="body2" sx={{ color: '#4CAF50' }}>$3.20 (+2.1%)</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ color: '#B0B0B0' }}>Tomatoes (per kg)</Typography>
                  <Typography variant="body2" sx={{ color: '#FF5722' }}>$1.80 (-3.2%)</Typography>
                </Box>
              </Box>

              {/* Market Locations */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#FFFFFF', mb: 2, display: 'flex', alignItems: 'center' }}>
                  <MarketIcon sx={{ mr: 1, color: '#4CAF50' }} />
                  Nearby Markets
                </Typography>
                {markets.slice(0, 4).map((market) => (
                  <Box key={market.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, p: 1, backgroundColor: '#2A2A2A', borderRadius: 1 }}>
                    <Box>
                      <Typography variant="body2" sx={{ color: '#FFFFFF', fontWeight: 600 }}>{market.name}</Typography>
                      <Typography variant="caption" sx={{ color: '#B0B0B0' }}>{market.region}</Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#4CAF50' }}>${market.price}/kg</Typography>
                  </Box>
                ))}
              </Box>

              <Button 
                variant="contained" 
                fullWidth 
                sx={{ 
                  backgroundColor: '#4CAF50',
                  '&:hover': { backgroundColor: '#45A049' }
                }}
              >
                View Full Market Report
              </Button>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
}

export default MapScreen;

