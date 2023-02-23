import { Stack } from "@mui/system";
import { styled } from "@mui/system";

import { Typography, Grid } from "@mui/material";
const FButton = styled("a")({
    textAlign: "center",
    border: "none",
    display: "inline",
    width: "min-width",
    backgroundColor: "transparent",
    cursor: "pointer",
    "&.MuiButtonBase-root:hover": {
        bgcolor: "transparent",
    },
});
const footerHeader = {
    fontSize: "1.8rem",
};

export const Footer = ({bgcolor}:{bgcolor:string}) => {
    return (
        <Grid
        bgcolor={bgcolor}
        color="whitesmoke"
            container
            spacing={2}
            sx={{ padding: "3rem", borderBottom: "1px solid black" }}>
            <Grid item xs={2} color="white">
                <Typography variant="h3">Cloud Education</Typography>
            </Grid>
            <Grid item xs={2}>
                <Stack spacing={2}>
                    <FButton sx={footerHeader}>Products</FButton>
                    <FButton>Feature</FButton>
                    <FButton>Pricing</FButton>
                    <FButton>Comparison</FButton>
                    <FButton>Updates</FButton>
                </Stack>
            </Grid>
            <Grid item xs={2}>
                <Stack spacing={2}>
                    <FButton sx={footerHeader}>Solutions</FButton>

                    <FButton>Overview</FButton>
                    <FButton>Tech</FButton>
                    <FButton>Government</FButton>
                    <FButton>Non-Profit</FButton>
                    <FButton>Financial Services</FButton>
                </Stack>
            </Grid>
            <Grid item xs={2}>
                <Stack spacing={2}>
                    <FButton sx={footerHeader}>Customers</FButton>

                    <FButton>Highlights</FButton>
                    <FButton>Case Studies</FButton>
                </Stack>
            </Grid>
            <Grid item xs={2}>
                <Stack spacing={2}>
                    <FButton sx={footerHeader}>Resources</FButton>
                    <FButton>Documentation</FButton>
                    <FButton>eBooks</FButton>
                    <FButton>Podcast</FButton>
                    <FButton>Blog</FButton>
                    <FButton>Resources</FButton>
                </Stack>
            </Grid>
            <Grid item xs={2}>
                <Stack spacing={2}>
                    <FButton sx={footerHeader}>About Us</FButton>
                    <FButton>Our Company</FButton>
                    <FButton>Careers</FButton>
                    <FButton>Contact Us</FButton>
                    <FButton>News</FButton>
                </Stack>
            </Grid>
        </Grid>
    );
};
