import { ReactNode } from 'react';
import { Box, BoxProps } from '@mui/material';

interface CustomAuthContainerProps extends BoxProps {
	children: ReactNode;
	mt?: number | string;
	mx?: number | string;
	px?: number | string;
	py?: number | string;
	width?: number | string;
	pl?: number | string;
	pr?: number | string;
	mb?: number | string;
	ml?: number | string;
	mr?: number | string;
}

export const CustomAuthContainer = ({
	children,
	mt,
	mx,
	px = '80px',
	py = '30px',
	width = '800px',
	pl,
	pr,
	mb,
	ml,
	mr,
	...props
}: CustomAuthContainerProps) => {
	return (
		<Box
			sx={{
				border: '3px solid #000000',
				px,
				borderRadius: '10px',
				mt,
				mx,
				py,
				width,
				pl,
				pr,
				mb,
				ml,
				mr,
			}}
			{...props}
		>
			{children}
		</Box>
	);
};
