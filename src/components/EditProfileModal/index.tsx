import { useState } from 'react';
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
import { UserInfo, UserRole } from 'models';
import { usersRoles } from 'mockup';
import { allLevels } from 'mockup/allLevels';
import {
	ConfirmPasswordModal,
	CustomButton,
	CustomSelect,
	CustomTextField,
	CustomToast,
} from 'components';
import {
	editProfileInitialValues,
	editProfileValidationSchema,
} from './formikUtils';
import { toast } from 'react-toastify';
import { theme } from 'theme';

interface EditProfileModalProps {
	open: boolean;
	handleClose: () => void;
	handleSave: React.Dispatch<React.SetStateAction<UserInfo>>;
	editedProfile: UserInfo;
}
const styles = {
	profileForm: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		border: '3px solid #000',
		bgcolor: 'background.paper',
		borderRadius: '10px',
		boxShadow: 24,
		p: 4,
		width: '800px',
		maxHeight: '100vh',
		overflow: 'auto',
		maxWidth: '100%',
		'&::-webkit-scrollbar': {
			width: '0.4em',
			background: 'transparent',
		},
	},
	profileFormMd: {
		width: '85%',
		margin: 'auto',
		maxHeight: '88vh',
	},
};
export const EditProfileModal = ({
	handleClose,
	handleSave,
	open,
	editedProfile,
}: EditProfileModalProps) => {
	const [openConfirmPasswordModal, setOpenConfirmPasswordModal] =
		useState(false);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: editProfileInitialValues(editedProfile),
		validationSchema: editProfileValidationSchema,
		onSubmit: () => {
			setOpenConfirmPasswordModal(true);
		},
	});
	const handleSaveProfile = () => {
		handleSave((prev) => ({
			...prev,
			firstName: formik.values.firstName,
			lastName: formik.values.lastName,
			phoneNumber: formik.values.phoneNumber,
			email: formik.values.email,
			GPA: formik.values.GPA,
			role: formik.values.role.label as UserRole,
			currentLevel: formik.values.currentLevel.label,
			creditHours: formik.values.creditHours,
		}));
		toast.success(<CustomToast title="Profile edited successfully" />);
		handleCloseModal();
	};
	const mdScreen = useMediaQuery(theme.breakpoints.down('md'));
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
				<Box sx={[styles.profileForm, mdScreen ? styles.profileFormMd : null]}>
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
									error={
										formik.touched.phoneNumber &&
										Boolean(formik.errors.phoneNumber)
									}
									helperText={
										formik.touched.phoneNumber && formik.errors.phoneNumber
									}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<CustomSelect
									onChange={(e: { label: string; value: string }) => {
										formik.setFieldValue('role', e);
									}}
									options={usersRoles}
									value={formik.values.role}
									withLabel
									label="Role"
									error={formik.touched.role && Boolean(formik.errors.role)}
									helperText={formik.touched.role && formik.errors.role?.label}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<CustomSelect
									onChange={(e: { label: string; value: string }) => {
										formik.setFieldValue('currentLevel', e);
									}}
									options={allLevels}
									value={formik.values.currentLevel}
									withLabel
									label="Current Level"
									error={
										formik.touched.currentLevel &&
										Boolean(formik.errors.currentLevel)
									}
									helperText={
										formik.touched.currentLevel &&
										formik.errors.currentLevel?.label
									}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<CustomTextField
									value={formik.values.GPA}
									id="GPA"
									name="GPA"
									onChange={formik.handleChange}
									withLabel
									label="GPA"
									error={formik.touched.GPA && Boolean(formik.errors.GPA)}
									helperText={formik.touched.GPA && formik.errors.GPA}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<CustomTextField
									value={formik.values.creditHours}
									id="creditHours"
									name="creditHours"
									onChange={formik.handleChange}
									withLabel
									label="Credit Hours"
									error={
										formik.touched.creditHours &&
										Boolean(formik.errors.creditHours)
									}
									helperText={
										formik.touched.creditHours && formik.errors.creditHours
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
			<ConfirmPasswordModal
				open={openConfirmPasswordModal}
				handleClose={() => setOpenConfirmPasswordModal(false)}
				handleSubmit={handleSaveProfile}
			/>
		</>
	);
};
