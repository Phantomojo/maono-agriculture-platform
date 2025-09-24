import {
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_USER_PROFILE,
  FETCH_USER_DATA,
} from '../actions/actionTypes';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        loading: false,
        error: null,
      };
    case FETCH_USER_DATA:
      return {
        ...state,
        loading: true,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;

