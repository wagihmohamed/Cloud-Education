import { ReactNode } from 'react';
import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
	children: ReactNode;
	mx?: number | string;
	px?: number | string;
	py?: number | string;
	width?: number | string;
	pl?: number | string;
	pr?: number | string;
	mt?: number | string;
	mb?: number | string;
	ml?: number | string;
	mr?: number | string;
	active?: boolean;
	warning?: boolean;
}
export const CustomButton = ({
	children,
	mx,
	px,
	width,
	pl,
	pr,
	mt,
	mb,
	ml,
	mr,
	active,
	py,
	warning = false,
	...props
}: CustomButtonProps) => {
	return (
		<Button
			{...props}
			color="inherit"
			sx={{
				textTransform: 'none',
				textDecoration: 'none',
				mx,
				px,
				width,
				pl,
				pr,
				mt,
				mb,
				ml,
				mr,
				py,
				fontWeight: (active && 700) || 400,
				bgcolor:
					(active && '#323232') || (warning && '#d32f2f') || 'primary.main',
				color: 'white',
				fontSize: '20px',
				'&:hover': {
					bgcolor: (warning && '#e06d6d') || '#323232',
				},
			}}
		>
			{children}
		</Button>
	);
};
