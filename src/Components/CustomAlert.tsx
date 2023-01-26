import { Alert, Collapse, IconButton } from "@mui/material";
import { UIErrorType } from "../Store/app";

import CloseIcon from "@mui/icons-material/Close";

interface Props {
    clickHandler: () => void;
    error: UIErrorType;
}

export const CustomAlert = (props: Props) => {
    const { clickHandler, error } = props;

    return (
        <Collapse in={!!error}>
            <Alert
                severity="error"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={clickHandler}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
            >
                {error}
            </Alert>
        </Collapse>
    );
};
