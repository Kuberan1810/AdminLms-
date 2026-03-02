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
            className="flex items-center gap-2 px-3 py-1.5 border w-fit h-fit border-[#F2EEF4] rounded-[10px] bg-white hover:bg-[#fafafa] text-[14px] font-medium text-[#808080] cursor-pointer"
        >
            {icon && iconPosition === "left" && icon}
            {label}
            {icon && iconPosition === "right" && icon}
        </button>
    );
};

export default BtnCom;
