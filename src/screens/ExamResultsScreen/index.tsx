import {
	Box,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	Grid,
	Typography,
	useMediaQuery,
} from '@mui/material';
import {
	CustomLayout,
	CustomNavLink,
	LoadingErrorPlaceholder,
} from 'components';
import { useGetExamsResultList } from 'hooks';
import { theme } from 'theme';

export const AnsweredExamsScreen = () => {
	const isSmScreen = useMediaQuery(theme.breakpoints.down('lg'));
	const {
		data: examsResults = {
			data: [],
			status: '',
		},
		isLoading,
		isError,
	} = useGetExamsResultList();
	return (
		<CustomLayout>
			<Box
				sx={{
					mt: 4,
					mx: 5,
					padding: '1rem',
					[theme.breakpoints.down('md')]: {
						mx: 0,
					},
				}}
			>
				<Box
					mt={2}
					display="flex"
					alignItems="space-betwenn"
					paddingX="10px"
					flexDirection="column"
				>
					<Typography fontWeight="bold" variant="h4" flexGrow="1">
						Exams Results
					</Typography>
					<Typography variant="h5" mt={2} flexGrow="1">
						You took {examsResults.data.length} exams
					</Typography>
				</Box>
				<Grid container spacing={4} sx={{ mt: 2 }}>
					<LoadingErrorPlaceholder isError={isError} isLoading={isLoading}>
						{!isError &&
							!isLoading &&
							examsResults.data.map((examItem) => (
								<Grid item xs={12} sm={6} md={6} lg={4} key={examItem.id}>
									<Card
										sx={{
											minHeight: '350px',
											display: 'flex',
											flexDirection: 'column',
										}}
									>
										<CardMedia
											component="img"
											height="200"
											image={
												'https://img.freepik.com/free-photo/writing-note-business-education-concept_1421-28.jpg?w=1380&t=st=1686151011~exp=1686151611~hmac=16efa5deb1ccdeb8a1299b8989d85bc641a91f35a40d62dd4c05391f3c732d0c'
											}
											alt={examItem.exam.id}
										/>
										<CardHeader
											title={examItem.exam.name}
											subheader={examItem.exam.description}
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
														Grade: {examItem.score}
													</Typography>
												</Box>
											</Box>
											<CustomNavLink
												to={examItem.id}
												sx={{
													bgcolor: '#000',
													color: '#fff',
													borderRadius: 2,
													height: 40,
													px: 5,
													'&:hover': {
														bgcolor: '#000',
													},
													mt: 5,
												}}
											>
												Show Answers
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
