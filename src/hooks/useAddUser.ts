import { useMutation } from '@tanstack/react-query';
import { sleep } from 'utlis';
import { ApiError, User } from 'models';
import { usersData } from 'mockup';
import { AxiosError } from 'axios';

export const useAddUser = (data: {
	onSuccess: () => void;
	onError: (error: AxiosError<ApiError>) => void;
}) => {
	const { onSuccess, onError } = data;
	return useMutation({
		mutationFn: async (user: User) => {
			await sleep(1500);
			usersData.push(user);
			return user;
		},
		onSuccess,
		onError,
	});
};
