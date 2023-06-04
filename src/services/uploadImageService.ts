import { api } from 'api';
import { uploadImageEndpoint } from '../api/apiURL';

interface UploadImageResponse {
	success: number;
	file: {
		url: string;
	};
}

export const uploadImage = async ({
	orgnizationId,
	courseCode,
	image,
}: {
	orgnizationId: string;
	courseCode: string;
	image: File;
}) => {
	const formData = new FormData();
	formData.append('image', image);
	const response = await api.post<UploadImageResponse>(
		uploadImageEndpoint({ orgnizationId, courseCode }),
		formData
	);
	return response.data;
};
