/* eslint-disable @typescript-eslint/no-unused-vars */
import { queryClient, router } from 'index';
import { toast } from 'react-toastify';
import { checkTokenValidity } from 'services/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
	token: string | null;
	setToken: (token: string) => void;
	logout: () => void;
}

const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			token: null,
			setToken: (token) => {
				localStorage.setItem('token', token);
				set({ token });
			},
			logout: () => {
				const organizationId = localStorage.getItem('organizationId');
				localStorage.removeItem('token');
				set({ token: null });
				queryClient.clear();
				router.navigate(`/${organizationId}/login`);
				localStorage.removeItem('organizationId');
			},
		}),
		{
			name: 'auth',
			// onRehydrateStorage: () => async (state) => {
			// 	// 2ND FUNCTION IS THE STATE
			// 	// THIS WILL RUN ON EACH PAGE RELOAD
			// 	// WE CAN MAKE USE OF IT IF THE USER REFRESHES THE PAGE
			// 	// AND WE WANT TO UPDATE THE TOKEN IN THE STORE

			// 	const isTokenValid = await checkTokenValidity(state?.token || '');
			// 	if (isTokenValid === undefined && state?.token) {
			// 		state?.logout();
			// 		toast.error('Your session has expired, please login again');
			// 	}
			// },
		}
	)
);

export const useAuth = () => useAuthStore((state) => state);
