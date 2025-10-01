import { useStore } from "@/stores/useStore";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { Link, useParams } from "react-router";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "./ui/sidebar";
import { Input } from "./ui/input";
import { SearchInput } from "./SearchInput";

export const HistoryList = () => {
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 200);
    const history = useStore((state) => state.history);
    const { logName } = useParams();
    console.log("historylist");
    const isOpen = true;

    const filteredHistory = history.filter((item) => {
        if (!item.name.toLowerCase().includes(debouncedSearch.toLowerCase()))
            return;
        return item;
    });

    return (
        <SidebarGroup>
            <SearchInput
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
            />
            <SidebarGroupLabel
                className={`transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0"
                }`}
            >
                История
            </SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {history.length === 0 && (
                        <span className="w-full text-center text-sm mt-2">
                            Тут пока ничего нет...
                        </span>
                    )}
                    {history.length !== 0 && filteredHistory.length === 0 && (
                        <span className="w-full text-center text-sm mt-2">
                            Ничего не нашлось .-.
                        </span>
                    )}
                    {filteredHistory.map((item) => (
                        <SidebarMenuItem key={item.id}>
                            <SidebarMenuButton
                                asChild
                                isActive={
                                    logName?.toLowerCase() ===
                                    item.name.toLowerCase()
                                }
                                className="transition-all duration-300"
                            >
                                <Link
                                    to={item.id}
                                    className={`flex items-center ${
                                        isOpen ? "px-3" : "px-2 justify-center"
                                    }`}
                                >
                                    <span
                                        className={`transition-all duration-300 ${
                                            isOpen
                                                ? "opacity-100 w-auto"
                                                : "opacity-0 w-0"
                                        } truncate`}
                                    >
                                        {item.name}
                                    </span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};
