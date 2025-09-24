import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Divider,
  Button,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Person as PersonIcon,
  Lock as LockIcon,
  Payment as PaymentIcon,
  Help as HelpIcon,
  Phone as PhoneIcon,
  Info as InfoIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, updateUserProfile } from '../store/actions/userActions';

const user = {
  id: 1,
  name: 'John Mwangi',
  email: 'john.mwangi@example.com',
  phone: '+254712345678',
  location: 'Nairobi, Kenya',
  avatar: 'https://via.placeholder.com/100x100/2E7D32/FFFFFF?text=JM',
  role: 'farmer',
  stats: {
    products: 15,
    orders: 23,
    rating: 4.5,
  },
  preferences: {
    notifications: true,
    location: true,
    language: 'en',
  },
  farm: {
    size: '5 acres',
    crops: ['Maize', 'Beans', 'Tomatoes'],
    location: {
      latitude: -1.2921,
      longitude: 36.8219,
    },
  },
};

function ProfileScreen() {
  const dispatch = useDispatch();
  const { user: storeUser } = useSelector(state => state.user);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  React.useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const handleEditProfile = () => {
    alert('Edit Profile - Feature coming soon!');
  };

  const handleChangePassword = () => {
    alert('Change Password - Feature coming soon!');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logout - Feature coming soon!');
    }
  };

  const handleContactSupport = () => {
    alert('Contact Support - Call +254 700 000 000');
  };

  const renderMenuItem = (icon, title, subtitle, onPress, showArrow = true) => (
    <ListItem button onClick={onPress}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText
        primary={title}
        secondary={subtitle}
      />
      {showArrow && <ListItemIcon>{'>'}</ListItemIcon>}
    </ListItem>
  );

  const renderSwitchItem = (icon, title, subtitle, value, onValueChange) => (
    <ListItem>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText
        primary={title}
        secondary={subtitle}
      />
      <Switch
        checked={value}
        onChange={(e) => onValueChange(e.target.checked)}
        color="primary"
      />
    </ListItem>
  );

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#2E7D32', fontWeight: 'bold' }}>
            Profile
          </Typography>
          <IconButton onClick={handleEditProfile}>
            <EditIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        {/* Profile Info */}
        <Card sx={{ mb: 2 }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Avatar
              src={user.avatar}
              sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
            />
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
              {user.name}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              {user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.location}
            </Typography>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                    {user.stats.products}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Products
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                    {user.stats.orders}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Orders
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                    {user.stats.rating}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Settings
            </Typography>
            {renderSwitchItem(
              <NotificationsIcon />,
              'Notifications',
              'Receive push notifications',
              notificationsEnabled,
              setNotificationsEnabled
            )}
            <Divider />
            {renderSwitchItem(
              <LocationIcon />,
              'Location Services',
              'Allow location access',
              locationEnabled,
              setLocationEnabled
            )}
          </CardContent>
        </Card>

        {/* Account */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Account
            </Typography>
            {renderMenuItem(
              <PersonIcon />,
              'Edit Profile',
              'Update your personal information',
              handleEditProfile
            )}
            <Divider />
            {renderMenuItem(
              <LockIcon />,
              'Change Password',
              'Update your password',
              handleChangePassword
            )}
            <Divider />
            {renderMenuItem(
              <PaymentIcon />,
              'Payment Methods',
              'Manage your payment options',
              () => alert('Payment Methods - Feature coming soon!')
            )}
          </CardContent>
        </Card>

        {/* Support */}
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Support
            </Typography>
            {renderMenuItem(
              <HelpIcon />,
              'Help Center',
              'Get help and support',
              () => alert('Help Center - Feature coming soon!')
            )}
            <Divider />
            {renderMenuItem(
              <PhoneIcon />,
              'Contact Support',
              'Call our support team',
              handleContactSupport
            )}
            <Divider />
            {renderMenuItem(
              <InfoIcon />,
              'About',
              'App version 1.0.0',
              () => alert('About MAONO v1.0.0')
            )}
          </CardContent>
        </Card>

        {/* Logout */}
        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          fullWidth
          sx={{ mt: 2 }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default ProfileScreen;

