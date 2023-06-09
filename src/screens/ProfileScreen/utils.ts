import { theme } from 'theme';

export const profileStyles = {
	avatarStyle: {
		width: 200,
		height: 200,
		position: 'absolute',
		top: '50%',
		left: '6%',
		border: 'solid 10px white',
	},
	infoProfileContainer: {
		display: 'flex',
		padding: '1rem',
		width: '70%',
		[theme.breakpoints.down('md')]: {
			width: '90%',
		},
		gap: '1rem',
		bgcolor: '#e9ecef',
		margin: '2rem auto',
		borderRadius: '10px',
		flexDirection: 'column',
	},
	settingButton: {
		display: 'flex',
		flexDirection: 'row-reverse',
		gap: '1rem',
		margin: '2rem',
	},
	infoLabelData: {
		fontSize: '1.4rem',
		color: '#382d8b',
		fontWeight: '500',
	},
	infoProfileRow: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		[theme.breakpoints.down('lg')]: { flexDirection: 'column' },
	},
	heading: {
		position: 'relative',
		background: ' linear-gradient(90deg,#219ebc,#03045e)',
		marginBottom: '4rem',
		width: '100%',
		height: '30vh',
	},
};
