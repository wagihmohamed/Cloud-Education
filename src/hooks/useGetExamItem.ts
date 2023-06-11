import { useQuery } from '@tanstack/react-query';
import { ApiError } from 'models';
import { getExamByIdService } from 'services';
import { toast } from 'react-toastify';
import { useAuth } from 'zustandStore';

export const useGetExamItem = (examId: string) => {
	const { subDomain } = useAuth();
	return useQuery({
		queryKey: ['getExamById', examId],
		queryFn: () => getExamByIdService(subDomain, examId),
		onError: (error: ApiError) => {
			toast.error(error.response?.data.message || 'Something went wrong');
		},
	});
};
