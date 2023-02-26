import { Modal, Typography, Box, Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { CustomTextField, CustomSelect, CustomButton } from 'components';
import { allCourses, coursesCategoryOptions, courseStatus } from 'mockup';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { CoursesBody } from 'models';

interface EditCourseModalProps {
	open: boolean;
	handleClose: () => void;
	editedCourse: CoursesBody;
	handleSave: React.Dispatch<React.SetStateAction<CoursesBody[]>>;
}

export const EditCourseModal = ({
	handleClose,
	open,
	editedCourse,
	handleSave,
}: EditCourseModalProps) => {
	const selectedPreequisites = allCourses.filter((course) =>
		editedCourse?.prerequisites?.includes(course.value)
	);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			courseName: editedCourse?.courseName || '',
			category: {
				value: editedCourse?.category || '',
				label: editedCourse?.category || '',
			},
			description: editedCourse?.description || '',
			courseStatus: {
				value: editedCourse?.status || '',
				label: editedCourse?.status || '',
			},
			courseCode: editedCourse?.courseCode || '',
			prerequisites: selectedPreequisites,
		},
		validationSchema: yup.object({
			courseName: yup.string().required('Course name is required'),
			category: yup
				.object({
					value: yup.string().required('Category is required'),
					label: yup.string().required('Category is required'),
				})
				.required('Category is required'),
			description: yup.string().required('Description is required'),
			courseStatus: yup
				.object({
					value: yup.string().required('Course status is required'),
					label: yup.string().required('Course status is required'),
				})
				.required('Course status is required'),
			courseCode: yup.string().required('Course code is required'),
			prerequisites: yup.array().of(
				yup.object({
					value: yup.string().required('Prerequisite is required'),
					label: yup.string().required('Prerequisite is required'),
				})
			),
		}),
		onSubmit: (values) => {
			handleSave((prev) => {
				const newCourses = prev.map((course) => {
					if (course.courseCode === editedCourse.courseCode) {
						return {
							...course,
							courseName: values.courseName,
							category: values.category.label,
							description: values.description,
							status: values.courseStatus.label,
							courseCode: values.courseCode,
							prerequisites: values.prerequisites.map(
								(prerequisite) => prerequisite.value
							),
						};
					}
					return course;
				});
				return newCourses;
			});
			handleClose();
		},
	});

	const handleCloseModal = () => {
		handleClose();
		formik.resetForm();
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: '800px',
					bgcolor: 'background.paper',
					boxShadow: 24,
					p: 4,
					borderRadius: '10px',
					border: '3px solid #000',
					overflow: 'hidden',
				}}
			>
				<Stack direction="row" justifyContent="space-between">
					<Typography variant="h4" fontWeight="bold">
						Edit Course
					</Typography>
					<CloseOutlinedIcon
						onClick={handleCloseModal}
						sx={{
							width: '30px',
							height: '30px',
							cursor: 'pointer',
							mt: 1,
						}}
					/>
				</Stack>
				<form onSubmit={formik.handleSubmit}>
					<Grid
						container
						mt={4}
						alignItems="center"
						columnSpacing="60px"
						rowSpacing="20px"
					>
						<Grid item xs={6}>
							<CustomTextField
								value={formik.values.courseName}
								id="courseName"
								name="courseName"
								onChange={formik.handleChange}
								withLabel
								label="Course Name"
								error={
									formik.touched.courseName && Boolean(formik.errors.courseName)
								}
								helperText={
									formik.touched.courseName && formik.errors.courseName
								}
							/>
						</Grid>
						<Grid item xs={6}>
							<CustomSelect
								onChange={(e: { label: string; value: string }) => {
									formik.setFieldValue('category', e);
								}}
								value={formik.values.category}
								options={coursesCategoryOptions}
								withLabel
								label="Category"
								error={
									formik.touched.category && Boolean(formik.errors.category)
								}
								helperText={
									formik.touched.category && formik.errors.category?.label
								}
							/>
						</Grid>
						<Grid item xs={6}>
							<CustomTextField
								value={formik.values.description}
								id="description"
								name="description"
								onChange={formik.handleChange}
								multiline
								rows={5}
								withLabel
								label="Description"
								error={
									formik.touched.description &&
									Boolean(formik.errors.description)
								}
								helperText={
									formik.touched.description && formik.errors.description
								}
							/>
						</Grid>
						<Grid item xs={6}>
							<CustomSelect
								onChange={(e: { label: string; value: string }) => {
									formik.setFieldValue('courseStatus', e);
								}}
								value={formik.values.courseStatus}
								options={courseStatus}
								withLabel
								label="Status"
								error={
									formik.touched.courseStatus &&
									Boolean(formik.errors.courseStatus)
								}
								helperText={
									formik.touched.courseStatus &&
									formik.errors.courseStatus?.label
								}
							/>
						</Grid>
						<Grid item xs={6}>
							<CustomTextField
								value={formik.values.courseCode}
								id="courseCode"
								name="courseCode"
								onChange={formik.handleChange}
								withLabel
								label="Course Code"
								error={
									formik.touched.courseCode && Boolean(formik.errors.courseCode)
								}
								helperText={
									formik.touched.courseCode && formik.errors.courseCode
								}
							/>
						</Grid>
						<Grid item xs={6}>
							<CustomSelect
								isMulti
								onChange={(e: { label: string; value: string }) => {
									formik.setFieldValue('prerequisites', e);
								}}
								value={formik.values.prerequisites}
								options={allCourses}
								withLabel
								label="Prerequisites"
								error={
									formik.touched.prerequisites &&
									Boolean(formik.errors.prerequisites)
								}
								helperText={
									formik.touched.prerequisites &&
									formik.errors.prerequisites &&
									"Prerequisite can't be empty"
								}
							/>
						</Grid>
					</Grid>
					<Stack direction="row" gap={10} justifyContent="space-between" mt={4}>
						<CustomButton type="submit" fullWidth color="error">
							Submit
						</CustomButton>
						<CustomButton
							onClick={handleCloseModal}
							type="button"
							color="warning"
							fullWidth
							warning
						>
							Cancel
						</CustomButton>
					</Stack>
				</form>
			</Box>
		</Modal>
	);
};
