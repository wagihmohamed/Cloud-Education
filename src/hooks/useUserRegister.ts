import { useMutation } from '@tanstack/react-query';
import {
	ApiError,
	RegisterUserByOrgIdPayload,
	RegisterUserByOrgIdResponse,
} from 'models';
import { toast } from 'react-toastify';
import { registerUserByOrgIdService } from 'services';

export const useUserRegister = ({
	onSuccess,
}: {
	onSuccess: (data: RegisterUserByOrgIdResponse) => void;
}) => {
	return useMutation({
		mutationFn: ({
			orgId,
			userData,
		}: {
			orgId: string;
			userData: RegisterUserByOrgIdPayload;
		}) => {
			return registerUserByOrgIdService({ orgId, userDataPayload: userData });
		},
		onSuccess: (res) => {
			onSuccess(res);
			toast.success(`Created successfully, Welcome`);
		},
		onError: (error: ApiError) => {
			toast.error(error.response?.data.message || 'Something went wrong');
		},
	});
};
