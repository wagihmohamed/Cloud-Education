import { queryClient } from 'index';
import { create } from 'zustand';

interface AuthStore {
	token: string | null;
	setToken: (token: string) => void;
	handleLogout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
	token: null,
	setToken: (token) => {
		localStorage.setItem('token', token);
		set({ token });
	},
	handleLogout: () => {
		localStorage.removeItem('token');
		set({ token: null });
		queryClient.clear();
		window.location.href = '/';
	},
}));

export const useAuth = () => useAuthStore((state) => state);
