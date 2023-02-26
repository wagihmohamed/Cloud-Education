import { Card, CardMedia, CardContent, Typography } from '@mui/material';
export const LandingPageCard = ({
	image,
	content,
}: {
	image: '*jpg';
	content: string;
}) => {
	return (
		<Card sx={{ maxWidth: 300 }}>
			<CardMedia component="img" image={image} alt="case-study" />
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					{content}
				</Typography>
			</CardContent>
		</Card>
	);
};
