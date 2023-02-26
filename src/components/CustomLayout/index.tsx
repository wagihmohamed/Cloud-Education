import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { CustomNavBar } from 'components';

interface MainViewContainerProps extends BoxProps {
	children: React.ReactNode;
}
export const CustomLayout = ({ children, ...prop }: MainViewContainerProps) => {
	return (
		<Box
			sx={{
				width: '100%',
				height: '100vh',
				display: 'flex',
				flexDirection: 'row',
			}}
			{...prop}
		>
			<CustomNavBar />
			<Box
				sx={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					ml: '100px',
				}}
			>
				{children}
			</Box>
		</Box>
	);
};
