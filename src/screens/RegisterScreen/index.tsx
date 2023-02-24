import { Box, Grid, Typography } from '@mui/material';
import { CustomAuthContainer, CustomButton, CustomTextField } from 'components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { phoneRegExp } from 'utlis/phoneRegExp';
import { Link } from 'react-router-dom';

export const RegisterScreen = () => {
	const registerFormik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: Yup.object({
			firstName: Yup.string().required('Required'),
			lastName: Yup.string().required('Required'),
			email: Yup.string().email('Invalid email address').required('Required'),
			phoneNumber: Yup.string()
				.matches(phoneRegExp, 'Phone number is not valid')
				.required('Required'),
			password: Yup.string().min(4, 'Password must be +4').required('Required'),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref('password'), undefined], 'Passwords must match')
				.required('Required'),
		}),
		onSubmit: () => {},
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
				<form onSubmit={registerFormik.handleSubmit}>
					<Grid container spacing={2} rowSpacing="15px" columnSpacing="20px">
						<Grid item xs={12} sm={6}>
							<CustomTextField
								withLabel
								label="First Name"
								name="firstName"
								value={registerFormik.values.firstName}
								onChange={registerFormik.handleChange}
								error={
									registerFormik.touched.firstName &&
									Boolean(registerFormik.errors.firstName)
								}
								helperText={
									registerFormik.touched.firstName &&
									registerFormik.errors.firstName
								}
								placeholder="Enter Your First Name"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<CustomTextField
								withLabel
								label="Last Name"
								name="lastName"
								value={registerFormik.values.lastName}
								onChange={registerFormik.handleChange}
								error={
									registerFormik.touched.lastName &&
									Boolean(registerFormik.errors.lastName)
								}
								helperText={
									registerFormik.touched.lastName &&
									registerFormik.errors.lastName
								}
								placeholder="Enter Your last Name"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<CustomTextField
								withLabel
								label="E-mail"
								name="email"
								value={registerFormik.values.email}
								onChange={registerFormik.handleChange}
								error={
									registerFormik.touched.email &&
									Boolean(registerFormik.errors.email)
								}
								helperText={
									registerFormik.touched.email && registerFormik.errors.email
								}
								placeholder="Enter Your Email"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<CustomTextField
								withLabel
								label="Phone Number"
								name="phoneNumber"
								value={registerFormik.values.phoneNumber}
								onChange={registerFormik.handleChange}
								error={
									registerFormik.touched.phoneNumber &&
									Boolean(registerFormik.errors.phoneNumber)
								}
								helperText={
									registerFormik.touched.phoneNumber &&
									registerFormik.errors.phoneNumber
								}
								placeholder="Enter Your Phone Number"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<CustomTextField
								withLabel
								label="Password"
								name="password"
								value={registerFormik.values.password}
								onChange={registerFormik.handleChange}
								error={
									registerFormik.touched.password &&
									Boolean(registerFormik.errors.password)
								}
								helperText={
									registerFormik.touched.password &&
									registerFormik.errors.password
								}
								placeholder="Enter Your Password"
								type="password"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<CustomTextField
								withLabel
								label="Confirm Password"
								name="confirmPassword"
								value={registerFormik.values.confirmPassword}
								onChange={registerFormik.handleChange}
								error={
									registerFormik.touched.confirmPassword &&
									Boolean(registerFormik.errors.confirmPassword)
								}
								helperText={
									registerFormik.touched.confirmPassword &&
									registerFormik.errors.confirmPassword
								}
								placeholder="Confirm Your Password"
								type="password"
							/>
						</Grid>
						<Grid item xs={12}>
							<CustomButton type="submit" fullWidth py="15px" mt={3}>
								Sign Up
							</CustomButton>
						</Grid>
					</Grid>
				</form>
			</CustomAuthContainer>
			<CustomAuthContainer mt={10} px={2} py={2}>
				<Typography variant="h5" textAlign="center">
					Are you an organization?
					<Link to="/organization-register"> Register as Organization</Link>
				</Typography>
			</CustomAuthContainer>
		</Box>
	);
};
