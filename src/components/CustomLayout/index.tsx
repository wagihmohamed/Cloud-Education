import { Box, BoxProps, useMediaQuery } from '@mui/material';
import { CustomNavBar, CustomDrawer } from 'components';
import { theme } from 'theme';
interface MainViewContainerProps extends BoxProps {
	children: React.ReactNode;
}
const styles = {
	default: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
	},
	childrenContainer: {
		// width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		ml: '130px',
	},
	childrenContainerMd: {
		ml: '0px',
	},
};
export const CustomLayout = ({ children, ...prop }: MainViewContainerProps) => {
	const mdScreeen = useMediaQuery(theme.breakpoints.down('md'));
	const navBar = mdScreeen ? (
		<CustomDrawer styleProps={{}}>
			<CustomNavBar />
		</CustomDrawer>
	) : (
		<CustomNavBar />
	);
	return (
		<Box
			sx={{
				width: '100%',
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
			}}
			{...prop}
		>
			{navBar}
			<Box
				sx={[
					styles.childrenContainer,
					mdScreeen ? styles.childrenContainerMd : {},
				]}
			>
				{children}
			</Box>
		</Box>
	);
};
