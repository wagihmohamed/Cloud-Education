import { useMutation } from '@tanstack/react-query';
import { sleep } from 'utlis';
import { ApiError, CoursesBody } from 'models';
import { coursesBodyData } from 'mockup';
import { AxiosError } from 'axios';

export const useEditCourse = (data: {
	onSuccess: () => void;
	onError: (error: AxiosError<ApiError>) => void;
}) => {
	const { onSuccess, onError } = data;
	return useMutation({
		mutationFn: async (course: CoursesBody) => {
			await sleep(2000);
			const index = coursesBodyData.findIndex((item) => item.id === course.id);
			coursesBodyData[index] = {
				...coursesBodyData[index],
				courseName: course.courseName,
				category: course.category,
				description: course.description,
				status: course.status,
				courseCode: course.courseCode,
				prerequisites: course.prerequisites,
			};
			return course;
		},
		onSuccess,
		onError,
	});
};
