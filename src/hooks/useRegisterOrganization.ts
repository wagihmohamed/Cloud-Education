import { useMutation } from '@tanstack/react-query';
import { OrganizationRegisterPayload } from 'models';
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
			if (data.data.status === 'success') {
				onSuccess();
				toast.success(`Organization created successfully`);
			}
		},
		onError: () => {
			toast.error('Something went wrong');
		},
	});
};
