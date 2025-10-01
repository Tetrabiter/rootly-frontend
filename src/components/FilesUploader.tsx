import { useState } from "react";
import {
    Dropzone,
    DropzoneContent,
    DropzoneEmptyState,
    type DropzoneProps,
} from "./ui/shadcn-io/dropzone";

export const FilesUploader = ({ className }: DropzoneProps) => {
    const [files, setFiles] = useState<File[] | undefined>();
    const handleDrop = (files: File[]) => {
        console.log(files);
        setFiles(files);
    };
    return (
        <Dropzone
            maxSize={1024 * 1024 * 10}
            minSize={1024}
            maxFiles={10}
            onDrop={handleDrop}
            onError={console.error}
            src={files}
            className={className}
        >
            <DropzoneEmptyState />
            <DropzoneContent />
        </Dropzone>
    );
};
