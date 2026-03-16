import React from 'react';
import { Clock, Users, FileText } from 'lucide-react';

interface CourseInfoWidgetProps {
    course: {
        duration: string;
        enrolled: string;
        community: string;
    };
}

const CourseInfoWidget: React.FC<CourseInfoWidgetProps> = ({ course }) => {
    return (
        <div className="bg-white dark:bg-[#1E1E1E] boxStyle flex flex-col gap-[30px] dark:border dark:border-[#363636]">
            <h2 className="text-[20px] font-semibold text-[#333333] dark:text-white leading-[120%]" >Course Info</h2>
            <div className="flex flex-col gap-[20px]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#626262] dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Duration</span>
                    </div>
                    <span className="text-sm font-medium text-[#333333] dark:text-white">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#626262] dark:text-gray-400">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">Enrolled</span>
                    </div>
                    <span className="text-sm font-medium text-[#333333] dark:text-white">{course.enrolled}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#626262] dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">Community</span>
                    </div>
                    <span className="text-sm font-medium text-[#333333] dark:text-white">{course.community}</span>
                </div>
            </div>
        </div>
    );
};

export default CourseInfoWidget;