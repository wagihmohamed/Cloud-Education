/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ErrorImage } from 'assets';

const StyledBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	height: `90%`,
	width: `100%`,
	alignItems: 'center',
	justifyContent: 'center',
	padding: theme.spacing(5),
	backgroundColor: 'white',
}));

interface LoadingErrorPlaceholderProps {
	isLoading: boolean;
	isError: boolean;
	height?: string;
	children: React.ReactNode;
	width?: string;
	isEmpty?: boolean;
	emptyImg?: string;
	emptyText?: React.ReactNode;
}

export const LoadingErrorPlaceholder = ({
	isError,
	isLoading,
	height = '90vh',
	children,
	width,
	isEmpty,
	emptyImg,
	emptyText,
}: LoadingErrorPlaceholderProps) => {
	if (isLoading) {
		return (
			<Box
				width={width || '100%'}
				height={height}
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
				<CircularProgress />
			</Box>
		);
	}

	if (isEmpty && !isLoading) {
		return (
			<Box
				sx={{
					height,
					width: width || '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<img src={emptyImg} alt="empty" />
				{emptyText}
			</Box>
		);
	}

	if (isError) {
		return (
			<StyledBox>
				<img
					style={{
						width: '400px',
						height: '400px',
						objectFit: 'contain',
					}}
					src={ErrorImage}
					alt="error"
				/>
				<Box sx={{ textAlign: 'center' }}>
					<Typography
						variant="h1"
						component="h1"
						sx={{
							fontSize: { xs: '36px', lg: '50px' },
							fontWeight: 'bold',
						}}
					>
						Something went Wrong!
					</Typography>
					<Typography
						variant="body1"
						sx={{
							mt: 5,
							fontSize: { xs: 'lg', lg: 'xl' },
							color: 'slate.600',
						}}
					>
						Oops something went wrong. Try to refresh this page or <br /> feel
						free to contact us if the problem persists.
					</Typography>
				</Box>
			</StyledBox>
		);
	}

	return <>{children}</>;
};
