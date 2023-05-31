import { useState, useMemo } from 'react';
import { Star, ChatBubble } from '@mui/icons-material';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import {
	CourseTab,
	CustomEditor,
	CustomLayout,
	CourseContentItem,
	FeedbackModal,
	CustomButton,
	CourseComments,
} from 'components';
import { useParams } from 'react-router-dom';
import { theme } from 'theme';
import { useGetCourseContent } from 'hooks';

export const CourseScreen = () => {
	const { courseId } = useParams();
	const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(
		'1'
	);

	const {
		data: courseContent = {
			status: '',
			data: {
				content: [],
				order: 0,
				title: '',
			},
		},
	} = useGetCourseContent({
		courseCode: courseId || '',
		sectionOrder: parseInt(selectedCourseId || '') || 1,
	});

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
							width={'200px'}
							sx={{
								fontWeight: 'bold',
								padding: '.5rem 2rem',
								borderRadius: '10px',
								boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
								'&:hover': {
									backgroundColor: 'black',
								},
							}}
							onClick={() => setOpenModal(true)}
						>
							<Star sx={{ color: 'yellow', marginRight: '5px' }} />
							Rating & feedback
						</CustomButton>
						{courseContent?.data.content ? (
							<Box
								sx={{
									border: '3px solid #000',
									borderRadius: '10px',
									margin: '1rem auto',
									maxWidth: 600,
									p: 2,
									pb: 4,
									width: '100%',
								}}
							>
								<Stack direction={'column'} spacing={4}>
									<Box>
										<Typography
											textAlign="center"
											mt={2}
											sx={{
												textDecoration: 'underline',
											}}
											fontWeight="bold"
											fontSize={25}
											variant="h4"
										>
											Course Contnet
										</Typography>
										{courseContent?.data.content?.map((course) => {
											return (
												course.type === 'header' && (
													<CourseContentItem
														// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
														txt={course.data.text as string}
														key={course.id}
													/>
												)
											);
										})}
									</Box>
								</Stack>
							</Box>
						) : null}
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
