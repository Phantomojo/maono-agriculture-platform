import {
  FETCH_NOTIFICATIONS,
  MARK_NOTIFICATION_READ,
  DELETE_NOTIFICATION,
  ADD_NOTIFICATION,
} from './actionTypes';

// Action Creators
export const fetchNotifications = () => {
  return {
    type: FETCH_NOTIFICATIONS,
  };
};

export const markAsRead = (notificationId) => {
  return {
    type: MARK_NOTIFICATION_READ,
    payload: notificationId,
  };
};

export const deleteNotification = (notificationId) => {
  return {
    type: DELETE_NOTIFICATION,
    payload: notificationId,
  };
};

export const addNotification = (notification) => {
  return {
    type: ADD_NOTIFICATION,
    payload: notification,
  };
};

// Async Actions
export const fetchNotificationsAsync = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchNotifications());
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Notifications fetched');
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
};

export const markAsReadAsync = (notificationId) => {
  return async (dispatch) => {
    try {
      dispatch(markAsRead(notificationId));
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Notification marked as read');
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };
};

export const deleteNotificationAsync = (notificationId) => {
  return async (dispatch) => {
    try {
      dispatch(deleteNotification(notificationId));
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Notification deleted');
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };
};

