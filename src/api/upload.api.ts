import api from "."

export const UploadApi = {
    async uploadFile(formData: FormData) {
        return await api.post(`/upload`, formData)

    }
}