import { SearchForm } from "@/components/search-form";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FilesUploader } from "./FilesUploader";
import { useState } from "react";
import { useStore } from "@/stores/useStore";
import { Link, useParams } from "react-router";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const history = useStore((state) => state.history);

    const { logId } = useParams();

    const data = {
        versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
        navMain: [
            {
                title: "История",
                items: history.map((item) => ({
                    title: item.name,
                    url: item.id,
                    isActive: logId === item.id,
                })),
                // [
                //     {
                //         title: "plan_test-k801vip_tflog",
                //         url: "#",
                //     },
                // ],
            },
        ],
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
                <div
                    className={`transition-all duration-300 ${
                        isOpen
                            ? "opacity-100 max-h-12"
                            : "opacity-0 max-h-0 overflow-hidden"
                    }`}
                >
                    <SearchForm />
                </div>
            </SidebarHeader>

            <SidebarContent>
                {data.navMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel
                            className={`transition-opacity duration-300 ${
                                isOpen ? "opacity-100" : "opacity-0"
                            }`}
                        >
                            {item.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.length === 0 && (
                                    <span className="w-full text-center text-sm mt-2">
                                        Тут пока ничего нет...
                                    </span>
                                )}
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={item.isActive}
                                            className="transition-all duration-300"
                                        >
                                            <Link
                                                to={item.url}
                                                className={`flex items-center ${
                                                    isOpen
                                                        ? "px-3"
                                                        : "px-2 justify-center"
                                                }`}
                                            >
                                                <span
                                                    className={`transition-all duration-300 ${
                                                        isOpen
                                                            ? "opacity-100 w-auto"
                                                            : "opacity-0 w-0"
                                                    } truncate`}
                                                >
                                                    {item.title}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
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
