import { createStoreWithLoader } from "@/lib/createStoreWithLoader";
import { http } from "@/lib/http";
import { create } from "zustand";

export interface HistoryItem {
    id: string;
    name: string;
}

export interface HistoryStoreI {
    history: HistoryItem[];
    addHistoryItem: (item: HistoryItem) => void;
    setHistory: (history: HistoryItem[]) => void;
}

const _useHistory = create<HistoryStoreI>((set) => ({
    socket: null,
    history: [],
    addHistoryItem: (item) => {
        set((state) => ({
            history: [...state.history, item],
        }));
    },
    setHistory: (history) => {
        set({ history });
    },
}));

export const useHistory = createStoreWithLoader(_useHistory, async () => {
    const history = (await http.get<{result: HistoryItem[]}>("api/get_history").json()).result;
    console.log("HISTORY",history)
    _useHistory.getState().setHistory(history);
});
