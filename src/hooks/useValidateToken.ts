import { useQuery } from '@tanstack/react-query';
import { sleep } from 'utlis';
import { checkTokenValidity } from 'services/auth';
import { useAuth } from 'zustandStore';
import { toast } from 'react-toastify';

export const useValidateToken = () => {
	const { logout, token } = useAuth();
	return useQuery({
		queryKey: ['validateToken', token],
		enabled: !!token,
		queryFn: async () => {
			await sleep(1500);
			return checkTokenValidity(token || '');
		},
		onError: () => {
			logout();
			toast.error('Your session has expired, please login again');
		},
		refetchOnWindowFocus: true,
		refetchOnReconnect: true,
		retry: 1,
	});
};
