import { combineReducers } from 'redux';
import items from './items';
import filters from './filters';
import auth from './auth';

export default combineReducers({
  items,
  filters,
  auth,
});
