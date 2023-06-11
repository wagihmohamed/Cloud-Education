import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateExamPayload, createExamService } from 'services';
import { ApiError } from 'models';
import { useAuth } from 'zustandStore';

export const useCreateExam = ({
	onSuccess,
	onError,
}: {
	onSuccess: () => void;
	onError: (error: ApiError) => void;
}) => {
	const { subDomain } = useAuth();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({
			courseCode,
			exam,
		}: {
			courseCode: string;
			exam: CreateExamPayload;
		}) => {
			return createExamService(subDomain, courseCode, exam);
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
