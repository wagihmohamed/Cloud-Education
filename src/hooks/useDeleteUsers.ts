import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from 'models';
import { deleteUserByIdService } from 'services';
import { toast } from 'react-toastify';

export const useDeleteUser = ({
	onSuccess = () => {},
	onError = () => {},
}: {
	onSuccess?: () => void;
	onError?: (err: ApiError) => void;
}) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async ({ userId }: { userId: string }) => {
			return deleteUserByIdService({
				orgnizationId: localStorage.getItem('organizationId') || '',
				userId,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['users']);
			toast.success('User Deleted successfully');
			onSuccess();
		},
		onError: (err: ApiError) => {
			toast.error(err?.response?.data?.message || 'Something went wrong');
			onError(err);
		},
	});
};
