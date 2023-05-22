import { Box, Typography } from '@mui/material';
import { useFormik } from 'formik';
import {
	CustomButton,
	CustomTextField,
	CustomAuthContainer,
	CustomToast,
} from 'components';
import * as Yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { orginizationLogin } from 'services/auth';
import { useAuth } from 'zustandStore';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { ApiError } from 'models';

export const LoginScreen = () => {
	const navigate = useNavigate();
	const { setToken } = useAuth();
	const { organizationId } = useParams();
	const { mutate: login, isLoading } = useMutation({
		mutationFn: () => {
			return orginizationLogin('BFCAI', {
				email: loginFormik.values.email,
				password: loginFormik.values.password,
			});
		},
		onSuccess: ({ token }) => {
			navigate(`/${organizationId}/home`, { replace: true });
			setToken(token);
			toast.success(<CustomToast title="Successfuly Login" />);
		},
		onError: (err: AxiosError<ApiError>) => {
			toast.error(
				<CustomToast title="Error Login" message={err.response?.data.message} />
			);
		},
	});

	const loginFormik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Invalid email address').required('Required'),
			password: Yup.string().min(4, 'Password must be +4').required('Required'),
		}),
		onSubmit: () => {
			login();
		},
	});

	return (
		<Box
			sx={{
				display: 'flex',
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
				flexDirection: 'column',
			}}
		>
			<CustomAuthContainer>
				<form onSubmit={loginFormik.handleSubmit}>
					<CustomTextField
						withLabel
						label="E-mail"
						name="email"
						value={loginFormik.values.email}
						onChange={loginFormik.handleChange}
						error={
							loginFormik.touched.email && Boolean(loginFormik.errors.email)
						}
						helperText={loginFormik.touched.email && loginFormik.errors.email}
						placeholder="Enter Your Email Address"
					/>
					<CustomTextField
						withLabel
						label="Password"
						name="password"
						value={loginFormik.values.password}
						onChange={loginFormik.handleChange}
						error={
							loginFormik.touched.password &&
							Boolean(loginFormik.errors.password)
						}
						helperText={
							loginFormik.touched.password && loginFormik.errors.password
						}
						placeholder="Enter Your Password"
						type="password"
					/>
					<CustomButton
						loading={isLoading}
						loadingButton
						type="submit"
						fullWidth
						mt="40px"
						py="15px"
					>
						Login
					</CustomButton>
				</form>
			</CustomAuthContainer>
			<CustomAuthContainer mt={10} px={2} py={2}>
				<Typography variant="h5" textAlign="center">
					Don't have an account? <Link to="/register">Register</Link>
				</Typography>
			</CustomAuthContainer>
		</Box>
	);
};
