import { useQuery } from '@tanstack/react-query';
import { ApiError } from 'models';
import { getExamsResults } from 'services';
import { toast } from 'react-toastify';
import { useAuth } from 'zustandStore';

export const useGetExamsResultList = () => {
	const { subDomain } = useAuth();
	return useQuery({
		queryKey: ['examsResults'],
		queryFn: () => getExamsResults(subDomain),
		onError: (error: ApiError) => {
			toast.error(error.response?.data?.message || 'Something went wrong');
		},
	});
};
