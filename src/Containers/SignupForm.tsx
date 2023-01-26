// React
import * as React from "react";
import { useState, useEffect } from "react";

// Context & Dispatch
import { AppActions, appDispatchFunc, AppState, UserData } from "../Store/app";
import { AppDispatchContext, AppStateContext } from "../App";

// Material UI Icons
import PersonIcon from "@mui/icons-material/Person";

// Material UI components
import {
    Typography,
    Avatar,
    Button,
    Link,
    Grid,
    Box,
    SelectChangeEvent,
} from "@mui/material";

// Custom Components
import { TextInputField } from "../Components/TextInputField";
import { OccupationField } from "../Components/OccupationField";
import { StateField } from "../Components/StateField";
import { CustomAlert } from "../Components/CustomAlert";

// Validators
import {
    validateEmail,
    validateValFromPool,
    validateName,
} from "../utils/validators";

// User Interfaces
import {
    InputData,
    UserInputData,
    UserInputPayload,
} from "../Interfaces/userData.interface";

// Demographic Interfaces
import {
    DemographicApiResponse,
    DemographicData,
} from "../Interfaces/demographic.interface";

// Cache
import { getCachedDemographics, getCachedInput } from "../utils/Cache";

// Initialize functions
import { initUserInputData } from "../utils/UserInput";
import { initDemographicData } from "../utils/DemographicData";

// Model Methods
import { fetchDemographics } from "../Models/Demographics";
import { sendUser } from "../Models/User";

