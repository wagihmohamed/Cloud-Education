import { createTheme } from '@mui/material/styles';
import { store } from 'redux/store';

const primaryColor = store.getState().settingsReducer.primaryColor;
const textColor = store.getState().settingsReducer.textColor;
export const theme = createTheme({
	palette: {
		primary: {
			main: primaryColor,
		},
	},
	typography: {
		allVariants: {
			color: textColor,
		},
		fontFamily: ['Patrick Hand', 'cursive'].join(','),
	},
});
