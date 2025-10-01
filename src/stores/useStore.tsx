import { create } from "zustand";

export interface HistoryItem {
    id: string;
    name: string;
}

export interface StoreI {
    socket: WebSocket | null;
    history: HistoryItem[];

    setSocket: (socket: WebSocket) => void;
    addItem: (item: HistoryItem) => void;
}

export const useStore = create<StoreI>((set) => ({
    socket: null,
    history: [{
        id: 'id123',
        name: 'name123'
    }],
    setSocket: (socket) => {
        set({ socket });
    },
    addItem: (item) => {
        set((state) => ({
            history: [...state.history, item],
        }));
    },
}));
