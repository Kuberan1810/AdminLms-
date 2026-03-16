import { Clock, TaskSquare } from "iconsax-react";
import type { Course } from "./EnrollCoursesType";

interface Props {
    course: Course;
    onClick?: () => void;
}

function EnrolledClassesCard({ course, onClick }: Props) {
    return (
        <div
            onClick={onClick}
            className={`boxStyle h-full  ${onClick ? "cursor-pointer" : ""}`}
        >
            {/* ===== Title ===== */}
            <h4 className="text-lg  md:text-xl font-medium mb-5 text-primary dark:text-white">
                {course.course_id} - {course.course_name}
            </h4>

            {/* ===== Meta Info ===== */}
            <div className="flex gap-5 text-xs text-gray-500 dark:text-[#A3A3A3] mb-4">
                <div className="flex gap-1.5 justify-between items-center">
                    <div className="iconStyle dark:bg-[#3B3B3B] dark:border-[#4B4B4B]">
                        <Clock size="16" color="currentColor"/>
                    </div>
                    <span className="text-[14px]">
                        {course.duration_months} Months
                    </span>
                </div>

                <div className="flex gap-1.5 justify-between items-center">
                    <div className="iconStyle dark:bg-[#3B3B3B] dark:border-[#4B4B4B]">
                        <TaskSquare size="16" className="text-[#626262] dark:text-white"  color="currentColor" />
                    </div>
                    <span className="text-[14px]">
                        {course.total_lessons} Lessons
                    </span>
                </div>
            </div>

            {/* ===== Status ===== */}
            <div className="bg-[#2A9A4610] dark:bg-[#14ce4320] px-2.5 py-1.25 w-fit rounded-full flex justify-between items-center">
                <span className="text-xs text-[#2A9A46] dark:text-[#07cf50]">
                    {course.status}
                </span>
            </div>

            {/* ===== Progress ===== */}
            <div>
                <div className="flex justify-end mb-2.5">
                    <p className="text-xs border border-[#F2EEF4] dark:border-[#3B3B3B] rounded-full w-fit text-[#626262] dark:text-[#A3A3A3] px-3 py-1">
                        {course.progress}%
                    </p>
                </div>

                <div className="h-1 bg-gray-200 dark:bg-[#3B3B3B] rounded">
                    <div
                        className="h-1 bg-green-500 rounded"
                        style={{ width: `${course.progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}

export default EnrolledClassesCard;
