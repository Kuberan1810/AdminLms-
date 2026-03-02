import { useNavigate } from "react-router-dom";
import {
    People,
    DocumentText,
    UserAdd,
    NotificationBing,
    ClipboardText,
    Teacher,
} from "iconsax-react";
import { ChevronRight, X } from "lucide-react";
import { motion } from "framer-motion";

interface QuickActionsModalProps {
    onClose: () => void;
    onAction: (action: string) => void;
}

const QuickActionsModal = ({ onClose, onAction }: QuickActionsModalProps) => {
    const navigate = useNavigate();

    const actions = [
        { title: "New class", icon: <People size={16} color="#F67300" variant="Outline" /> },
        { title: "New Courses", icon: <DocumentText size={16} color="#F67300" variant="Outline" /> },
        { title: "New Student", icon: <UserAdd size={16} color="#F67300" variant="Outline" /> },
        { title: "Announcement", icon: <NotificationBing size={20} color="#F67300" variant="Outline" /> },
        { title: "Assignment", icon: <ClipboardText size={20} color="#F67300" variant="Outline" /> },
        { title: "Test", icon: <Teacher size={20} color="#F67300" variant="Outline" /> },
    ];

    const handleAction = (title: string) => {
        onClose();
        const action = title.toLowerCase().trim();

        switch (action) {
            case "new class":
                navigate("/instructor/create-class");
                break;
            case "new courses":
                navigate("/instructor/create-course");
                break;
            case "new student":
                navigate("/instructor/add-student");
                break;
            case "announcement":
                navigate("/instructor/create-announcement");
                break;
            case "assignment":
                navigate("/instructor/create-assignment");
                break;
            case "test":
                navigate("/instructor/create-test");
                break;
            default:
                onAction(title);
        }
    };

    return (
        <>
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 bg-black/30 z-[1100]"
                onClick={onClose}
            />

            {/* RIGHT SIDE SLIDING PANEL */}
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 220, damping: 28 }}
                className="fixed top-0 right-0 h-full w-[420px] bg-white z-[1101] shadow-[-4px_0_24px_rgba(0,0,0,0.1)] flex flex-col px-[50px] py-[20px]"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-[32px] right-[32px] p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                >
                    <X size={28} color="#626262" />
                </button>

                {/* Header */}
                <div className="flex flex-col  mt-4">
                    <h2 className="text-[20px] md:text-2xl font-semibold text-[#333]">
                        Quick Actions
                    </h2>
                    <p className="text-[16px] text-[#626262] font-medium">
                        What would you like to create?
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-[16px] w-full mt-8">
                    {actions.map((action, index) => (
                        <button
                            key={index}
                            onClick={() => handleAction(action.title)}
                            className="w-full flex items-center justify-between p-[12px] pr-[20px] rounded-[20px] border border-[#EEEEEE] hover:bg-gray-50 transition-all group cursor-pointer"
                        >
                            <div className="flex items-center gap-[20px]">
                                <div className="p-3 rounded-[14px] bg-[#FFF5ED] flex items-center justify-center group-hover:scale-105 transition-transform">
                                    <div className="scale-125 flex items-center justify-center">
                                        {action.icon}
                                    </div>
                                </div>
                                <span className=" font-semibold text-[#333333]">
                                    {action.title}
                                </span>
                            </div>
                            <ChevronRight color="#626262" size={24} strokeWidth={1.5} />
                        </button>
                    ))}
                </div>
            </motion.div>
        </>
    );
};

export default QuickActionsModal;
