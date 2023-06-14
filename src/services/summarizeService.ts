import { summarizeTextEndpoint } from 'api/apiURL';
import { api } from 'api';
import { AxiosResponse } from 'axios';

interface SummarizeTextPayload {
	text: string;
}

interface SummarizeTextResponse {
	status: string;
	data: string;
}

export const summarizeTextService = async ({
	text,
	orgnizationId,
}: {
	text: string;
	orgnizationId: string;
}) => {
	const response = await api.post<
		SummarizeTextPayload,
		AxiosResponse<SummarizeTextResponse>
	>(summarizeTextEndpoint(orgnizationId), {
		text,
	});
	return response.data.data;
};
