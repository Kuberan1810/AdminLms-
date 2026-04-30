import axios, {
    type AxiosError,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
} from "axios";
import { BASE_URL } from "./api";

// ─── Types ────────────────────────────────────────────────────────────────────

type LogoutHandler = () => void;

// ─── Logout Handler Registry ──────────────────────────────────────────────────

let _logoutHandler: LogoutHandler | null = null;

/**
 * Register a router-aware logout handler (e.g. from your React Router context).
 * Falls back to hard redirect if not registered.
 *
 * @example
 *   // In your App.tsx or AuthProvider
 *   const navigate = useNavigate();
 *   setLogoutHandler(() => {
 *     clearAuthTokens();
 *     navigate("/login", { replace: true });
 *   });
 */
export function setLogoutHandler(fn: LogoutHandler): void {
    _logoutHandler = fn;
}

// ─── Token Helpers ────────────────────────────────────────────────────────────

/** Single source of truth: sessionStorage is authoritative; localStorage is never written. */
export function getAuthToken(): string | null {
    return sessionStorage.getItem("token") ?? localStorage.getItem("token");
}

/** Remove all auth-related keys from both storages atomically. */
export function clearAuthTokens(): void {
    const KEYS = ["token", "user"] as const;
    for (const key of KEYS) {
        sessionStorage.removeItem(key);
        localStorage.removeItem(key);
    }
}

// ─── Axios Instance ───────────────────────────────────────────────────────────

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "ngrok-skip-browser-warning": "true",
    },
});

// ─── Request Interceptor ──────────────────────────────────────────────────────

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const token = getAuthToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────────────────────

api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,

    (error: AxiosError): Promise<never> => {
        if (error.response) {
            handleHttpError(error.response.status);
        } else if (error.request) {
            console.error("[api] Network / CORS error:", error.message);
        } else {
            console.error("[api] Request setup error:", error.message);
        }
        return Promise.reject(error);
    }
);

// ─── HTTP Error Handlers ──────────────────────────────────────────────────────

function handleHttpError(status: number): void {
    switch (status) {
        case 401:
            return handleUnauthorized();
        case 403:
            console.warn("[api] 403 Forbidden: insufficient permissions.");
            return;
        default:
            return;
    }
}

function handleUnauthorized(): void {
    console.warn("[api] 401 Unauthorized — clearing session.");
    clearAuthTokens();

    if (_logoutHandler) {
        _logoutHandler();
    } else {
        // Fallback: hard redirect when no SPA handler is registered yet
        window.location.replace("/login");
    }
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default api;