import React, { useReducer } from "react";
import "./App.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import SignUpForm from "./Containers/SignupForm";

import appReducer, { AppAction, AppState, initialState } from "./Store/app";

import { createContext } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { User } from "./Containers/User";
import { Cache } from "./Containers/Cache";
import { MySnackbar } from "./Components/MySnackbar";
import ErrorBoundary from "./Containers/ErrorBoundary";

export const AppDispatchContext =
    createContext<React.Dispatch<AppAction> | null>(null);
export const AppStateContext = createContext<AppState | null>(null);

function App() {
    const [state, dispatch] = useReducer(appReducer, initialState);
    const theme = createTheme();

    return (
        <AppDispatchContext.Provider value={dispatch}>
            <AppStateContext.Provider value={state}>
                <ThemeProvider theme={theme}>
                    <ErrorBoundary>
                        <Container maxWidth="xs" sx={{ paddingBottom: 5 }}>
                            <CssBaseline />
                            {/* Alerts & etc. */}
                            <MySnackbar />

                            {/* Containers */}
                            <SignUpForm />
                            <User />
                            <Cache />
                        </Container>
                    </ErrorBoundary>
                </ThemeProvider>
            </AppStateContext.Provider>
        </AppDispatchContext.Provider>
    );
}

export default App;
