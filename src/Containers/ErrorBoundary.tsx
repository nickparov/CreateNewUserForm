import { Box, Button, Typography } from "@mui/material";
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);

        this.setState({ hasError: true, error: error, errorInfo: errorInfo });
    }

    public render() {
        if (this.state.hasError) {
            return (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        minHeight: "100vh",
                        backgroundColor: "primary.light",
                    }}
                >
                    <Typography variant="h1" style={{ color: "white" }}>
                        Error!
                    </Typography>
                    <Typography
                        variant="h6"
                        style={{ color: "white", marginBottom: 4 }}
                    >
                        Error message:{" "}
                        {this.state.error !== undefined &&
                            this.state.error.message}
                    </Typography>
                    <Typography variant="caption" style={{ color: "white" }}>
                        Sorry, some error occured!
                    </Typography>
                    <Button
                        sx={{ marginTop: 3 }}
                        variant="contained"
                        onClick={(e) => {
                            window.location.reload();
                        }}
                    >
                        Reload
                    </Button>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
