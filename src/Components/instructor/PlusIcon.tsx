import React from "react";
import { AddCircle } from "iconsax-react";

interface PlusIconProps {
  onClick?: () => void;
  className?: string;
}

const PlusIcon: React.FC<PlusIconProps> = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center p-2 sm:p-2.5 rounded-[12px] bg-white border border-[#F2EEF4] cursor-pointer  ${className}`}
    >
      <AddCircle size={24} color="#F67300" variant="Bulk" />
    </button>
  );
};

export default PlusIcon;
