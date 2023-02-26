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
} from '@mui/material';
import { CoursesBody } from 'models';
import { CustomTableCell, CustomTableRow, EditCourseModal } from 'components';
import { useNavigate } from 'react-router-dom';

interface CoursesTableProps {
	coursesData: CoursesBody[];
	setCoursesData: React.Dispatch<React.SetStateAction<CoursesBody[]>>;
	setSelectedCourse: React.Dispatch<React.SetStateAction<CoursesBody>>;
	selectedCourse: CoursesBody;
}

export const CoursesTable = ({
	coursesData,
	selectedCourse,
	setSelectedCourse,
	setCoursesData,
}: CoursesTableProps) => {
	const [isEditCourseOpen, setIsEditCourseOpen] = useState(false);
	const navigate = useNavigate();
	const handleDeleteCourse = (id: string) => {
		setCoursesData((prev) => prev.filter((course) => course.id !== id));
	};
	const handleToggleStatus = (id: string) => {
		setCoursesData((prev) =>
			prev.map((course) => {
				if (course.id === id) {
					return {
						...course,
						status: course.status === 'active' ? 'inactive' : 'active',
					};
				}
				return course;
			})
		);
	};
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
						{coursesTableColumns.map((column) => (
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
					{coursesData.length === 0 ? (
						<TableRow>
							<CustomTableCell colSpan={12}>
								<Typography variant="h4" fontWeight="bold">
									No courses found
								</Typography>
							</CustomTableCell>
						</TableRow>
					) : (
						coursesData.map((row) => (
							<CustomTableRow key={row.id}>
								<CustomTableCell
									cursor="pointer"
									onClick={() => {
										navigate(`/courses/${row.id}`);
									}}
								>
									{row.courseName}
								</CustomTableCell>
								<CustomTableCell>{row.category}</CustomTableCell>
								<CustomTableCell>{row.lastUpdated}</CustomTableCell>
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
											onClick={() => {
												setIsEditCourseOpen(true);
												setSelectedCourse(row);
											}}
											cursor="pointer"
											color="primary"
										/>
										<HighlightOffOutlined
											sx={{
												height: '30px',
												width: '30px',
											}}
											onClick={() => handleDeleteCourse(row.id)}
											cursor="pointer"
											color="primary"
										/>
										{row.status === 'active' ? (
											<DoDisturbOnOutlined
												sx={{
													height: '30px',
													width: '30px',
												}}
												onClick={() => handleToggleStatus(row.id)}
												cursor="pointer"
												color="primary"
											/>
										) : (
											<CheckCircleOutlineOutlined
												sx={{
													height: '30px',
													width: '30px',
												}}
												onClick={() => handleToggleStatus(row.id)}
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
			{coursesData.length > 0 && (
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
				handleSave={setCoursesData}
				editedCourse={selectedCourse}
				handleClose={() => {
					setIsEditCourseOpen(false);
				}}
				open={isEditCourseOpen}
			/>
		</>
	);
};
