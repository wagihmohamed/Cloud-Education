import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
	TableContainer,
} from '@mui/material';
import { LoadingErrorPlaceholder } from 'components/LoadingErrorPlaceholder';
import {
	CustomTableCell,
	CustomTableRow,
} from 'components/MUIStyledComponents/CustomTableCell';
import { useGetLeaderboard } from 'hooks';
import { leaderboardColumns } from 'mockup';

export const LeaderboardTable = () => {
	const {
		isLoading,
		isError,
		data: leaderboardData = {
			status: '',
			data: [],
		},
	} = useGetLeaderboard();
	return (
		<LoadingErrorPlaceholder
			height="50vh"
			isError={isError}
			isLoading={isLoading}
		>
			<TableContainer sx={{ maxWidth: '100%', overflowX: 'auto' }}>
				<Table
					sx={{
						mt: 4,
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
							{leaderboardColumns.map((column) => (
								<TableCell
									sx={{
										color: 'white',
										textAlign: 'center',
										border: '4px solid white',
									}}
									key={column.dataIndex}
								>
									<Typography
										color="white"
										fontSize="20px"
										fontWeight="bold"
										variant="h4"
									>
										{column.title}
									</Typography>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{leaderboardData.data.length === 0 ? (
							<TableRow>
								<CustomTableCell colSpan={12}>
									<Typography variant="h4" fontWeight="bold">
										No Users found
									</Typography>
								</CustomTableCell>
							</TableRow>
						) : (
							leaderboardData.data.map((row, idx) => (
								<CustomTableRow key={row.user.email}>
									<CustomTableCell>{idx + 1}</CustomTableCell>
									<CustomTableCell>
										{row.user.firstName} {row.user.lastName}
									</CustomTableCell>
									<CustomTableCell>{row.user.email}</CustomTableCell>
									<CustomTableCell>{row.points}</CustomTableCell>
								</CustomTableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</LoadingErrorPlaceholder>
	);
};
