import { getNotificationsEndpoint } from 'api/apiURL';
import { api } from 'api';

interface Notification {
	status: string;
	data: {
		id: string;
		title: string;
		message: string;
		extra: string;
		createdAt: string;
		updatedAt: string;
		userId: string;
	}[];
}

export const getNotificationsService = async (orgnizationId: string) => {
	const response = await api.get<Notification>(
		getNotificationsEndpoint(orgnizationId)
	);
	return response.data;
};
