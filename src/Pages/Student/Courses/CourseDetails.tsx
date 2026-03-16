import { useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';

import { AlertCircle, ArrowLeft } from 'lucide-react';
import CurriculumSection from './components/CurriculumSection';
import ResourcesTabSection from './components/ResourcesTabSection';
import FAQsTabSection from './components/FAQsTabSection';
import AssignmentsWidget from './components/AssignmentsWidget';
import CourseInfoWidget from './components/CourseInfoWidget';
import { coursesData } from './CourseDetailsData';

const CourseDetails = () => {
    const navigate = useNavigate()
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

        <div className="md:mb-0 mb-12" >
            <div className="flex flex-col  lg:flex-row gap-5">
                {/* Main Content - Left Column */}
                <div className="flex-1">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex  items-center gap-2 mb-2 ">

                            <div className='hover:bg-gray-100 dark:hover:bg-[#2d2d2d] p-2 rounded-full cursor-pointer'>
                                <ArrowLeft color='currentColor' onClick={() => navigate(-1)} />
                            </div>

                            <div>
                                <h1 className="lg:text-2xl md:text-xl text-lg font-medium text-[#333] dark:text-white ">{course.title}</h1>

                            </div>

                        </div>
                        <p className="text-[#4d4d4d] dark:text-gray-300 font-medium leading-relaxed mb-6">
                            {course.description}
                        </p>

                        <div className="flex items-center gap-3 mb-8">
                            {/* <img
                                src={course.instructor.image}
                                alt={course.instructor.name}
                                className="w-10 h-10 rounded-full object-cover"
                            /> */}
                            <div className="w-10 h-10 rounded-full bg-[#EF7A02] flex items-center justify-center text-white text-lg font-medium">
                                {course.instructor.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className="font-semibold text-[#333333] dark:text-white">{course.instructor.name}</h3>
                                <p className="md:text-sm text-xs  text-[#626262] dark:text-gray-400">{course.instructor.role}</p>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-10 border-b border-[#F2EEF4] dark:border-[#363636] mb-6">
                            {['Curriculum', 'Resources', 'FAQs'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-3 text-sm font-medium transition-colors relative cursor-pointer ${activeTab === tab
                                        ? 'text-[#F67300]'
                                        : 'text-[#727272] dark:text-gray-400 hover:text-[#626262] dark:hover:text-gray-300'
                                        }`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F67300] rounded-t-full" />
                                    )}
                                </button>
                            ))}
                        </div>



                        {/* Curriculum Accordion */}
                        {activeTab === 'Curriculum' && (
                            <>
                                {/* <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6 flex items-center gap-3 text-red-600">
                                    <AlertCircle className="w-5 h-5 " />
                                    <span className="font-medium text-sm">You Missed the Live class on Jan 02, 05:30 PM</span>
                                </div> */}
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