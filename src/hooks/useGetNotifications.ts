import { useQuery } from '@tanstack/react-query';
import { ApiError } from 'models';
import { getNotificationsService } from 'services';
import { toast } from 'react-toastify';
import { useAuth } from 'zustandStore';

export const useGetNotifications = () => {
	const { subDomain } = useAuth();
	return useQuery({
		queryKey: ['notifications'],
		queryFn: () => getNotificationsService(subDomain),
		onError: (error: ApiError) => {
			toast.error(error.response?.data?.message || 'Something went wrong');
		},
	});
};
