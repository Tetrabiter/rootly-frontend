import { useState } from "react";
import {
    Dropzone,
    DropzoneContent,
    DropzoneEmptyState,
    type DropzoneProps,
} from "./ui/shadcn-io/dropzone";
import ky from "ky";

export const FilesUploader = ({ className }: DropzoneProps) => {
    const [files, setFiles] = useState<File[] | undefined>();
    const handleDrop = (files: File[]) => {
        // console.log(files);
        setFiles(files);
        const formData = new FormData();
        formData.append('file', files[0])
        ky.post(
            "https://lopsidedly-empowering-squirrelfish.cloudpub.ru/api/upload",
            {
                body: formData,
            }
        );
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
