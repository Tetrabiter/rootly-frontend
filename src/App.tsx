import { Outlet } from "react-router";
import { AppHeader } from "./components/app-header";
import { AppSidebar } from "./components/app-sidebar";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { useSocket } from "./stores/useSocket";

function App() {
    useSocket();
    console.log('APP RERENDER')
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

export default App;
