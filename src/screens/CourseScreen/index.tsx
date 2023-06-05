import { useState, useMemo } from 'react';
import { Star, ChatBubble } from '@mui/icons-material';
import { Box, Button, Grid, Stack } from '@mui/material';
import {
	CourseTab,
	CustomEditor,
	CustomLayout,
	FeedbackModal,
	CustomButton,
	CourseComments,
} from 'components';
import { theme } from 'theme';

export const CourseScreen = () => {
	const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(
		'1'
	);

	const [openModal, setOpenModal] = useState(false);
	const [openComments, setOpenComments] = useState(false);

	const editorJs = useMemo(() => {
		return <CustomEditor id={parseInt(selectedCourseId || '')} />;
	}, [selectedCourseId]);

	return (
		<Box>
			<Button
				sx={{
					position: 'fixed',
					width: '70px',
					height: '70px',
					borderRadius: '50%',
					right: '4%',
					bottom: '6%',
					bgcolor: '#c1121f',
					zIndex: '100',
					boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
					'&:hover': {
						bgcolor: '#c1121f',
					},
				}}
				onClick={() => {
					setOpenComments(true);
				}}
			>
				<ChatBubble sx={{ color: '#e9ecef' }} />
			</Button>
			<FeedbackModal opneModal={openModal} setOpenModal={setOpenModal} />
			<CustomLayout>
				<CourseComments
					sectionId={parseInt(selectedCourseId || '')}
					openComments={openComments}
					setOpenComments={setOpenComments}
				/>
				<Box sx={{ padding: '1' }}>
					<Stack direction="row">
						<Stack
							flexGrow="1"
							direction="row"
							sx={{
								bgcolor: '#ced4da',
								maxWidth: '100%',
								overflowX: 'scroll',
								'&::-webkit-scrollbar': {
									height: '2px',
									color: 'balck',
								},
							}}
						>
							<CourseTab
								selectedCourseId={selectedCourseId}
								setSelectedCourseId={setSelectedCourseId}
							/>
						</Stack>
					</Stack>
					<Stack
						sx={{
							width: '70%',
							margin: '3rem auto',
							[theme.breakpoints.down('md')]: {
								width: '90%',
							},
						}}
					>
						<CustomButton
							sx={{
								fontWeight: 'bold',
								padding: '.5rem 2rem',
								borderRadius: '10px',
								boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
								'&:hover': {
									backgroundColor: 'black',
								},
							}}
							startIcon={<Star sx={{ color: 'yellow', marginRight: '5px' }} />}
							onClick={() => setOpenModal(true)}
						>
							Rating & feedback
						</CustomButton>
					</Stack>
					<Grid columnSpacing="10px" container spacing={4}>
						<Grid mt={2} item xs={12} md={12} sx={{ margin: '0 1rem' }}>
							{editorJs}
						</Grid>
					</Grid>
				</Box>
			</CustomLayout>
		</Box>
	);
};
