import { useStore } from "@/stores/useStore";
import { SidebarTrigger } from "./ui/sidebar";
import { useParams } from "react-router";
import { Breadcrumb } from "./ui/breadcrumb";
import { Separator } from "./ui/separator";

export const AppHeader = () => {
    const { logId } = useParams();
    const history = useStore((state) => state.history);
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            {logId && (
                <>
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <Breadcrumb>
                        {history.find((item) => item.id === logId)?.name}
                    </Breadcrumb>
                </>
            )}
        </header>
    );
};
