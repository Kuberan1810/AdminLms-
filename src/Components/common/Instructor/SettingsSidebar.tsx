import { useState } from "react";
import {
    Bell,
    Mail,
    HelpCircle,
    FileText,
    Shield,
    ChevronRight,
    X,
    Headset
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../../context/AuthContext";
import ConfirmLogoutModal from "../../instructor/ConfirmLogoutModal";
import { useNavigate } from "react-router-dom";
import { SecuritySafe } from "iconsax-react";

interface SettingsSidebarProps {
    onClose: () => void;
}

const SettingsSidebar = ({ onClose }: SettingsSidebarProps) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [showConfirmLogout, setShowConfirmLogout] = useState(false);
    const [pushEnabled, setPushEnabled] = useState(true);
    const [emailEnabled, setEmailEnabled] = useState(false);

    /* ================= CONFIRM LOGOUT ================= */
    const handleConfirmLogout = () => {
        logout();                       // clear auth
        setShowConfirmLogout(false);    // close modal
        onClose();                      // close sidebar
        navigate("/login");             // redirect
    };

    return (
        <>
            {/* ================= Backdrop ================= */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 bg-black/30 z-[1000]"
                onClick={onClose}
            />

            {/* ================= Sidebar ================= */}
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
                className="fixed top-0 right-0 h-full w-full md:w-[420px] bg-white z-[1001] shadow-[-4px_0_24px_rgba(0,0,0,0.1)] flex flex-col"
            >
                {/* ================= Header ================= */}
                <div className="flex justify-between items-center px-6 py-5 border-b border-[#F2EEF4]">
                    <h2 className="text-[20px] md:text-2xl font-semibold text-[#333]">Settings</h2>
                    <button onClick={onClose} className="cursor-pointer">
                        <X size={22} color="#333" />
                    </button>
                </div>

                {/* ================= Scroll Content ================= */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">

                    {/* ================= Profile ================= */}
                    <div className="bg-white rounded-xl p-5 flex items-center gap-4 border border-[#F2EEF4]">
                        <div className="relative">
                            <img
                                src="https://randomuser.me/api/portraits/women/44.jpg"
                                alt="profile"
                                className="w-16 h-16 rounded-full object-cover"
                            />
                            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div>
                            <p className="font-medium">{user?.name}</p>
                            <p className="text-sm text-[#64748B] capitalize">
                                {user?.role}
                            </p>
                        </div>
                    </div>

                    {/* ================= Notifications ================= */}
                    <div>
                        <h3 className="text-base md:text-lg lg:text-xl text-[#626262] mb-3 font-medium">
                            Notifications
                        </h3>

                        <div className="bg-white rounded-xl divide-y divide-[#F2EEF4] border border-[#F2EEF4]">

                            {/* Push */}
                            <div className="flex justify-between items-center px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <Bell strokeWidth={1.5} size={20} color="#333" />
                                    <span className="text-base lg:text-lg text-[#333333] font-medium">
                                        Push Notification
                                    </span>
                                </div>

                                <button
                                    onClick={() => setPushEnabled(prev => !prev)}
                                    className={`w-12 h-6 flex items-center rounded-full p-1 transition cursor-pointer ${pushEnabled ? "bg-orange-500" : "bg-gray-300"
                                        }`}
                                >
                                    <div
                                        className={`bg-white w-5 h-5 rounded-full transition ${pushEnabled ? "translate-x-6" : "translate-x-0"
                                            }`}
                                    />
                                </button>
                            </div>

                            {/* Email */}
                            <div className="flex justify-between items-center px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <Mail strokeWidth={1.5} size={20} color="#333" />
                                    <span className="text-base lg:text-lg text-[#333333] font-medium">
                                        Email Notification
                                    </span>
                                </div>

                                <button
                                    onClick={() => setEmailEnabled(prev => !prev)}
                                    className={`w-12 h-6 flex items-center rounded-full p-1 transition cursor-pointer ${emailEnabled ? "bg-orange-500" : "bg-gray-300"
                                        }`}
                                >
                                    <div
                                        className={`bg-white w-5 h-5 rounded-full transition ${emailEnabled ? "translate-x-6" : "translate-x-0"
                                            }`}
                                    />
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* ================= Support & Legal ================= */}
                    <div>
                        <h3 className="text-base md:text-lg lg:text-xl text-[#626262] mb-3 font-medium">
                            Support & Legal
                        </h3>

                        <div className="bg-white rounded-xl divide-y divide-[#F2EEF4] border border-[#F2EEF4]">

                            <div className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <HelpCircle strokeWidth={1.5} size={20} color="#333" />
                                    <span className="text-base lg:text-lg text-[#333333] font-medium">
                                        Help Center
                                    </span>
                                </div>
                                <ChevronRight strokeWidth={1.5} size={18} color="#333" />
                            </div>

                            <div className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <Headset size={20} strokeWidth={1.5} color="#333" />
                                    <span className="text-base lg:text-lg text-[#333333] font-medium">
                                        Terms of Service
                                    </span>
                                </div>
                                <ChevronRight strokeWidth={1.5} size={18} color="#333" />
                            </div>

                            <div className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <SecuritySafe size={20} color="#333" />
                                    <span className="text-base lg:text-lg text-[#333333] font-medium">
                                        Privacy Policy
                                    </span>
                                </div>
                                <ChevronRight strokeWidth={1.5} size={18}  color="#333"/>
                            </div>

                        </div>
                    </div>

                    {/* ================= Logout ================= */}
                    <div className="flex justify-center">
                        <button
                            onClick={() => setShowConfirmLogout(true)}
                            className="w-full border border-red-600 text-red-600 py-3 rounded-lg hover:bg-red-50 transition font-medium cursor-pointer"
                        >
                            Log Out
                        </button>
                    </div>

                </div>
            </motion.div>

            {/* ================= Confirm Logout Modal ================= */}
            {showConfirmLogout && (
                <ConfirmLogoutModal
                    onCancel={() => setShowConfirmLogout(false)}
                    onConfirm={handleConfirmLogout}
                />
            )}
        </>
    );
};

export default SettingsSidebar;
