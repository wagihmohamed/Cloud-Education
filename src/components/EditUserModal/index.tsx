import {
	Box,
	Modal,
	Stack,
	Typography,
	Grid,
	useMediaQuery,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {
	CustomButton,
	CustomSelect,
	CustomTextField,
	CustomToast,
} from 'components';
import { useFormik } from 'formik';
import { usersRoles } from 'mockup';
import { UserItem } from 'models';
import {
	editUserInitialValues,
	editUserValidationSchema,
	editUserstyles,
} from './formikUtils';
import { toast } from 'react-toastify';
import { theme } from 'theme';

interface EditUserModalProps {
	open: boolean;
	handleClose: () => void;
	editedUser: UserItem;
}

export const EditUserModal = ({
	handleClose,
	open,
	editedUser,
}: EditUserModalProps) => {
	const mdScreen = useMediaQuery(theme.breakpoints.down('md'));
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: editUserInitialValues(editedUser),
		validationSchema: editUserValidationSchema,
		onSubmit: () => {
			toast.success(<CustomToast title="User edited successfully" />);
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
				sx={[
					editUserstyles.usersModal,
					mdScreen ? editUserstyles.usersModalMd : null,
				]}
			>
				<Stack direction="row" justifyContent="space-between">
					<Typography variant="h4" fontWeight="bold">
						Edit User
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
								name="first name"
								onChange={formik.handleChange}
								withLabel
								label="First Name"
								error={
									formik.touched.firstName && Boolean(formik.errors.firstName)
								}
								helperText={formik.touched.firstName && formik.errors.firstName}
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
						<Grid item xs={12} sm={12}>
							<CustomSelect
								onChange={(e: { label: string; value: string }) => {
									formik.setFieldValue('role', e);
								}}
								options={usersRoles}
								value={formik.values.role}
								disabled={formik.values.role.value === 'ADMIN'}
								withLabel
								label="Role"
								error={formik.touched.role && Boolean(formik.errors.role)}
								helperText={formik.touched.role && formik.errors.role?.label}
							/>
						</Grid>
						{/* <Grid item xs={12} sm={6}>
							<CustomSelect
								onChange={(e: { label: string; value: string }) => {
									formik.setFieldValue('status', e);
								}}
								options={usersStatus}
								value={formik.values.status}
								withLabel
								label="Status"
								error={formik.touched.status && Boolean(formik.errors.status)}
								helperText={
									formik.touched.status && formik.errors.status?.label
								}
							/>
						</Grid> */}
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
