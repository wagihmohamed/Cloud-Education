import { getExamsListEndpoint } from 'api/apiURL';
import { api } from 'api';
import { ExamsListResponse } from 'models';

export const getExamsListService = async (orgnizationId: string) => {
	const res = await api.get<ExamsListResponse>(
		getExamsListEndpoint(orgnizationId)
	);
	return res.data.data;
};
