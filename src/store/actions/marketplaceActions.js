import {
  FETCH_PRODUCTS,
  FETCH_VENDORS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
} from './actionTypes';

// Action Creators
export const fetchProducts = () => {
  return {
    type: FETCH_PRODUCTS,
  };
};

export const fetchVendors = () => {
  return {
    type: FETCH_VENDORS,
  };
};

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
  };
};

export const updateCartQuantity = (productId, quantity) => {
  return {
    type: UPDATE_CART_QUANTITY,
    payload: { id: productId, quantity },
  };
};

// Async Actions
export const fetchProductsAsync = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchProducts());
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Products fetched');
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
};

export const fetchVendorsAsync = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchVendors());
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Vendors fetched');
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };
};

