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
        <div className="bg-white boxStyle flex flex-col gap-[30px]">
            <h2 className="text-[20px] font-semibold text-[#333333] leading-[120%]" >Course Info</h2>
            <div className="flex flex-col gap-[20px]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#626262]">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Duration</span>
                    </div>
                    <span className="text-sm font-medium text-[#333333]">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#626262]">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">Enrolled</span>
                    </div>
                    <span className="text-sm font-medium text-[#333333]">{course.enrolled}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#626262]">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">Community</span>
                    </div>
                    <span className="text-sm font-medium text-[#333333]">{course.community}</span>
                </div>
            </div>
        </div>
    );
};

export default CourseInfoWidget;
