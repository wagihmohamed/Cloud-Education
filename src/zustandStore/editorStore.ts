import { create } from 'zustand';

interface EditorStore {
	id: number;
	setId: (id: number) => void;
}

export const useEditorStore = create<EditorStore>((set) => ({
	id: 0,
	setId: (id) => set({ id }),
}));

export const useEditorId = () => useEditorStore((state) => state);
