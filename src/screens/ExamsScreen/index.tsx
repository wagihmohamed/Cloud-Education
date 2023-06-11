import {
	CustomLayout,
	CustomNavLink,
	LoadingErrorPlaceholder,
} from 'components';
import {
	Grid,
	Typography,
	Card,
	CardMedia,
	CardHeader,
	CardContent,
	Box,
	useMediaQuery,
} from '@mui/material';
import { useExamsList } from 'hooks';
import { isExamDisabled } from 'utlis';
import { theme } from 'theme';

export const ExamsScreen = () => {
	const { data: exams = [], isLoading, isError } = useExamsList();
	const organizationName = localStorage.getItem('organizationId') || '';
	const isSmScreen = useMediaQuery(theme.breakpoints.down('lg'));
	return (
		<CustomLayout>
			<Box
				sx={{
					mt: 4,
					mx: '2.5rem',
					bgcolor: 'background.default',
				}}
			>
				<Box>
					<Typography fontWeight="bold" variant="h4">
						Exams Screen
					</Typography>
				</Box>
				<Grid container spacing={4} sx={{ mt: 2 }}>
					<LoadingErrorPlaceholder isError={isError} isLoading={isLoading}>
						{!isError &&
							!isLoading &&
							exams.map((exam) => (
								<Grid item xs={12} sm={6} md={6} lg={4} key={exam.id}>
									<Card
										sx={{
											opacity:
												isExamDisabled(exam) ||
												exam.examResult?.[0]?.status === 'FINISHED' ||
												exam.examResult?.[0]?.status === 'MISSED'
													? 0.5
													: 1,
										}}
									>
										<CardMedia
											component="img"
											height="200"
											image={
												'https://img.freepik.com/free-photo/writing-note-business-education-concept_1421-28.jpg?w=1380&t=st=1686151011~exp=1686151611~hmac=16efa5deb1ccdeb8a1299b8989d85bc641a91f35a40d62dd4c05391f3c732d0c'
											}
											alt={exam.name}
										/>
										<CardHeader
											title={exam.name}
											subheader={exam.description}
										/>
										<CardContent sx={{ padding: '0px 16px 16px' }}>
											<Box
												display="flex"
												justifyContent="space-between"
												alignItems="center"
												sx={[
													isSmScreen
														? { flexDirection: 'column', gap: '10px' }
														: null,
												]}
											>
												<Box>
													<Typography
														variant="body2"
														color="text.secondary"
														fontSize="1.2rem"
													>
														Grade:{' '}
														{exam.examResult?.[0]?.score !== undefined
															? exam.examResult?.[0]?.score
															: 'Not Graded yet'}
													</Typography>
													{exam.examResult?.[0]?.status && (
														<Typography
															variant="body2"
															color="text.secondary"
															fontSize="1.2rem"
														>
															Status: {exam.examResult?.[0]?.status}
														</Typography>
													)}
													<Typography
														variant="body2"
														color="text.secondary"
														fontSize="1.2rem"
														my={1}
													>
														Start date: {exam.startTime}
													</Typography>
													<Typography
														variant="body2"
														color="text.secondary"
														fontSize="1.2rem"
													>
														End date: {exam.endTime}
													</Typography>
												</Box>
											</Box>
											<CustomNavLink
												disabled={
													isExamDisabled(exam) ||
													exam.examResult?.[0]?.status === 'FINISHED' ||
													exam.examResult?.[0]?.status === 'MISSED'
												}
												to={
													exam.examResult?.[0]?.status === 'FINISHED' ||
													exam.examResult?.[0]?.status === 'MISSED' ||
													isExamDisabled(exam)
														? '#'
														: `/${organizationName}/exam/${exam.id}`
												}
												sx={{
													bgcolor: '#000',
													color: '#fff',
													borderRadius: 2,
													height: 40,
													px: 5,
													'&:hover': {
														bgcolor: '#000',
													},
													mt: 2,
												}}
											>
												Start
											</CustomNavLink>
										</CardContent>
									</Card>
								</Grid>
							))}
					</LoadingErrorPlaceholder>
				</Grid>
			</Box>
		</CustomLayout>
	);
};
