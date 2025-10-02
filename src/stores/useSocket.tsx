import { createStoreWithLoader } from "@/lib/createStoreWithLoader";
import { getToken } from "@/lib/getToken";
import { create } from "zustand";

export interface SocketStoreI {
    socket: WebSocket | null;
    setSocket: (socket: WebSocket) => void;
}

export const _useSocket = create<SocketStoreI>((set) => ({
    socket: null,
    setSocket: (socket) => {
        set({ socket });
    },
}));

export const useSocket = createStoreWithLoader(_useSocket, async () => {
    const setSocket = _useSocket.getState().setSocket;
    const createWebsocket = async () => {
        const token = await getToken();
        const socket = new WebSocket(
            import.meta.env.VITE_BACKEND_WS + `?user_id=${token}`
        );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        socket.onopen = function (e) {
            console.log("[open] Соединение установлено");
        };

        socket.onmessage = function (event) {
            console.log(`[message] Данные получены с сервера: ${event.data}`);
        };

        socket.onclose = function (event) {
            if (event.wasClean) {
                console.log(
                    `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
                );
            } else {
                // например, сервер убил процесс или сеть недоступна
                // обычно в этом случае event.code 1006
                console.log("[close] Соединение прервано");
            }
            console.log(
                "[retry] Через 5 секунд попытка установить соединение заново"
            );
            setTimeout(async () => {
                console.log("[retry] Попытка установить соединение заново");
                setSocket(await createWebsocket());
            }, 5000);
        };

        socket.onerror = function (error) {
            console.log(`[error]`, error);
        };

        return socket;
    };
    setSocket(await createWebsocket());
});
