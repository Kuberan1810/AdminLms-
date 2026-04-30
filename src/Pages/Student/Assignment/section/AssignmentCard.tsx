import React from "react";
import { CalendarTick } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import type { Assignment } from "../data/AssignmentData";
import { format } from "date-fns";
import { useMySubmission } from "../../../../hooks/useAssignments";

const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w-]+/g, '')    // Remove all non-word chars
        .replace(/--+/g, '-');      // Replace multiple - with single -
};

interface Props {
    item: Assignment;
    getStatusStyles: (status: string) => string;
}

const AssignmentCard: React.FC<Props> = ({ item, getStatusStyles }) => {
    const navigate = useNavigate();

    const { data: mySubmission, isSuccess } = useMySubmission(item.id);

    // Override status dynamically if mySubmission says we submitted!
    const effectiveStatus = (isSuccess && mySubmission && mySubmission.submitted_at) 
        ? (mySubmission.grade ? "Graded" : "Submitted") 
        : item.status;
    const isSubmitted = effectiveStatus === "Submitted" || effectiveStatus === "Submitted Late" || effectiveStatus === "Graded";

    const effectiveDeadline = (isSubmitted && mySubmission?.submitted_at)
        ? `Submitted on: ${format(new Date(mySubmission.submitted_at), "MMM dd, hh:mm a")}`
        : item.deadline;

    const handleClick = () => {
        const slug = slugify(item.title || "assignment");
        if (isSubmitted) {
            navigate(`/student/assignment/${slug}/view-submission`, { state: { assignmentId: item.id } });
        } else {
            navigate(`/student/assignment/${slug}`, { state: { assignmentId: item.id } });
        }
    };

    return (
        <div 
            onClick={handleClick}
            className={`boxStyle transition-all duration-300 hover:shadow-md cursor-pointer border hover:border-orange-200`}
        >

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

                {/* LEFT CONTENT */}
                <div className="flex-1">
                    <div className="flex flex-wrap sm:items-center sm:flex-row gap-2.5 sm:gap-7.5 mb-1.5">
                        <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#333333] dark:text-gray-300">
                            {item.title}
                        </h3>

                        <span
                            className={`text-[12px] px-2.5 py-1 rounded-full w-fit mb-2.5 font-medium ${getStatusStyles(
                                effectiveStatus
                            )}`}
                        >
                            {effectiveStatus}
                        </span>
                    </div>

                    <p className="text-[14px] sm:text-[16px] font-medium text-[#626262] mb-4 dark:text-gray-300">
                        {item.course}
                    </p>

                    <p className="text-[14px] text-[#626262] leading-relaxed md:line-clamp-1 line-clamp-2 dark:text-gray-300">
                        {item.description}
                    </p>
                </div>
                {/* RIGHT CONTENT */}
                <div className="flex flex-col items-start sm:items-end gap-3 w-full lg:w-auto min-w-50">

                    <div className="flex items-center gap-2 text-[#626262]">
                        <div className="iconStyle">
                            <CalendarTick size="16" color="currentColor" />
                        </div>
                        <span className="text-[12px] md:text-base font-medium dark:text-gray-200">
                            {effectiveDeadline}
                        </span>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent card click
                            handleClick();
                        }}
                        className={`w-full sm:w-44 py-2.5 rounded-2xl text-sm font-semibold tracking-wider transition-all bg-[#F67300] text-white hover:opacity-90 cursor-pointer`}
                    >
                        {isSubmitted ? "View Submission" : "View Assignment"}
                    </button>

                </div>
            </div>

        </div>
    );
};

export default AssignmentCard;