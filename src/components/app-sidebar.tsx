import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar";
import { useState, useCallback, memo, useEffect } from "react";
import { useParams } from "react-router";
import { FilesUploader } from "./FilesUploader";
import { HistoryList } from "./HistoryList";
import { http } from "@/lib/http";
import { useHistory } from "@/stores/useHistory";

// Мемоизируем тяжелые компоненты
const MemoizedFilesUploader = memo(FilesUploader);
const MemoizedHistoryList = memo(HistoryList);

// Выносим константы
const SIDEBAR_WIDTH_OPEN = 320; // px
const SIDEBAR_WIDTH_CLOSED = 80; // px
const TRANSITION_DURATION = 300; // ms

export const AppSidebar = memo(function AppSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    const [isOpen, setIsOpen] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // useCallback для стабильной ссылки
    const toggleSidebar = useCallback(() => {
        setIsTransitioning(true);
        setIsOpen(!isOpen);
    }, [isOpen]);

    // Сбрасываем флаг transitioning после анимации
    useEffect(() => {
        if (isTransitioning) {
            const timer = setTimeout(() => {
                setIsTransitioning(false);
            }, TRANSITION_DURATION);
            return () => clearTimeout(timer);
        }
    }, [isTransitioning]);

    // Используем transform вместо width для анимации
    const sidebarStyle = {
        transform: isOpen
            ? "translateX(0)"
            : `translateX(-${SIDEBAR_WIDTH_OPEN - SIDEBAR_WIDTH_CLOSED}px)`,
        width: `${SIDEBAR_WIDTH_OPEN}px`,
        minWidth: `${SIDEBAR_WIDTH_OPEN}px`,
        transition: `transform ${TRANSITION_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        willChange: "transform", // Подсказка браузеру для оптимизации
    } as React.CSSProperties;

    return (
        <Sidebar
            {...props}
            style={sidebarStyle}
            className="relative overflow-hidden sticky"
        >
            {/* Затемнение контента при анимации */}
            {isTransitioning && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] z-10" />
            )}

            <SidebarHeader className="relative z-20">
                <div className="pl-2 flex justify-between items-center min-h-[40px]">
                    <h1
                        className={`font-extrabold transition-all duration-200 ${
                            isOpen
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-4 pointer-events-none"
                        }`}
                        style={{
                            transitionDelay: isOpen ? "100ms" : "0ms",
                        }}
                    >
                        ROOTLY
                    </h1>
                </div>
            </SidebarHeader>

            <SidebarContent className="relative z-20">
                <div
                    className={
                        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }
                >
                    <MemoizedHistoryList />
                </div>
            </SidebarContent>

            <SidebarFooter className="relative z-20">
                <div
                    className={
                        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }
                >
                    <MemoizedFilesUploader />
                </div>
            </SidebarFooter>
        </Sidebar>
    );
});

{
    /* <SidebarHeader>
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
                </div>
</SidebarHeader> */
}
