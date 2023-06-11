import { useQuery } from '@tanstack/react-query';
import { getCommentsBySectioId } from 'services';
import { useAuth } from 'zustandStore';

export const useGetCommentsBySectionId = (
	courseCode: string,
	sectionOrder: number
) => {
	const { subDomain } = useAuth();
	return useQuery({
		queryKey: ['comments', courseCode, sectionOrder],
		queryFn: () => {
			return getCommentsBySectioId(subDomain, courseCode, sectionOrder);
		},
	});
};
