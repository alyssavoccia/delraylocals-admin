const delrayLocalsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RESTAURANTS':
      return {
        ...state,
        restaurants: action.payload
      }
    case 'OPEN_DINING_MODAL':
      return {
        ...state,
        diningModalOpen: true
      }
    case 'CLOSE_DINING_MODAL':
      return {
        ...state,
        diningModalOpen: false
      }
    default:
      return state;
  }
};

export default delrayLocalsReducer;