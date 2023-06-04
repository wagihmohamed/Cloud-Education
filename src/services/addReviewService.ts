import { submitReviewByCourseCodeEndpoint } from 'api/apiURL';
import { api } from 'api';
import { AxiosResponse } from 'axios';

interface SubmitReviewPayload {
	rating: number;
	review: string;
}

interface SubmitReviewResponse {
	status: string;
	message: string;
}

export const submitReviewByCourseCode = async ({
	orgnizationId,
	courseCode,
	rating,
	review,
}: {
	orgnizationId: string;
	courseCode: string;
	rating: number;
	review: string;
}) => {
	const response = await api.post<
		SubmitReviewPayload,
		AxiosResponse<SubmitReviewResponse>
	>(submitReviewByCourseCodeEndpoint({ orgnizationId, courseCode }), {
		rating,
		review,
	});
	return response.data;
};
