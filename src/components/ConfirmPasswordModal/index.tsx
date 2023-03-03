import { Modal, Box, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { CustomTextField } from 'components/CustomTextField';
import { CustomButton } from 'components/CustomButton';

interface ConfirmPasswordModalProps {
	open: boolean;
	handleClose: () => void;
	handleSubmit: () => void;
}

export const ConfirmPasswordModal = ({
	handleClose,
	handleSubmit,
	open,
}: ConfirmPasswordModalProps) => {
	const fakePassword = '123456';
	const formik = useFormik({
		initialValues: {
			password: '',
		},
		validationSchema: yup.object({
			password: yup.string().required('Password is required'),
		}),
		onSubmit: () => {
			handleSaveChanged();
		},
	});

	const handleSaveChanged = () => {
		if (formik.values.password === fakePassword) {
			handleSubmit();
			handleClose();
		} else {
			formik.setErrors({ password: 'Wrong password' });
		}
	};
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
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: '700px',
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
						Confirm Password
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
					<Stack mt="20px" spacing={2}>
						<CustomTextField
							value={formik.values.password}
							onChange={formik.handleChange}
							id="password"
							name="password"
							label="Password"
							type="password"
							error={formik.touched.password && Boolean(formik.errors.password)}
							helperText={formik.touched.password && formik.errors.password}
						/>
					</Stack>
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
