import { Typography, Button } from "@mui/material";
import { Stack } from "@mui/system";
type sectionProps = {
    image: string;
    heading: string;
    txt: string;
    buttonLabel: string;
    stackDirection: string;
};

export const SectionComponent = ({
    image,
    heading,
    txt,
    buttonLabel,
    stackDirection,
}: sectionProps) => {
    return (
        <Stack
            sx={{
                padding: "4rem",
                flexDirection: `${stackDirection}`,
            }}
            alignItems="center"
            justifyContent="space-between">
            <Stack
                direction="column"
                spacing="1rem"
                justifyContent="space-between">
                <Typography variant="h1" sx={{ fontSize: "3.5rem" }}>
                    {heading}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                    {txt}
                </Typography>
                <Button size="large" variant="contained" sx={{ width: "70%" }}>
                    {buttonLabel}
                </Button>
            </Stack>
            <img
                src={image}
                alt="Logo"
                style={{ width: "570px", borderRadius: "1rem" }}
            />
        </Stack>
    );
};
