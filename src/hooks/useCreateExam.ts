import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateExamPayload, createExamService } from 'services';
import { ApiError } from 'models';

export const useCreateExam = ({
	onSuccess,
	onError,
}: {
	onSuccess: () => void;
	onError: (error: ApiError) => void;
}) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({
			courseCode,
			exam,
		}: {
			courseCode: string;
			exam: CreateExamPayload;
		}) => {
			return createExamService(courseCode, exam);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['exams']);
			onSuccess();
		},
		onError: (error: ApiError) => {
			onError(error);
		},
	});
};
