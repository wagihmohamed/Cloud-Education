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
	const isSmScreen = useMediaQuery(theme.breakpoints.down('lg'));
	return (
		<CustomLayout>
			<Box
				sx={{
					mt: 4,
					mx: 5,
					bgcolor: 'white',
				}}
			>
				<Box>
					<Typography fontWeight="bold" variant="h4">
						Exams Screen
					</Typography>
				</Box>
				<Grid container spacing={2} sx={{ mt: 2 }}>
					<LoadingErrorPlaceholder isError={isError} isLoading={isLoading}>
						{!isError &&
							!isLoading &&
							exams.map((exam) => (
								<Grid item xs={12} sm={4} md={3} key={exam.id}>
									<Card sx={{ opacity: isExamDisabled(exam) ? 0.5 : 1 }}>
										<CardMedia
											component="img"
											height="200"
											image={exam.imageUrl}
											alt={exam.title}
										/>
										<CardHeader title={exam.title} subheader={exam.class} />
										<CardContent>
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
													<Typography variant="body2" color="text.secondary">
														Grade: {exam.grade || 'Not graded'}
													</Typography>
													<Typography variant="body2" color="text.secondary">
														Start date: {exam.startDate.toLocaleDateString()}
													</Typography>
													<Typography variant="body2" color="text.secondary">
														End date: {exam.endDate.toLocaleDateString()}
													</Typography>
												</Box>
												<CustomNavLink
													disabled={isExamDisabled(exam)}
													to={isExamDisabled(exam) ? '#' : `/exam/${exam.id}`}
													sx={{
														bgcolor: '#000',
														color: '#fff',
														borderRadius: 2,
														height: 40,
														px: 5,
														'&:hover': {
															bgcolor: '#000',
														},
													}}
												>
													Start
												</CustomNavLink>
											</Box>
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
