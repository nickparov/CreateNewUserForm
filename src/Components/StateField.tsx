import { Autocomplete, TextField } from "@mui/material";
import { InputData } from "../Interfaces/userData.interface";

interface Props {
    onChangeHandler: (event: any, newValue: string | null) => void;
    data: InputData;
    options: string[];
}

export const StateField = (props: Props) => {
    const { onChangeHandler, data, options } = props;

    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="State"
                    helperText={data.helperText}
                    error={data.error}
                />
            )}
            onChange={onChangeHandler}
            value={data.value}
        />
    );
};
