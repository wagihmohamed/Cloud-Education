import { useMutation } from '@tanstack/react-query';
import { sleep } from 'utlis';
import { ApiError, CoursesBody } from 'models';
import { coursesBodyData } from 'mockup';

export const useAddCourse = (data: {
	onSuccess: () => void;
	onError: (error: ApiError) => void;
}) => {
	const { onSuccess, onError } = data;
	return useMutation({
		mutationFn: async (course: CoursesBody) => {
			await sleep(2000);
			coursesBodyData.push(course);
			return course;
		},
		onSuccess,
		onError,
	});
};
