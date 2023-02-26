import { Button, SxProps, Theme } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

interface CustomNavLinkProps {
	to: string;
	children: React.ReactNode;
	sx?: SxProps<Theme>;
	isLast?: boolean;
}
export const CustomNavLink = ({
	children,
	to,
	sx,
	isLast,
}: CustomNavLinkProps) => {
	const { pathname } = useLocation();
	const isActive = pathname === to;
	return (
		<Link className="nav-link" to={to}>
			<Button
				sx={{
					width: '100%',
					py: '28px',
					px: '14px',
					backgroundColor: isActive ? '#000000' : '#fff',
					textTransform: 'none',
					color: isActive ? '#fff' : '#000',
					fontSize: '18px',
					'&:hover': {
						bgcolor: '#323232',
						color: '#fff',
					},
					borderRadius: '0',
					borderTop: '2px solid #000',
					borderBottom: isLast ? '2px solid #000' : 'none',
					...sx,
				}}
			>
				{children}
			</Button>
		</Link>
	);
};
