import { useState } from 'react';
import { coursesTableColumns } from 'mockup';
import { Stack } from '@mui/system';
import {
	DoDisturbOnOutlined,
	HighlightOffOutlined,
	SettingsOutlined,
	PeopleAltOutlined,
	CheckCircleOutlineOutlined,
} from '@mui/icons-material';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
	Pagination,
	TableContainer,
} from '@mui/material';
import { CoursesBody } from 'models';
import {
	CustomTableCell,
	CustomTableRow,
	CustomToast,
	EditCourseModal,
	LoadingErrorPlaceholder,
} from 'components';
import { useNavigate } from 'react-router-dom';
import { useCoursesList, useDeleteCourse, useEditCourse } from 'hooks';
import { toast } from 'react-toastify';

interface CoursesTableProps {
	setSelectedCourse: React.Dispatch<React.SetStateAction<CoursesBody>>;
	selectedCourse: CoursesBody;
}

export const CoursesTable = ({
	selectedCourse,
	setSelectedCourse,
}: CoursesTableProps) => {
	const { data: courses = [], isLoading, isError } = useCoursesList();

	const { mutate, isLoading: isEditing } = useEditCourse({
		onSuccess: () => {
			toast.success(<CustomToast title="Status Changed successfully" />);
		},
		onError: (err) => {
			<CustomToast
				title="Something went wrong"
				message={err?.response?.data?.message || 'Please try again later'}
			/>;
		},
	});

	const { mutate: deleteCourse, isLoading: isDeleting } = useDeleteCourse({
		onSuccess: () => {
			toast.success(<CustomToast title="Course Deleted successfully" />);
		},
		onError: (err) => {
			<CustomToast
				title="Something went wrong"
				message={err?.response?.data?.message || 'Please try again later'}
			/>;
		},
	});

	const disableActions = isEditing || isDeleting;
	const [isEditCourseOpen, setIsEditCourseOpen] = useState(false);
	const navigate = useNavigate();

	const handleDeleteCourse = (id: string) => {
		if (disableActions) return;
		deleteCourse(id);
	};
	const handleToggleStatus = (editedCourse: CoursesBody) => {
		mutate({
			...editedCourse,
			status: editedCourse.status === 'active' ? 'inactive' : 'active',
		});
	};

	const handleNavigate = (id: string) => {
		if (disableActions) return;
		navigate(`${id}`);
	};

	const handleShowEditCourse = (course: CoursesBody) => {
		if (disableActions) return;
		setSelectedCourse(course);
		setIsEditCourseOpen(true);
	};

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
							opacity: disableActions ? 0.5 : 1,
							cursor: disableActions ? 'not-allowed' : 'pointer',
						}}
					>
						<TableHead
							sx={{
								backgroundColor: 'primary.main',
							}}
						>
							<TableRow>
								{coursesTableColumns.map((column) => (
									<TableCell
										sx={{
											color: 'white',
											textAlign: 'center',
											border: '4px solid white',
											cursor: disableActions ? 'not-allowed' : 'auto',
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
							{courses.length === 0 ? (
								<TableRow>
									<CustomTableCell colSpan={12}>
										<Typography variant="h4" fontWeight="bold">
											No courses found
										</Typography>
									</CustomTableCell>
								</TableRow>
							) : (
								courses.map((row) => (
									<CustomTableRow key={row.id}>
										<CustomTableCell
											cursor={disableActions ? 'not-allowed' : 'pointer'}
											onClick={() => {
												handleNavigate(row.id);
											}}
										>
											{row.courseName}
										</CustomTableCell>
										<CustomTableCell
											cursor={disableActions ? 'not-allowed' : 'pointer'}
											onClick={() => {
												handleNavigate(row.id);
											}}
										>
											{row.category}
										</CustomTableCell>
										<CustomTableCell
											cursor={disableActions ? 'not-allowed' : 'pointer'}
											onClick={() => {
												handleNavigate(row.id);
											}}
										>
											{row.lastUpdated}
										</CustomTableCell>
										<CustomTableCell
											cursor={disableActions ? 'not-allowed' : 'pointer'}
											onClick={() => {
												handleNavigate(row.id);
											}}
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
													onClick={() => {
														handleShowEditCourse(row);
													}}
													cursor={disableActions ? 'not-allowed' : 'pointer'}
													color="primary"
												/>
												<HighlightOffOutlined
													sx={{
														height: '30px',
														width: '30px',
													}}
													onClick={() => handleDeleteCourse(row.id)}
													cursor={disableActions ? 'not-allowed' : 'pointer'}
													color="primary"
												/>
												{row.status === 'active' ? (
													<DoDisturbOnOutlined
														sx={{
															height: '30px',
															width: '30px',
														}}
														onClick={() => {
															if (!isEditing) {
																handleToggleStatus(row);
															}
														}}
														cursor={disableActions ? 'not-allowed' : 'pointer'}
														color="primary"
													/>
												) : (
													<CheckCircleOutlineOutlined
														sx={{
															height: '30px',
															width: '30px',
														}}
														onClick={() => {
															if (!isEditing) {
																handleToggleStatus(row);
															}
														}}
														cursor={disableActions ? 'not-allowed' : 'pointer'}
														color="primary"
													/>
												)}
												<PeopleAltOutlined
													sx={{
														height: '30px',
														width: '30px',
													}}
													cursor={disableActions ? 'not-allowed' : 'pointer'}
													color="primary"
												/>
											</Stack>
										</CustomTableCell>
									</CustomTableRow>
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>
				{courses.length > 0 && (
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
				<EditCourseModal
					editedCourse={selectedCourse}
					handleClose={() => {
						setIsEditCourseOpen(false);
					}}
					open={isEditCourseOpen}
				/>
			</LoadingErrorPlaceholder>
		</>
	);
};
