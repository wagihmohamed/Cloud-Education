import {
	Box,
	Modal,
	Stack,
	Typography,
	Grid,
	useMediaQuery,
} from '@mui/material';
import { useFormik } from 'formik';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { UserItem } from 'models';
import { CustomButton, CustomTextField } from 'components';
import {
	editProfileInitialValues,
	editProfileValidationSchema,
	profileStyles,
} from './formikUtils';
import { theme } from 'theme';
import { useEditUser } from 'hooks';
import { useAuth } from 'zustandStore';
import { toast } from 'react-toastify';

interface EditProfileModalProps {
	open: boolean;
	handleClose: () => void;
	editedProfile: UserItem;
}

export const EditProfileModal = ({
	handleClose,
	open,
	editedProfile,
}: EditProfileModalProps) => {
	const mdScreen = useMediaQuery(theme.breakpoints.down('md'));
	const { mutate: editUser, isLoading: isEditLoading } = useEditUser({
		onSuccess: () => {
			handleCloseModal();
			formik.resetForm();
			toast.success('Profile updated successfully');
		},
		onError: (err) => {
			toast.error(err.response?.data?.message || 'Something went wrong');
		},
	});
	const { id: loggedUserId } = useAuth();
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: editProfileInitialValues(editedProfile),
		validationSchema: editProfileValidationSchema,
		onSubmit: (values) => {
			editUser({
				userId: loggedUserId,
				user: {
					firstName: values.firstName,
					lastName: values.lastName,
					phoneNumber: '+20' + values.phoneNumber.toString(),
					courses: editedProfile.courses.map((course) => course.code),
					role: editedProfile.role,
				},
			});
		},
	});

	const handleCloseModal = () => {
		handleClose();
		formik.resetForm();
	};

	return (
		<>
			<Modal
				open={open}
				onClose={handleCloseModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={[
						profileStyles.profileForm,
						mdScreen ? profileStyles.profileFormMd : null,
					]}
				>
					<Stack direction="row" justifyContent="space-between">
						<Typography variant="h4" fontWeight="bold">
							Edit Profile
						</Typography>
						<CloseOutlinedIcon
							sx={{
								width: '30px',
								height: '30px',
								cursor: 'pointer',
								mt: 1,
							}}
							onClick={handleCloseModal}
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
									value={formik.values.firstName}
									id="firstName"
									name="firstName"
									onChange={formik.handleChange}
									withLabel
									label="First Name"
									error={
										formik.touched.firstName && Boolean(formik.errors.firstName)
									}
									helperText={
										formik.touched.firstName && formik.errors.firstName
									}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<CustomTextField
									value={formik.values.lastName}
									id="lastName"
									name="lastName"
									onChange={formik.handleChange}
									withLabel
									label="Last Name"
									error={
										formik.touched.lastName && Boolean(formik.errors.lastName)
									}
									helperText={formik.touched.lastName && formik.errors.lastName}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<CustomTextField
									disabled={true}
									value={formik.values.email}
									id="email"
									name="email"
									onChange={formik.handleChange}
									withLabel
									label="Email"
									error={formik.touched.email && Boolean(formik.errors.email)}
									helperText={formik.touched.email && formik.errors.email}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<CustomTextField
									value={formik.values.phoneNumber}
									id="phoneNumber"
									name="phoneNumber"
									onChange={formik.handleChange}
									withLabel
									label="Phone Number"
									type="number"
									onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
										e.target.value = Math.max(0, parseInt(e.target.value))
											.toString()
											.slice(0, 10);
									}}
									InputProps={{
										startAdornment: (
											<Typography
												variant="subtitle1"
												fontSize="20px"
												fontWeight="500"
											>
												+20
											</Typography>
										),
									}}
									error={
										formik.touched.phoneNumber &&
										Boolean(formik.errors.phoneNumber)
									}
									helperText={
										formik.touched.phoneNumber && formik.errors.phoneNumber
									}
								/>
							</Grid>
						</Grid>
						<Stack
							direction="row"
							gap={10}
							justifyContent="space-between"
							mt={4}
						>
							<CustomButton
								loading={isEditLoading}
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
		</>
	);
};
