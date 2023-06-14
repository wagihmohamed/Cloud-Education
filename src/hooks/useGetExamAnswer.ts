import { useQuery } from '@tanstack/react-query';
import { ApiError } from 'models';
import { getSingleExamResultService } from 'services';
import { toast } from 'react-toastify';
import { useAuth } from 'zustandStore';

export const useGetExamAnswer = ({ examId }: { examId: string }) => {
	const { subDomain } = useAuth();
	return useQuery({
		queryKey: ['getSingleExamResult', subDomain, examId],
		queryFn: () =>
			getSingleExamResultService({ orgnizationId: subDomain, examId }),
		onError: (error: ApiError) => {
			toast.error(error.response?.data.message || 'Something went wrong');
		},
	});
};
