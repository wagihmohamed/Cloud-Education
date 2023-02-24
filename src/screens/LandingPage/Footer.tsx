import { Stack } from "@mui/system";
import { Typography, Grid } from "@mui/material";
import { LinkButton } from "components/Link";

const footerHeading = {
    fontSize: "1.8rem",
    textAlign: "center",
};
export const Footer = () => {
    return (
        <Grid
            bgcolor={"#02040f"}
            color="whitesmoke"
            container
            spacing={2}
            sx={{ padding: "3rem", borderBottom: "1px solid black" }}>
            <Grid item xs={2} color="white">
                <Typography variant="h3">Cloud Education</Typography>
            </Grid>
            <Grid item xs={2}>
                <Stack spacing={2}>
                    <Typography sx={footerHeading}>Products</Typography>
                    <LinkButton href="#">Feature</LinkButton>
                    <LinkButton href="#">Pricing</LinkButton>
                    <LinkButton href="#">Comparison</LinkButton>
                    <LinkButton href="#">Updates</LinkButton>
                </Stack>
            </Grid>
            <Grid item xs={2}>
                <Stack spacing={2}>
                    <Typography sx={footerHeading}>Solutions</Typography>
                    <LinkButton href="#">Overview</LinkButton>
                    <LinkButton href="#">Tech</LinkButton>
                    <LinkButton href="#">Government</LinkButton>
                    <LinkButton href="#">Non-Profit</LinkButton>
                    <LinkButton href="#">Financial Services</LinkButton>
                </Stack>
            </Grid>
            <Grid item xs={2}>
                <Stack spacing={2}>
                    <Typography sx={footerHeading}>Customers</Typography>
                    <LinkButton href="#">Highlights</LinkButton>
                    <LinkButton href="#">Case Studies</LinkButton>
                </Stack>
            </Grid>
            <Grid item xs={2}>
                <Stack spacing={2}>
                    <Typography sx={footerHeading}>Resources</Typography>
                    <LinkButton href="#">Documentation</LinkButton>
                    <LinkButton href="#">eBooks</LinkButton>
                    <LinkButton href="#">Podcast</LinkButton>
                    <LinkButton href="#">Blog</LinkButton>
                    <LinkButton href="#">Resources</LinkButton>
                </Stack>
            </Grid>
            <Grid item xs={2}>
                <Stack spacing={2}>
                    <Typography sx={footerHeading}>About Us</Typography>
                    <LinkButton href="#">Our Company</LinkButton>
                    <LinkButton href="#">Careers</LinkButton>
                    <LinkButton href="#">Contact Us</LinkButton>
                    <LinkButton href="#">News</LinkButton>
                </Stack>
            </Grid>
        </Grid>
    );
};
