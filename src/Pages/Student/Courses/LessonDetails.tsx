
import { coursesData } from './CourseDetailsData';
// import { ArrowLeft2, ArrowLeft3 } from 'iconsax-react';
import pdf_img from '../../../assets/Images/Enrolled_Courses/pdf_img.svg';
import clock_img from '../../../assets/Images/Enrolled_Courses/Clock.png';
// import form_img from '../../assets/Images/Enrolled_Courses/Form.png';

import { useNavigate, useParams } from 'react-router-dom';
import {
    ArrowLeft,
    Download,
    Calendar,
    Check,
    Folder,
    ClipboardList
} from 'lucide-react';
const LessonDetails = () => {
    const navigate = useNavigate();
    const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();

    // Find the lesson title from data if available
    const course = courseId ? coursesData[courseId] : null;
    let currentLessonTitle = '';

    if (course) {
        // Search through modules to find the lesson
        course.modules.forEach(module => {
            const lesson = module.lessons?.find(l => l.id === lessonId);
            if (lesson) {
                currentLessonTitle = lesson.title;
            }
        });
    }

    // Mock data for the rest of the page
    const lessonData = {
        title: currentLessonTitle || 'AI Agents (LangChain, CrewAI, AutoGen)',
        content: 'AI Agents are systems that use LLMs to plan, act, and collaborate autonomously. LangChain builds tool-using agents for workflows and RAG. CrewAI enables role-based multi-agent teamwork. AutoGen focuses on conversation-driven agents that interact with each other and humans to solve complex tasks.',
        keyTopics: [
            'Introduction to AI Agents',
            'Agent Architecture & Planning',
            'Tools, Memory & RAG',
            'Multi-Agent Collaboration',
            'Frameworks Overview'
        ],
        resources: lessonId === '3.5' ? [] : [
            { id: 1, name: 'Agent Architecture .pdf', type: 'PDF' },
            { id: 2, name: 'Class Notes 2.0.pdf', type: 'PDF' },
            { id: 3, name: 'Class Notes 2.0.pdf', type: 'PDF' }
        ],
        recordedClasses: lessonId === '3.5' ? [] : [
            {
                id: 1,
                title: 'AI Agents (LangChain, CrewAI, AutoGen)1',
                instructor: 'ED Donner',
                date: 'Jan23, 5:30 PM',
                duration: '01 h 20 mins'
            },
            {
                id: 2,
                title: 'AI Agents (LangChain, CrewAI, AutoGen)2',
                instructor: 'ED Donner',
                date: 'Jan24, 2:30 PM',
                duration: '01 h'
            }
        ],
        assignments: lessonId === '3.5' ? [] : [
            { id: 1, title: 'Convert text into embeddi...', dueDate: '2 Jan', status: 'Completed' },
            { id: 2, title: 'Convert text into embeddi...', dueDate: '2 Jan', status: 'Completed' },
            { id: 3, title: 'Convert text into embeddi...', dueDate: '2 Jan', status: 'Completed' },
            { id: 4, title: 'Convert text into embeddi...', dueDate: '2 Jan', status: 'Completed' }
        ]
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
                <div className="bg-white border border-[#F2EEF4] rounded-[10px] p-[20px] overflow-hidden flex flex-col gap-[30px] ">
                    {/* Header Bar */}
                    <div className={`flex items-center ${lessonId === '3.5' ? 'justify-between' : 'gap-4'} bg-[#FFF9F1] px-[20px] h-[47px] border-b border-[#FCE4C3] -mx-[20px] -mt-[20px]`}>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="transition-colors flex items-center cursor-pointer"
                            >
                                <ArrowLeft width="25" height="20" color="#121212" />
                            </button>
                            <div className="bg-[#EF7A02] rounded-full p-1 flex items-center justify-center w-[24px] h-[24px]">
                                <Check className="w-[14px] h-[14px] text-white" strokeWidth={3} />
                            </div>
                            <h1 className="text-[18px] font-semibold     text-[#333333]"     >
                                {lessonId} {lessonId === '3.5' ? 'AI safety & real-world use cases' : lessonData.title}
                            </h1>
                        </div>
                        {lessonId === '3.5' && (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2     text-[#333333] text-[14px]">
                                    <Calendar width="16" height="16" />
                                    <span>Today 01:00 PM - 2:30 PM</span>
                                </div>
                                <button className="bg-[#E0E0E0] text-[#FFFFFF] px-4 py-1.5 rounded-md text-sm font-semibold">
                                    Join
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Class Content Section */}
                    <div className="space-y-8">
                        {/* Class Content */}
                        <section>
                            <h2 className="    text-[#333333] text-[16px] font-normal mb-[20px]" >Class Content:</h2>
                            <p className="    text-[#333333]     text-[#333333] text-[16px] font-normal" >
                                {lessonData.content}
                            </p>
                        </section>

                        {/* Key Topics */}
                        <section>
                            <h2 className="    text-[#333333] text-[16px] font-normal mb-[20px]" >Key Topic:</h2>
                            <ol className="list-decimal list-inside space-y-2 ml-2">
                                {lessonData.keyTopics.map((topic, index) => (
                                    <li key={index} className="    text-[#333333] text-[16px] font-normal" >
                                        {topic}
                                    </li>
                                ))}
                            </ol>
                        </section>

                        {/* Resources */}
                        <section>
                            <h2 className="    text-[#333333] text-[16px] font-normal mb-[20px]" >Resources</h2>
                            {lessonData.resources.length > 0 ? (
                                <div className="flex flex-col gap-4">
                                    {lessonData.resources.map((resource) => (
                                        <div key={resource.id} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-[28px] transition-shadow pr-8">
                                            <div className="flex items-center gap-6">
                                                <div className="w-[88px] h-[88px] bg-[#FFF0EF] rounded-[24px] flex items-center justify-center">
                                                    <img src={pdf_img} alt="PDF" className="w-[45px] h-auto object-contain" />
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <span className="    text-[#333333] text-[18px] font-medium"     >{resource.name}</span>
                                                    <span className="text-[#989898] text-[16px]"     >2.4MB</span>
                                                </div>
                                            </div>
                                            <Download
                                                className="w-6 h-6 text-[#989898] cursor-pointer hover:text-[#EF7A02] transition-colors"
                                                onClick={() => handleDownload(resource.name)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center w-fit">
                                    <div className=" bg-[#FFF5EE] rounded-[20px] flex items-center justify-center mb-2">
                                        <Folder className="w-[48px] h-[48px] text-[#EF7A02]" strokeWidth={1.5} />
                                    </div>
                                    <span className="    text-[#333333] text-[14px] font-normal">No Resources</span>
                                </div>
                            )}
                        </section>

                        {/* Recorded Class */}
                        {lessonData.recordedClasses && lessonData.recordedClasses.length > 0 && (
                            <section>
                                <h2 className="    text-[#333333] text-[16px] font-normal mb-[20px]" >Recorded Class</h2>
                                <div className="space-y-4">
                                    {lessonData.recordedClasses.map((session: any, index: number) => (
                                        <div key={session.id} className="bg-white border border-gray-100 rounded-[20px] p-6 flex flex-col md:flex-row md:items-center justify-between transition-shadow">
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-semibold text-gray-900">Session {index + 1}: {session.title}</h3>
                                                <p className="text-sm text-gray-500">Instructor : {session.instructor}</p>
                                                <div className="flex flex-wrap gap-4 mt-2">
                                                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                        <Calendar className="w-4 h-4" />
                                                        {session.date}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                        <img src={clock_img} alt="Duration" className="w-4 h-4" />
                                                        {session.duration}
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="mt-4 md:mt-0 text-[#6B5AED] font-medium transition-colors hover:text-[#5849CB]" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', lineHeight: '100%', letterSpacing: '0%' }}>
                                                View Recording
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Assignments */}
                        <section>
                            <h2 className="    text-[#333333] text-[16px] font-normal mb-[20px]" >Assignments</h2>
                            {lessonData.assignments.length > 0 ? (
                                <div className="space-y-3">
                                    {lessonData.assignments.map((assignment, index) => (
                                        <div key={assignment.id} className="bg-white border border-gray-100 rounded-[20px] p-5 flex items-center justify-between transition-shadow font-urbanist">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-[#EF7A02] flex items-center justify-center flex-shrink-0">
                                                    <ClipboardList className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 text-sm">Assignment {index + 1}: {assignment.title}</h3>
                                                    <p className="text-[12px] text-gray-500 font-medium">Due date : {assignment.dueDate}</p>
                                                </div>
                                            </div>
                                            <span className="bg-[#E7F7EF] text-[#00A34D] px-4 py-1.5 rounded-full text-xs font-semibold">
                                                {assignment.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center w-fit">
                                    <div className=" bg-[#FFF5EE] rounded-[20px] flex items-center justify-center mb-2">
                                        <ClipboardList className="w-[48px] h-[48px] text-[#EF7A02]" strokeWidth={1.5} />
                                    </div>
                                    <span className="    text-[#333333] text-[14px] font-normal" >No Assignment</span>
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </div>
     
    );
};

export default LessonDetails;
