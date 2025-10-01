import { create } from "zustand";

export interface HistoryItem {}

export interface HistoryStoreI {
    history: HistoryItem[];
    addItem: () => void;
}

export const useHistory = create<HistoryStoreI>((set) => {
    const addItem = async (item: HistoryItem) => {
        set((state) => ({
            history: [...state.history, item],
        }));
    };
    return {
        history,
        addItem,
    };
});
