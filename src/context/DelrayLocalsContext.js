import { createContext, useReducer } from "react";
import delrayLocalsReducer from "./delrayLocalsReducer";

const DelrayLocalsContext = createContext();

export const DelrayLocalsProvider = ({ children }) => {
  const initialState = {
    restaurants: [],
    events: [],
    living: [],
    organizations: [],
    diningModalOpen: false,
    getInvolvedModalOpen: false
  };

  const [state, dispatch] = useReducer(delrayLocalsReducer, initialState);

  return (
    <DelrayLocalsContext.Provider
      value={{
        ...state,
        dispatch
      }}
    >
      {children}
    </DelrayLocalsContext.Provider>
  )
}

export default DelrayLocalsContext;