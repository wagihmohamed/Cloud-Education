/** @format */

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		primary: {
			main: '#023e8a',
		},
		secondary: {
			main: '#66bb6a',
		},
		background: {
			default: '#f8f9fa',
		},
		text: {
			primary: '#202033',
		},
	},
	typography: {
		allVariants: {
			color: '#202033',
		},
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
	},
});
