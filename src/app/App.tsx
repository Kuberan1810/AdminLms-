import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import { AuthProvider } from "../context/AuthContext";
import { ScheduleProvider } from "../context/InstructorNotification/ScheduleContext";
import { InstructorNotificationProvider } from "../context/InstructorNotification/InstructorNotificationContext";
import { NotificationProvider } from "../context/StudentNotification/NotificationContext";
import { Toaster } from "react-hot-toast";


function App() {
    return (
        <BrowserRouter>
            <Toaster position="top-right" />
            <NotificationProvider>
                <InstructorNotificationProvider>
                    <ScheduleProvider>
                        <AuthProvider>
                            <AppRoutes />
                        </AuthProvider>
                    </ScheduleProvider>
                </InstructorNotificationProvider>
            </NotificationProvider>
        </BrowserRouter>
    );
}

export default App;
