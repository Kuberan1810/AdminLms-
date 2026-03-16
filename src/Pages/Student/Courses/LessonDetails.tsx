
import { coursesData } from './CourseDetailsData';
import { CalendarRemove, FolderCross, Calendar, ImportCurve, Video, Clock, Note1 } from 'iconsax-react';
import PdfIcon from '../../../assets/Images/icon/pdfIcon.svg';
import clock_img from '../../../assets/Images/Enrolled_Courses/Clock.png';
// import form_img from '../../assets/Images/Enrolled_Courses/Form.png';

import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    Check,
} from 'lucide-react';

// Status badge colours — matches Dashboard AssignmentsCard
const assignmentStatusStyle: Record<string, string> = {
    "Completed": "bg-[#E5F1E8] text-[#2A9A46]",
    "In progress": "bg-[#FFEDDE] text-[#F67300]",
    "Over due": "bg-[#FEE2E2] text-[#FF1313]",
    "Pending": "bg-[#FFEDDE] text-[#F67300]",
};
import { useLiveClass } from '../../../hooks/useLiveClass';

const LessonDetails = () => {
    const navigate = useNavigate();
    const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
    const { liveClassId, joinClass } = useLiveClass();

    // Find the lesson title from data if available
    const course = courseId ? coursesData[courseId] : null;
    let currentLessonTitle = '';
    let currentLesson: any = null;

    if (course) {
        // Search through modules to find the lesson
        course.modules.forEach(module => {
            const lesson = module.lessons?.find(l => l.id === lessonId);
            if (lesson) {
                currentLessonTitle = lesson.title;
                currentLesson = lesson;
            }
        });
    }

    const isCompleted = currentLesson?.isCompleted ?? false;

    // Mock data for the rest of the page
    const lessonData = {
        title: currentLessonTitle || 'AI Agents (LangChain, CrewAI, AutoGen)',
        content: currentLesson?.content || 'AI Agents are systems that use LLMs to plan, act, and collaborate autonomously. LangChain builds tool-using agents for workflows and RAG. CrewAI enables role-based multi-agent teamwork. AutoGen focuses on conversation-driven agents that interact with each other and humans to solve complex tasks.',
        keyTopics: currentLesson?.keyTopics || [
            'Introduction to AI Agents',
            'Agent Architecture & Planning',
            'Tools, Memory & RAG',
            'Multi-Agent Collaboration',
            'Frameworks Overview (LangChain, CrewAI, AutoGen)',
        ],
        resources: [],
        recordedClasses: [],
        assignments: [],
    };

    const handleDownload = (resourceName: string) => {
        // Mock download logic
        const blob = new Blob(['Mock resource content'], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = resourceName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (

        <div className="w-full"     >
            <div className="bg-white dark:bg-[#1E1E1E] border border-[#F2EEF4] dark:border-[#363636] rounded-[10px] p-[20px]  overflow-hidden flex flex-col gap-[30px] ">
                {/* Header Bar */}
                <div className={`flex items-center ${!isCompleted ? 'justify-between' : 'gap-4'} bg-[#FFF3E9] dark:bg-[#3D2B20] px-[20px] h-[47px] border-b border-[#FFF3E9] dark:border-[#3D2B20] -mx-[20px] -mt-[20px]`}>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="transition-colors flex items-center cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-[#2A2A2A] hover:text-white rounded-full"
                        >
                            <ArrowLeft width="20" height="20" color="currentColor" />
                        </button>
                        <div className={`rounded-full p-1 flex items-center justify-center w-[24px] h-[24px] ${isCompleted ? 'bg-[#EF7A02]' : 'bg-[#E0E0E0] dark:bg-[#4B4B4B]'}`}>
                            <Check className="w-[14px] h-[14px] text-white" strokeWidth={3} />
                        </div>
                        <h1 className="text-base  md:text-lg md:text-lgmd:text-lg font-semibold text-[#333333] dark:text-white capitalize"     >
                            {lessonData.title}
                        </h1>
                    </div>
                    {!isCompleted && (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2     text-[#333333] dark:text-gray-300 text-[14px]">
                                <Calendar size={16} color="currentColor" />
                                <span >Today 08:00 PM - 09:00 PM</span>
                            </div>
                            <button
                                onClick={liveClassId ? joinClass : undefined}
                                className={`${liveClassId ? 'bg-[#EF7A02] cursor-pointer hover:bg-orange-600' : 'bg-[#E0E0E0] cursor-not-allowed'} text-[#FFFFFF] px-4 py-1.5 rounded-md text-sm font-semibold transition-colors`}
                            >
                                Join
                            </button>
                        </div>
                    )}
                </div>

                {/* Class Content Section */}
                <div className="space-y-8">
                    {/* Class Content */}
                    <section>
                        <h2 className="text-[#333333] dark:text-white text-base  md:text-lg md:text-lgmd:t-lg font-semibold md:mb-3 mb-2" >Class Content:</h2>
                        <p className="text-[#626262] dark:text-gray-300  text-sm md:text-base font-medium" >
                            {lessonData.content}
                        </p>
                    </section>

                    {/* Key Topics */}
                    <section>
                        <h2 className="text-[#333333] dark:text-white text-base  md:text-lg md:text-lgmd:t-lg font-semibold md:mb-3 mb-2" >Key Topic:</h2>
                        <ol className="list-decimal list-inside space-y-2 ml-2">
                            {lessonData.keyTopics.map((topic, index) => (
                                <li key={index} className="text-[#626262] dark:text-gray-300 text-sm md:text-base font-medium" >
                                    {topic}
                                </li>
                            ))}
                        </ol>
                    </section>

                    {/* Resources */}
                    <section>
                        <h2 className="text-[#333333] dark:text-white text-base md:text-lg font-semibold md:mb-3 mb-2">Resources</h2>
                        {isCompleted && lessonData.resources.length > 0 ? (
                            <div className="space-y-3 sm:w-fit">
                                {lessonData.resources.map((resource) => (
                                    <a
                                        key={resource.id}
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); handleDownload(resource.name); }}
                                        className="group flex items-center justify-between transition-all duration-300 cursor-pointer sm:rounded-3xl rounded-[20px] gap-10 py-1 pr-5 pl-1 border border-[#F2EEF4] dark:border-[#363636]"
                                        aria-label={`Download ${resource.name}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="sm:px-6.5 sm:py-5 px-4 py-3 sm:rounded-3xl rounded-[20px] bg-[#FEE2E2] dark:bg-[#3D1A1A]">
                                                <img src={PdfIcon} alt="PDF file icon" className="min-w-6 min-h-6" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm md:text-lg font-medium text-[#4D4D4D] dark:text-gray-300 group-hover:text-[#333] dark:group-hover:text-white transition-colors">
                                                    {resource.name}
                                                </h4>
                                                <p className="text-xs md:text-base text-[#808080] dark:text-gray-400 mt-1">2.4 MB</p>
                                            </div>
                                        </div>
                                        <ImportCurve size="16" color="#808080" />
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-10 w-full text-center">
                                <div className="p-4 bg-[#FFF0EF] dark:bg-[#3D2B20] rounded-full mb-4">
                                    <FolderCross size={32} color="#EF7A02" />
                                </div>
                                <p className="text-[#626262] dark:text-[#E0E0E0] text-base font-medium">No Resources Found</p>
                                <p className="text-[#989898] dark:text-[#A3A3A3] text-sm mt-1">There are no resources available for this class.</p>
                            </div>
                        )}
                    </section>

                    {/* Recorded Class */}
                    <section>
                        <h2 className="text-[#333333] dark:text-white text-base md:text-lg font-semibold md:mb-3 mb-2">Recorded Class</h2>
                        {isCompleted && lessonData.recordedClasses && lessonData.recordedClasses.length > 0 ? (
                            <div className="space-y-3">
                                {lessonData.recordedClasses.map((session: any, index: number) => (
                                    <div
                                        key={session.id}
                                        className="group flex flex-col sm:flex-row sm:items-center justify-between transition-all duration-300 cursor-pointer sm:rounded-3xl rounded-[20px] sm:gap-10 gap-3 sm:py-1 py-3 sm:pr-5 pr-4 sm:pl-1 pl-3 border border-[#F2EEF4] dark:border-[#363636]"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="sm:px-6.5 sm:py-5 px-4 py-3 sm:rounded-3xl rounded-[20px] bg-[#EF7A0220] shrink-0">
                                                <Video size={28} color='#EF7A02' />
                                            </div>
                                            <div>
                                                <h4 className="text-sm md:text-lg font-medium text-[#4D4D4D] dark:text-gray-300 group-hover:text-[#333] dark:group-hover:text-white transition-colors">
                                                    Session {index + 1}: {session.title}
                                                </h4>
                                                <p className="text-xs md:text-base text-[#808080] dark:text-gray-400 mt-1">
                                                    {session.instructor} · {session.date} · {session.duration}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="sm:text-[#fe5700] font-semibold text-sm whitespace-nowrap transition-colors sm:w-fit w-full text-center sm:p-0 p-2 rounded-full hover:text-[#ff7b34] text-white bg-[#fe5700] sm:bg-transparent">
                                            View Recording
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-10 w-full text-center">
                                <div className="p-4 bg-[#FFF0EF] dark:bg-[#3D2B20] rounded-full mb-4">
                                    <CalendarRemove size={32} color="#EF7A02" />
                                </div>
                                <p className="text-[#626262] dark:text-[#E0E0E0] text-base font-medium">No Recorded Classes Found</p>
                                <p className="text-[#989898] dark:text-[#A3A3A3] text-sm mt-1">There are no recorded classes available for this lesson.</p>
                            </div>
                        )}
                    </section>

                    {/* Assignments */}
                    <section>
                        <h2 className="text-[#333333] dark:text-white text-base md:text-lg font-semibold md:mb-3 mb-2">Assignments</h2>
                        {isCompleted && lessonData.assignments.length > 0 ? (
                            <div className="space-y-5">
                                {lessonData.assignments.map((assignment) => (
                                    <div
                                        key={assignment.id}
                                        className="bg-[#FAFAFA] dark:bg-[#2A2A2A] border border-[#F2EEF4] dark:border-[#363636] rounded-[20px] p-5 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer transition-shadow"
                                    >
                                        <div className="md:w-auto w-full">
                                            <h4 className="md:text-lg text-base font-semibold text-[#333333] dark:text-white mb-2.5">
                                                {assignment.title}
                                            </h4>
                                            <div className="flex items-center gap-2 text-[#626262] dark:text-gray-400 text-sm">
                                                <div className="w-8 h-8 rounded-[8px] border border-[#F2EEF4] dark:border-[#363636] bg-white dark:bg-[#1E1E1E] flex items-center justify-center">
                                                    <Calendar size="16" color="#626262" />
                                                </div>
                                                <span>Due date: {assignment.dueDate}</span>
                                            </div>
                                        </div>
                                        <span
                                            className={`px-7 py-2.5 rounded-full text-sm font-medium max-md:mt-4 ${assignmentStatusStyle[assignment.status] ?? "bg-[#FFEDDE] text-[#F67300]"}`}
                                        >
                                            {assignment.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-10 w-full text-center">
                                <div className="p-4 bg-[#FFF0EF] dark:bg-[#3D2B20] rounded-full mb-4">
                                    <Note1 size={32} color="#EF7A02" />
                                </div>
                                <p className="text-[#626262] dark:text-[#E0E0E0] text-base font-medium">No Assignments Found</p>
                                <p className="text-[#989898] dark:text-[#A3A3A3] text-sm mt-1">There are no assignments scheduled for this lesson.</p>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default LessonDetails;