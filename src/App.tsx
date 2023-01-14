import React, { useReducer } from "react";
import "./App.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import SignUpForm from "./Containers/SignupForm";

import appReducer, { AppAction, AppState, initialState } from "./Store/app";

import { createContext } from "react";

export const AppDispatchContext =
    createContext<React.Dispatch<AppAction> | null>(null);
export const AppStateContext = createContext<AppState | null>(null);

function App() {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppDispatchContext.Provider value={dispatch}>
            <AppStateContext.Provider value={state}>
                <SignUpForm />;
            </AppStateContext.Provider>
        </AppDispatchContext.Provider>
    );
}

export default App;
