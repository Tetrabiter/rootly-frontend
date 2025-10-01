import { create } from "zustand";

export interface HistoryItem {
    a: number;
}

export interface HistoryStoreI {
    history: HistoryItem[];
    addItem: (item: HistoryItem) => void;
}

export const useHistory = create<HistoryStoreI>((set) => ({
    history: [],
    addItem: (item: HistoryItem) => {
        set((state) => ({
            history: [...state.history, item],
        }));
    },
}));
