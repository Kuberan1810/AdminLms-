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
                    className="border border-[#F2EEF4] dark:border-[#363636] rounded-xl bg-white dark:bg-[#2A2A2A] hover:border-gray-300 dark:hover:border-gray-500 transition-colors"
                >
                    <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                    >
                        <span className="font-medium text-[#333333] dark:text-white text-base capitalize">
                            Module : {module.id} <span className="ml-2 text-[#333333] dark:text-white font-medium">{module.title}</span>
                        </span>
                        {expandedModules.includes(module.id) ? (
                            <ChevronUp className="w-5 h-5 text-[#626262] dark:text-gray-400" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-[#626262] dark:text-gray-400" />
                        )}
                    </button>

                    {expandedModules.includes(module.id) && module.lessons && (
                        <div className="px-5 pb-5 space-y-3">
                            {module.lessons.map((lesson) => (
                                <div
                                    key={lesson.id}
                                    onClick={() => handleLessonClick(lesson.id)}
                                    className="flex items-center gap-4 p-4 border border-[#F2EEF4] dark:border-[#363636] rounded-xl hover:border-gray-300 dark:hover:border-gray-500 transition-colors bg-white dark:bg-[#2A2A2A] cursor-pointer"
                                >
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center  ${lesson.isCompleted
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-orange-100 dark:bg-[#F6730030] text-orange-300 dark:text-orange-400'
                                        }`}>
                                        <Check className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-[#4d4d4d] dark:text-gray-300 font-medium text-sm capitalize">{lesson.id} {lesson.title}</span>
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