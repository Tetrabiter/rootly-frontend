import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar";
import { useStore } from "@/stores/useStore";
import { useState } from "react";
import { useParams } from "react-router";
import { FilesUploader } from "./FilesUploader";
import { HistoryList } from "./HistoryList";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Sidebar {...props} className="transition-all duration-300 ease-in-out">
            <SidebarHeader>
                <div className="pl-2 flex justify-between items-center">
                    <h1
                        className={`font-extrabold transition-opacity duration-300 ${
                            isOpen ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        ROOTLY
                    </h1>
                </div>
                {/* <div
                    className={`transition-all duration-300 ${
                        isOpen
                            ? "opacity-100 max-h-12"
                            : "opacity-0 max-h-0 overflow-hidden"
                    }`}
                >
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.currentTarget.value)}
                    />
                </div> */}
            </SidebarHeader>

            <SidebarContent>
                <HistoryList />
            </SidebarContent>

            <SidebarFooter>
                <div
                    className={`transition-all duration-300 ${
                        isOpen ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <FilesUploader />
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}
