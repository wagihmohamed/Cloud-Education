/*eslint-disable*/
import { Typography, Container, Stack, Divider } from '@mui/material';
import {
	CustomButton,
	Footer,
	LandingPageNavigation,
	LandingPageSection,
	LandingPageCard,
} from 'components';

import {
	landingpageimage1,
	landingpageimage2,
	landingpageimage3,
	landingimageCaseStudy,
} from 'assets';
import { caseStudyStatments } from 'mockup';

export const LandingPage = () => {
	return (
		<>
			<LandingPageNavigation />
			<Container maxWidth="xl" sx={{ marginX: 'auto' }}>
				<LandingPageSection
					bgcolor="#fff"
					image={landingpageimage1}
					heading="it's better than sliced bread!"
					txt="Tell the world how awesome your app is and why they should use it!"
					buttonLabel="Get Started"
					stackDirection="row"
				/>
				<Divider />
				<LandingPageSection
					bgcolor="#fff"
					image={landingpageimage2}
					heading="Feature 1"
					txt="Explanation of why you are going to love it and the benefit!"
					buttonLabel="Learn More"
					stackDirection="row-reverse"
				/>
				<Divider />
				<LandingPageSection
					bgcolor="#fff"
					image={landingpageimage3}
					heading="Feature 2"
					txt="Explantion of why you are going to love it and the benefit"
					buttonLabel="Learn More"
					stackDirection="row"
				/>
				<Divider />
				<Stack
					bgcolor={'#fff'}
					direction="column"
					sx={{ padding: '4rem' }}
					justifyContent="space-between"
					spacing={3}
				>
					<Typography variant="h3" align="center">
						Happy Customers
					</Typography>
					<Typography variant="body1" align="center">
						They love ui! isn't it obvious
					</Typography>
					<Stack
						direction={'row'}
						justifyContent="space-around"
						alignItems={'flex-start'}
						spacing={2}
					>
						<LandingPageCard
							image={landingimageCaseStudy}
							content={caseStudyStatments.castStudy1.content}
						/>
						<LandingPageCard
							image={landingimageCaseStudy}
							content={caseStudyStatments.castStudy2.content}
						/>
						<LandingPageCard
							image={landingimageCaseStudy}
							content={caseStudyStatments.castStudy3.content}
						/>
					</Stack>
				</Stack>
			</Container>
			<Stack
				bgcolor={'#131515'}
				direction={'row'}
				justifyContent="space-between"
				sx={{
					border: '1px solid',
					borderInline: 'none',
					padding: '3rem',
					width: '100%',
				}}
			>
				<Container
					sx={{
						mx: 'auto',
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Typography textAlign="center" variant="h2" sx={{ color: '#fff' }}>
						Call to Action! you can do it !!
					</Typography>
					<CustomButton mx="auto" mt={3} px={8}>
						Get Started!!
					</CustomButton>
				</Container>
			</Stack>
			<Footer />
		</>
	);
};
