/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useMemo, useEffect, useRef } from 'react';
import { courseComments } from 'mockup';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import {
	Box,
	Button,
	Drawer,
	Grid,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import {
	CourseTab,
	CustomEditor,
	CustomLayout,
	CourseContentItem,
	CustomButton,
} from 'components';
import { useParams } from 'react-router-dom';
import { useCourses } from 'zustandStore';
import { theme } from 'theme';
interface CommentObj {
	id: string;
	content: string;
}
export const CourseScreen = () => {
	const [triggerAddButton, setTriggerButton] = useState(false);
	const { courseId } = useParams();
	const { addCourse, courses } = useCourses();
	const [courseTitle, setCourseTitle] = useState('');
	const [courseContent, setCourseContent] = useState('');
	const [courseContentList, setCourseContentList] = useState<string[]>([]);
	const [selectedCourseId, setSelectedCourseId] = useState(courses[0].id);
	const [commentsList, setCommentsList] =
		useState<CommentObj[]>(courseComments);
	const [comment, setComment] = useState<string>();
	const editorJs = useMemo(() => {
		return <CustomEditor id={selectedCourseId} />;
	}, [selectedCourseId]);
	const getSelectedCourse = () => {
		return courses.find((course) => course.id === selectedCourseId);
	};
	const addSubjects = () => {
		setTriggerButton((prev) => !prev);
		if (courseTitle) {
			addCourse({
				id: (courses.length + 1).toString(),
				course: [
					{
						id: new Date().getTime().toString(),
						type: 'paragraph',
						data: {
							blocks: [
								{
									type: 'header',
									data: {
										text: 'Header',
										level: 2,
									},
								},
							],
							version: '2.22.2',
						},
					},
				],
				title: courseTitle,
			});
			setCourseTitle('');
		}
	};
	const containerRef = useRef<HTMLDivElement>(null);
	const [drawerState, setDrawerState] = useState(false);
	const addingCommentHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && comment) {
			const commmentObj = {
				id: new Date().getTime().toString(),
				content: comment,
			};
			setCommentsList((prev) => [...prev, commmentObj]);
			setComment('');
			setTimeout(() => {
				if (containerRef.current) {
					containerRef.current.scrollTop = containerRef.current.scrollHeight;
				}
			}, 100);
		}
	};
	return (
		<Box sx={{ position: 'absolute' }}>
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
				}}
				onClick={() => {
					setDrawerState(true);
				}}
			>
				<ChatBubbleIcon sx={{ color: '#e9ecef' }} />
			</Button>
			<CustomLayout>
				<Drawer
					anchor="right"
					open={drawerState}
					onClose={() => setDrawerState(false)}
				>
					<Typography variant="h3" sx={{ margin: '1rem auto' }}>
						Comments :-
					</Typography>
					<Stack
						ref={containerRef}
						width={'400px'}
						sx={{
							padding: '.8rem',
							alignItems: 'center',
							height: '90%',
							overflowY: 'scroll',
						}}
					>
						{commentsList.map(({ id, content }) => {
							return (
								<Stack
									key={id}
									direction={'row'}
									alignItems={'flex-start'}
									sx={{
										width: '95%',
										margin: '1rem auto',
										padding: '10px',
										borderRadius: '5px',
										border: 'solid black 2px',
									}}
								>
									<PersonIcon sx={{ marginRight: '5px' }} />
									{content}
								</Stack>
							);
						})}
					</Stack>
					<TextField
						placeholder="add your comment and hit Enter &#10149;"
						sx={{ margin: '1rem auto', width: '90%' }}
						value={comment}
						onChange={(e) => {
							setComment((prev) => e.target.value);
						}}
						onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
							addingCommentHandler(e)
						}
					></TextField>
				</Drawer>
				<Box sx={{ padding: '1' }}>
					<Stack direction={'row'}>
						<Stack
							flexGrow={'1'}
							direction={'row'}
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
							{courses.map((course) => (
								<CourseTab
									key={course.id}
									title={course.title}
									id={course.id}
									selectedCourseId={selectedCourseId}
									setSelectedCourseId={setSelectedCourseId}
								/>
							))}
							<Stack direction={'row'}>
								{triggerAddButton && (
									<TextField
										inputProps={{
											style: {
												padding: '9px',
												fontSize: '1rem',
											},
										}}
										variant="filled"
										size="medium"
										sx={{ padding: '0px', fontSize: '2rem', minWidth: '200px' }}
										value={courseTitle}
										onChange={(e) => setCourseTitle(e.target.value)}
										onKeyDown={(e) => {
											if (e.key === 'Enter') {
												addSubjects();
											}
										}}
									></TextField>
								)}
								<Button
									sx={{ bgcolor: '#dee2e6', borderRadius: '0px' }}
									onClick={addSubjects}
								>
									<AddIcon></AddIcon>
								</Button>
							</Stack>
						</Stack>
					</Stack>
					<Box
						sx={{
							border: '3px solid #000',
							borderRadius: '10px',
							p: 2,
							pb: 4,
							width: '80%',
							margin: '2rem auto',
							[theme.breakpoints.down('md')]: {
								width: '90%',
							},
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
								{getSelectedCourse()?.course.map((course) => {
									return (
										course.type === 'header' && (
											<CourseContentItem
												txt={course.data.text}
												key={course.id}
											/>
										)
									);
								})}
								{courseContentList.map((content) => {
									return <CourseContentItem txt={content} key={content} />;
								})}
							</Box>
							<TextField
								value={courseContent}
								onChange={(e) => setCourseContent(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										if (courseContent.length > 0) {
											setCourseContentList((prev) => [...prev, courseContent]);
										}
										setCourseContent('');
									}
								}}
								placeholder="add course feature ,content &#10149;"
								inputProps={{
									style: {
										padding: '10px',
										fontSize: '1.2rem',
									},
								}}
								variant="filled"
								size="medium"
								sx={{
									alignSelf: 'flex-start',
									width: '50%',
									[theme.breakpoints.down('md')]: {
										width: '80%',
										alignSelf: 'center',
									},
									margin: 'auto',
								}}
							></TextField>
						</Stack>
					</Box>
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
