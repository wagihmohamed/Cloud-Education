import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadUserImage } from 'services';
import { toast } from 'react-toastify';

export const useUpdateProfileImage = (refetchUserId: string) => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ image, userId }: { image: File; userId: string }) => {
			return uploadUserImage({
				image,
				userId,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['getUserById', refetchUserId]);
		},
		onError: () => {
			toast.error('Error updating profile image');
		},
	});
};
