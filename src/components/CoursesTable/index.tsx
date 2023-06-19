import { useState } from 'react';
import { coursesTableColumns } from 'mockup';
import {
	DoDisturbOnOutlined,
	SettingsOutlined,
	CheckCircleOutlineOutlined,
	DeleteOutlined,
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
	Stack,
	Rating,
} from '@mui/material';
import { CourseItem } from 'models';
import {
	CustomTableCell,
	CustomTableRow,
	CustomToast,
	EditCourseModal,
	LoadingErrorPlaceholder,
} from 'components';
import { useNavigate } from 'react-router-dom';
import { useCoursesList, useDeleteCourse, useEditCourse } from 'hooks';
import { handleFormateDate } from 'utlis';
import { useAuth } from 'zustandStore';

interface CoursesTableProps {
	setSelectedCourse: React.Dispatch<React.SetStateAction<CourseItem>>;
	selectedCourse: CourseItem;
}

export const CoursesTable = ({
	selectedCourse,
	setSelectedCourse,
}: CoursesTableProps) => {
	const { isTeacher } = useAuth();
	const [currentPage, setCurrentPage] = useState(1);
	const {
		data: courses = {
			data: [],
			status: '',
			page: 1,
			pagesCount: 1,
		},
		isLoading,
		isError,
	} = useCoursesList({
		page: currentPage,
	});

	const { mutate: toggleCourseStatus, isLoading: isEditing } = useEditCourse({
		onError: (err) => {
			<CustomToast
				title="Something went wrong"
				message={err?.response?.data?.message || 'Please try again later'}
			/>;
		},
	});

	const { mutate: deleteCourse, isLoading: isDeleting } = useDeleteCourse({
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

	const handleToggleStatus = (editedCourse: CourseItem) => {
		toggleCourseStatus({
			...editedCourse,
			prerequisites: editedCourse.prerequisites?.map(
				(prerequisite) => prerequisite.code
			),
			isActive: !editedCourse.isActive,
		});
	};

	const handleNavigate = (id: string) => {
		if (disableActions) return;
		navigate(`${id}`);
	};

	const handleShowEditCourse = (course: CourseItem) => {
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
							{courses.data.length === 0 ? (
								<TableRow>
									<CustomTableCell cursor="auto" colSpan={12}>
										<Typography variant="h4" fontWeight="bold">
											No courses found
										</Typography>
									</CustomTableCell>
								</TableRow>
							) : (
								courses.data.map((row) => (
									<CustomTableRow key={row.code}>
										<CustomTableCell
											cursor={disableActions ? 'not-allowed' : 'pointer'}
											onClick={() => {
												handleNavigate(row.code);
											}}
										>
											{row.name}
										</CustomTableCell>
										<CustomTableCell
											cursor={disableActions ? 'not-allowed' : 'pointer'}
											onClick={() => {
												handleNavigate(row.code);
											}}
										>
											{row.category}
										</CustomTableCell>
										<CustomTableCell
											cursor={disableActions ? 'not-allowed' : 'pointer'}
											onClick={() => {
												handleNavigate(row.code);
											}}
										>
											<Rating value={row.rating / 2} readOnly />
										</CustomTableCell>
										<CustomTableCell
											cursor={disableActions ? 'not-allowed' : 'pointer'}
											onClick={() => {
												handleNavigate(row.code);
											}}
										>
											{handleFormateDate(row.updatedAt)}
										</CustomTableCell>
										<CustomTableCell
											cursor={disableActions ? 'not-allowed' : 'pointer'}
											onClick={() => {
												handleNavigate(row.code);
											}}
											color={row.isActive ? '#6aa84f' : '#FF0000'}
										>
											{row.isActive ? 'Active' : 'Inactive'}
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
												{!isTeacher && (
													<DeleteOutlined
														sx={{
															height: '30px',
															width: '30px',
															':hover': {
																color: '#d32f2f',
															},
														}}
														color="primary"
														onClick={() => handleDeleteCourse(row.code)}
														cursor={disableActions ? 'not-allowed' : 'pointer'}
													/>
												)}
												{row.isActive === true && !isTeacher ? (
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
													!isTeacher && (
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
															cursor={
																disableActions ? 'not-allowed' : 'pointer'
															}
															color="primary"
														/>
													)
												)}
											</Stack>
										</CustomTableCell>
									</CustomTableRow>
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>
				{courses.data?.length > 0 && (
					<Pagination
						page={currentPage}
						count={courses.pagesCount}
						onChange={(_, value) => {
							if (disableActions) return;
							setCurrentPage(value);
						}}
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
