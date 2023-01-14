import { Box, Grid } from "@mui/material";
import * as React from "react";

import { SingleCard } from "../Components/SingleCard";
import { DemographicData } from "../utils/interfaces";
import { UserInputData } from "../utils/userData.interface";

export const Cache = () => {
    let demographics: DemographicData | string | null =
        localStorage.getItem("demographics");
    let userInputData: UserInputData | string | null =
        localStorage.getItem("userInput");

    if (demographics !== null)
        demographics = JSON.parse(demographics) as DemographicData;

    if (userInputData !== null)
        userInputData = JSON.parse(userInputData) as UserInputData;

    return (
        <Box component={"div"}>
            <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12}>
                    {demographics && (
                        <SingleCard
                            title={"Demographics Api Cache Data"}
                            paragraphs={[
                                `Total occupations loaded: ${demographics.occupations.length}`,
                                `Total states loaded: ${demographics.states.length}`,
                                "Reload the page to refetch the cache values.",
                            ]}
                        />
                    )}
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                    {userInputData && (
                        <SingleCard
                            title={"User Input Cache Data"}
                            paragraphs={[
                                `Email: ${userInputData.email.value ?? ""}`,
                                `First Name: ${
                                    userInputData.firstName.value ?? ""
                                }`,
                                `Last Name: ${
                                    userInputData.lastName.value ?? ""
                                }`,
                                `State: ${userInputData.state.value ?? ""}`,
                                `Occupation: ${
                                    userInputData.occupation.value ?? ""
                                }`,
                                `Password: ${
                                    userInputData.password.value ?? ""
                                }`,
                                "Reload the page to refetch the cache values.",
                            ]}
                        />
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};
