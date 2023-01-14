import { UserInputPayload } from "../utils/userData.interface";
import { AppAction, AppState, UserData } from "./app";

// type ActionArgs = { state: AppState, action: AppAction };
// type ActionFunc = (state: AppState, action: AppAction) => AppState;

const errState = (message: string, state: AppState): AppState => ({ ...state, error: message });

export const openSnackbar = (state: AppState, action: AppAction) => {

    if (action.payload === undefined)
        return errState("No payload provided in openSnackbar action!", state);

    return {
        ...state,
        snackbar: {
            ...state.snackbar,
            open: true,
            msg: action.payload.msg,
        },
    };
};

export const closeSnackbar = (state: AppState) => {
    return {
        ...state,
        snackbar: {
            ...state.snackbar,
            open: false,
            msg: "",
        },
    };
};



export const setLoading = (state: AppState, action: AppAction) => {
    if (action.payload === undefined)
        return errState("No payload provided in setLoading action!", state);

    return {
        ...state,
        loading: action.payload.loading,
    };
};

export const setError = (state: AppState, action: AppAction) => {
    if (action.payload === undefined)
        return errState("No payload provided in setError action!", state);

    return errState(action.payload.value, state);
};

export const setUserData = (state: AppState, action: AppAction) => {
    if (action.payload === undefined)
        return errState("No payload provided in setUserData action!", state);

    const userData = action.payload.value as UserData;

    return {
        ...state,
        userData: userData,
    };
};





export const reset = (state: AppState) => {
    return {
        ...state,
        code: "",
        result: "",
        luggage: false,
        price: 0,
    };
};
