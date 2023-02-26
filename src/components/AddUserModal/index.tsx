import { Box, Modal, Stack, Typography, Grid } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { CustomButton, CustomSelect, CustomTextField } from 'components';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { usersRoles, usersStatus } from 'mockup';
import { User, UserRole, UserStatus } from 'models';

interface EditUserModalProps {
	open: boolean;
	handleClose: () => void;
	handleSave: React.Dispatch<React.SetStateAction<User[]>>;
}

export const AddUserModal = ({
	handleClose,
	open,
	handleSave,
}: EditUserModalProps) => {
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: '',
			role: {
				value: '',
				label: '',
			},
			status: {
				value: '',
				label: '',
			},
		},
		validationSchema: yup.object({
			firstName: yup.string().required('First name is required'),
			lastName: yup.string().required('Last name is required'),
			email: yup
				.string()
				.email('Invalid E-mail format')
				.required('Email is required'),
			phoneNumber: yup.string().required('Phone number is required'),
			role: yup
				.object({
					value: yup.string().required('Role is required'),
					label: yup.string().required('Role is required'),
				})
				.required('Role is required'),
			status: yup
				.object({
					value: yup.string().required('Status is required'),
					label: yup.string().required('Status is required'),
				})
				.required('Status is required'),
		}),
		onSubmit: () => {
			handleSave((prev) => {
				return [
					...prev,
					{
						id: (prev.length + 1).toString(),
						firstName: formik.values.firstName,
						lastName: formik.values.lastName,
						email: formik.values.email,
						phoneNumber: formik.values.phoneNumber,
						role: formik.values.role.value as UserRole,
						status: formik.values.status.value as UserStatus,
						lastLogin: new Date().toLocaleDateString(),
					},
				];
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
						Add User
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
						<Grid item xs={6}>
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
						<Grid item xs={6}>
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
						<Grid item xs={6}>
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
						<Grid item xs={6}>
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
						<Grid item xs={6}>
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
						<Grid item xs={6}>
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
