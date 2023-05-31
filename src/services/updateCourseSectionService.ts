import { api } from 'api';
import { updateCourseSectionBySectionIdEndpoint } from 'api/apiURL';
import { OutputBlockData } from '@editorjs/editorjs';
import {
	UpdateCourseSectionPayload,
	UpdateCourseSectionResponse,
} from 'models';

export const updateCourseSectionService = async (
	orgnizationId: string,
	courseCode: string,
	sectionOrder: number,
	data: OutputBlockData[]
) => {
	const response = await api.patch<
		UpdateCourseSectionPayload,
		UpdateCourseSectionResponse
	>(
		updateCourseSectionBySectionIdEndpoint(
			orgnizationId,
			courseCode,
			sectionOrder
		),
		{
			content: JSON.stringify(data),
		}
	);
	return response.data;
};
