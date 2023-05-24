import { useMutation } from '@tanstack/react-query';
import { ApiError, OrganizationRegisterPayload } from 'models';
import { toast } from 'react-toastify';
import { registerOrganizationService } from 'services';

export const useRegisterOrganization = ({
	onSuccess,
}: {
	onSuccess: () => void;
}) => {
	return useMutation({
		mutationFn: (orgData: OrganizationRegisterPayload) => {
			return registerOrganizationService(orgData);
		},
		onSuccess: (data) => {
			if (data?.data.status === 'success') {
				onSuccess();
				toast.success(`Organization created successfully`);
			}
		},
		onError: (error: ApiError) => {
			toast.error(error.response?.data.message || 'Something went wrong');
		},
	});
};
