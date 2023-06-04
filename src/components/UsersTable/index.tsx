/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
	TableContainer,
} from '@mui/material';
import { Delete, PeopleAltOutlined, Edit } from '@mui/icons-material';
import { userTableColumns } from 'mockup';
import {
	EditUserModal,
	CustomTableCell,
	CustomTableRow,
	LoadingErrorPlaceholder,
} from 'components';
import { UserItem } from 'models';
import { useDeleteUser, useUsersList } from 'hooks';

export const UsersTable = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const {
		data: users = {
			data: [],
			page: 1,
			pagesCount: 1,
			status: '',
		},
		isLoading,
		isError,
	} = useUsersList(currentPage);
	const { mutate: deleteUser, isLoading: isDeleteLoading } = useDeleteUser({});
	const [isEditUserOpen, setIsEditUserOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState<UserItem>({} as UserItem);

	return (
		<>
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
							opacity: isDeleteLoading ? 0.5 : 1,
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
										<Typography
											color="white"
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
											No Users found
										</Typography>
									</CustomTableCell>
								</TableRow>
							) : (
								users.data.map((row) => (
									<CustomTableRow key={row.email}>
										<CustomTableCell>
											{row.firstName} {row.lastName}
										</CustomTableCell>
										<CustomTableCell>{row.role}</CustomTableCell>
										<CustomTableCell>{row.email}</CustomTableCell>
										<CustomTableCell>{row.phoneNumber}</CustomTableCell>
										<CustomTableCell width="170px">
											<Stack direction="row" justifyContent="space-around">
												<Edit
													sx={{
														height: '30px',
														width: '30px',
														color: 'text.primary',
													}}
													cursor="pointer"
													onClick={() => {
														setIsEditUserOpen(true);
														setSelectedUser(row);
													}}
												/>
												<Delete
													sx={{
														height: '30px',
														width: '30px',
														':hover': {
															color: '#d32f2f',
														},
													}}
													cursor="pointer"
													color="primary"
													onClick={() =>
														deleteUser({
															userId: row.id,
														})
													}
												/>
												<PeopleAltOutlined
													sx={{
														height: '30px',
														width: '30px',
													}}
													cursor="pointer"
												/>
											</Stack>
										</CustomTableCell>
									</CustomTableRow>
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>
				{users.data.length > 0 && (
					<Pagination
						page={users.page}
						count={users.pagesCount}
						onChange={(_, page) => setCurrentPage(page)}
						sx={{
							m: '1rem 2rem 2rem',
							display: 'flex',
							justifyContent: 'center',
						}}
					/>
				)}
				<EditUserModal
					open={isEditUserOpen}
					editedUser={selectedUser}
					handleClose={() => setIsEditUserOpen(false)}
				/>
			</LoadingErrorPlaceholder>
		</>
	);
};
