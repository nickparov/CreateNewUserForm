// React
import * as React from "react";
import { useState, useEffect } from "react";

// Context & Dispatch
import { AppActions, appDispatchFunc, AppState, UserData } from "../Store/app";
import { AppDispatchContext, AppStateContext } from "../App";

// Material UI Icons
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";

// Material UI components
import {
    Alert,
    Autocomplete,
    Collapse,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    Avatar,
    Button,
    TextField,
    Link,
    Grid,
    Box,
    FormHelperText,
} from "@mui/material";

// Custom Components
import { TextInputField } from "../Components/TextInputField";

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
import { fetchDemographics } from "../Models/Demographics";
import { sendUser } from "../Models/User";

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

export default function SignUpForm() {
    // Global App State
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

    // render data
    const { firstName, lastName, email, occupation, state, password } =
        inputData;

    const { occupations, states } = demographicData;

    // Form States Autocomplete options vals
    const StatesAutocompleteOptions = states
        .map(({ name }) => name)
        .concat(states.map(({ abbreviation }) => abbreviation));

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

    // Main Validation
    const validate = () => {
        let isValid = true;

        setInputData((inputDataSnapshot) => {
            // firstName
            if (!validateName(firstName.value)) {
                isValid = false;
                return getInputErrorState(
                    inputDataSnapshot,
                    firstName,
                    "firstName"
                );
            }

            // last name
            if (!validateName(lastName.value)) {
                isValid = false;
                return getInputErrorState(
                    inputDataSnapshot,
                    lastName,
                    "lastName"
                );
            }
            // Email
            if (!validateEmail(email.value)) {
                isValid = false;
                return getInputErrorState(inputDataSnapshot, email, "email");
            }

            // Occupation
            if (!validateValFromPool(occupation.value, occupations)) {
                isValid = false;
                return getInputErrorState(
                    inputDataSnapshot,
                    occupation,
                    "occupation"
                );
            }

            // State
            if (!validateValFromPool(state.value, StatesAutocompleteOptions)) {
                isValid = false;
                return getInputErrorState(inputDataSnapshot, state, "state");
            }

            if (password.value !== null && password.value.length < 5) {
                isValid = false;
                return getInputErrorState(
                    inputDataSnapshot,
                    password,
                    "password"
                );
            }

            return inputDataSnapshot;
        });

        return isValid;
    };

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

    // Initial API request
    useEffect(() => {
        // if cached, return
        if (getCachedDemographics() !== null) return;

        // Demographics API request
        fetchDemographics(
            demographicsFetchHandler,
            demographicsFetchErrHandler
        );
    }, []);

    // On input update, write to local storage
    useEffect(() => {
        localStorage.setItem("userInput", JSON.stringify(inputData));
    }, [inputData]);

    const OccupationErrorText = () => {
        if (occupation.helperText !== null && occupation.helperText.length > 0)
            return (
                <FormHelperText error>{occupation.helperText}</FormHelperText>
            );

        return null;
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
            <Collapse in={!!appState.error}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                dispatch({
                                    type: AppActions.SET_ERROR,
                                    payload: {
                                        value: false,
                                    },
                                });
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {appState.error}
                </Alert>
            </Collapse>

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
                        <FormControl fullWidth>
                            <InputLabel id="occupation-select-label">
                                Occupation
                            </InputLabel>
                            <Select
                                labelId="occupation-select-label"
                                id="occupation-select"
                                label="Occupation"
                                onChange={(e) =>
                                    setInputData({
                                        ...inputData,
                                        occupation: {
                                            ...occupation,
                                            value: e.target.value as string,
                                            error: false,
                                            helperText: "",
                                        },
                                    })
                                }
                                value={occupation.value}
                                error={occupation.error}
                            >
                                {occupations.map((occ) => {
                                    return (
                                        <MenuItem
                                            value={occ}
                                            key={occ.split(" ").join("_")}
                                        >
                                            {occ}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            {OccupationErrorText()}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={StatesAutocompleteOptions}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="State"
                                    helperText={state.helperText}
                                    error={state.error}
                                />
                            )}
                            onChange={(event: any, newValue: string | null) => {
                                setInputData({
                                    ...inputData,
                                    state: {
                                        ...state,
                                        value: newValue,
                                        error: false,
                                        helperText: "",
                                    },
                                });
                            }}
                            value={state.value}
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
