/**
 * Split into compontents
 * Add validation
 * localStorage for filling in fields &&& for not doing the requrest again (cache the resp)??
 */

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useState, useEffect } from "react";
import { AppActions, appDispatchFunc, AppState } from "../Store/app";
import { AppDispatchContext, AppStateContext } from "../App";
import axios from "axios";
import {
    DemographicApiResponse,
    DemographicData,
    State,
} from "../utils/interfaces";

import {
    Alert,
    Autocomplete,
    Collapse,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import {
    validateEmail,
    validateValFromPool,
    validateName,
} from "../utils/validators";
import {
    InputData,
    UserInputData,
    UserInputPayload,
} from "../utils/userData.interface";

const theme = createTheme();

export default function SignUpForm() {
    const dispatch = React.useContext(AppDispatchContext) as appDispatchFunc;
    const appState = React.useContext(AppStateContext) as AppState;

    // Demographics
    const initialDemographicData = {
        occupations: [],
        states: [],
    };

    const [demographicData, setDemographicData] = useState<DemographicData>(
        initialDemographicData
    );

    // User Input Fields
    const initialUserInputData: UserInputData = {
        state: new InputData(null),
        occupation: new InputData(),
        password: new InputData(),
        firstName: new InputData(),
        lastName: new InputData(),
        email: new InputData(),
    };

    const [inputData, setInputData] =
        useState<UserInputData>(initialUserInputData);

    // render data
    const { firstName, lastName, email, occupation, state, password } =
        inputData;

    const { occupations, states } = demographicData;

    const StatesAutocompleteOptions = states
        .map(({ name }) => name)
        .concat(states.map(({ abbreviation }) => abbreviation));

    // handlers
    const submitHandler = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();

        // validations
        let errExists = false;

        // Email
        if (!validateEmail(email.value)) {
            setInputData((_inputData) => {
                return {
                    ..._inputData,
                    email: {
                        ...email,
                        error: true,
                        helperText: "Please, enter correct email.",
                    },
                };
            });

            errExists = true;
        }

        // State
        if (!validateValFromPool(state.value, StatesAutocompleteOptions)) {
            setInputData((_inputData) => {
                return {
                    ..._inputData,
                    state: {
                        ...state,
                        error: true,
                        helperText: "Please, enter correct state.",
                    },
                };
            });

            errExists = true;
        }

        // firstName
        if (!validateName(firstName.value)) {
            setInputData((_inputData) => {
                return {
                    ..._inputData,
                    firstName: {
                        ...firstName,
                        error: true,
                        helperText: "Please, enter correct first name.",
                    },
                };
            });

            errExists = true;
        }

        // last name
        if (!validateName(lastName.value)) {
            setInputData((_inputData) => {
                return {
                    ..._inputData,
                    lastName: {
                        ...lastName,
                        error: true,
                        helperText: "Please, enter correct last name.",
                    },
                };
            });

            errExists = true;
        }

        // Occupation
        if (!validateValFromPool(occupation.value, occupations)) {
            setInputData((_inputData) => {
                return {
                    ..._inputData,
                    occupation: {
                        ...occupation,
                        error: true,
                        helperText: "Please, select correct occupation.",
                    },
                };
            });

            errExists = true;
        }

        if (!errExists) {
            // All Good
            // form data obj
            const payload: UserInputPayload = {
                name: `${firstName.value} ${lastName.value}`,
                state: state.value as string,
                occupation: occupation.value as string,
                email: email.value as string,
                password: password.value as string,
            };

            // Make final post request.
            axios
                .post(
                    "https://frontend-take-home.fetchrewards.com/form",
                    payload
                )
                .then((res) => {
                    const { data } = res;
                    dispatch({
                        type: AppActions.SET_USER_DATA,
                        payload: {
                            value: data,
                        },
                    });
                })
                .catch((err) => {
                    const { message } = err;

                    dispatch({
                        type: AppActions.SET_ERROR,
                        payload: {
                            value: `Something wrong: ${message}`,
                        },
                    });
                });
        }
    };

    // initial api request
    useEffect(() => {
        // Get data.
        axios
            .get("https://frontend-take-home.fetchrewards.com/form")
            .then((res) => {
                const { occupations, states } =
                    res.data as DemographicApiResponse;

                setDemographicData({ occupations, states });
            })
            .catch((err) => {
                const { message } = err;

                dispatch({
                    type: AppActions.SET_ERROR,
                    payload: {
                        value: `Something wrong: ${message}`,
                    },
                });
            });
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xs">
                <CssBaseline />
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
                    <Box
                        component="form"
                        sx={{ mt: 3 }}
                        onSubmit={submitHandler}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    value={firstName.value}
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={(e) =>
                                        setInputData({
                                            ...inputData,
                                            firstName: {
                                                ...firstName,
                                                value: e.target.value,
                                                error: false,
                                                helperText: "",
                                            },
                                        })
                                    }
                                    error={firstName.error}
                                    helperText={firstName.helperText}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                    onChange={(e) =>
                                        setInputData({
                                            ...inputData,
                                            lastName: {
                                                ...lastName,
                                                value: e.target.value,
                                                error: false,
                                                helperText: "",
                                            },
                                        })
                                    }
                                    value={lastName.value}
                                    error={lastName.error}
                                    helperText={lastName.helperText}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) =>
                                        setInputData({
                                            ...inputData,
                                            email: {
                                                ...email,
                                                value: e.target.value,
                                                error: false,
                                                helperText: "",
                                            },
                                        })
                                    }
                                    value={email.value}
                                    helperText={email.helperText}
                                    error={email.error}
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
                                        required
                                        onChange={(e) =>
                                            setInputData({
                                                ...inputData,
                                                occupation: {
                                                    ...occupation,
                                                    value: e.target
                                                        .value as string,
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
                                                    key={occ
                                                        .split(" ")
                                                        .join("_")}
                                                >
                                                    {occ}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
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
                                            required
                                        />
                                    )}
                                    onChange={(
                                        event: any,
                                        newValue: string | null
                                    ) => {
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
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setInputData({
                                            ...inputData,
                                            password: {
                                                ...password,
                                                value: e.target.value,
                                                error: false,
                                                helperText: "",
                                            },
                                        })
                                    }
                                    value={password.value}
                                    helperText={password.helperText}
                                    error={password.error}
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
                            onClick={(e) => {
                                setInputData({
                                    ...initialUserInputData,
                                });
                            }}
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
            </Container>
        </ThemeProvider>
    );
}
