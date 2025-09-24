import {
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_USER_PROFILE,
  FETCH_USER_DATA,
} from './actionTypes';

// Action Creators
export const loginUser = (userData) => {
  return {
    type: LOGIN_USER,
    payload: userData,
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const updateUserProfile = (profileData) => {
  return {
    type: UPDATE_USER_PROFILE,
    payload: profileData,
  };
};

export const fetchUserData = () => {
  return {
    type: FETCH_USER_DATA,
  };
};

// Async Actions
export const loginUserAsync = (credentials) => {
  return async (dispatch) => {
    try {
      dispatch(fetchUserData());
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        id: 1,
        name: 'John Mwangi',
        email: credentials.email,
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
      
      dispatch(loginUser(userData));
      console.log('User logged in successfully');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
};

export const logoutUserAsync = () => {
  return async (dispatch) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      dispatch(logoutUser());
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
};

export const updateUserProfileAsync = (profileData) => {
  return async (dispatch) => {
    try {
      dispatch(fetchUserData());
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch(updateUserProfile(profileData));
      console.log('User profile updated successfully');
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };
};

