import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import mapReducer from './reducers/mapReducer';
import marketplaceReducer from './reducers/marketplaceReducer';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';
import communityReducer from './reducers/communityReducer';

const rootReducer = combineReducers({
  map: mapReducer,
  marketplace: marketplaceReducer,
  notifications: notificationReducer,
  user: userReducer,
  community: communityReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };

