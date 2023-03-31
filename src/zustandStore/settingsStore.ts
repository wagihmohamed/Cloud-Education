import { create } from 'zustand';

export interface SettingsState {
	primaryColor: string;
	textColor: string;
	setPrimaryColor: (primaryColor: string, textColor: string) => void;
}

const useSettingsStore = create<SettingsState>((set) => ({
	primaryColor: localStorage.getItem('primaryColor') || '#000000',
	textColor: localStorage.getItem('textColor') || '#000000',
	setPrimaryColor: (primaryColor, textColor) => {
		set({ primaryColor, textColor });
		localStorage.setItem('primaryColor', primaryColor);
		localStorage.setItem('textColor', textColor);
	},
}));

export const useSettings = () => useSettingsStore((state) => state);
