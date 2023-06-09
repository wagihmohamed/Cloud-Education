import { Modal, Typography, Box, Grid, useMediaQuery } from '@mui/material';
import Stack from '@mui/material/Stack';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
	CustomTextField,
	CustomSelect,
	CustomButton,
	CustomToast,
} from 'components';
import { coursesCategoryOptions, courseStatus } from 'mockup';
import { useFormik } from 'formik';
import { CourseItem } from 'models';
import {
	editCourseInitialValues,
	editCourseStyles,
	editCourseValidationSchema,
} from './formikUtils';
import { toast } from 'react-toastify';
import { useEditCourse, useGetCoursesCode } from 'hooks';
import { theme } from 'theme';
import { transformCoursesList } from 'utlis';

interface EditCourseModalProps {
	open: boolean;
	handleClose: () => void;
	editedCourse: CourseItem;
}

export const EditCourseModal = ({
	handleClose,
	open,
	editedCourse,
}: EditCourseModalProps) => {
	const {
		data: coursesList = {
			data: [],
			status: '',
		},
		isLoading: isCoursesListLoading,
	} = useGetCoursesCode(editedCourse.code);

	const { mutate: editCourse, isLoading } = useEditCourse({
		onSuccess: () => {
			formik.resetForm();
			handleClose();
		},
		onError: (err) => {
			toast.error(
				<CustomToast
					title="Something went wrong"
					message={err?.response?.data?.message || 'Please try again later'}
				/>
			);
		},
	});
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: editCourseInitialValues(editedCourse),
		validationSchema: editCourseValidationSchema,
		onSubmit: (values) => {
			editCourse({
				name: values.courseName,
				category: values.category.label,
				description: values.description,
				isActive: values.courseStatus.value,
				code: values.courseCode,
				prerequisites: values.prerequisites.map((item) => item.value),
			});
		},
	});

	const handleCloseModal = () => {
		handleClose();
		formik.resetForm();
	};
	const mdScreen = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box
				sx={[
					editCourseStyles.courseModal,
					mdScreen ? editCourseStyles.courseModalMd : null,
				]}
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
						<Grid item xs={12} sm={6}>
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
						<Grid item xs={12} sm={6}>
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
						<Grid item xs={12} sm={6}>
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
						<Grid item xs={12} sm={6}>
							<CustomSelect
								onChange={(e: { label: string; value: string }) => {
									formik.setFieldValue('courseStatus', {
										label: e.label,
										value: e.label === 'Active',
									});
								}}
								value={
									formik.values.courseStatus.value
										? {
												label: 'Active',
												value: 'Active',
										  }
										: {
												label: 'Inactive',
												value: 'Inactive',
										  }
								}
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
						<Grid item xs={12} sm={6}>
							<CustomTextField
								value={formik.values.courseCode}
								id="courseCode"
								name="courseCode"
								disabled
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
						<Grid item xs={12} sm={6}>
							<CustomSelect
								isMulti
								isLoading={isCoursesListLoading}
								onChange={(e: { label: string; value: string }) => {
									formik.setFieldValue('prerequisites', e);
								}}
								value={formik.values.prerequisites}
								options={transformCoursesList(coursesList.data)}
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
						<CustomButton
							loading={isLoading}
							loadingButton
							type="submit"
							fullWidth
							color="error"
						>
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
