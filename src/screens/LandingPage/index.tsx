import { Typography, Container, Stack, Divider } from "@mui/material";
import { SectionComponent } from "./SectionComponent";
import { Footer } from "./Footer";
import { CustomButton } from "components";
import { CaseStudy } from "./CaseStudy";
import image1 from "../../Assets/LandingPageAssets/image1.jpg";
import image2 from "../../Assets/LandingPageAssets/image2.jpg";
import image3 from "../../Assets/LandingPageAssets/image3.jpg";
import caseStudyImage from "../../Assets/LandingPageAssets/caseStudy.jpg";
import { NavigationBar } from "./AppBar";
import { CaseStudyStatments } from "./LandingPageStatements";
export const LandingPage = () => {
    return (
        <>
            <NavigationBar />
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
                            content={
                                CaseStudyStatments.castStudy1.content
                            }></CaseStudy>
                        <CaseStudy
                            image={caseStudyImage}
                            content={
                                CaseStudyStatments.castStudy2.content
                            }></CaseStudy>
                        <CaseStudy
                            image={caseStudyImage}
                            content={
                                CaseStudyStatments.castStudy3.content
                            }></CaseStudy>
                    </Stack>
                </Stack>
                <Stack
                    bgcolor={"#131515"}
                    direction={"row"}
                    justifyContent="space-between"
                    sx={{
                        border: "1px solid",
                        borderInline: "none",
                        padding: "3rem",
                    }}>
                    <Typography variant="h2" sx={{ color: "#fff" }}>
                        Call to Action! you can do it !!
                    </Typography>
                    <CustomButton>Get Started!!</CustomButton>
                </Stack>
                <Footer />
            </Container>
        </>
    );
};
