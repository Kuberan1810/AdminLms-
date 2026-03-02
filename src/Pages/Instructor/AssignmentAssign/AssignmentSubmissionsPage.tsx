import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import InstructorDashboardLayout from "../../../Components/instructor/InstructorDashboardLayout";
import { students } from '../Student/studentsData';
import SubmissionTable from '../../../Components/instructor/SubmissionTable';
import ReviewSubmissionModal from '../../../Components/instructor/ReviewSubmissionModal';
import { useAppSelector } from '../../../store/hooks';

const AssignmentSubmissionsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const assignmentId = queryParams.get('id');

    const assignments = useAppSelector(state => state.resource.assignments);
    const currentAssignment = assignmentId ? assignments.byId[assignmentId] : null;

    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

    // Filter students to only show active ones for the table
    // In a real app, you might want to show all, or filter based on specific assignment logic
    // For now, passing all students to the table as it handles its own display logic

    const handleReview = (student: any) => {
        setSelectedSubmission(student);
        setIsReviewModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsReviewModalOpen(false);
        setSelectedSubmission(null);
    };

    return (
        <InstructorDashboardLayout>
            <div className="flex flex-col h-full  font-['Urbanist'] bg-[#fafafa]">
                {/* Breadcrumbs */}
                <div className="text-xs text-[#626262] font-medium mb-4">
                    {currentAssignment?.batch || "Batch-01"} &gt; {currentAssignment?.course || "Module 3"} &gt; Frontier AI Systems & Deployment &gt; <span className="text-[#1A1A1A] font-semibold">{currentAssignment?.title || "Module 3 Proficiency Test"}</span>
                </div>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-start justify-between mb-6 gap-4 md:gap-0">
                    <div className="flex flex-col gap-1">
                        <div className="text-sm font-semibold text-[#1A1A1A]">Assignment : {currentAssignment?.title || "Module 3 Proficiency Test"}</div>
                        <div className="text-sm text-[#626262] font-normal leading-[100%]">Module 3 : Frontier AI Systems & Deployment</div>
                        <div className="text-xs text-[#626262]">Due Date & Time : {currentAssignment ? `${currentAssignment.dueDate} , ${currentAssignment.dueTime}` : "21 Jan 2026 , 11:59Pm"}</div>
                        <div className="text-xs text-[#626262]">Total Submission : 31/38</div>
                    </div>

                    <button
                        onClick={() => navigate('/instructor/create-assignment', { state: { ...currentAssignment, isEdit: true } })}
                        className="px-4 py-2 border border-[#E5E7EB] rounded-[8px] bg-white text-[#1A1A1A] text-sm font-medium hover:bg-gray-50 transition-colors w-full md:w-auto"
                    >
                        Edit Assignment
                    </button>
                </div>

                {/* Table Section */}
                <SubmissionTable
                    students={students}
                    onReview={handleReview}
                    showFilters={true}
                    // batchName={currentAssignment?.batch || "Batch-01"}
                    // assignmentFiles={currentAssignment?.resources || []}
                />

                {/* Review Modal */}
                {selectedSubmission && (
                    <ReviewSubmissionModal
                        isOpen={isReviewModalOpen}
                        onClose={handleCloseModal}
                        studentName={selectedSubmission.name}
                        studentId={selectedSubmission.studentId}
                        submittedOn={selectedSubmission.submittedOn}
                        status={selectedSubmission.status}
                        files={selectedSubmission.files || []}
                    />
                )}
            </div>
        </InstructorDashboardLayout>
    );
};

export default AssignmentSubmissionsPage;
