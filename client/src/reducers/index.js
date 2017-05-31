// Set up your root reducer here...
 import { combineReducers } from 'redux';
 import items from './itemsReducers';
 
 export default combineReducers({
     items: items,
 });
