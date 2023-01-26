import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";

import { InputData } from "../Interfaces/userData.interface";

interface Props {
    data: InputData;
    onChangeHandler: (e: SelectChangeEvent<any>) => void;
    occupations: string[];
}

const OccupationErrorText = (text: string | null) => {
    if (text !== null && text.length > 0)
        return <FormHelperText error>{text}</FormHelperText>;

    return null;
};

const getOccupations = (occupations: string[]) => {
    return occupations.map((occ) => {
        return (
            <MenuItem value={occ} key={occ.split(" ").join("_")}>
                {occ}
            </MenuItem>
        );
    });
};

export const OccupationField = (props: Props) => {
    const { onChangeHandler, occupations, data } = props;

    return (
        <FormControl fullWidth>
            <InputLabel id="occupation-select-label">Occupation</InputLabel>
            <Select
                labelId="occupation-select-label"
                id="occupation-select"
                label="Occupation"
                onChange={onChangeHandler}
                value={data.value}
                error={data.error}
            >
                {getOccupations(occupations)}
            </Select>
            {OccupationErrorText(data.helperText)}
        </FormControl>
    );
};
