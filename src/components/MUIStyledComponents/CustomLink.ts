import { styled } from '@mui/system';
export const CustomLink = styled('a')({
	textAlign: 'center',
	border: 'none',
	display: 'inline',
	width: 'min-content',
	letterSpacing: '1px',
	backgroundColor: 'transparent',
	cursor: 'pointer',
	textDecoration: 'none',
	color: 'white',
	'&.MuiButtonBase-root:hover': {
		bgcolor: 'transparent',
	},
	'&:hover': {
		color: '#219ebc',
	},
});
