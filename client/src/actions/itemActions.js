import Axios from 'axios';
import constants from 'constants';

export const getItemsSuccess = (items) => {
  return {
    type: 'GET_ITEMS',
    items
  }
};

export const getItems = (query) => {
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return (dispatch) => {
    // Returns a promise
    return Axios.get('/api/items?q='+ query)
      .then(response => {
        // Dispatch another action
        // to consume data
        dispatch(getItemsSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const getItemsDetailSuccess = (item) => {
  return {
      type: 'GET_ITEM_DETAIL',
      item: item
  };
};

export const getItemDetail = (itemId) => {
    // Returns a dispatcher function
  // that dispatches an action at a later time
  return (dispatch) => {
    // Returns a promise
    return Axios.get('/api/items/'+ itemId)
      .then(response => {
        // Dispatch another action
        // to consume data
        dispatch(getItemsDetailSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
    
};