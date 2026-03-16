import React from "react";

interface BtnComProps {
    label?: string;
    onClick?: () => void;
    icon?: React.ReactNode; // 👈 
    iconPosition?: "left" | "right"
}

const BtnCom: React.FC<BtnComProps> = ({
    label = "View",
    onClick,
    icon,
    iconPosition = "left",
}) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 px-3 py-1.5 border w-fit h-fit border-[#F2EEF4] dark:border-[#363636] rounded-[10px] bg-white dark:bg-[#2A2A2A] hover:bg-[#fafafa] dark:hover:bg-[#363636] text-[14px] font-medium text-[#808080] dark:text-gray-300 cursor-pointer transition-colors"
        >
            {icon && iconPosition === "left" && icon}
            {label}
            {icon && iconPosition === "right" && icon}
        </button>
    );
};

export default BtnCom;
