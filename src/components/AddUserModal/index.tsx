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
import { usersRoles, usersStatus } from 'mockup';
import { UserRole, UserStatus } from 'models';
import { addUserInitialValues, addUserValidationSchema } from './formikUtlis';
import { toast } from 'react-toastify';
import { useAddUser } from 'hooks';
import { theme } from 'theme';

interface EditUserModalProps {
	open: boolean;
	handleClose: () => void;
}
const styles = {
	usersModal: {
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
	usersModalMd: {
		width: '85%',
		margin: 'auto',
		maxHeight: '88vh',
	},
};

export const AddUserModal = ({ handleClose, open }: EditUserModalProps) => {
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: addUserInitialValues,
		validationSchema: addUserValidationSchema,
		onSubmit: (values) => {
			mutate({
				id: Math.random().toString(),
				firstName: values.firstName,
				lastName: values.lastName,
				email: values.email,
				phoneNumber: values.phoneNumber,
				role: values.role.label as UserRole,
				status: values.status.value as UserStatus,
				lastLogin: new Date().toLocaleDateString(),
			});
		},
	});
	const mdScreen = useMediaQuery(theme.breakpoints.down('md'));

	const {
		error: errorMessage,
		mutate,
		isError,
		isLoading,
	} = useAddUser({
		onSuccess: () => {
			handleClose();
			formik.resetForm();
			toast.success(<CustomToast title="User added successfully" />);
		},
		onError: (error) => {
			toast.error(
				<CustomToast
					title="Something went wrong"
					message={error.response?.data.message}
				/>
			);
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
					styles.usersModal,
					mdScreen ? styles.usersModalMd : null,
					{ bgcolor: 'background.default' },
				]}
			>
				<Stack direction="row" justifyContent="space-between">
					<Typography variant="h4" fontWeight="bold">
						Add User
					</Typography>
					{isError && (
						<Typography variant="h5" fontWeight="bold" color="red">
							{errorMessage?.response?.data.message}
						</Typography>
					)}
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
						<Grid item xs={12} sm={6}>
							<CustomSelect
								onChange={(e: { label: string; value: string }) => {
									formik.setFieldValue('role', e);
								}}
								options={usersRoles}
								withLabel
								label="Role"
								error={formik.touched.role && Boolean(formik.errors.role)}
								helperText={formik.touched.role && formik.errors.role?.label}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<CustomSelect
								onChange={(e: { label: string; value: string }) => {
									formik.setFieldValue('status', e);
								}}
								options={usersStatus}
								withLabel
								label="Status"
								error={formik.touched.status && Boolean(formik.errors.status)}
								helperText={
									formik.touched.status && formik.errors.status?.label
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
