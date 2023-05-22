import { useGetOrganizationName } from 'hooks';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useAuth } from 'zustandStore';

export const RequireAuth = () => {
	const { token } = useAuth();
	const { organizationId } = useParams();
	const { organizationName } = useGetOrganizationName();
	const paramAuth = organizationName || organizationId;
	return (
		<>{token ? <Outlet /> : <Navigate to={`/${paramAuth}/login`} replace />}</>
	);
};

export const NoAuth = () => {
	const { token } = useAuth();
	const { organizationId } = useParams();
	const { organizationName } = useGetOrganizationName();
	const paramAuth = organizationName || organizationId;
	return (
		<>{token ? <Navigate to={`/${paramAuth}/home`} replace /> : <Outlet />}</>
	);
};
