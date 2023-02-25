import { useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
	Stack,
	Pagination,
} from '@mui/material';
import {
	DoDisturbOnOutlined,
	HighlightOffOutlined,
	SettingsOutlined,
	PeopleAltOutlined,
	CheckCircleOutlineOutlined,
} from '@mui/icons-material';
import {
	CustomTableCell,
	CustomTableRow,
} from 'components/MUIStyledComponents/CustomTableCell';
import { usersData, userTableColumns } from 'mockup';
import { EditUserModal } from 'components';
import { User } from 'models';

export const UsersTable = () => {
	const [usersBodyData, setUsersBodyData] = useState<User[]>(usersData);
	const [isEditUserOpen, setIsEditUserOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<User>({} as User);
	return (
		<>
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
						{userTableColumns.map((column) => (
							<TableCell
								sx={{
									color: 'white',
									textAlign: 'center',
									border: '4px solid white',
								}}
								key={column.id}
							>
								<Typography fontSize="20px" fontWeight="bold" variant="h4">
									{column.label}
								</Typography>
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{usersBodyData.length === 0 ? (
						<TableRow>
							<CustomTableCell colSpan={12}>
								<Typography variant="h4" fontWeight="bold">
									No Users found
								</Typography>
							</CustomTableCell>
						</TableRow>
					) : (
						usersBodyData.map((row) => (
							<CustomTableRow key={row.id}>
								<CustomTableCell>
									{row.firstName} {row.lastName}
								</CustomTableCell>
								<CustomTableCell>{row.role}</CustomTableCell>
								<CustomTableCell>{row.lastLogin}</CustomTableCell>
								<CustomTableCell
									color={row.status === 'active' ? '#6aa84f' : '#FF0000'}
								>
									{row.status}
								</CustomTableCell>
								<CustomTableCell width="200px">
									<Stack direction="row" justifyContent="space-around">
										<SettingsOutlined
											sx={{
												height: '30px',
												width: '30px',
											}}
											cursor="pointer"
											color="primary"
											onClick={() => {
												setIsEditUserOpen(true);
												setSelectedUser(row);
											}}
										/>
										<HighlightOffOutlined
											sx={{
												height: '30px',
												width: '30px',
											}}
											cursor="pointer"
											color="primary"
										/>
										{row.status === 'active' ? (
											<DoDisturbOnOutlined
												sx={{
													height: '30px',
													width: '30px',
												}}
												cursor="pointer"
												color="primary"
											/>
										) : (
											<CheckCircleOutlineOutlined
												sx={{
													height: '30px',
													width: '30px',
												}}
												cursor="pointer"
												color="primary"
											/>
										)}
										<PeopleAltOutlined
											sx={{
												height: '30px',
												width: '30px',
											}}
											cursor="pointer"
											color="primary"
										/>
									</Stack>
								</CustomTableCell>
							</CustomTableRow>
						))
					)}
				</TableBody>
			</Table>
			{usersBodyData.length > 0 && (
				<Pagination
					page={1}
					count={10}
					sx={{
						mt: 4,
						display: 'flex',
						justifyContent: 'center',
					}}
				/>
			)}
			<EditUserModal
				open={isEditUserOpen}
				editedUser={selectedUser}
				handleSave={setUsersBodyData}
				handleClose={() => setIsEditUserOpen(false)}
			/>
		</>
	);
};
