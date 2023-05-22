import { useEffect, useState } from 'react';

export const useGetOrganizationName = () => {
	const [organizationName, setOrganizationName] = useState<string>('');
	useEffect(() => {
		const pathname = window.location.pathname;
		const organizationId = pathname.split('/');
		localStorage.setItem('organizationId', organizationId[1]);
		setOrganizationName(organizationId[1]);
	}, []);
	return { organizationName };
};
