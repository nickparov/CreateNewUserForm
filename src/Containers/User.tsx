import * as React from "react";
import { AppStateContext } from "../App";
import { AppState } from "../Store/app";

import { SingleCard } from "../Components/SingleCard";

export const User = () => {
    const appState = React.useContext(AppStateContext) as AppState;
    const { email, name, occupation, state, id } = appState.userData;

    if (id === "")
        return (
            <SingleCard
                paragraphs={[
                    "Fill out the form to see post req response data.",
                ]}
            />
        );

    return (
        <SingleCard
            title={"User Submitted Data"}
            paragraphs={[email, name, occupation, state, id]}
        />
    );
};
