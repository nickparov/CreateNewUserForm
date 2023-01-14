import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface CardProps {
    paragraphs: string[];
    title?: string;
}

export const SingleCard = (props: CardProps) => {
    return (
        <Card sx={{ fontSize: 14, marginTop: 5 }}>
            <CardContent>
                {props.title !== undefined && (
                    <>
                        <Typography variant="h5">{props.title}</Typography>
                        <hr />
                    </>
                )}

                {props.paragraphs.map((text, idx) => {
                    return (
                        <Typography key={`${text}_${idx}`} gutterBottom>
                            {text}
                        </Typography>
                    );
                })}
            </CardContent>
        </Card>
    );
};
