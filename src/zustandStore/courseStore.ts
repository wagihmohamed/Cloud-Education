import { create } from 'zustand';
import { editorDummyData } from 'components/CustomEditor/editorDummyData';
import { Course, CoursePayload, InitialStateType } from 'models';

interface StoreState {
	courses: Course[];
	addCourse: (payload: CoursePayload) => void;
	saveCourse: (payload: CoursePayload) => void;
}

const initialState: InitialStateType = {
	courses: [
		{
			id: 0,
			title: 'Default Course',
			course: editorDummyData,
		},
	],
};

const useCourseStore = create<StoreState>((set) => ({
	courses: initialState.courses,
	addCourse: (payload) =>
		set((state) => ({
			courses: [
				...state.courses,
				{
					id: payload.id,
					title: payload.title || 'Untitled',
					course: payload.course,
				},
			],
		})),
	saveCourse: (payload) =>
		set((state) => ({
			courses: state.courses.map((course) =>
				course.id === payload.id
					? { ...course, course: payload.course }
					: course
			),
		})),
}));

export const useCourses = () => useCourseStore((state) => state);
