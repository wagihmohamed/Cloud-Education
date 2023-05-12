/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
/** @format */

import { Box, Drawer, IconButton, StackProps } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import MessageIcon from '@mui/icons-material/Message';
interface MainViewContainerProps {
	children: React.ReactNode;
	iconName?: string | undefined;
	mx?: number | string;
	px?: number | string;
	py?: number | string;
	position?: string;
	width?: number | string;
	pl?: number | string;
	pr?: number | string;
	mt?: number | string;
	mb?: number | string;
	ml?: number | string;
	mr?: number | string;
	m?: number | string;
	styleProps: object;
}
export const CustomDrawer = ({
	children,
	iconName,
	styleProps,
}: MainViewContainerProps) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const drawerIcon =
		iconName == 'contactContainer' ? (
			<MessageIcon sx={[{ fontSize: '2.5rem' }]} />
		) : (
			<MenuIcon sx={{ fontSize: '2rem' }} />
		);
	let primaryColor: string | null = '#000';
	let color: string | null = '#fff';
	const setNavColor = () => {
		const whiteColorFormat: (string | null)[] = [
			'rgba(255, 255, 255, 1)',
			'rgba(100%, 100%, 100%, 1)',
			'rgba(255, 255, 255, 255)',
			'rgba(255, 255, 255)',
			'#ffffff',
			'#FFF',
			'#ffffffff',
		];
		const localStorgeColor = localStorage.getItem('primaryColor');
		if (localStorgeColor) {
			primaryColor = localStorage.getItem('primaryColor');
			if (whiteColorFormat.includes(primaryColor)) {
				color = '#000';
			}
		}
	};

	setNavColor();

	return (
		<>
			<Box
				sx={{
					background: `linear-gradient(82deg,${primaryColor} 0%, #fff 100%)`,
					color: `${color}`,
				}}
			>
				<IconButton
					onClick={() => setIsDrawerOpen(true)}
					edge="start"
					color="inherit"
					aria-label="logo"
					sx={[{ m: '.5rem 1rem', alignSelf: 'flex-start' }, styleProps]}
				>
					{drawerIcon}
				</IconButton>
			</Box>
			<Drawer
				anchor="left"
				open={isDrawerOpen}
				onClose={() => setIsDrawerOpen(false)}
			>
				{children}
			</Drawer>
		</>
	);
};
