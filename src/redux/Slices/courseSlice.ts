import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { editorDummyData } from 'components/CustomEditor/editorDummyData';
import { OutputBlockData } from '@editorjs/editorjs';

export type CourseType =
	| 'header'
	| 'paragraph'
	| 'delimiter'
	| 'image'
	| 'list'
	| 'embed';

export interface CourseData {
	service?: string;
	source?: string;
	embed?: string;
	width?: number;
	height?: number;
	caption?: string;
	text?: string;
	level?: number;
	items?: string[];
	file?: {
		url: string;
	};
	withBorder?: boolean;
	stretched?: boolean;
	withBackground?: boolean;
	style?: string;
}

export interface InitialStateType {
	courses: {
		id?: string;
		title: string;
		course: OutputBlockData[];
	}[];
}

export interface CoursePayload {
	id?: string;
	title?: string;
	course: OutputBlockData[];
}

const initialState: InitialStateType = {
	courses: [
		{
			id: '1',
			title: 'Default Course',
			course: editorDummyData,
		},
	],
};

export const courseSlice = createSlice({
	name: 'course',
	initialState,
	reducers: {
		addCourse: (state, action: PayloadAction<CoursePayload>) => {
			state.courses.push({
				id: action.payload.id,
				title: action.payload.title || 'Untitled',
				course: action.payload.course,
			});
		},
		saveCourse: (state, action: PayloadAction<CoursePayload>) => {
			state.courses.map((course) => {
				if (course.id === action.payload.id) {
					course.course = action.payload.course;
				}
			});
		},
	},
});

export const { addCourse, saveCourse } = courseSlice.actions;

export default courseSlice.reducer;
