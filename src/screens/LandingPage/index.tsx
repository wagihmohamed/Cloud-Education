import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Container,
    Stack,
    Button,
    Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { SectionComponent } from "./SectionComponent";
import { Footer } from "./Footer";
import { CustomButton } from "components";

import { CaseStudy } from "./CaseStudy";
import image1 from "./images/image1.jpg";
import image2 from "./images/image2.jpg";
import image3 from "./images/image3.jpg";
import caseStudyImage from "./images/caseStudy.jpg";
import SchoolIcon from "@mui/icons-material/School";
const buttonStyle = {
    borderRadius: "2rem",
    minWidth: "10rem",
    backgroundColor: "darkblue",
};
export const LandingPage = () => {
    return (
        <>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: "black",
                    paddingY: ".75rem",
                    bgcolor: "#03045e",
                }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <IconButton size="large" edge="start" aria-label="logo">
                            <SchoolIcon
                                sx={{
                                    color: "white",
                                    fontSize: "3rem",
                                }}></SchoolIcon>
                        </IconButton>
                        <Typography
                            variant="h4"
                            sx={{ letterSpacing: "3px", flexGrow: 0.8 }}>
                            Cloud Education
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <Link
                                to="/"
                                style={{
                                    textDecoration: "none",
                                    color: "white",
                                }}>
                                <CustomButton
                                    borderRadius="15px"
                                    bgcolor="#0077b6"
                                    width={"10rem"}>
                                    Log in
                                </CustomButton>
                            </Link>
                            <Link
                                to="/register"
                                style={{
                                    textDecoration: "none",
                                    color: "white",
                                }}>
                                <CustomButton
                                    borderRadius="15px"
                                    bgcolor="#0077b6"
                                    width={"10rem"}>
                                    Sign up
                                </CustomButton>
                            </Link>
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>
            <Container maxWidth={false} disableGutters sx={{}}>
                <SectionComponent
                    bgcolor="#e5e5e5"
                    image={image1}
                    heading="it's better than sliced bread!"
                    txt="Tell the world how awesome your app is and why they should use it!"
                    buttonLabel="Get Started"
                    stackDirection="row"
                />
                <Divider />
                <SectionComponent
                    bgcolor="#e5e5e5"
                    image={image2}
                    heading="Feature 1"
                    txt="Explanation of why you are going to love it and the benefit!"
                    buttonLabel="Learn More"
                    stackDirection="row-reverse"
                />
                <Divider />
                <SectionComponent
                    bgcolor="#e5e5e5"
                    image={image3}
                    heading="Feature 2"
                    txt="Explantion of why you are going to love it and the benefit"
                    buttonLabel="Learn More"
                    stackDirection="row"
                />
                <Divider />
                <Stack
                    bgcolor={"#e7ecef"}
                    direction="column"
                    sx={{ padding: "4rem" }}
                    justifyContent="space-between"
                    spacing={3}>
                    <Typography variant="h3" align="center">
                        Happy Customers
                    </Typography>
                    <Typography variant="body1" align="center">
                        They love ui! isn't it obvious
                    </Typography>
                    <Stack
                        direction={"row"}
                        justifyContent="space-around"
                        alignItems={"flex-start"}
                        spacing={2}>
                        <CaseStudy
                            image={caseStudyImage}
                            content="Lorem Ipsum is simply dummy text of the printing and typesetting industry.  "></CaseStudy>
                        <CaseStudy
                            image={caseStudyImage}
                            content="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"></CaseStudy>
                        <CaseStudy
                            image={caseStudyImage}
                            content="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"></CaseStudy>
                    </Stack>
                </Stack>
                <Stack
                    bgcolor={"#3e92cc"}
                    direction={"row"}
                    justifyContent="space-between"
                    sx={{
                        border: "1px solid",
                        borderInline: "none",
                        padding: "3rem",
                    }}>
                    <Typography variant="h2">
                        Call to Action! you can do it !!
                    </Typography>
                    <CustomButton>Get Started!!</CustomButton>
                </Stack>
                <Footer bgcolor="#13293d"></Footer>
            </Container>
        </>
    );
};
