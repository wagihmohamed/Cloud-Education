import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editUserById } from 'services';
import { EditUserPayload, ApiError } from 'models';
import { toast } from 'react-toastify';

export const useEditUser = (data: {
	onSuccess?: () => void;
	onError: (error: ApiError) => void;
}) => {
	const { onSuccess = () => {}, onError } = data;
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({
			userId,
			user,
		}: {
			userId: string;
			user: EditUserPayload;
		}) => {
			return editUserById({
				orgnizationId: localStorage.getItem('organizationId') || '',
				userId,
				user,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['users']);
			toast.success('User updated successfully');
			onSuccess();
		},
		onError: (error: ApiError) => {
			onError(error);
		},
	});
};
