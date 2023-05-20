/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
	Typography,
	Container,
	Stack,
	Divider,
	useMediaQuery,
} from '@mui/material';
import {
	CustomButton,
	Footer,
	LandingPageNavigation,
	LandingPageSection,
	LandingPageCard,
} from 'components';

import { landingimageCaseStudy } from 'assets';
import { caseStudyStatments, landingPageMainSections } from 'mockup';
import { theme } from 'theme';
const styles = {
	casesStyle: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'flex-start',
		spacing: '2',
		gap: '2rem',
	},
	caseStyleSm: {
		flexDirection: 'column',
		alignItems: 'center',
	},
};
export const LandingPage = () => {
	const smScreen = useMediaQuery(theme.breakpoints.down(950));
	return (
		<>
			<LandingPageNavigation />
			<Container maxWidth="xl" sx={{ marginX: 'auto' }}>
				{landingPageMainSections.map((section, indx) => {
					return (
						<>
							<LandingPageSection
								sectionDirection={section.direction}
								key={`${indx}`}
								image={section.image}
								heading={section.heading}
								txt={section.txt}
								buttonLabel={section.btn.text}
							/>
							<Divider />
						</>
					);
				})}
				<Stack
					direction="column"
					sx={{ padding: '4rem 1rem' }}
					justifyContent="space-between"
					spacing={3}
				>
					<Typography variant="h3" align="center">
						Happy Customers
					</Typography>
					<Typography variant="body1" align="center">
						They love ui! isn't it obvious
					</Typography>
					<Stack sx={[styles.casesStyle, smScreen ? styles.caseStyleSm : {}]}>
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
