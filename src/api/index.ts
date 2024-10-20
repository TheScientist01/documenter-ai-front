import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const api = axios.create({
    // @ts-ignore
    baseURL: backendUrl ?? "http://localhost:8000",
});

export default api;
