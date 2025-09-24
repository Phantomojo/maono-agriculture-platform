import {
  FETCH_WEATHER_DATA,
  FETCH_MARKET_PRICES,
  FETCH_FARMERS,
  SET_SELECTED_MARKER,
  UPDATE_WEATHER_ALERT,
} from '../actions/actionTypes';

const initialState = {
  weatherData: [
    {
      id: 1,
      latitude: -1.2921,
      longitude: 36.8219,
      temperature: 25,
      condition: 'Sunny',
      humidity: 65,
      windSpeed: 12,
    },
    {
      id: 2,
      latitude: -1.3000,
      longitude: 36.8000,
      temperature: 23,
      condition: 'Partly Cloudy',
      humidity: 70,
      windSpeed: 8,
    },
  ],
  marketPrices: [
    {
      id: 1,
      name: 'Nairobi Market',
      latitude: -1.2921,
      longitude: 36.8219,
      price: 2.50,
      crop: 'Maize',
      unit: 'kg',
    },
    {
      id: 2,
      name: 'Kisumu Market',
      latitude: -0.0917,
      longitude: 34.7680,
      price: 2.30,
      crop: 'Maize',
      unit: 'kg',
    },
  ],
  farmers: [
    {
      id: 1,
      name: 'John Mwangi',
      latitude: -1.2800,
      longitude: 36.8200,
      crops: ['Maize', 'Beans'],
      rating: 4.5,
      phone: '+254712345678',
      experience: '5 years',
    },
    {
      id: 2,
      name: 'Mary Wanjiku',
      latitude: -1.3000,
      longitude: 36.8300,
      crops: ['Tomatoes', 'Onions'],
      rating: 4.8,
      phone: '+254723456789',
      experience: '8 years',
    },
    {
      id: 3,
      name: 'Peter Kiprop',
      latitude: -1.2700,
      longitude: 36.8100,
      crops: ['Wheat', 'Barley'],
      rating: 4.2,
      phone: '+254734567890',
      experience: '3 years',
    },
  ],
  selectedMarker: null,
  weatherAlerts: [
    {
      id: 1,
      type: 'warning',
      message: 'Heavy rain expected in your area',
      timestamp: new Date().toISOString(),
      severity: 'high',
    },
  ],
  loading: false,
  error: null,
};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_DATA:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_MARKET_PRICES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_FARMERS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SET_SELECTED_MARKER:
      return {
        ...state,
        selectedMarker: action.payload,
      };
    case UPDATE_WEATHER_ALERT:
      return {
        ...state,
        weatherAlerts: [...state.weatherAlerts, action.payload],
      };
    default:
      return state;
  }
};

export default mapReducer;

