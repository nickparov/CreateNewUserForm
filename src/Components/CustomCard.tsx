import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface CardProps {
    paragraphs: string[];
    title?: string;
}

const getTitle = (title: string | undefined) => {
    // if no title provided, return null
    if (title === undefined) return null;

    // render title
    return (
        <>
            <Typography variant="h5">{title}</Typography>
            <hr />
        </>
    );
};

const getParagraphs = (paragraphs: string[]) => {
    if (paragraphs.length === 0) return null;

    return paragraphs.map((text, idx) => {
        return (
            <Typography key={`${text}_${idx}`} gutterBottom>
                {text}
            </Typography>
        );
    });
};

export const CustomCard = (props: CardProps) => {
    const { paragraphs, title } = props;

    return (
        <Card sx={{ fontSize: 14, marginTop: 5 }}>
            <CardContent>
                {/* Card Title */}
                {getTitle(title)}

                {/* Card Paragraphs */}
                {getParagraphs(paragraphs)}
            </CardContent>
        </Card>
    );
};
