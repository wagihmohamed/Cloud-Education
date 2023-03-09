import { Box, Typography } from '@mui/material';
import { CustomLayout, CustomSelect, StudentsTable } from 'components';
import { studentsDataOptions } from 'mockup';

export const StudentsData = () => {
	return (
		<CustomLayout>
			<Box
				sx={{
					mt: 4,
					mx: 5,
					bgcolor: 'white',
				}}
			>
				<Typography fontWeight="bold" variant="h4">
					You can Download the assigned students data here.
				</Typography>
				<Box display="flex" justifyContent="space-evenly" mt={5}>
					<Typography mb={2} fontSize="25px">
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
						width="300px"
						options={studentsDataOptions}
						placeholder="Choose which Class"
						onChange={() => {}}
					/>
				</Box>
				<StudentsTable />
			</Box>
		</CustomLayout>
	);
};
