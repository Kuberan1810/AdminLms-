import { createContext, useContext, useState } from "react";

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
    setUser: (user: User | null) => void;
    isAuthenticated: boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    const [user, setUser] = useState<User | null>(
        storedUser && storedToken ? JSON.parse(storedUser) : null
    );

    const isAuthenticated = !!user && !!storedToken;

    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
