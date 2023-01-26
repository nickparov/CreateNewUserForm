import { TextField } from "@mui/material";
import React from "react";
import { InputData, UserInputData } from "../Interfaces/userData.interface";

interface Props {
    setInputData: (value: React.SetStateAction<UserInputData>) => void;
    data: InputData;
    id: string;
    inputData: UserInputData;
    label: string;
    type: string;
    autoFocus?: boolean;
}

export const TextInputField = (props: Props) => {
    const { setInputData, data, id, inputData, label, type } = props;
    return (
        <TextField
            name={id}
            value={data.value}
            autoFocus={props.autoFocus !== undefined ? props.autoFocus : false}
            autoComplete={id}
            fullWidth
            id={id}
            label={label}
            type={type}
            onChange={(e) => {
                const updatedInputData = {
                    ...inputData,
                    [id]: {
                        value: e.target.value,
                        error: false,
                        helperText: "",
                    },
                } as UserInputData;

                setInputData(updatedInputData);
            }}
            error={data.error}
            helperText={data.helperText}
        />
    );
};
