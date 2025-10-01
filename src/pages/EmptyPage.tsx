import { FilesUploader } from "@/components/FilesUploader";
import { Card } from "@/components/ui/card";

export const EmptyPage = () => {
    // const logName =
    return <div className="flex h-full justify-center items-center p-4">
        <FilesUploader className="h-full w-full max-h-200 max-w-300"/>
    </div>;
};
