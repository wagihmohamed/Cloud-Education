import { useQuery } from '@tanstack/react-query';
import { getCommentsBySectioId } from 'services';

export const useGetCommentsBySectionId = (
	courseCode: string,
	sectionOrder: number
) => {
	return useQuery({
		queryKey: ['comments', courseCode, sectionOrder],
		queryFn: () => {
			return getCommentsBySectioId(
				localStorage.getItem('organizationId') || '',
				courseCode,
				sectionOrder
			);
		},
	});
};
