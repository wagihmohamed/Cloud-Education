import { updateUserProfilePictureEndpoint } from 'api/apiURL';
import { api } from 'api';

interface UploadImageResponse {
	success: number;
	file: {
		url: string;
	};
}

export const uploadUserImage = async ({
	image,
	userId,
}: {
	image: File;
	userId: string;
}) => {
	const orgnizationId = localStorage.getItem('organizationId') || '';
	const formData = new FormData();
	formData.append('image', image);
	const response = await api.put<UploadImageResponse>(
		updateUserProfilePictureEndpoint(orgnizationId, userId),
		formData
	);
	return response.data;
};
