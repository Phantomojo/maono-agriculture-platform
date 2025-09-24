import {
  FETCH_NOTIFICATIONS,
  MARK_NOTIFICATION_READ,
  DELETE_NOTIFICATION,
  ADD_NOTIFICATION,
} from '../actions/actionTypes';

const initialState = {
  notifications: [],
  loading: false,
  error: null,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case MARK_NOTIFICATION_READ:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        ),
      };
    case DELETE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        ),
      };
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
      };
    default:
      return state;
  }
};

export default notificationReducer;

