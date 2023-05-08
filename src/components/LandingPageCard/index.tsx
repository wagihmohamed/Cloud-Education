import { Card, CardMedia, CardContent, Typography } from '@mui/material';
export const LandingPageCard = ({
	image,
	content,
}: {
	image: '*jpg' | string;
	content: string;
}) => {
	return (
		<Card sx={{ maxWidth: '90%' }}>
			<CardMedia component="img" image={image} alt="case-study" />
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					{content}
				</Typography>
			</CardContent>
		</Card>
	);
};
