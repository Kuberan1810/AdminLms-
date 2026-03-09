import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
    allowedRole: "student" | "instructor";
}

const ProtectedRoute = ({ allowedRole }: Props) => {
    const { user, isAuthenticated, isLoading } = useAuth();

    // ⏳ Wait for session restore before making any redirect decision
    if (isLoading) {
        return null; // or a spinner: <FullPageSpinner />
    }

    // 🔒 Not logged in
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // 🔒 Wrong role
    if (user?.role !== allowedRole) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
