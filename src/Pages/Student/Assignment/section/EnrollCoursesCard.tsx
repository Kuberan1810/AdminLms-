import React from "react";
import { TickCircle, Timer1, InfoCircle } from "iconsax-react";

interface CourseData {
    id: string;
    code: string;
    title: string;
    completed: number;
    due: number;
    overdue: number;
}

interface EnrollCoursesCardProps {
    course: CourseData;
    isActive: boolean;
    onSelect: () => void;
}

const EnrollCoursesCard: React.FC<EnrollCoursesCardProps> = ({
    course,
    isActive,
    onSelect,
}) => {
    return (
        <div
            onClick={onSelect}
            className={`boxStyle snap-start transition-all duration-300 cursor-pointer h-full ${isActive
                ? "border-[#f16507]! bg-[#FFF5EE]! scale-[1.02] dark:bg-[#3a3a3a]! dark:border-[#f16507]! dark:text-white"
                : " dark:hover:bg-[#3a3a3a] dark:hover:text-gray-300"
                }`}
        >
            <h4 className="text-lg font-medium mb-5 ">
                {course.code} - {course.title}
            </h4>

            <div className="flex justify-between gap-4 text-sm text-gray-500 dark:text-gray-300">
                <div className="flex items-center gap-2">
                    <div className="rounded-full">
                        <TickCircle size="14"  color="#9CA3AF" />
                    </div>
                    <span>{course.completed} Completed</span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="rounded-full">
                        <Timer1 size="14"  color="#9CA3AF" />
                    </div>
                    <span>{course.due} Due</span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="rounded-full">
                        <InfoCircle size="14"  color="#9CA3AF" />
                    </div>
                    <span>{course.overdue} Overdue</span>
                </div>
            </div>
        </div>
    );
};

export default EnrollCoursesCard;
