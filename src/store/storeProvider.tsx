import React, { createContext, useContext, useReducer } from 'react';
import { initialState, globalStateReducer, globalState, actionTypes } from './globalSlider';

type ContextTypes = {
    state: globalState;
    dispatch: (action: actionTypes) => void;
};

const StateContext = createContext<ContextTypes>({ state: initialState, dispatch: () => {} });

type StoreProviderProps = { children: React.ReactNode };

export const StoreProvider = ({ children }: StoreProviderProps) => {
    const [state, dispatch] = useReducer(globalStateReducer, initialState);
    return <StateContext.Provider value={{ state, dispatch }}>{children}</StateContext.Provider>;
};

export const useStore = () => useContext(StateContext);
