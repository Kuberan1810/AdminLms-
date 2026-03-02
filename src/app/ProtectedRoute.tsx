import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
    allowedRole: "student" | "instructor";
}

const ProtectedRoute = ({ allowedRole }: Props) => {
    const { user, isAuthenticated } = useAuth();

    // 🔒 NOT LOGGED IN
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // 🔒 WRONG ROLE
    if (user?.role !== allowedRole) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
