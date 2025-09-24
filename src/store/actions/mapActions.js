import {
  FETCH_WEATHER_DATA,
  FETCH_MARKET_PRICES,
  FETCH_FARMERS,
  SET_SELECTED_MARKER,
  UPDATE_WEATHER_ALERT,
} from './actionTypes';

// Action Creators
export const fetchWeatherData = () => {
  return {
    type: FETCH_WEATHER_DATA,
  };
};

export const fetchMarketPrices = () => {
  return {
    type: FETCH_MARKET_PRICES,
  };
};

export const fetchFarmers = () => {
  return {
    type: FETCH_FARMERS,
  };
};

export const setSelectedMarker = (marker) => {
  return {
    type: SET_SELECTED_MARKER,
    payload: marker,
  };
};

export const updateWeatherAlert = (alert) => {
  return {
    type: UPDATE_WEATHER_ALERT,
    payload: alert,
  };
};

// Async Actions
export const fetchWeatherDataAsync = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchWeatherData());
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Weather data fetched');
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
};

export const fetchMarketPricesAsync = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchMarketPrices());
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Market prices fetched');
    } catch (error) {
      console.error('Error fetching market prices:', error);
    }
  };
};

export const fetchFarmersAsync = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchFarmers());
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Farmers data fetched');
    } catch (error) {
      console.error('Error fetching farmers data:', error);
    }
  };
};

