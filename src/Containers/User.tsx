import * as React from "react";
import { AppStateContext } from "../App";
import { AppState } from "../Store/app";

import { CustomCard } from "../Components/CustomCard";

export const User = () => {
    const appState = React.useContext(AppStateContext) as AppState;
    const { email, name, occupation, state, id } = appState.userData;

    if (id === "") {
        return (
            <CustomCard
                paragraphs={[
                    "Fill out the form to see post req response data.",
                ]}
            />
        );
    }

    return (
        <CustomCard
            title={"User Submitted Data"}
            paragraphs={[email, name, occupation, state, id]}
        />
    );
};
