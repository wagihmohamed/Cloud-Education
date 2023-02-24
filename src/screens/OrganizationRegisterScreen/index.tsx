/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, Typography, Divider } from '@mui/material';
import {
	CustomAuthContainer,
	CustomButton,
	CustomSelect,
	CustomTextField,
} from 'components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { phoneRegExp } from 'utlis/phoneRegExp';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { countriesOptions, organizationOptions } from 'mockup';

export const OrganizationRegisterScreen = () => {
	const orgRegisterFormik = useFormik({
		initialValues: {
			name: '',
			type: {
				value: '',
				label: '',
			},
			orgDomain: '',
			orgDomainName: '',
			orgPhone: '',
			country: {
				value: '',
				label: '',
			},
			orgAddress: '',
			adminFirstName: '',
			adminLastName: '',
			adminEmail: '',
			adminPhone: '',
			adminPassword: '',
			adminConfirmPassword: '',
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Required'),
			type: Yup.object().shape({
				value: Yup.string().required('Required'),
				label: Yup.string().required('Required'),
			}),
			orgDomain: Yup.string().required('Required'),
			orgDomainName: Yup.string().required('Required'),
			orgPhone: Yup.string()
				.matches(phoneRegExp, 'Phone number is not valid')
				.required('Required'),
			country: Yup.object().shape({
				value: Yup.string().required('Required'),
				label: Yup.string().required('Required'),
			}),
			orgAddress: Yup.string().required('Required'),
			adminFirstName: Yup.string().required('Required'),
			adminLastName: Yup.string().required('Required'),
			adminEmail: Yup.string()
				.email('Invalid email address')
				.required('Required'),
			adminPhone: Yup.string()
				.matches(phoneRegExp, 'Phone number is not valid')
				.required('Required'),
			adminPassword: Yup.string()
				.min(4, 'Password must be +4')
				.required('Required'),
			adminConfirmPassword: Yup.string()
				.oneOf([Yup.ref('adminPassword'), undefined], 'Passwords must match')
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
				pt: orgRegisterFormik.isValid ? '0px' : '200px',
				mb: orgRegisterFormik.isValid ? '0px' : '200px',
			}}
		>
			<CustomAuthContainer py="10px">
				<form onSubmit={orgRegisterFormik.handleSubmit}>
					<Grid container spacing={2} rowSpacing="5px" columnSpacing="20px">
						<Grid item xs={12} sm={6}>
							<CustomTextField
								withLabel
								label="Name"
								name="name"
								value={orgRegisterFormik.values.name}
								onChange={orgRegisterFormik.handleChange}
								error={
									orgRegisterFormik.touched.name &&
									Boolean(orgRegisterFormik.errors.name)
								}
								helperText={
									orgRegisterFormik.touched.name &&
									orgRegisterFormik.errors.name
								}
								placeholder="Enter Organization Name"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<CustomSelect
								options={organizationOptions}
								onChange={(e: any) => {
									orgRegisterFormik.setFieldValue('type', e);
								}}
								withLabel
								label="Type"
								error={
									orgRegisterFormik.touched.type &&
									Boolean(orgRegisterFormik.errors.type)
								}
								helperText={
									orgRegisterFormik.touched.type &&
									orgRegisterFormik.errors.type?.label
								}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<CustomTextField
								withLabel
								label="Organization domain"
								name="orgDomain"
								value={orgRegisterFormik.values.orgDomain}
								onChange={orgRegisterFormik.handleChange}
								error={
									orgRegisterFormik.touched.orgDomain &&
									Boolean(orgRegisterFormik.errors.orgDomain)
								}
								helperText={
									orgRegisterFormik.touched.orgDomain &&
									orgRegisterFormik.errors.orgDomain
								}
								placeholder="ex. @fci.bu.edu.eg"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<CustomTextField
								withLabel
								label="Organization Domain Name"
								name="orgDomainName"
								value={orgRegisterFormik.values.orgDomainName}
								onChange={orgRegisterFormik.handleChange}
								error={
									orgRegisterFormik.touched.orgDomainName &&
									Boolean(orgRegisterFormik.errors.orgDomainName)
								}
								helperText={
									orgRegisterFormik.touched.orgDomainName &&
									orgRegisterFormik.errors.orgDomainName
								}
								placeholder="ex. https://www.orgname.cloud-educatioin.com"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<CustomTextField
								withLabel
								label="Official Phone Number"
								name="orgPhone"
								type="number"
								value={orgRegisterFormik.values.orgPhone}
								onChange={orgRegisterFormik.handleChange}
								error={
									orgRegisterFormik.touched.orgPhone &&
									Boolean(orgRegisterFormik.errors.orgPhone)
								}
								helperText={
									orgRegisterFormik.touched.orgPhone &&
									orgRegisterFormik.errors.orgPhone
								}
								placeholder="Enter Organization Phone Number"
							/>
						</Grid>

						<Grid item xs={12} sm={6}>
							<Typography
								variant="subtitle1"
								mt={1}
								sx={{
									color: '#000',
									alignSelf: 'flex-start',
									fontWeight: 'bold',
									fontSize: '15px',
									mb: '6px',
								}}
							>
								Country
							</Typography>
							<Select
								styles={{
									control: (provided) => ({
										...provided,
										height: '45px',
									}),
								}}
								options={countriesOptions}
								onChange={(e) => {
									orgRegisterFormik.setFieldValue('country', e);
								}}
							/>
							{orgRegisterFormik.errors?.country &&
								orgRegisterFormik.touched?.country && (
									<p className="select-error">
										{orgRegisterFormik.errors.country.toString() && (
											<p className="inner-select-error">
												This Field Is Required
											</p>
										)}
									</p>
								)}
						</Grid>
						<Grid item xs={12}>
							<CustomTextField
								withLabel
								label="Full Address"
								name="orgAddress"
								value={orgRegisterFormik.values.orgAddress}
								onChange={orgRegisterFormik.handleChange}
								error={
									orgRegisterFormik.touched.orgAddress &&
									Boolean(orgRegisterFormik.errors.orgAddress)
								}
								helperText={
									orgRegisterFormik.touched.orgAddress &&
									orgRegisterFormik.errors.orgAddress
								}
								placeholder="Enter Organization Address"
							/>
						</Grid>

						<Box width="100%">
							<Typography
								pl="20px"
								fontWeight="bold"
								mt="20px"
								variant="subtitle1"
							>
								Admin Information
							</Typography>
							<Divider
								sx={{
									borderBottomWidth: 2,
									borderColor: '#000',
									width: '98%',
								}}
								variant="middle"
							/>
						</Box>
						<Grid item xs={12} sm={6}>
							<CustomTextField
								withLabel
								label="First Name"
								name="adminFirstName"
								value={orgRegisterFormik.values.adminFirstName}
								onChange={orgRegisterFormik.handleChange}
								error={
									orgRegisterFormik.touched.adminFirstName &&
									Boolean(orgRegisterFormik.errors.adminFirstName)
								}
								helperText={
									orgRegisterFormik.touched.adminFirstName &&
									orgRegisterFormik.errors.adminFirstName
								}
								placeholder="Enter Admin First Name"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<CustomTextField
								withLabel
								label="Last Name"
								name="adminLastName"
								value={orgRegisterFormik.values.adminLastName}
								onChange={orgRegisterFormik.handleChange}
								error={
									orgRegisterFormik.touched.adminLastName &&
									Boolean(orgRegisterFormik.errors.adminLastName)
								}
								helperText={
									orgRegisterFormik.touched.adminLastName &&
									orgRegisterFormik.errors.adminLastName
								}
								placeholder="Enter Admin last Name"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<CustomTextField
								withLabel
								label="E-mail"
								name="adminEmail"
								value={orgRegisterFormik.values.adminEmail}
								onChange={orgRegisterFormik.handleChange}
								error={
									orgRegisterFormik.touched.adminEmail &&
									Boolean(orgRegisterFormik.errors.adminEmail)
								}
								helperText={
									orgRegisterFormik.touched.adminEmail &&
									orgRegisterFormik.errors.adminEmail
								}
								placeholder="Enter Admin Email"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<CustomTextField
								withLabel
								label="Phone Number"
								name="adminPhone"
								value={orgRegisterFormik.values.adminPhone}
								onChange={orgRegisterFormik.handleChange}
								error={
									orgRegisterFormik.touched.adminPhone &&
									Boolean(orgRegisterFormik.errors.adminPhone)
								}
								helperText={
									orgRegisterFormik.touched.adminPhone &&
									orgRegisterFormik.errors.adminPhone
								}
								placeholder="Enter Admin Phone Number"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<CustomTextField
								withLabel
								label="Password"
								name="adminPassword"
								value={orgRegisterFormik.values.adminPassword}
								onChange={orgRegisterFormik.handleChange}
								error={
									orgRegisterFormik.touched.adminPassword &&
									Boolean(orgRegisterFormik.errors.adminPassword)
								}
								helperText={
									orgRegisterFormik.touched.adminPassword &&
									orgRegisterFormik.errors.adminPassword
								}
								placeholder="Enter Admin Password"
								type="password"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<CustomTextField
								withLabel
								label="Confirm Password"
								name="adminConfirmPassword"
								value={orgRegisterFormik.values.adminConfirmPassword}
								onChange={orgRegisterFormik.handleChange}
								error={
									orgRegisterFormik.touched.adminConfirmPassword &&
									Boolean(orgRegisterFormik.errors.adminConfirmPassword)
								}
								helperText={
									orgRegisterFormik.touched.adminConfirmPassword &&
									orgRegisterFormik.errors.adminConfirmPassword
								}
								placeholder="Confirm Admin Password"
								type="password"
							/>
						</Grid>

						<Grid item xs={12}>
							<CustomButton type="submit" fullWidth py="10px" mt={3}>
								Sign Up
							</CustomButton>
						</Grid>
					</Grid>
				</form>
			</CustomAuthContainer>
			<CustomAuthContainer mt={2} px={2} py={1}>
				<Typography variant="h5" textAlign="center">
					Already have an account?
					<Link to="/"> Login</Link>
				</Typography>
			</CustomAuthContainer>
		</Box>
	);
};
