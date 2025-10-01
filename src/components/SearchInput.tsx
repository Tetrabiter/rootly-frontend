import type {
    ComponentProps,
    HTMLAttributes,
    HTMLInputTypeAttribute,
} from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { SidebarInput } from "./ui/sidebar";
import { Search } from "lucide-react";

export const SearchInput = (props: ComponentProps<"input">) => {
    return (
        <div className="flex relative">
            <Input
                id="search"
                placeholder="Поиск..."
                className="pl-8"
                {...props}
            />
            <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
        </div>
    );
};
