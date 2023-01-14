import { Alert, Snackbar } from "@mui/material";
import React, { useContext } from "react";
import { AppDispatchContext, AppStateContext } from "../App";
import { AppActions, appDispatchFunc, AppState } from "../Store/app";

export const MySnackbar = () => {
    const dispatch = useContext(AppDispatchContext) as appDispatchFunc;
    const appState = useContext(AppStateContext) as AppState;

    const { snackbar } = appState;

    return (
        <Snackbar
            open={snackbar.open}
            anchorOrigin={{
                vertical: snackbar.vertical,
                horizontal: snackbar.horizontal,
            }}
            autoHideDuration={3500}
            onClose={() => dispatch({ type: AppActions.CLOSE_SNACKBAR })}
            message={snackbar.msg}
        >
            <Alert
                onClose={() =>
                    dispatch({
                        type: AppActions.CLOSE_SNACKBAR,
                    })
                }
                severity="success"
                sx={{ width: "100%" }}
            >
                {snackbar.msg}
            </Alert>
        </Snackbar>
    );
};
