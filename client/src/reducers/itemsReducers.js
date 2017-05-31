let initialState = {
    items: [],
    item: {}
};

export default (state = initialState, action) => {
    switch(action.type) { 
        case 'GET_ITEMS':
            return { ...state, items: action.items };
        case 'GET_ITEM_DETAIL':
            return { ...state, item: action.item };
        default:
            return state;
    }
};