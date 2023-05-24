import { Box, Grid, Typography, Divider } from '@mui/material';
import {
	CustomAuthContainer,
	CustomButton,
	CustomSelect,
	CustomTextField,
} from 'components';
import { useFormik } from 'formik';
import { countriesOptions, organizationOptions } from 'mockup';
import {
	organizationRegisterInitialValues,
	organizationRegisterValidationSchema,
} from './formikUtlis';
import { useRegisterOrganization } from 'hooks';
import { useNavigate } from 'react-router-dom';

export const OrganizationRegisterScreen = () => {
	const navigation = useNavigate();
	const { mutate: registerOrganization, isLoading } = useRegisterOrganization({
		onSuccess: () => {
			navigation(`/${orgRegisterFormik.values.orgDomainName}/login`);
		},
	});

	const orgRegisterFormik = useFormik({
		initialValues: organizationRegisterInitialValues,
		validationSchema: organizationRegisterValidationSchema,
		onSubmit: (values) => {
			registerOrganization({
				organization: {
					name: values.name,
					address: values.orgAddress,
					country: values.country?.value,
					emailDomain: values.orgDomain,
					officialPhoneNumber: '+20' + String(values.orgPhone),
					subdomain: values.orgDomainName,
					type: values.type?.label,
				},
				organizationAdmin: {
					email: values.adminEmail,
					password: values.adminPassword,
					firstName: values.adminFirstName,
					lastName: values.adminLastName,
					phoneNumber: '+20' + String(values.adminPhone),
				},
			});
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
						<Grid
							item
							xs={12}
							sm={6}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'stretch',
							}}
						>
							<CustomSelect
								options={organizationOptions}
								onChange={(e: { value: string; label: string }) => {
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
								placeholder="ex. fci.bu.edu.eg"
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
								placeholder="ex. BFCAI"
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
								onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
									e.target.value = Math.max(0, parseInt(e.target.value))
										.toString()
										.slice(0, 10);
								}}
								InputProps={{
									startAdornment: (
										<Typography
											component="span"
											variant="subtitle1"
											fontSize="20px"
											fontWeight="500"
										>
											+20
										</Typography>
									),
								}}
								error={
									orgRegisterFormik.touched.orgPhone &&
									Boolean(orgRegisterFormik.errors.orgPhone)
								}
								helperText={
									orgRegisterFormik.touched.orgPhone &&
									orgRegisterFormik.errors.orgPhone
								}
								placeholder="  1234567890"
							/>
						</Grid>

						<Grid
							item
							xs={12}
							sm={6}
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'stretch',
							}}
						>
							<Typography
								variant="subtitle1"
								component="span"
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
							<CustomSelect
								options={countriesOptions}
								onChange={(e: { value: string; label: string }) => {
									orgRegisterFormik.setFieldValue('country', e);
								}}
								error={
									orgRegisterFormik.touched.country &&
									Boolean(orgRegisterFormik.errors.country)
								}
								helperText={
									orgRegisterFormik.touched.country &&
									orgRegisterFormik.errors.country?.label
								}
							/>
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
								type="number"
								value={orgRegisterFormik.values.adminPhone}
								onChange={orgRegisterFormik.handleChange}
								onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
									e.target.value = Math.max(0, parseInt(e.target.value))
										.toString()
										.slice(0, 10);
								}}
								InputProps={{
									startAdornment: (
										<Typography
											component="span"
											variant="subtitle1"
											fontSize="20px"
											fontWeight="500"
										>
											+20
										</Typography>
									),
								}}
								error={
									orgRegisterFormik.touched.adminPhone &&
									Boolean(orgRegisterFormik.errors.adminPhone)
								}
								helperText={
									orgRegisterFormik.touched.adminPhone &&
									orgRegisterFormik.errors.adminPhone
								}
								placeholder=" Admin Phone Number"
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
							<CustomButton
								loadingButton
								loading={isLoading}
								type="submit"
								fullWidth
								py="10px"
								mt={3}
							>
								Sign Up
							</CustomButton>
						</Grid>
					</Grid>
				</form>
			</CustomAuthContainer>
		</Box>
	);
};
