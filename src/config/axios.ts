import axios from "axios";
import { BASE_URL } from "./api";

// ─── Axios Instance ───────────────────────────────────────────────────────────

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "ngrok-skip-browser-warning": "true",
    },
});

// ─── Request Interceptor — attach Bearer token ────────────────────────────────

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ─── Response Interceptor — auto-logout on 401 ───────────────────────────────

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token rejected by server — wipe session and redirect to login
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            window.location.replace("/login");
        }
        return Promise.reject(error);
    }
);

export default api;
