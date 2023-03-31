import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		primary: {
			main: localStorage.getItem('primaryColor') ?? '#000000',
		},
	},
	typography: {
		allVariants: {
			color: localStorage.getItem('textColor') ?? '#000000',
		},
		fontFamily: ['Patrick Hand', 'cursive'].join(','),
	},
});
