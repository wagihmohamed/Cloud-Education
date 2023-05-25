import { useGetOrganizationName } from 'hooks';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useAuth } from 'zustandStore';

export const RequireAuth = () => {
	const { token, subDomain } = useAuth();
	const { organizationId } = useParams();
	const { organizationName } = useGetOrganizationName();
	const paramAuth = organizationName || organizationId || subDomain;
	return (
		<>{token ? <Outlet /> : <Navigate to={`/${paramAuth}/login`} replace />}</>
	);
};

export const NoAuth = () => {
	const { token, subDomain } = useAuth();
	const { organizationId } = useParams();
	const { organizationName } = useGetOrganizationName();
	const paramAuth = organizationName || organizationId || subDomain;
	return (
		<>{token ? <Navigate to={`/${paramAuth}/home`} replace /> : <Outlet />}</>
	);
};
