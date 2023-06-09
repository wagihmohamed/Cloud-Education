import {
	CustomButton,
	CustomTableCell,
	CustomTableRow,
	LoadingErrorPlaceholder,
} from 'components';
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { studentsTableHead } from 'mockup';
import { downloadPdf } from 'utlis';
import { theme } from 'theme';
import { useUsersList } from 'hooks';

export const StudentsTable = () => {
	const {
		data: users = {
			data: [],
			page: 1,
			pagesCount: 1,
			status: '',
		},
		isLoading,
		isError,
	} = useUsersList(1);

	return (
		<LoadingErrorPlaceholder
			height="50vh"
			isError={isError}
			isLoading={isLoading}
		>
			<Box
				sx={{
					mx: '2rem',
					mb: '10px',
					display: 'flex',
					alignItems: 'center',
					[theme.breakpoints.down('md')]: {
						justifyContent: 'flex-end',
					},
					[theme.breakpoints.down('sm')]: {
						flexDirection: 'column',
						gap: '1rem',
					},
				}}
			>
				<CustomButton
					px={4}
					onClick={() => {
						downloadPdf(
							'#students-table',
							'Students Attendance',
							'Ahmed Shalaby',
							'Internet of Things',
							false
						);
					}}
				>
					Download as PDF
				</CustomButton>
			</Box>
			<TableContainer sx={{ maxWidth: '100%', overflowX: 'auto' }}>
				<Table
					id="students-table"
					sx={{
						width: '100%',
						overflowY: 'auto',
						borderSpacing: '0 15px !important',
						borderCollapse: 'separate',
					}}
				>
					<TableHead
						sx={{
							backgroundColor: 'primary.main',
						}}
					>
						<TableRow>
							{studentsTableHead.map((column) => (
								<TableCell
									sx={{
										color: 'white',
										textAlign: 'center',
										border: '4px solid white',
									}}
									key={column.id}
								>
									<Typography
										color="#fff"
										fontSize="20px"
										fontWeight="bold"
										variant="h4"
									>
										{column.label}
									</Typography>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{users.data.length === 0 ? (
							<TableRow>
								<CustomTableCell colSpan={12}>
									<Typography variant="h4" fontWeight="bold">
										No Assigned Students found, Contact The Technical Team.
									</Typography>
								</CustomTableCell>
							</TableRow>
						) : (
							users.data
								.filter(
									(user) => user.role !== 'ADMIN' && user.role !== 'TEACHER'
								)
								.map((row, idx) => (
									<CustomTableRow hover={false} key={row.id}>
										<CustomTableCell>{idx + 1}</CustomTableCell>
										<CustomTableCell>
											{row.firstName} {row.lastName}
										</CustomTableCell>
										<CustomTableCell></CustomTableCell>
										<CustomTableCell></CustomTableCell>
										<CustomTableCell></CustomTableCell>
										<CustomTableCell></CustomTableCell>
										<CustomTableCell></CustomTableCell>
									</CustomTableRow>
								))
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</LoadingErrorPlaceholder>
	);
};
