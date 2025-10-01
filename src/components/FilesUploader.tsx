import { useState } from "react";
import {
    Dropzone,
    DropzoneContent,
    DropzoneEmptyState,
    type DropzoneProps,
} from "./ui/shadcn-io/dropzone";
import {
    Loader2,
    FileText,
    CheckCircle2,
    XCircle,
    AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { http } from "@/lib/http";

// Тип для статуса загрузки
type UploadStatus = "idle" | "uploading" | "success" | "error";

export const FilesUploader = ({ className }: DropzoneProps) => {
    const [files, setFiles] = useState<File[] | undefined>();
    const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleDrop = async (files: File[]) => {
        // Валидация JSON файлов
        const invalidFiles = files.filter((file) => {
            const extension = file.name.split(".").pop()?.toLowerCase();
            return extension !== "json";
        });

        if (invalidFiles.length > 0) {
            setErrorMessage(
                `Можно загружать только JSON файлы. Неверные файлы: ${invalidFiles
                    .map((f) => f.name)
                    .join(", ")}`
            );
            setUploadStatus("error");
            return;
        }

        setFiles(files);
        setUploadStatus("uploading");
        setUploadProgress(0);
        setErrorMessage("");

        try {
            const formData = new FormData();
            formData.append("file", files[0]);

            // Симуляция прогресса (в реальном проекте используйте onUploadProgress)
            const progressInterval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 200);

            await http.post("api/upload", {
                body: formData,
            });

            clearInterval(progressInterval);
            setUploadProgress(100);
            setUploadStatus("success");

            // Автоматически сбрасываем статус через 3 секунды
            setTimeout(() => {
                setUploadStatus("idle");
                setUploadProgress(0);
            }, 3000);
        } catch (error) {
            setUploadStatus("error");
            setErrorMessage(
                error instanceof Error
                    ? `Ошибка загрузки: ${error.message}`
                    : "Произошла неизвестная ошибка при загрузке файла"
            );
        }
    };

    const handleRemoveFile = () => {
        setFiles(undefined);
        setUploadStatus("idle");
        setUploadProgress(0);
        setErrorMessage("");
    };

    const getStatusIcon = () => {
        switch (uploadStatus) {
            case "uploading":
                return <Loader2 className="h-4 w-4 animate-spin" />;
            case "success":
                return <CheckCircle2 className="h-4 w-4 text-green-500" />;
            case "error":
                return <XCircle className="h-4 w-4 text-red-500" />;
            default:
                return <FileText className="h-4 w-4" />;
        }
    };

    const getStatusColor = () => {
        switch (uploadStatus) {
            case "uploading":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "success":
                return "bg-green-100 text-green-800 border-green-200";
            case "error":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    return (
        <div className="space-y-4">
            <Dropzone
                maxSize={1024 * 1024 * 10} // 10MB
                minSize={1024} // 1KB
                maxFiles={1}
                onDrop={handleDrop}
                onError={(error) => {
                    console.error("Dropzone error:", error);
                    setUploadStatus("error");
                    setErrorMessage("Ошибка при обработке файла");
                }}
                accept={{
                    "application/json": [".json"],
                }}
                disabled={uploadStatus === "uploading"}
                className={className}
            >
                <DropzoneEmptyState
                    icon={getStatusIcon()}
                    label={
                        uploadStatus === "uploading"
                            ? "Загрузка..."
                            : "Перетащите JSON файл сюда или нажмите для выбора"
                    }
                    description="Поддерживаются только JSON файлы (макс. 10MB)"
                />
                <DropzoneContent />
            </Dropzone>

            {/* Статус загрузки */}
            {uploadStatus !== "idle" && (
                <div className="space-y-3">
                    {/* Прогресс бар */}
                    {uploadStatus === "uploading" && (
                        <Progress value={uploadProgress} className="w-full" />
                    )}

                    {/* Информация о файле */}
                    {files && files.length > 0 && (
                        <div
                            className={`p-3 rounded-lg border ${getStatusColor()} transition-colors`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    {getStatusIcon()}
                                    <span className="text-sm font-medium truncate">
                                        {files[0].name}
                                    </span>
                                    <Badge
                                        variant="secondary"
                                        className="text-xs"
                                    >
                                        {(files[0].size / 1024 / 1024).toFixed(
                                            2
                                        )}{" "}
                                        MB
                                    </Badge>
                                </div>
                                {uploadStatus !== "uploading" && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleRemoveFile}
                                        className="h-6 w-6 p-0 hover:bg-white/50"
                                    >
                                        <XCircle className="h-3 w-3" />
                                    </Button>
                                )}
                            </div>

                            {/* Статус */}
                            <div className="mt-2 text-xs">
                                {uploadStatus === "uploading" && (
                                    <span>Загрузка... {uploadProgress}%</span>
                                )}
                                {uploadStatus === "success" && (
                                    <span className="text-green-600">
                                        Файл успешно загружен!
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Сообщение об ошибке */}
                    {errorMessage && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{errorMessage}</AlertDescription>
                        </Alert>
                    )}

                    {/* Кнопка повторной загрузки при ошибке */}
                    {uploadStatus === "error" && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleRemoveFile}
                            className="w-full"
                        >
                            Попробовать снова
                        </Button>
                    )}
                </div>
            )}

            {/* Подсказка */}
            <div className="text-xs text-muted-foreground text-center">
                Поддерживаются только JSON файлы. Максимальный размер: 10MB
            </div>
        </div>
    );
};
