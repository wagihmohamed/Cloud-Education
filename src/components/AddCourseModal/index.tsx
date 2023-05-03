import React from 'react';
import { Box, Grid, Modal, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
	CustomTextField,
	CustomSelect,
	CustomButton,
	CustomToast,
} from 'components';
import { allCourses, coursesCategoryOptions, courseStatus } from 'mockup';
import { CoursesBody } from 'models';
import { toast } from 'react-toastify';
import {
	addCourseInitialValues,
	addedCourseValidationSchema,
} from './formikUtlis';
import { useAddCourse } from 'hooks';

interface AddCourseModalProps {
	open: boolean;
	handleClose: () => void;
	setCourses: React.Dispatch<React.SetStateAction<CoursesBody[]>>;
}

export const AddCourseModal = ({ handleClose, open }: AddCourseModalProps) => {
	const formik = useFormik({
		initialValues: addCourseInitialValues,
		validationSchema: addedCourseValidationSchema,
		onSubmit: (values) => {
			mutate({
				id: Math.random().toString(),
				courseName: values.courseName,
				category: values.category.label,
				description: values.description,
				courseCode: values.courseCode,
				prerequisites: values.prerequisites.map((prerequisite) => {
					return prerequisite.value;
				}),
				categoryId: values.category.value,
				lastUpdated: new Date().toLocaleDateString(),
				status: values.courseStatus.value === 'active' ? 'active' : 'inactive',
			});
		},
	});

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
