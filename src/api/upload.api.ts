import api from "."

export const UploadApi = {
    async uploadFile(formData: FormData) {
        return await api.post(`/upload/file`, formData)
    },
    async uploadCode(code: string) {
        return await api.post(`/upload/text`, code)
    }
}