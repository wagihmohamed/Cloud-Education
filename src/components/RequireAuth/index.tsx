import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'zustandStore';

export const RequireAuth = () => {
	const { token } = useAuth();
	return <>{token ? <Outlet /> : <Navigate to="/login" />}</>;
};

export const NoAuth = () => {
	const { token } = useAuth();
	return <>{token ? <Navigate to="/home" /> : <Outlet />}</>;
};
