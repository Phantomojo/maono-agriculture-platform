import {
  FETCH_PRODUCTS,
  FETCH_VENDORS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
} from '../actions/actionTypes';

const initialState = {
  products: [],
  vendors: [],
  cart: [],
  loading: false,
  error: null,
};

const marketplaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_VENDORS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_TO_CART:
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    default:
      return state;
  }
};

export default marketplaceReducer;

