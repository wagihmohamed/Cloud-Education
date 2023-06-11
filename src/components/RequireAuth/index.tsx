import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useAuth } from 'zustandStore';

export const RequireAuth = () => {
	const { token, subDomain } = useAuth();
	const { organizationId } = useParams();
	const paramAuth = organizationId || subDomain;
	return (
		<>{token ? <Outlet /> : <Navigate to={`/${paramAuth}/login`} replace />}</>
	);
};

export const NoAuth = () => {
	const { token, subDomain } = useAuth();
	const { organizationId } = useParams();
	const paramAuth = organizationId || subDomain;
	return (
		<>{token ? <Navigate to={`/${paramAuth}/home`} replace /> : <Outlet />}</>
	);
};

export const StudentRoute = () => {
	const { role } = useAuth();
	return (
		<>{role === 'STUDENT' ? <Outlet /> : <Navigate to="/home" replace />}</>
	);
};

export const AdminTeacherRoute = () => {
	const { role } = useAuth();
	const authorized = role === 'ADMIN' || role === 'TEACHER';
	return <>{authorized ? <Outlet /> : <Navigate to="/home" replace />}</>;
};
