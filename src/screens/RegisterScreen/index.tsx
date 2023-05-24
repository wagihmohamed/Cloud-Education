import { Box, Grid, Typography } from '@mui/material';
import { CustomAuthContainer, CustomButton, CustomTextField } from 'components';
import { useFormik } from 'formik';
import {
	registerInistialValues,
	registerValidationSchema,
} from './formikUtlis';

export const RegisterScreen = () => {
	const registerFormik = useFormik({
		initialValues: registerInistialValues,
		validationSchema: registerValidationSchema,
		onSubmit: () => {},
	});

	return (
		<Box
			sx={{
				display: 'flex',
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				py: '3rem',
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
								type="number"
								value={registerFormik.values.phoneNumber}
								onChange={registerFormik.handleChange}
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
									registerFormik.touched.phoneNumber &&
									Boolean(registerFormik.errors.phoneNumber)
								}
								helperText={
									registerFormik.touched.phoneNumber &&
									registerFormik.errors.phoneNumber
								}
								placeholder="  1234567890"
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
		</Box>
	);
};
