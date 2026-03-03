import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import type { Module } from '../CourseDetailsData';

interface CurriculumSectionProps {
    modules: Module[];
    expandedModules: number[];
    toggleModule: (id: number) => void;
}

const CurriculumSection: React.FC<CurriculumSectionProps> = ({ modules, expandedModules, toggleModule }) => {
    const navigate = useNavigate();
    const { id: courseId } = useParams<{ id: string }>();

    const handleLessonClick = (lessonId: string) => {
        if (courseId) {
            navigate(`/student/courses/${courseId}/lessons/${lessonId}`);
        }
    };

    return (
        <div className="space-y-4">
            {modules.map((module) => (
                <div
                    key={module.id}
                    className="border border-[#F2EEF4] rounded-xl  bg-white hover:border-gray-300 transition-colors"
                >
                    <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                    >
                        <span className="font-medium text-[#333333] text-base capitalize">
                            Module : {module.id} <span className="ml-2 text-[#333333] font-medium">{module.title}</span>
                        </span>
                        {expandedModules.includes(module.id) ? (
                            <ChevronUp className="w-5 h-5 text-[#626262]" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-[#626262]" />
                        )}
                    </button>

                    {expandedModules.includes(module.id) && module.lessons && (
                        <div className="px-5 pb-5 space-y-3">
                            {module.lessons.map((lesson) => (
                                <div
                                    key={lesson.id}
                                    // onClick={() => handleLessonClick(lesson.id)}
                                    className="flex items-center gap-4 p-4 border border-[#F2EEF4] rounded-xl hover:border-gray-300 transition-colors bg-white cursor-pointer"
                                >
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center  ${lesson.isCompleted
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-orange-100 text-orange-300'
                                        }`}>
                                        <Check className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-[#4d4d4d] font-medium text-sm capitalize">{lesson.id} {lesson.title}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CurriculumSection;
