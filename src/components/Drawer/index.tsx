/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
/** @format */

import { Drawer, IconButton, StackProps } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import MessageIcon from '@mui/icons-material/Message';
interface MainViewContainerProps extends StackProps {
	children: React.ReactNode;
	iconName?: string | undefined;
}
export const CustomDrawer = ({
	children,
	iconName,
}: MainViewContainerProps) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const drawerIcon =
		iconName == 'contactContainer' ? (
			<MessageIcon sx={{ fontSize: '1.5rem', margin: '10px' }} />
		) : (
			<MenuIcon sx={{ fontSize: '1.5rem', margin: '10px' }} />
		);
	return (
		<>
			<IconButton
				onClick={() => setIsDrawerOpen(true)}
				edge="start"
				color="inherit"
				aria-label="logo"
				sx={{ marginBottom: 'auto' }}
			>
				{drawerIcon}
			</IconButton>
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
