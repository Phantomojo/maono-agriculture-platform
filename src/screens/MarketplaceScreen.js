import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  InputAdornment,
  Chip,
  Button,
  IconButton,
  Badge,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingCart as CartIcon,
  Phone as PhoneIcon,
  AddShoppingCart as AddCartIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addToCart } from '../store/actions/marketplaceActions';

const categories = ['All', 'Grains', 'Vegetables', 'Fruits', 'Spices', 'Herbs'];

const products = [
  {
    id: 1,
    name: 'Fresh Maize',
    description: 'High-quality maize from local farmers',
    price: 2.50,
    unit: 'kg',
    category: 'Grains',
    image: 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Maize',
    vendor: {
      name: 'John Mwangi',
      rating: 4.5,
      phone: '+254712345678',
    },
    stock: 100,
    rating: 4.3,
  },
  {
    id: 2,
    name: 'Organic Tomatoes',
    description: 'Fresh organic tomatoes from greenhouse',
    price: 3.00,
    unit: 'kg',
    category: 'Vegetables',
    image: 'https://via.placeholder.com/300x200/FF5722/FFFFFF?text=Tomatoes',
    vendor: {
      name: 'Mary Wanjiku',
      rating: 4.8,
      phone: '+254723456789',
    },
    stock: 50,
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Red Onions',
    description: 'Fresh red onions from local farms',
    price: 1.80,
    unit: 'kg',
    category: 'Vegetables',
    image: 'https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Onions',
    vendor: {
      name: 'Peter Kiprop',
      rating: 4.2,
      phone: '+254734567890',
    },
    stock: 75,
    rating: 4.1,
  },
  {
    id: 4,
    name: 'Fresh Beans',
    description: 'High-quality beans from local farmers',
    price: 2.20,
    unit: 'kg',
    category: 'Grains',
    image: 'https://via.placeholder.com/300x200/8BC34A/FFFFFF?text=Beans',
    vendor: {
      name: 'Sarah Kimani',
      rating: 4.6,
      phone: '+254745678901',
    },
    stock: 60,
    rating: 4.4,
  },
];

function MarketplaceScreen() {
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.marketplace);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(products);

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  React.useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory]);

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleContactVendor = (vendor) => {
    alert(`Calling ${vendor.name} at ${vendor.phone}`);
  };

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#2E7D32', fontWeight: 'bold' }}>
            Marketplace
          </Typography>
          <IconButton color="primary">
            <Badge badgeContent={cart.length} color="secondary">
              <CartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />

        {/* Categories */}
        <Box sx={{ mb: 2, display: 'flex', gap: 1, overflow: 'auto' }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => setSelectedCategory(category)}
              color={selectedCategory === category ? 'primary' : 'default'}
              variant={selectedCategory === category ? 'filled' : 'outlined'}
            />
          ))}
        </Box>

        {/* Products Grid */}
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {product.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <StarIcon sx={{ color: '#FFC107', mr: 0.5, fontSize: 20 }} />
                    <Typography variant="body2" sx={{ mr: 1 }}>
                      {product.rating}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      by {product.vendor.name}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                      ${product.price}/{product.unit}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Stock: {product.stock}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<AddCartIcon />}
                      onClick={() => handleAddToCart(product)}
                      sx={{ flexGrow: 1 }}
                    >
                      Add to Cart
                    </Button>
                    <IconButton
                      color="primary"
                      onClick={() => handleContactVendor(product.vendor)}
                    >
                      <PhoneIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default MarketplaceScreen;

