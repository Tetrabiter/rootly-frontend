"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Search,
    MessageSquare,
    MoreVertical,
    Filter,
    Plus,
    Archive,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface LogItem {
    id: string;
    title: string;
    preview: string;
    timestamp: string;
    unread?: boolean;
    type: "error" | "warning" | "info" | "success";
}

export interface SidebarProps {
    className?: string;
    logs?: LogItem[];
    selectedLogId?: string;
    onLogClick?: (log: LogItem) => void;
    onSearch?: (query: string) => void;
    onNewChat?: () => void;
}

const defaultLogs: LogItem[] = [
    {
        id: "1",
        title: "Ошибка авторизации",
        preview: "Пользователь не смог войти в систему...",
        timestamp: "10:30",
        unread: true,
        type: "error",
    },
    {
        id: "2",
        title: "Предупреждение системы",
        preview: "Загрузка CPU превышает 80%...",
        timestamp: "09:15",
        unread: false,
        type: "warning",
    },
    {
        id: "3",
        title: "Информационное сообщение",
        preview: "Резервное копирование завершено...",
        timestamp: "Вчера",
        unread: false,
        type: "info",
    },
    {
        id: "4",
        title: "Успешная операция",
        preview: "Данные успешно синхронизированы...",
        timestamp: "Вчера",
        unread: false,
        type: "success",
    },
    {
        id: "5",
        title: "Критическая ошибка",
        preview: "Сервер базы данных недоступен...",
        timestamp: "25 окт",
        unread: true,
        type: "error",
    },
];

const getTypeStyles = (type: LogItem["type"]) => {
    const styles = {
        error: "bg-red-100 text-red-800 border-red-200",
        warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
        info: "bg-blue-100 text-blue-800 border-blue-200",
        success: "bg-green-100 text-green-800 border-green-200",
    };
    return styles[type];
};

export function Sidebar({
    className,
    logs = defaultLogs,
    selectedLogId,
    onLogClick,
    onSearch,
    onNewChat,
}: SidebarProps) {
    const [searchQuery, setSearchQuery] = React.useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch?.(query);
    };

    const filteredLogs = logs.filter(
        (log) =>
            log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.preview.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div
            className={cn("flex flex-col h-full bg-white border-r", className)}
        >
            {/* Заголовок с логотипом и действиями */}
            <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <MessageSquare className="h-4 w-4 text-white" />
                        </div>
                        <div>
                            <h1 className="font-semibold text-lg">
                                Логи системы
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Все события
                            </p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onNewChat}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>

                {/* Поиск и фильтры */}
                <div className="space-y-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Поиск логов..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className="pl-9"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                            <Filter className="h-3 w-3 mr-2" />
                            Фильтры
                        </Button>
                        <Button variant="outline" size="sm">
                            <Archive className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Список логов */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-2">
                    {filteredLogs.map((log) => (
                        <div
                            key={log.id}
                            className={cn(
                                "relative p-3 rounded-lg cursor-pointer transition-colors mb-1 border",
                                selectedLogId === log.id
                                    ? "bg-blue-50 border-blue-200"
                                    : "bg-white border-transparent hover:bg-gray-50",
                                log.unread && "bg-gray-50"
                            )}
                            onClick={() => onLogClick?.(log)}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3 flex-1 min-w-0">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-medium text-sm truncate">
                                                {log.title}
                                            </h3>
                                        </div>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {log.preview}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-2">
                                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                                        {log.timestamp}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                    >
                                        <MoreVertical className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>

                            {/* Бейдж типа лога */}
                            <div
                                className={cn(
                                    "inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 border",
                                    getTypeStyles(log.type)
                                )}
                            >
                                {log.type === "error" && "Ошибка"}
                                {log.type === "warning" && "Предупреждение"}
                                {log.type === "info" && "Информация"}
                                {log.type === "success" && "Успех"}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Статус бар */}
            <div className="p-3 border-t bg-gray-50">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Всего логов: {logs.length}</span>
                    <span>
                        Ошибок: {logs.filter((l) => l.type === "error").length}
                    </span>
                </div>
            </div>
        </div>
    );
}

// Компактная версия для мобильных устройств
export function MobileSidebar({ className, ...props }: SidebarProps) {
    return (
        <div className={cn("w-80", className)}>
            <Sidebar {...props} />
        </div>
    );
}
