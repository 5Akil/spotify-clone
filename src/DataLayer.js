

import { createContext, useReducer ,useContext} from "react";


export const DataLayerContaxt = createContext();


export  const DataLayer=({initialState , reducer , children})=> {
  return (
    <DataLayerContaxt.Provider value={useReducer(reducer , initialState)} >
    {children}
    </DataLayerContaxt.Provider>
  )
}

export const useDataLayerValue =()=> useContext(DataLayerContaxt);
