import { api } from 'api';
import { uploadVideoEndpoint } from '../api/apiURL';

interface UploadVideoResponse {
	success: number;
	file: {
		url: string;
	};
}

export const uploadVideo = async ({
	orgnizationId,
	courseCode,
	video,
}: {
	orgnizationId: string;
	courseCode: string;
	video: File;
}) => {
	const formData = new FormData();
	formData.append('video', video);
	const response = await api.post<UploadVideoResponse>(
		uploadVideoEndpoint({ orgnizationId, courseCode }),
		formData
	);
	return response.data;
};
