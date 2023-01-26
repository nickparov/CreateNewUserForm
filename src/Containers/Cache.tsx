import { Box, Grid } from "@mui/material";
import * as React from "react";

import { CustomCard } from "../Components/CustomCard";
import { DemographicData } from "../Interfaces/demographic.interface";

import { UserInputData } from "../Interfaces/userData.interface";

const getDemographicsCard = (data: DemographicData | null) => {
    if (!data) return null;

    const { occupations, states } = data;

    return (
        <CustomCard
            title={"Demographics Api Cache Data"}
            paragraphs={[
                `Total occupations loaded: ${occupations.length}`,
                `Total states loaded: ${states.length}`,
                "Reload the page to refetch the cache values.",
            ]}
        />
    );
};

const getUserInputDataCard = (data: UserInputData | null) => {
    if (!data) return null;

    const { email, firstName, lastName, state, occupation, password } = data;

    return (
        <CustomCard
            title={"User Input Cache Data"}
            paragraphs={[
                `Email: ${email.value ?? ""}`,
                `First Name: ${firstName.value ?? ""}`,
                `Last Name: ${lastName.value ?? ""}`,
                `State: ${state.value ?? ""}`,
                `Occupation: ${occupation.value ?? ""}`,
                `Password: ${password.value ?? ""}`,
                "Reload the page to refetch the cache values.",
            ]}
        />
    );
};

export const Cache = () => {
    // Get demographic & user input data from cache
    let demographics: DemographicData | string | null =
        localStorage.getItem("demographics");

    let userInputData: UserInputData | string | null =
        localStorage.getItem("userInput");

    // Get that data and parse as valid json.
    if (demographics !== null)
        demographics = JSON.parse(demographics) as DemographicData;

    if (userInputData !== null)
        userInputData = JSON.parse(userInputData) as UserInputData;

    return (
        <Box component={"div"}>
            <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12}>
                    {getDemographicsCard(demographics)}
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                    {getUserInputDataCard(userInputData)}
                </Grid>
            </Grid>
        </Box>
    );
};
