import * as actions from "./actions";

export type UserData = {
    name: string;
    email: string;
    occupation: string;
    state: string;
    id: string;
}

export interface AppState {
    userData: UserData;
    loading: boolean;
    error: UIErrorType;
    snackbar: SnackbarState;
}

export interface SnackbarState {
    open: boolean;
    vertical: verticalType;
    horizontal: horizontalType;
    msg: string;
};

export interface AppAction {
    payload?: anyObject;
    type: AppActions;
}

export type appDispatchFunc = React.Dispatch<AppAction>;

type anyObject = {
    [key: string]: any;
};

type horizontalType = "center" | "left" | "right";
type verticalType = "bottom" | "top";

type UIErrorType = string | null;

export enum AppActions {
    OPEN_SNACKBAR = "open_snackbar",
    CLOSE_SNACKBAR = "close_snackbar",
    SET_LOADING = "set_loading",
    SET_USER_DATA = "set_user_data",
    SET_ERROR = "set_error",
    RESET = "reset"
}

// Reducer
const appReducer = (
    state: AppState,
    action: AppAction
): AppState => {
    switch (action.type) {
        case AppActions.OPEN_SNACKBAR:
            return actions.openSnackbar(state, action);
        case AppActions.CLOSE_SNACKBAR:
            return actions.closeSnackbar(state);
        case AppActions.SET_ERROR:
            return actions.setError(state, action);
        case AppActions.SET_USER_DATA:
            return actions.setUserData(state, action);
        case AppActions.RESET:
            return actions.reset(state);
        default:
            return state;
    }
};


const initialUserData: UserData = {
    name: "",
    email: "",
    occupation: "",
    state: "",
    id: "",
}

const initialState: AppState = {
    userData: initialUserData,
    loading: false,
    error: null,
    snackbar: {
        open: false,
        vertical: "top",
        horizontal: "right",
        msg: "",
    },
};

export { initialState, initialUserData };
export default appReducer;
