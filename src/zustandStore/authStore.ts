import { notification } from 'antd';
import { queryClient, router } from 'index';
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
				localStorage.removeItem('token');
				set({ token: null });
				queryClient.clear();
				router.navigate('/login');
			},
		}),
		{
			name: 'auth',
			onRehydrateStorage: () => async (state) => {
				// 2ND FUNCTION IS THE STATE
				// THIS WILL RUN ON EACH PAGE RELOAD
				// WE CAN MAKE USE OF IT IF THE USER REFRESHES THE PAGE
				// AND WE WANT TO UPDATE THE TOKEN IN THE STORE

				const isTokenValid = await checkTokenValidity(state?.token as string);
				if (isTokenValid === undefined && state?.token) {
					state?.logout();
					notification.open({
						type: 'error',
						message: 'Session Expired',
						description: 'Please login again.',
					});
				}
			},
		}
	)
);

export const useAuth = () => useAuthStore((state) => state);
