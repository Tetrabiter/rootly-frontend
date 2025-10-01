import { Outlet, useParams } from "react-router";
import { AppSidebar } from "./components/app-sidebar";
import { Breadcrumb } from "./components/ui/breadcrumb";
import { Separator } from "./components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "./components/ui/sidebar";

function App() {
    const { logName } = useParams();
    return (
        <div className="flex h-screen">
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    {logName && (
                        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator
                                orientation="vertical"
                                className="mr-2 data-[orientation=vertical]:h-4"
                            />
                            <Breadcrumb>Data Fetching</Breadcrumb>
                        </header>
                    )}

                    <Outlet />
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}

export default App;
