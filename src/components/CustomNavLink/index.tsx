/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, SxProps, Theme } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useSettings } from 'zustandStore';

interface CustomNavLinkProps {
	to: string;
	children: React.ReactNode;
	sx?: SxProps<Theme>;
	isLast?: boolean;
	disabled?: boolean;
}
export const CustomNavLink = ({
	children,
	to,
	sx,
	isLast,
	disabled,
}: CustomNavLinkProps) => {
	const { pathname } = useLocation();
	const { primaryColor } = useSettings();
	const isActive = pathname === to;
	return (
		<Link className="nav-link" to={to}>
			<Button
				disabled={disabled}
				sx={{
					width: '100%',
					py: '28px',
					px: '14px',
					backgroundColor: isActive ? '#25a244' : '#f0f0',
					textTransform: 'none',
					color: isActive ? '#fff' : 'text.primary',
					fontSize: '18px',
					'&:hover': {
						bgcolor: '#eaf4fe',
						color: 'text.primary',
					},
					'&:disabled': {
						color: 'gray',
					},
					borderRadius: '0',
					borderTop: '2px solid #382d8b',
					borderBottom: isLast ? '2px solid #000' : 'none',
					...sx,
				}}
			>
				{children}
			</Button>
		</Link>
	);
};
