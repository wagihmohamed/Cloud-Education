import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadUserImage } from 'services';
import { toast } from 'react-toastify';
import { useAuth } from 'zustandStore';

export const useUpdateProfileImage = (refetchUserId: string) => {
	const { subDomain } = useAuth();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ image, userId }: { image: File; userId: string }) => {
			return uploadUserImage({
				orgnizationId: subDomain,
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
