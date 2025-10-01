import { useEffect } from "react";
import { Outlet, useParams } from "react-router";
import { AppHeader } from "./components/app-header";
import { AppSidebar } from "./components/app-sidebar";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { http } from "./lib/http";
import { useStore } from "./stores/useStore";

function App() {
    const { logId } = useParams();
    const setSocket = useStore((state) => state.setSocket);
    useEffect(() => {
        http.get("set-user-id").then(async (res) => {
            const token = await res.json();
            // console.log("[set-user-id] куки-айди поставился");
            const socket = new WebSocket(
                import.meta.env.VITE_BACKEND_WS + `?user_id=${token}`
            );
            setSocket(socket);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            socket.onopen = function (e) {
                console.log("[open] Соединение установлено");
                console.log("Отправляем данные на сервер");
                socket.send("Меня зовут Саня");
            };

            socket.onmessage = function (event) {
                console.log(
                    `[message] Данные получены с сервера: ${event.data}`
                );
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
            };

            socket.onerror = function (error) {
                console.log(`[error]`, error);
            };
        });
    }, []);

    return (
        <div className="flex h-screen">
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <AppHeader />
                    <Outlet />
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}

//comment for commit

export default App;
