const delrayLocalsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RESTAURANTS':
      return {
        ...state,
        restaurants: action.payload
      }
    case 'UPDATE_RESTAURANTS':
      return {
        ...state,
        restaurants: action.payload
      }
    case 'SET_THINGS_TO_DO':
      return {
        ...state,
        things: action.payload
      }
    case 'UPDATE_THINGS_TO_DO':
      return {
        ...state,
        things: action.payload
      }
    case 'SET_ORGANIZATIONS':
      return {
        ...state,
        organizations: action.payload
      }
    case 'UPDATE_ORGANIZATIONS':
      return {
        ...state,
        organizations: action.payload
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
    case 'OPEN_THINGS_MODAL':
      return {
        ...state,
        thingsModalOpen: true
      }
    case 'CLOSE_THINGS_MODAL':
      return {
        ...state,
        thingsModalOpen: false
      }
    case 'OPEN_ORGANIZATIONS_MODAL':
      return {
        ...state,
        getInvolvedModalOpen: true
      }
    case 'CLOSE_ORGANIZATIONS_MODAL':
      return {
        ...state,
        getInvolvedModalOpen: false
      }
    default:
      return state;
  }
};

export default delrayLocalsReducer;