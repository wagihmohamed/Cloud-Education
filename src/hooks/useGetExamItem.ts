import { useQuery } from '@tanstack/react-query';
import { ApiError } from 'models';
import { getExamByIdService } from 'services';
import { toast } from 'react-toastify';

export const useGetExamItem = (examId: string) => {
	return useQuery({
		queryKey: ['getExamById', examId],
		queryFn: () => getExamByIdService(examId),
		onError: (error: ApiError) => {
			toast.error(error.response?.data.message || 'Something went wrong');
		},
	});
};
