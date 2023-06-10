import {
	Body,
	Container,
	Column,
	Head,
	Heading,
	Html,
	Img,
	Preview,
	Row,
	Section,
	Text,
	Link,
} from '@react-email/components';
import { format } from 'date-fns';

interface YelpRecentLoginEmailProps {
	adminName?: string;
	loginDate?: Date;
	loginLocation?: string;
	OrganizationName?: string;
}

export const OrganizationRegisterEmail = ({
	adminName = 'Wagih',
	loginDate = new Date(),
	loginLocation = '123 Street, City, Country',
	OrganizationName = 'bfcai',
}: YelpRecentLoginEmailProps) => {
	const formattedDate = format(loginDate, "dd/MMMM/yyyy 'at' HH:mm p");

	return (
		<Html>
			<Head />
			<Preview>LMS Recent Organization Register</Preview>
			<Body style={main}>
				<Container>
					<Section style={logo} />

					<Section style={content}>
						<Img
							width={180}
							style={{
								margin: 'auto',
							}}
							src="https://cloud-education-s3-bucket-uploaded-files.s3.amazonaws.com/bfcai/profile-images/bfcai-logo-d4e1be7a-c761-47ec-894a-63bbce99fe28.png"
						/>

						<Row style={{ ...boxInfos, paddingBottom: '0' }}>
							<Column>
								<Heading
									style={{
										fontSize: 32,
										fontWeight: 'bold',
										textAlign: 'center',
									}}
								>
									Hi {adminName},
								</Heading>
								<Heading
									as="h2"
									style={{
										fontSize: 26,
										fontWeight: 'bold',
										textAlign: 'center',
									}}
								>
									Your organization has been registered successfully.
								</Heading>

								<Text style={paragraph}>
									<b>Time: </b>
									{formattedDate}
								</Text>
								<Text style={{ ...paragraph, marginTop: -5 }}>
									<b>Organization Name: </b>
									{OrganizationName}
								</Text>
								<Text style={{ ...paragraph, marginTop: -5 }}>
									<b>Location: </b>
									{loginLocation}
								</Text>
								<Text
									style={{
										...paragraph,
										textAlign: 'center',
									}}
								>
									If this was you, there's nothing else you need to do.
								</Text>
								<Text
									style={{
										...paragraph,
										textAlign: 'center',
									}}
								>
									You're receiving this email because you recently registered
								</Text>
								<Text
									style={{
										...paragraph,
										textAlign: 'center',
									}}
								>
									You can now enjoy the benefits of being a member of our LMS
								</Text>

								<Text style={{ ...paragraph, marginTop: -5 }}>
									Please use the following URL to login to your Organization
									account:
								</Text>
								<Column style={containerButton} colSpan={2}>
									<Link
										style={{
											...button,
											marginBottom: 20,
										}}
										href={`https://lecture-dashboard.vercel.app/${OrganizationName}/login`}
									>
										Login
									</Link>
								</Column>
							</Column>
						</Row>
						<Row style={{ ...boxInfos, paddingTop: '0' }}>
							<Text style={{ ...paragraph, marginTop: 6 }}>
								Please use the following URL to register users to your
								Organization:
							</Text>
							<Column style={containerButton} colSpan={2}>
								<Link
									style={{
										...button,
										marginBottom: 20,
									}}
									href={`https://lecture-dashboard.vercel.app/${OrganizationName}/register`}
								>
									Register
								</Link>
							</Column>
						</Row>
					</Section>

					<Section style={containerImageFooter}>
						<Img
							width={620}
							src="https://cloud-education-s3-bucket-uploaded-files.s3.amazonaws.com/bfcai/profile-images/email-footer-95a61a70-3b30-4abd-b96f-8bc0944a6b63.png"
						/>
					</Section>

					<Text
						style={{
							textAlign: 'center',
							fontSize: 12,
							color: 'rgb(0,0,0, 0.7)',
						}}
					>
						© 2023 | BFCAI., Benha, BU , Egypt. | lecture-dashboard.vercel.app
					</Text>
				</Container>
			</Body>
		</Html>
	);
};

const main = {
	backgroundColor: '#fff',
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
	fontSize: 16,
};

const logo = {
	padding: '30px 20px',
};

const containerButton = {
	display: 'flex',
	justifyContent: 'center',
	width: '100%',
};

const button = {
	backgroundColor: '#e00707',
	padding: '12px 30px',
	borderRadius: 3,
	color: '#FFF',
	fontWeight: 'bold',
	border: '1px solid rgb(0,0,0, 0.1)',
	cursor: 'pointer',
};

const content = {
	border: '1px solid rgb(0,0,0, 0.1)',
	borderRadius: '3px',
	overflow: 'hidden',
};

const boxInfos = {
	padding: '20px 40px',
};

const containerImageFooter = {
	padding: '45px 0 0 0',
};
