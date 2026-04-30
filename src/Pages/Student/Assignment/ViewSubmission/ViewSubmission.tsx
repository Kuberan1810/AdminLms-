import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMySubmission, useAssignmentDetails } from '../../../../hooks/useAssignments';
import AssignmentHeader from '../AssignmentDetails/section/AssignmentHeader';
import { FileText, MessageSquare, Award, Download, ChevronLeft, Text } from 'lucide-react';
import { format } from 'date-fns';
import { CalendarRemove, Document, DocumentText1, MessageText1, Note1 } from 'iconsax-react';

const ViewSubmission: React.FC = () => {
    const { assignmentSlug } = useParams<{ assignmentSlug: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state || {};
    
    // We get the real ID from state (passed from Card click).
    // If user refreshes, we fall back to assignmentSlug (which might be an ID if they came from an old link).
    const assignmentId = state.assignmentId || assignmentSlug || "";

    const { data: submission, isLoading: isLoadingSubmission } = useMySubmission(assignmentId);
    const { data: assignment, isLoading: isLoadingAssignment } = useAssignmentDetails(assignmentId);

    const isLoading = isLoadingSubmission || isLoadingAssignment;

    if (isLoading) {
        return (
            <div className="p-6 space-y-6 animate-pulse">
                <div className="h-20 bg-gray-100 dark:bg-[#2A2A2A] rounded-2xl w-full"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <div className="h-64 bg-gray-100 dark:bg-[#2A2A2A] rounded-2xl w-full"></div>
                        <div className="h-40 bg-gray-100 dark:bg-[#2A2A2A] rounded-2xl w-full"></div>
                    </div>
                    <div className="h-80 bg-gray-100 dark:bg-[#2A2A2A] rounded-2xl w-full"></div>
                </div>
            </div>
        );
    }

    if (!submission) {
        return (
            <div className="flex flex-col items-center justify-center p-20 boxStyle">
                <div className="w-16 h-16 bg-orange-50 dark:bg-[#F67300]/10 rounded-full flex items-center justify-center mb-4">
                    <FileText size={32} className="text-[#F67300]" />
                </div>
                <h3 className="text-xl font-semibold dark:text-white">No Submission Found</h3>
                <p className="text-gray-500 mt-2">You haven't submitted this assignment yet.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-6 px-6 py-2 bg-[#F67300] text-white rounded-xl font-medium"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "N/A";
        try {
            return format(new Date(dateStr), "MMM dd, yyyy 'at' hh:mm a");
        } catch {
            return dateStr;
        }
    };

    return (
        <div className="space-y-6 pb-20">
            {/* Page Header */}
            <div className="boxStyle">
                <AssignmentHeader
                    title={assignment?.title || "Assignment Details"}
                    status={submission.grade ? "Graded" : (submission.status || "Submitted")}
                    deadline={assignment?.due_date ? formatDate(assignment.due_date) : "N/A"}
                    courseCode={assignment?.module_name || "Course"}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Submission Content */}
                    <div className="boxStyle relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-6">

                            <h3 className="text-[24px] font-semibold text-[#333333] dark:text-white transition-colors duration-300">Your Submission</h3>
                        </div>

                        {submission.submission_text ? (
                            <div className="relative bg-gray-50/80 dark:bg-[#2A2A2A]/50 p-6 sm:p-8 rounded-[24px] border border-gray-100 dark:border-[#333] transition-colors hover:border-[#F67300]/20">
                                <div className="absolute top-0 left-0 w-1.5 h-full bg-linear-to-b from-[#F67300] to-orange-300 dark:to-orange-900 rounded-l-[24px]"></div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap font-medium text-[15px]">
                                    {submission.submission_text}
                                </p>
                            </div>
                        ) : (
                            <div className="border-2 border-dashed border-gray-200 dark:border-[#333] bg-gray-50/50 dark:bg-[#2A2A2A]/30 p-12 rounded-[24px] flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                                    <MessageText1 size="32" variant="Outline" color="#F67300" className="text-[#F67300]" />
                                </div>
                                <h3 className="text-lg font-semibold text-[#333] dark:text-white mb-1"> No Submission Yet</h3>
                                <p className="text-[#626262] dark:text-gray-400 text-sm">  You haven’t submitted anything yet.</p>
                            </div>

                        )}

                        {/* Files Section */}
                        <div className="mt-8">
                            <h4 className="text-[24px] font-semibold text-[#333333] dark:text-white transition-colors duration-300 mb-5">

                                Attached File
                            </h4>

                            {submission.file_name && submission.file_path ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-center justify-between p-4 bg-white dark:bg-[#2A2A2A] rounded-2xl border border-gray-100 dark:border-[#333] group hover:border-[#F67300]/30 hover:shadow-lg hover:shadow-[#F67300]/5 transition-all duration-300 hover:-translate-y-0.5">
                                        <div className="flex items-center gap-4 overflow-hidden">
                                            <div className="p-2.5 bg-[#FFF5ED] dark:bg-[#F67300]/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                                <FileText size={20} className="text-[#F67300]" />
                                            </div>
                                            <span className="text-sm font-bold text-gray-700 dark:text-gray-200 truncate pr-2 group-hover:text-[#F67300] transition-colors">{submission.file_name}</span>
                                        </div>
                                        <a
                                            href={submission.file_path.startsWith('http') ? submission.file_path : `https://lms-backend-apis.onrender.com/${submission.file_path.replace(/^\//, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2.5 text-gray-400 hover:text-white hover:bg-[#F67300] rounded-xl transition-colors shrink-0"
                                        >
                                            <Download size={18} />
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full flex flex-col items-center justify-center py-10 rounded-3xl border-2 border-dashed border-gray-200 dark:border-[#333]">
                                    <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                                        <DocumentText1 size={32} color='currentColor' className="text-[#F67300]" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#333] dark:text-white mb-1">No Attached Files</h3>
                                    <p className="text-[#626262] dark:text-gray-400 text-sm">You did not attach any files to this submission.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Feedback Section */}
                    <div className="boxStyle bg-linear-to-br from-white to-orange-50/50 dark:from-[#1E1E1E] dark:to-orange-900/10 border-l-4 border-l-[#F67300]">
                        <div className="flex items-center gap-3 mb-4">
                            <h3 className="text-[24px] font-semibold text-[#333333] dark:text-white transition-colors duration-300">Instructor Feedback</h3>
                        </div>
                        {submission.feedback ? (
                            <div className="relative pl-4 overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-100 dark:bg-[#333] rounded-full"></div>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic text-lg py-2">
                                    "{submission.feedback}"
                                </p>
                            </div>
                        ) : (
                            <div className="w-full flex flex-col items-center justify-center py-10 rounded-3xl border-2 border-dashed border-gray-200 dark:border-[#333]">
                                <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                                    <MessageSquare size={32} className="text-[#F67300]" />
                                </div>
                                <h3 className="text-lg font-semibold text-[#333] dark:text-white mb-1">No Feedback Yet</h3>
                                <p className="text-[#626262] dark:text-gray-400 text-sm">Instructor has not provided feedback for this assignment.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Details */}
                <div className="space-y-6">
                    {/* Grade Card */}
                    <div className="boxStyle relative overflow-hidden  text-white border-transparent ">



                        <div className="relative z-10 flex items-center justify-between mb-8">
                            <h3 className="text-[24px] font-semibold text-[#333333] dark:text-white transition-colors duration-300">Final Result</h3>

                        </div>

                        <div className="relative z-10 flex flex-col items-center py-2">
                            {submission.grade !== null && submission.grade !== undefined && submission.status !== 'pending' ? (
                                <>
                                    <div className="text-6xl font-semibold mb-3 text-[#2A9A46] ">
                                        {submission.grade}
                                    </div>
                                    <div className="px-4 py-1.5 bg-[#2A9A4620] backdrop-blur-md rounded-full text-[#2A9A46] text-xs font-bold uppercase tracking-[0.2em]">
                                        Total Points
                                    </div>
                                </>
                            ) : (
                                <>
                                <div className="flex flex-col items-center justify-center p-8 w-full bg-linear-to-br from-[#F67300]/5 to-transparent dark:from-[#F67300]/10 dark:to-transparent border border-[#F67300]/10 dark:border-[#F67300]/20 rounded-[32px] transition-all duration-500 hover:shadow-2xl hover:shadow-[#F67300]/5 group">
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 bg-[#F67300] blur-xl opacity-20 animate-pulse rounded-full"></div>
                                        <div className="relative w-20 h-20 bg-linear-to-br from-[#F67300] to-[#FF9D4D] rounded-full flex items-center justify-center shadow-lg shadow-[#F67300]/30 transform group-hover:scale-110 transition-transform duration-500">
                                            <Award size={36} className="text-white animate-bounce-slow" />
                                        </div>
                                        <div className="absolute -right-1 -bottom-1 w-8 h-8 bg-white dark:bg-[#1E1E1E] rounded-full flex items-center justify-center border-2 border-[#F67300]/10 shadow-sm">
                                            <div className="w-3 h-3 bg-[#F67300] rounded-full animate-pulse"></div>
                                        </div>
                                    </div>

                                    <h4 className="text-xl font-bold text-[#333] dark:text-white mb-3 tracking-tight group-hover:text-[#F67300] transition-colors">
                                        Review Pending
                                    </h4>

                                    <p className="text-gray-500 dark:text-gray-400 text-sm text-center leading-relaxed max-w-[240px]">
                                        Your submission was received. The instructor is carefully reviewing your work. 
                                        <span className="block mt-2 font-medium text-[#F67300]/80">Please check back soon!</span>
                                    </p>
                                </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Timeline Info */}
                    <div className="boxStyle">
                        <h3 className="text-[24px] font-semibold text-[#333333] dark:text-white transition-colors duration-300 md:mb-8 mb-5">Timeline</h3>
                        <div className="relative pl-3 space-y-8">
                            {/* Vertical Line */}
                            <div className="absolute left-4.5 top-2 bottom-2 w-0.5 bg-gray-100 dark:bg-[#333]"></div>

                            <div className="relative flex gap-5">
                                <div className="mt-0.5 z-10 w-3 h-3 rounded-full bg-[#10B981] shadow-[0_0_0_4px_rgba(16,185,129,0.15)] bg-clip-padding ring-2 ring-white dark:ring-[#1E1E1E]"></div>
                                <div>
                                    <p className="text-sm font-bold text-[#333] dark:text-white leading-tight">Submitted</p>
                                    <p className="text-[13px] text-gray-500 mt-1.5 font-medium">{formatDate(submission.submitted_at)}</p>
                                </div>
                            </div>

                            <div className="relative flex gap-5">
                                <div className={`mt-0.5 z-10 w-3 h-3 rounded-full ${submission.grade ? 'bg-[#10B981] shadow-[0_0_0_4px_rgba(16,185,129,0.15)]' : 'bg-gray-300 dark:bg-gray-600'} ring-2 ring-white dark:ring-[#1E1E1E]`}></div>
                                <div>
                                    <p className="text-sm font-bold text-[#333] dark:text-white leading-tight">Evaluated</p>
                                    <p className="text-[13px] text-gray-500 mt-1.5 font-medium">{submission.grade ? "Reviewed by Instructor" : "Awaiting Review"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate(-1)}
                        className="w-full py-4 border-2 border-gray-100 dark:border-[#333] hover:border-gray-200 dark:hover:border-[#444] rounded-2xl flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400 font-bold transition-all cursor-pointer hover:bg-[#62626205] dark:hover:bg-[#333]"
                    >
                        <ChevronLeft size={20} />
                        Back to Assignments
                    </button>
                </div>
            </div>
        </div >
    );
};

export default ViewSubmission;
