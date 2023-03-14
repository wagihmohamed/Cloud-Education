import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface InitialStateType {
	primaryColor: string;
	textColor: string;
}

const initialState: InitialStateType = {
	primaryColor: localStorage.getItem('primaryColor') || '#000000',
	textColor: localStorage.getItem('textColor') || '#000000',
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setPrimaryColor: (
			state,
			action: PayloadAction<{
				primaryColor: string;
				textColor: string;
			}>
		) => {
			state.primaryColor = action.payload.primaryColor;
			localStorage.setItem('primaryColor', action.payload.primaryColor);
			state.textColor = action.payload.textColor;
			localStorage.setItem('textColor', action.payload.textColor);
		},
	},
});

export const { setPrimaryColor } = settingsSlice.actions;

export default settingsSlice.reducer;
