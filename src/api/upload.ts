import { useMutation, useQuery } from "@tanstack/react-query";
import { UploadApi } from "./upload.api";

export function usePostFileMutation() {
    return useMutation({
        mutationFn: (formData: FormData) => UploadApi.uploadFile(formData),
    });
}
