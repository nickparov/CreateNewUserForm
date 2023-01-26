import React from "react";

import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { AppActions, appDispatchFunc, UIErrorType } from "../Store/app";
import { AppDispatchContext } from "../App";

interface Props {
    error: UIErrorType;
}

export const CustomAlert = (props: Props) => {
    const dispatch = React.useContext(AppDispatchContext) as appDispatchFunc;
    const { error } = props;

    const errorExists = !!error;

    const clickHandler = () => {
        dispatch({
            type: AppActions.SET_ERROR,
            payload: {
                value: false,
            },
        });
    };

    return (
        <Collapse in={errorExists}>
            <Alert
                severity="error"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={clickHandler}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
            >
                {error}
            </Alert>
        </Collapse>
    );
};