export default function SignUpForm() {
    // Global App State & Dispatch
    const dispatch = React.useContext(AppDispatchContext) as appDispatchFunc;
    const appState = React.useContext(AppStateContext) as AppState;

    // Demographics state
    const [demographicData, setDemographicData] = useState<DemographicData>(
        getCachedDemographics() ?? initDemographicData()
    );

    // User Input local state
    const initialUserInputData = initUserInputData();

    const cachedInput = getCachedInput();
    const [inputData, setInputData] = useState<UserInputData>(
        cachedInput ?? initialUserInputData
    );

    // Render data destructure
    const { firstName, lastName, email, occupation, state, password } =
        inputData;

    const { occupations, states } = demographicData;

    const statesOptions = formStatesOptions();

    // Demographics API Request Handlers
    const demographicsFetchHandler = (data: DemographicApiResponse) => {
        const { occupations, states } = data;

        setDemographicData({ occupations, states });

        localStorage.setItem(
            "demographics",
            JSON.stringify({ occupations, states })
        );

        dispatch({
            type: AppActions.OPEN_SNACKBAR,
            payload: {
                value: "Fetched Demographic Data.",
            },
        });
    };

    const demographicsFetchErrHandler = (message: string) => {
        dispatch({
            type: AppActions.SET_ERROR,
            payload: {
                value: `Unable to fetch Demographics data.`,
            },
        });
    };

    // User API Request Handlers
    const sendUserHandler = (data: UserData) => {
        dispatch({
            type: AppActions.SET_USER_DATA,
            payload: {
                value: data,
            },
        });

        dispatch({
            type: AppActions.OPEN_SNACKBAR,
            payload: {
                value: "Signed Up.",
            },
        });

        setInputData({
            ...initUserInputData(),
        });
    };

    const sendUserErrHandler = (message: string) => {
        dispatch({
            type: AppActions.SET_ERROR,
            payload: {
                value: `Something wrong: ${message}`,
            },
        });
    };

    const formUserPayload = (): UserInputPayload => {
        return {
            name: `${firstName.value} ${lastName.value}`,
            state: state.value as string,
            occupation: occupation.value as string,
            email: email.value as string,
            password: password.value as string,
        };
    };

    function formStatesOptions() {
        return states
            .map(({ name }) => name)
            .concat(states.map(({ abbreviation }) => abbreviation));
    }

    // Validation Error Input State
    const getInputErrorState = (
        inputDataSnapshot: UserInputData,
        data: InputData,
        field: keyof UserInputData
    ) => {
        return {
            ...inputDataSnapshot,
            [field]: {
                ...data,
                error: true,
                helperText: `Please, enter correct ${field}`,
            },
        };
    };

    // Validation
    const validate = () => {
        let isValid = true;

        // firstName
        if (!validateName(firstName.value)) {
            isValid = false;
            setInputData((inputDataSnapshot) => {
                return getInputErrorState(
                    inputDataSnapshot,
                    firstName,
                    "firstName"
                );
            });
        }

        // last name
        if (!validateName(lastName.value)) {
            isValid = false;
            setInputData((inputDataSnapshot) => {
                return getInputErrorState(
                    inputDataSnapshot,
                    lastName,
                    "lastName"
                );
            });
        }
        // Email
        if (!validateEmail(email.value)) {
            isValid = false;
            setInputData((inputDataSnapshot) => {
                return getInputErrorState(inputDataSnapshot, email, "email");
            });
        }

        // Occupation
        if (!validateValFromPool(occupation.value, occupations)) {
            isValid = false;
            setInputData((inputDataSnapshot) => {
                return getInputErrorState(
                    inputDataSnapshot,
                    occupation,
                    "occupation"
                );
            });
        }

        // State
        if (!validateValFromPool(state.value, statesOptions)) {
            isValid = false;
            setInputData((inputDataSnapshot) => {
                return getInputErrorState(inputDataSnapshot, state, "state");
            });
        }

        if (password.value !== null && password.value.length < 5) {
            isValid = false;
            setInputData((inputDataSnapshot) => {
                return getInputErrorState(
                    inputDataSnapshot,
                    password,
                    "password"
                );
            });
        }

        return isValid;
    };

    // Effects
    // Initial API request
    useEffect(() => {
        // if cached, return
        if (getCachedDemographics() !== null) return;

        // Demographics API request (async)
        fetchDemographics(
            demographicsFetchHandler,
            demographicsFetchErrHandler
        );
    }, []);

    // On user input update, write to local storage
    useEffect(() => {
        localStorage.setItem("userInput", JSON.stringify(inputData));
    }, [inputData]);

    // Event Handlers
    // Form Submit Handler
    const submitHandler = async (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        // If all fields are valid
        if (validate()) {
            // form data obj
            const payload: UserInputPayload = formUserPayload();

            sendUser(payload, sendUserHandler, sendUserErrHandler);
        }
    };

    // Reset Btn Handler
    const resetBtnHandler = () => {
        setInputData({
            ...initialUserInputData,
        });

        dispatch({
            type: AppActions.RESET,
        });

        localStorage.removeItem("userInput");
        localStorage.removeItem("demographics");
    };

    const occupationChangeHandler = (e: SelectChangeEvent<any>) => {
        setInputData({
            ...inputData,
            occupation: {
                ...occupation,
                value: e.target.value as string,
                error: false,
                helperText: "",
            },
        });
    };

    const stateChangeHandler = (event: any, newValue: string | null) => {
        setInputData({
            ...inputData,
            state: {
                ...state,
                value: newValue,
                error: false,
                helperText: "",
            },
        });
    };

    const closeAlertClickHandler = () => {
        dispatch({
            type: AppActions.SET_ERROR,
            payload: {
                value: false,
            },
        });
    };

    return (
        <Box
            sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <CustomAlert
                error={appState.error}
                clickHandler={closeAlertClickHandler}
            />

            <Avatar sx={{ m: 1, bgcolor: "info.main" }}>
                <PersonIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
                Sign up
            </Typography>

            <Box component="form" sx={{ mt: 3 }} onSubmit={submitHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextInputField
                            autoFocus
                            setInputData={setInputData}
                            data={firstName}
                            id={"firstName"}
                            inputData={inputData}
                            label="First Name"
                            type="text"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextInputField
                            setInputData={setInputData}
                            data={lastName}
                            id={"lastName"}
                            inputData={inputData}
                            label="Last Name"
                            type="text"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextInputField
                            setInputData={setInputData}
                            data={email}
                            id={"email"}
                            inputData={inputData}
                            label="Email"
                            type="text"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <OccupationField
                            onChangeHandler={occupationChangeHandler}
                            data={occupation}
                            occupations={occupations}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <StateField
                            data={state}
                            onChangeHandler={stateChangeHandler}
                            options={statesOptions}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextInputField
                            setInputData={setInputData}
                            data={password}
                            id={"password"}
                            inputData={inputData}
                            label="Password"
                            type="password"
                        />
                    </Grid>
                </Grid>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 1 }}
                >
                    Sign Up
                </Button>

                <Button
                    type="reset"
                    fullWidth
                    variant="outlined"
                    sx={{ mb: 1 }}
                    onClick={resetBtnHandler}
                >
                    Reset
                </Button>
                <Grid container justifyContent="center">
                    <Grid item>
                        <Link href="#" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
