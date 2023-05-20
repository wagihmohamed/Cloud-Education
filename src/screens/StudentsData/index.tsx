import { Box, Typography } from '@mui/material';
import { CustomLayout, CustomSelect, StudentsTable } from 'components';
import { studentsDataOptions } from 'mockup';
import { theme } from 'theme';

export const StudentsData = () => {
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
					sx={{
						mx: '2rem',
						my: '1.5rem',
						[theme.breakpoints.down('sm')]: {
							mr: '.5rem',
							ml: '1.5rem',
							mt: '0rem',
						},
					}}
				>
					<Typography fontWeight="bold" variant="h4">
						You can Download the assigned students data here.
					</Typography>
					<Box
						display="flex"
						mt={5}
						sx={{
							gap: '1rem',
							[theme.breakpoints.down('md')]: {
								flexDirection: 'column',
							},
						}}
					>
						<Typography mb={2} sx={{ fontSize: '25px', mr: '10px' }}>
							Currently you have
							<Typography
								component="span"
								fontWeight="bold"
								px={1}
								display="inline-flex"
								fontSize={25}
							>
								{studentsDataOptions.length}
							</Typography>
							assigned Classes.
						</Typography>
						<CustomSelect
							maxWidth="100%"
							width="300px"
							options={studentsDataOptions}
							placeholder="Choose which Class"
							onChange={() => {}}
						/>
					</Box>
				</Box>
				<StudentsTable />
			</Box>
		</CustomLayout>
	);
};
