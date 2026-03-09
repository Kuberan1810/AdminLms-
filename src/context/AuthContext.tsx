import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useRef,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Role = "student" | "instructor";

export interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
    image?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes

const ACTIVITY_EVENTS = [
    "mousemove",
    "mousedown",
    "keypress",
    "touchstart",
    "scroll",
    "click",
] as const;

// ─── Token / Session Helpers ─────────────────────────────────────────────────

/**
 * Decodes a JWT payload and checks whether it has expired.
 * Signature is NOT verified here — that is the server's responsibility.
 */
function isTokenValid(token: string): boolean {
    try {
        const [, payload] = token.split(".");
        if (!payload) return false;

        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        const json = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );

        const { exp } = JSON.parse(json) as { exp?: number };
        if (!exp) return false;

        // Reject tokens that expire within the next 5 seconds
        return Date.now() < exp * 1000 - 5_000;
    } catch {
        return false;
    }
}

function saveSession(token: string, user: User): void {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(user));
}

function clearSession(): void {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
}

function loadSession(): { token: string; user: User } | null {
    const token = sessionStorage.getItem("token");
    const raw = sessionStorage.getItem("user");
    if (!token || !raw) return null;
    try {
        return { token, user: JSON.parse(raw) as User };
    } catch {
        return null;
    }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Purely derived — no extra state
    const isAuthenticated = user !== null;

    // ── Logout ─────────────────────────────────────────────────────────────────
    const logout = useCallback(() => {
        clearSession();
        setUser(null);
    }, []);

    // ── Inactivity timer ───────────────────────────────────────────────────────
    const clearInactivityTimer = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
    }, []);

    const resetInactivityTimer = useCallback(() => {
        clearInactivityTimer();
        timerRef.current = setTimeout(logout, INACTIVITY_TIMEOUT_MS);
    }, [logout, clearInactivityTimer]);

    useEffect(() => {
        if (!isAuthenticated) {
            clearInactivityTimer();
            return;
        }

        resetInactivityTimer();

        const handleActivity = () => resetInactivityTimer();
        ACTIVITY_EVENTS.forEach((e) => document.addEventListener(e, handleActivity));

        return () => {
            clearInactivityTimer();
            ACTIVITY_EVENTS.forEach((e) =>
                document.removeEventListener(e, handleActivity)
            );
        };
    }, [isAuthenticated, resetInactivityTimer, clearInactivityTimer]);

    // ── Restore session on mount (no extra API call) ───────────────────────────
    useEffect(() => {
        const session = loadSession();

        if (session && isTokenValid(session.token)) {
            setUser(session.user);
        } else {
            // Token missing or expired — wipe stale data
            clearSession();
        }

        setIsLoading(false);
    }, []);

    // ── Login ──────────────────────────────────────────────────────────────────
    const login = useCallback((token: string, userData: User) => {
        if (!isTokenValid(token)) {
            console.error("[Auth] Received an expired token — login aborted.");
            return;
        }
        saveSession(token, userData);
        setUser(userData);
    }, []);

    // ── Render ─────────────────────────────────────────────────────────────────
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
};