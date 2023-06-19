import {
	Box,
	Grid,
	Modal,
	Stack,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { useFormik } from 'formik';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
	CustomTextField,
	CustomSelect,
	CustomButton,
	CustomToast,
} from 'components';
import { coursesCategoryOptions, courseStatus } from 'mockup';
import { toast } from 'react-toastify';
import {
	addCoursStyles,
	addCourseInitialValues,
	addedCourseValidationSchema,
} from './formikUtlis';
import { useAddCourse, useGetCoursesCode } from 'hooks';
import { theme } from 'theme';
import { transformCoursesList } from 'utlis';

interface AddCourseModalProps {
	open: boolean;
	handleClose: () => void;
}

export const AddCourseModal = ({ handleClose, open }: AddCourseModalProps) => {
	const mdScreen = useMediaQuery(theme.breakpoints.down('md'));
	const {
		data: coursesList = {
			data: [],
			status: '',
		},
		isLoading: isCoursesListLoading,
	} = useGetCoursesCode();
	const { mutate, isLoading } = useAddCourse({
		onSuccess: () => {
			toast.success(<CustomToast title="Course added successfully" />);
			formik.resetForm();
			handleCloseModal();
		},
		onError: () => {
			toast.error(<CustomToast title="Something went wrong" />);
		},
	});

	const formik = useFormik({
		initialValues: addCourseInitialValues,
		validationSchema: addedCourseValidationSchema,
		onSubmit: (values) => {
			mutate({
				category: values.category.value,
				code: values.courseCode,
				description: values.description,
				name: values.courseName,
				isActive: values.courseStatus.value,
				prerequisites:
					values.prerequisites.length === 1 &&
					values.prerequisites[0].value === ''
						? []
						: values.prerequisites.map((item) => item.value),
			});
		},
	});

	const handleCloseModal = () => {
		handleClose();
		formik.resetForm();
	};

	return (
		<Modal
			open={open}
			onClose={handleCloseModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box
				sx={[
					addCoursStyles.courseModal,
					mdScreen ? addCoursStyles.courseModalMd : null,
				]}
			>
				<Stack direction="row" justifyContent="space-between">
					<Typography variant="h4" fontWeight="bold">
						Add Course
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
									'Prerequisites is required'
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
