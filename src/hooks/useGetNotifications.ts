import { useQuery } from '@tanstack/react-query';
import { ApiError } from 'models';
import { getNotificationsService } from 'services';
import { toast } from 'react-toastify';

export const useGetNotifications = () => {
	return useQuery({
		queryKey: ['notifications'],
		queryFn: getNotificationsService,
		onError: (error: ApiError) => {
			toast.error(error.response?.data?.message || 'Something went wrong');
		},
	});
};
