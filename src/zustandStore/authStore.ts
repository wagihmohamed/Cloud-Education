import { queryClient, router } from 'index';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import jwt_decode from 'jwt-decode';

interface AuthStore {
	id: string;
	token: string | null;
	email: string;
	subDomain: string;
	role: string;
	isAdmin: boolean;
	isStudent: boolean;
	isTeacher: boolean;
	setToken: (token: string) => void;
	logout: () => void;
}

interface TokenDecoded {
	email: string;
	subdomain: string;
	role: string;
	iat: number;
	exp: number;
	id: string;
}

const pathname = window.location.pathname;
const organizationName = pathname.split('/');
localStorage.setItem('organizationId', organizationName[1]);

const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			token: null,
			email: '',
			id: '',
			subDomain: '',
			isAdmin: false,
			isStudent: false,
			isTeacher: false,
			role: '',
			setToken: (token) => {
				localStorage.setItem('token', token);
				const decodedToken: TokenDecoded = jwt_decode(token);
				localStorage.setItem('organizationId', decodedToken.subdomain);
				const { email, subdomain, role } = decodedToken;
				set({
					email,
					subDomain: subdomain,
					role,
					token,
					isAdmin: role === 'ADMIN',
					isStudent: role === 'STUDENT',
					isTeacher: role === 'TEACHER',
					id: decodedToken.id,
				});
			},
			logout: () => {
				const organizationId = localStorage.getItem('organizationId');
				localStorage.removeItem('token');
				set({
					token: null,
					email: '',
					isAdmin: false,
					isStudent: false,
					isTeacher: false,
					role: '',
					subDomain: '',
				});
				queryClient.clear();
				router.navigate(`/${organizationId}/login`);
			},
		}),
		{
			name: 'auth',
		}
	)
);

export const useAuth = () => useAuthStore((state) => state);
