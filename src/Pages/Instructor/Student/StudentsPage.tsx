import { useState, useRef, useEffect } from 'react';
import InstructorDashboardLayout from "../../../Components/instructor/InstructorDashboardLayout";
import { ArrowLeft, SearchNormal1, ExportCircle, More, Profile2User, Message, DocumentDownload, Profile, Trash, DocumentText, Teacher, ExportSquare } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';

import { students, type Student } from './studentsData';
import BtnCom from '../../../Components/Student/BtnCom';
import { SquareArrowOutUpRight } from 'lucide-react';

const StudentsPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenuId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = (index: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setActiveMenuId(activeMenuId === index ? null : index);
    };

    const handleStudentClick = (student: Student) => {
        setSelectedStudent(student);
    };

    return (
        <InstructorDashboardLayout>
            <div className="flex flex-col  ">
                {/* Header Section */}
                <div className="flex items-center justify-end mb-5 ">
                    {/* <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                        >
                            <ArrowLeft size={24} color="#333333" />
                        </button>
                        <h1 className="lg:text-[24px] text-xl font-semibold text-[#333]">Student List</h1>
                    </div> */}

                    <div className="flex gap-4">
                        {/* Export CSV Button */}


                        <BtnCom
                            label="Export CSV"
                            icon={<ExportCircle size={16} color='#808080' />}
                            iconPosition="left"
                        />



                        {/* Search Bar */}
                        <div className="flex items-center rounded-[10px] gap-1 px-3 py-1.5  border border-[#F2EEF4] bg-white ">
                            <SearchNormal1
                                size={16}
                                color="#808080"
                            />
                            <input
                                type="text"
                                placeholder="Search students"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="outline-none border-none bg-transparent w-full text-sm text-[#333333]  placeholder-[#9CA3AF] focus:ring-0"
                            />
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="flex flex-col lg:flex-row gap-6  ">
                    {/* Left Column  Student List */}
                    <div className="flex-2 bg-white rounded-[10px] border border-[#F2EEF4] overflow-hidden flex flex-col gap-0 h-fit pb-2 ">
                        {/* Table Header */}
                        <div className=" grid grid-cols-[60px_220px_200px_1fr_1fr_60px] bg-[#FFF5ED] px-3 py-2 justify-items-center border-b border-[#F67300]/20">
                            <span className="text-sm lg:text-base font-semibold text-[#F67300]">S.no</span>
                            <span className="text-sm lg:text-base font-semibold text-[#F67300]">Student ID</span>
                            <span className="text-sm lg:text-base font-semibold text-[#F67300]">Student Name</span>
                            <span className="text-sm lg:text-base font-semibold text-[#F67300]">Attendance</span>
                            <span className="text-sm lg:text-base font-semibold text-[#F67300]">Last Score</span>
                            <span className="text-sm lg:text-base font-semibold text-[#F67300] text-center">Action</span>
                        </div>

                        {/* Table Body */}
                        <div className="overflow-y-auto  flex-1  custom-scrollbar ">
                            {students.map((student, index) => (
                                <button className='w-full cursor-pointer' onClick={() => handleStudentClick(student)}>
                                    <div

                                        key={student.id}
                                        className="grid grid-cols-[60px_220px_200px_1fr_1fr_60px] px-3 py-2 justify-items-center border-b border-gray-50 hover:bg-gray-50 transition-colors items-center"
                                    >
                                        <span className="text-[16px] text-[#333333] font-normal leading-[100%]">{index + 1}</span>
                                        <span className="text-[16px] text-[#333333] font-normal leading-[100%]">{student.studentId}</span>
                                        <span
                                            className="text-[16px] text-[#333333] font-normal leading-[100%] cursor-pointer hover:text-[#F67300] transition-colors"

                                        >
                                            {student.name}
                                        </span>
                                        <span className="text-[16px] text-[#333333] font-normal leading-[100%] pl-2">{student.attendance}</span>
                                        <span className="text-[16px] text-[#333333] font-normal leading-[100%] pl-2">{student.lastScore}</span>
                                        <div className="flex justify-center relative">
                                            <button
                                                onClick={(e) => toggleMenu(index, e)}
                                                className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                                            >
                                                <More size={18} color="#626262" className="rotate-90" />
                                            </button>

                                            {/* Dropdown Menu */}
                                            {activeMenuId === index && (
                                                <div
                                                    ref={menuRef}
                                                    className="absolute right-0 top-8 w-[200px] bg-white rounded-[12px] shadow-[0px_4px_24px_rgba(0,0,0,0.08)] border border-gray-100 z-50 p-2 flex flex-col gap-1"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <h4 className="px-3 py-2 text-sm font-semibold text-[#1A1A1A] border-b border-gray-50 mb-1">Student Actions</h4>

                                                    <button className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors text-left group">
                                                        <Message size={16} color="#626262" className="group-hover:text-[#F67300]" />
                                                        <span className="text-sm text-[#626262] font-medium group-hover:text-[#F67300]">Send Message</span>
                                                    </button>

                                                    <button className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors text-left group">
                                                        <DocumentDownload size={16} color="#626262" className="group-hover:text-[#F67300]" />
                                                        <span className="text-sm text-[#626262] font-medium group-hover:text-[#F67300]">Export Report</span>
                                                    </button>

                                                    <button
                                                        onClick={() => navigate(`/instructor/students/profile/${student.id}`)}
                                                        className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors text-left group"
                                                    >
                                                        <Profile size={16} color="#626262" className="group-hover:text-[#F67300]" />
                                                        <span className="text-sm text-[#626262] font-medium group-hover:text-[#F67300]">View Full Profile</span>
                                                    </button>

                                                    <div className="w-full h-[1px] bg-gray-50 my-1"></div>


                                                    <button className="flex items-center gap-3 px-3 py-2 hover:bg-red-50 rounded-lg transition-colors text-left group">
                                                        <Trash size={16} color="#EF4444" />
                                                        <span className="text-sm text-[#EF4444] font-medium">Remove from Batch</span>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                    </div>

                    {/* Right Column: Empty State / Details */}
                    <div className={`flex-1  boxStyle  flex flex-col ${selectedStudent ? 'justify-start p-[28px] gap-[20px] overflow-y-auto  [&::-webkit-scrollbar]:hidden' : 'items-center justify-center p-[28px] gap-[39px] text-center '} sticky top-0`}>
                        {selectedStudent ? (
                            <div className="flex flex-col items-center w-full">
                                {/* Profile Image */}
                                <div className="w-24 h-24 bg-[#D9D9D9] rounded-full mb-5"></div>

                                {/* Name and ID */}
                                <h2 className="text-[18px] lg:text-xl font-semibold text-[#1A1A1A] mb-1">{selectedStudent.name}</h2>
                                <p className="text-[14px] text-base text-[#626262] font-medium mb-5">{selectedStudent.studentId}</p>

                                {/* Stats Cards */}
                                <div className="flex gap-4 w-full mb-8">
                                    <div className="flex-1 boxStyle flex flex-col items-center">
                                        <span className="text-[14px] md:text-base lg:text-lg font-medium text-[#333333] mb-1">Attendance</span>
                                        <span className="text-[20px] font-semibold text-[#10B981]">{selectedStudent.stats.overallAttendance}</span>
                                    </div>
                                    <div className="flex-1 boxStyle flex flex-col items-center">
                                        <span className="text-[14px] md:text-base lg:text-lg font-medium text-[#333333] mb-1">Last Score</span>
                                        <span className="text-[20px] font-semibold text-[#333333]">{selectedStudent.stats.averageScore}</span>
                                    </div>
                                </div>

                                {/* Recent Submissions */}
                                <div className="w-full flex flex-col mb-8 ">


                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-[14px] lg:text-lg font-semibold text-[#333]">Recent Submissions</h3>
                                        <BtnCom label='View All' />
                                    </div>
                                    <div className='flex flex-col gap-4 max-h-80 overflow-y-auto scrollbar-hide'>
                                        {/* Submission Items */}
                                        {selectedStudent.recentSubmissions && selectedStudent.recentSubmissions.map((submission, i) => (
                                            <div key={i} className="boxStyle hover:bg-[#fafafa]!  flex items-center justify-between hover:border-[#F67300] transition-colors group cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2.5 rounded-xl flex items-center justify-center ${'bg-[#FFF5ED]'}`}>
                                                        {submission.type === 'assignment' ?
                                                            <DocumentText size={24} color="#F67300" variant="Bold" /> :
                                                            <Teacher size={24} color="#F67300" variant="Bold" />
                                                        }
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[14px] lg:text-base font-medium text-[#000000] leading-[100%] group-hover:text-[#F67300] transition-colors mb-2">
                                                            {submission.name}
                                                        </span>
                                                        <span className="text-[12px] lg:text-sm text-[#939393]">{submission.date}</span>
                                                    </div>
                                                </div>
                                                {submission.score && (
                                                    <span className={`text-[10px] lg:text-sm font-semibold px-2 py-1 rounded-full ${'bg-[#FFF5ED] text-[#F67300]'}`}>
                                                        {submission.score}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                        {(!selectedStudent.recentSubmissions || selectedStudent.recentSubmissions.length === 0) && (
                                            <p className="text-xs text-gray-400">No recent submissions</p>
                                        )}
                                    </div>
                                </div>

                                {/* View Full Profile Button */}

                                <button
                                    onClick={() => navigate(`/instructor/students/profile/${selectedStudent.id}`)}
                                    className="w-full py-3 bg-[#F67300] text-white rounded-[22px] font-semibold flex items-center justify-center gap-2.5 hover:opacity-90 transition-opacity cursor-pointer"
                                >
                                    <span className='text-base lg:text-lg '>View Full Profile</span>
                                    <SquareArrowOutUpRight stroke-width="2" strokeWidth={2} size={22} color="white" />
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="w-24 h-24 bg-[#FFF5ED] rounded-[24px] flex items-center justify-center mb-6">
                                    <Profile2User size={40} color="#F67300" variant="Bold" />
                                </div>
                                <h3 className="text-base font-medium text-[#626262]  leading-relaxed">
                                    Select a student from the list to view their detailed profile.
                                </h3>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </InstructorDashboardLayout>
    );
};

export default StudentsPage;
