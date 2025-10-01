import { Outlet, useParams } from "react-router";
import { AppSidebar } from "./components/app-sidebar";
import { Breadcrumb } from "./components/ui/breadcrumb";
import { Separator } from "./components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "./components/ui/sidebar";
import { useEffect } from "react";
import { useStore } from "./stores/useStore";
import { AppHeader } from "./components/app-header";

function App() {
    const { logId } = useParams();
    // const setSocket = useStore((state) => state.setSocket);
    // useEffect(() => {
    //     const socket = new WebSocket(
    //         import.meta.env.VITE_BACKEND_WS
    //     );
    //     setSocket(socket);
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //     socket.onopen = function (e) {
    //         console.log("[open] Соединение установлено");
    //         console.log("Отправляем данные на сервер");
    //         socket.send("Меня зовут Саня");
    //     };

    //     socket.onmessage = function (event) {
    //         console.log(`[message] Данные получены с сервера: ${event.data}`);
    //     };

    //     socket.onclose = function (event) {
    //         if (event.wasClean) {
    //             console.log(
    //                 `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
    //             );
    //         } else {
    //             // например, сервер убил процесс или сеть недоступна
    //             // обычно в этом случае event.code 1006
    //             console.log("[close] Соединение прервано");
    //         }
    //     };

    //     socket.onerror = function (error) {
    //         console.log(`[error]`, error);
    //     };
    // }, []);

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
