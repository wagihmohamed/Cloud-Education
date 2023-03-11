import { configureStore } from '@reduxjs/toolkit';
import courseReducer from './Slices/courseSlice';

export const store = configureStore({
	reducer: {
		courseReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
