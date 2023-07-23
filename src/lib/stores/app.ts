import { create } from "zustand";

interface IAppStore {
  editingDeneme: IDeneme | null;
  updateEditingDeneme: (deneme: IDeneme | null) => void;
}

export const useAppStore = create<IAppStore>((set) => ({
  editingDeneme: null,
  updateEditingDeneme: (deneme) => set(() => ({ editingDeneme: deneme })),
}));
