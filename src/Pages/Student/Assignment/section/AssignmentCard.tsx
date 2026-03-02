import React from "react";
import { CalendarTick } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import type { Assignment } from "../data/AssignmentData";

interface Props {
    item: Assignment;
    getStatusStyles: (status: string) => string;
}

const AssignmentCard: React.FC<Props> = ({ item, getStatusStyles }) => {
    const navigate = useNavigate();

    const isLocked =
        item.status === "Submitted" || item.status === "Submitted Late";

    return (
        <div className="boxStyle">

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

                {/* LEFT CONTENT */}
                <div className="flex-1">
                    <div className="flex flex-wrap sm:items-center sm:flex-row gap-2.5 sm:gap-7.5 mb-1.5">
                        <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#333333]">
                            {item.title}
                        </h3>

                        <span
                            className={`text-[12px] px-2.5 py-1 rounded-full w-fit mb-2.5 font-medium ${getStatusStyles(
                                item.status
                            )}`}
                        >
                            {item.status}
                        </span>
                    </div>

                    <p className="text-[14px] sm:text-[16px] font-medium text-[#626262] mb-4">
                        {item.course}
                    </p>

                    <p className="text-[14px] text-[#626262] leading-relaxed md:line-clamp-1 line-clamp-2 ">
                        {item.description}
                    </p>
                </div>
                {/* RIGHT CONTENT */}
                <div className="flex flex-col items-start sm:items-end gap-3 w-full lg:w-auto min-w-50">

                    <div className="flex items-center gap-2 text-[#626262]">
                        <div className="iconStyle">
                            <CalendarTick size="16" color="#626262" />
                        </div>
                        <span className="text-[12px] md:text-base font-medium">
                            {item.deadline}
                        </span>
                    </div>

                    <button
                        onClick={
                            !isLocked
                                ? () => navigate(`/student/assignment/${item.id}`)
                                : undefined
                        }
                        disabled={isLocked}
                        className={`w-full sm:w-44 py-2.5 rounded-2xl text-sm font-semibold tracking-wider transition-all ${isLocked
                            ? "bg-[#F4F4F4] text-[#808080] cursor-not-allowed"
                            : "bg-[#F67300] text-white hover:opacity-90 cursor-pointer"
                            }`}
                    >
                        {isLocked ? item.status : "View Assignment"}
                    </button>

                </div>
            </div>

        </div>
    );
};

export default AssignmentCard;