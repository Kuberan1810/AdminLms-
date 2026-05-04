import { useState } from "react";
import {
    Bell,
    Mail,
    HelpCircle,
    ChevronRight,
    ArrowLeft,
    Headset,
    LogOut,
    ShieldAlert
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../../context/AuthContext";
import ConfirmLogoutModal from "../../instructor/ConfirmLogoutModal";
import { useNavigate } from "react-router-dom";
import avatarImg from "../../../assets/avatar.jpg";

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
                className="fixed inset-0 bg-black/20 z-[1000]"
                onClick={onClose}
            />

            {/* ================= Sidebar ================= */}
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
                className="fixed top-0 right-0 h-full w-full md:w-[420px] bg-[#FAFAFA] dark:bg-[#1E1E1E] z-[1001] shadow-[-4px_0_24px_rgba(0,0,0,0.1)] flex flex-col"
            >
                {/* ================= Header ================= */}
                <div className="flex items-center gap-4 px-6 py-5">
                    <button onClick={onClose} className="cursor-pointer text-[#333] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2D2D2D] p-2 rounded-full transition-colors">
                        <ArrowLeft size={24} color="currentColor" />
                    </button>
                    <h2 className="text-[24px] font-medium text-[#0F172A] dark:text-white">Settings</h2>
                </div>

                {/* ================= Scroll Content ================= */}
                <div className="flex-1 overflow-y-auto px-6 py-2 space-y-8">

                    {/* ================= Profile Card ================= */}
                    <div className="bg-white dark:bg-[#2A2A2A] rounded-[10px] p-[10px] flex items-center gap-5">
                        <div className="relative">
                            <img
                                src={avatarImg}
                                alt="profile"
                                className="w-[84px] h-[84px] rounded-full object-cover border-[1px] border-[#E5E5E5] dark:border-[#2A2A2A]"
                            />
                            <span className="absolute bottom-1 right-1 w-[18px] h-[18px] bg-[#3EA465] border-[3px] border-white dark:border-[#2A2A2A] rounded-full"></span>
                        </div>
                        <div>
                            <p className="text-[20px] font-medium text-[#333333] dark:text-white leading-tight">
                                {user?.name || "Name of the admin"}
                            </p>
                            <p className="text-[16px] text-[#64748B] dark:text-[#A0A0A0] mt-1">
                                {user?.role || "admin"}
                            </p>
                        </div>
                    </div>

                    {/* ================= Notifications Section ================= */}
                    <div className="space-y-4">
                        <h3 className="text-[24px] text-[#64748B] dark:text-[#94A3B8] font-medium px-1">
                            Notifications
                        </h3>

                        <div className="space-y-[12px]">
                            {/* Push Notification */}
                            <div className="flex justify-between items-center p-[15px] rounded-[10px] border border-[#E5E5E5] dark:border-[#3B3B3B]">
                                <div className="flex items-center gap-4">
                                    <Bell size={22} className="text-[#333333] dark:text-[#94A3B8]" strokeWidth={1.5} />
                                    <span className="text-[24px] text-[#333333] dark:text-white font-medium">
                                        Push Notification
                                    </span>
                                </div>
                                <button
                                    onClick={() => setPushEnabled(!pushEnabled)}
                                    className={`relative w-[48px] h-[24px] rounded-full transition-colors duration-200 cursor-pointer ${pushEnabled ? "bg-[#F67300]" : "bg-[#CBD5E1] dark:bg-[#475569]"}`}
                                >
                                    <div className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-white rounded-full transition-transform duration-200 ${pushEnabled ? "translate-x-[24px]" : "translate-x-0"}`} />
                                </button>
                            </div>

                            {/* Email Notification */}
                            <div className="flex justify-between items-center p-[15px] rounded-[10px] border border-[#E5E5E5] dark:border-[#3B3B3B]">
                                <div className="flex items-center gap-4">
                                    <Mail size={22} className="text-[#333333] dark:text-[#94A3B8]" strokeWidth={1.5} />
                                    <span className="text-[24px] text-[#333333] dark:text-white font-medium">
                                        Email Notification
                                    </span>
                                </div>
                                <button
                                    onClick={() => setEmailEnabled(!emailEnabled)}
                                    className={`relative w-[48px] h-[24px] rounded-full transition-colors duration-200 cursor-pointer ${emailEnabled ? "bg-[#F67300]" : "bg-[#CBD5E1] dark:bg-[#475569]"}`}
                                >
                                    <div className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] bg-white rounded-full transition-transform duration-200 ${emailEnabled ? "translate-x-[24px]" : "translate-x-0"}`} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ================= Support & Legal Section ================= */}
                    <div className="space-y-4">
                        <h3 className="text-[24px] text-[#64748B] dark:text-[#94A3B8] font-medium px-1">
                            Support & Legal
                        </h3>

                        <div className="space-y-[12px]">
                            {[
                                { icon: HelpCircle, label: "Help Center" },
                                { icon: Headset, label: "Terms of Service" },
                                { icon: ShieldAlert, label: "Privacy Policy" },
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex justify-between items-center p-[15px] rounded-[10px] border border-[#E5E5E5] dark:border-[#3B3B3B] hover:bg-gray-50 dark:hover:bg-[#333] cursor-pointer transition-colors group"
                                >
                                    <div className="flex items-center gap-4">
                                        <item.icon size={22} className="text-[#333333] dark:text-[#94A3B8]" strokeWidth={1.5} />
                                        <span className="text-[24px] text-[#333333] dark:text-white font-medium">
                                            {item.label}
                                        </span>
                                    </div>
                                    <ChevronRight size={20} className="text-[#CBD5E1] dark:text-[#475569] group-hover:text-[#64748B] transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ================= Logout Button ================= */}
                    <div className="pt-4">
                        <button
                            onClick={() => setShowConfirmLogout(true)}
                            className="w-full flex items-center justify-center gap-3 border-[1.5px] border-[#F67300] text-[#F67300] py-3 rounded-[12px] hover:bg-orange-50 dark:hover:bg-[#F67300]/10 transition-all font-bold cursor-pointer"
                        >
                            <LogOut size={20} />
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
