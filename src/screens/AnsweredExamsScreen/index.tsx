import { Box, Typography } from '@mui/material';
import { CustomLayout } from 'components';
import { theme } from 'theme';

export const AnsweredExamsScreen = () => {
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
					alignItems={'space-betwenn'}
					paddingX={'10px'}
				>
					<Typography fontWeight="bold" variant="h4" flexGrow={'1'}>
						Answerd Exams
					</Typography>
				</Box>
			</Box>
		</CustomLayout>
	);
};
