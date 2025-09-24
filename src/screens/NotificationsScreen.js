import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  WbSunny as WeatherIcon,
  TrendingUp as MarketIcon,
  People as CommunityIcon,
  Settings as SystemIcon,
  Check as CheckIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications, markAsRead, deleteNotification } from '../store/actions/notificationActions';

const notifications = [
  {
    id: 1,
    title: 'Weather Alert',
    message: 'Heavy rain expected in your area. Consider covering your crops.',
    category: 'Weather',
    type: 'weather',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: false,
    priority: 'high',
  },
  {
    id: 2,
    title: 'Market Price Update',
    message: 'Maize prices have increased by 15% in Nairobi market.',
    category: 'Market',
    type: 'market',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    read: false,
    priority: 'medium',
  },
  {
    id: 3,
    title: 'Community Post',
    message: 'John Mwangi shared a new farming tip in the community.',
    category: 'Community',
    type: 'community',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    read: true,
    priority: 'low',
  },
  {
    id: 4,
    title: 'System Update',
    message: 'New features added to the MAONO app. Check them out!',
    category: 'System',
    type: 'system',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    read: true,
    priority: 'low',
  },
];

const filters = ['All', 'Weather', 'Market', 'Community', 'System'];

function NotificationsScreen() {
  const dispatch = useDispatch();
  const { notifications: storeNotifications } = useSelector(state => state.notifications);
  const [filter, setFilter] = useState('All');
  const [filteredNotifications, setFilteredNotifications] = useState(notifications);

  React.useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  React.useEffect(() => {
    if (filter === 'All') {
      setFilteredNotifications(notifications);
    } else {
      setFilteredNotifications(notifications.filter(notification => 
        notification.category === filter
      ));
    }
  }, [filter]);

  const handleMarkAsRead = (notificationId) => {
    dispatch(markAsRead(notificationId));
  };

  const handleDeleteNotification = (notificationId) => {
    dispatch(deleteNotification(notificationId));
  };

  const getNotificationIcon = (category) => {
    switch (category) {
      case 'Weather':
        return <WeatherIcon />;
      case 'Market':
        return <MarketIcon />;
      case 'Community':
        return <CommunityIcon />;
      case 'System':
        return <SystemIcon />;
      default:
        return <SystemIcon />;
    }
  };

  const getNotificationColor = (category) => {
    switch (category) {
      case 'Weather':
        return '#FF9800';
      case 'Market':
        return '#4CAF50';
      case 'Community':
        return '#2196F3';
      case 'System':
        return '#9C27B0';
      default:
        return '#666';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Box sx={{ height: '100%', overflow: 'auto' }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#2E7D32', fontWeight: 'bold' }}>
            Notifications
          </Typography>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        {/* Filters */}
        <Box sx={{ mb: 2, display: 'flex', gap: 1, overflow: 'auto' }}>
          {filters.map((filterName) => (
            <Chip
              key={filterName}
              label={filterName}
              onClick={() => setFilter(filterName)}
              color={filter === filterName ? 'primary' : 'default'}
              variant={filter === filterName ? 'filled' : 'outlined'}
            />
          ))}
        </Box>

        {/* Notifications List */}
        <List>
          {filteredNotifications.map((notification, index) => (
            <React.Fragment key={notification.id}>
              <ListItem
                sx={{
                  backgroundColor: notification.read ? 'transparent' : '#F5F5F5',
                  borderRadius: 1,
                  mb: 1,
                  borderLeft: notification.read ? 'none' : '4px solid #2E7D32',
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: getNotificationColor(notification.category) }}>
                    {getNotificationIcon(notification.category)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {notification.title}
                      </Typography>
                      {!notification.read && (
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: '#2E7D32',
                          }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {notification.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {formatTime(notification.timestamp)}
                      </Typography>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleMarkAsRead(notification.id)}
                      color="success"
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteNotification(notification.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
              {index < filteredNotifications.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default NotificationsScreen;

