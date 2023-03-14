import { configureStore } from '@reduxjs/toolkit';
import courseReducer from './Slices/courseSlice';
import settingsReducer from './Slices/settingsSlice';

export const store = configureStore({
	reducer: {
		courseReducer,
		settingsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
