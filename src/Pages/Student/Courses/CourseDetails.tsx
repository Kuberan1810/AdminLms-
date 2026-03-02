import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import {
    AlertCircle
} from 'lucide-react';
import CurriculumSection from './components/CurriculumSection';
import ResourcesTabSection from './components/ResourcesTabSection';
import FAQsTabSection from './components/FAQsTabSection';
import AssignmentsWidget from './components/AssignmentsWidget';
import CourseInfoWidget from './components/CourseInfoWidget';
import { coursesData } from './CourseDetailsData';

const CourseDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [activeTab, setActiveTab] = useState('Curriculum');
    const [expandedModules, setExpandedModules] = useState<number[]>([1, 2, 3]);

    const courseData = id ? coursesData[id] : null;

    if (!courseData) {
        return <Navigate to="/courses" replace />;
    }

    const { course, modules, assignments } = courseData;

    const toggleModule = (id: number) => {
        setExpandedModules(prev =>
            prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
        );
    };
    return (

        <div className=" " >
            <div className="flex flex-col  lg:flex-row gap-5">
                {/* Main Content - Left Column */}
                <div className="flex-1">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-medium text-gray-900 mb-4">{course.title}</h1>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {course.description}
                        </p>

                        <div className="flex items-center gap-3 mb-8">
                            <img
                                src={course.instructor.image}
                                alt={course.instructor.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="font-medium text-gray-900">{course.instructor.name}</h3>
                                <p className="text-xs text-gray-500">{course.instructor.role}</p>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-10 border-b border-gray-200 mb-6">
                            {['Curriculum', 'Resources', 'FAQs'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-3 text-sm font-medium transition-colors relative cursor-pointer ${activeTab === tab
                                        ? 'text-orange-500'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-t-full" />
                                    )}
                                </button>
                            ))}
                        </div>



                        {/* Curriculum Accordion */}
                        {activeTab === 'Curriculum' && (
                            <>
                                <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6 flex items-center gap-3 text-red-600">
                                    <AlertCircle className="w-5 h-5 " />
                                    <span className="font-medium text-sm">You Missed the Live class on Jan 02, 05:30 PM</span>
                                </div>
                                <CurriculumSection
                                    modules={modules}
                                    expandedModules={expandedModules}
                                    toggleModule={toggleModule}
                                />
                            </>
                        )}

                        {/* Resources Tab Section */}
                        {activeTab === 'Resources' && (
                            <ResourcesTabSection />
                        )}

                        {/* FAQs Tab Section */}
                        {activeTab === 'FAQs' && (
                            <FAQsTabSection />
                        )}
                    </div>
                </div>

                {/* Sidebar - Right Column */}
                <div className=" space-y-6 flex-1">
                    <AssignmentsWidget assignments={assignments} />
                    <CourseInfoWidget course={course} />
                </div>
            </div>
        </div>

    );
};

export default CourseDetails;
