import { useParams, useLocation } from 'react-router-dom';
import AssignmentResourses from './section/AssignmentResourses';
import AssignmentDesc from './section/AssignmentDesc';
import { useAssignmentDetails } from '../../../../hooks/useAssignments';
import type { AssignmentResourceResponse } from '../../../../services/assignmentService';

const BASE_URL = "https://lms-backend-apis.onrender.com";

const formatDate = (dateString: string | null) => {
    if (!dateString) return "No deadline";
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    };
    return date.toLocaleString('en-US', options);
};

const AssignmentDetails = () => {
    const { assignmentSlug } = useParams<{ assignmentSlug: string }>();
    const location = useLocation();
    const state = location.state || {};
    
    // Prioritize ID from state (passed from Card click)
    const assignmentId = state.assignmentId || assignmentSlug || "";

    const { data: assignmentData, isLoading } = useAssignmentDetails(assignmentId);

    if (isLoading) {
        return (
            <div className="sm:mb-0 mb-10">
                {/* Description Skeleton */}
                <div className="boxStyle mb-6 dark:bg-[#1E1E1E] dark:border-[#333] animate-pulse">
                    <div className="h-10 w-3/4 bg-gray-100 dark:bg-[#2A2A2A] rounded-2xl mb-6"></div>
                    <div className="space-y-3 mb-8">
                        <div className="h-4 w-full bg-gray-50 dark:bg-[#2A2A2A] rounded-lg"></div>
                        <div className="h-4 w-full bg-gray-50 dark:bg-[#2A2A2A] rounded-lg"></div>
                        <div className="h-4 w-2/3 bg-gray-50 dark:bg-[#2A2A2A] rounded-lg"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-50 dark:border-[#333]">
                        <div className="space-y-3">
                            <div className="h-5 w-32 bg-gray-100 dark:bg-[#2A2A2A] rounded-lg"></div>
                            <div className="h-4 w-full bg-gray-50 dark:bg-[#2A2A2A] rounded-lg"></div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-5 w-32 bg-gray-100 dark:bg-[#2A2A2A] rounded-lg"></div>
                            <div className="h-4 w-full bg-gray-50 dark:bg-[#2A2A2A] rounded-lg"></div>
                        </div>
                    </div>
                </div>
                {/* Resources Skeleton */}
                <div className="boxStyle dark:bg-[#1E1E1E] dark:border-[#333] animate-pulse">
                    <div className="h-8 w-48 bg-gray-100 dark:bg-[#2A2A2A] rounded-xl mb-8"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-[72px] w-full bg-gray-50 dark:bg-[#2A2A2A] rounded-[24px]"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!assignmentData) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <h2 className="text-2xl font-semibold text-[#333] mb-2">Assignment Not Found</h2>
                <p className="text-[#626262] text-sm">The assignment you're looking for doesn't exist.</p>
            </div>
        );
    }

    const assignment = {
        id: assignmentData.id,
        title: assignmentData.title,
        course: assignmentData.module_name,
        description: assignmentData.description || "",
        objective: assignmentData.objective || "", 
        expectedOutcome: assignmentData.expected_outcome || "",
        status: "In Progress" as any, 
        deadline: formatDate(assignmentData.due_date),
        resources: assignmentData.resources.map((r: AssignmentResourceResponse) => {
            const isPdf = r.file_type?.toLowerCase().includes('pdf') || r.file_name.toLowerCase().endsWith('.pdf');
            const isImage = r.file_type?.toLowerCase().includes('image') || 
                          ['.jpg', '.jpeg', '.png', '.gif', '.webp'].some(ext => r.file_name.toLowerCase().endsWith(ext));
            
            return {
                id: r.id,
                title: r.file_name,
                url: r.file_path.startsWith('http') ? r.file_path : `${BASE_URL}${r.file_path}`,
                type: (isPdf ? 'pdf' : (isImage ? 'image' : 'link')) as "pdf" | "image" | "link"
            };
        })
    };

    return (
        <div className='sm:mb-0 mb-10'>
            <AssignmentDesc assignment={assignment} />
            <AssignmentResourses resources={assignment.resources} assignmentId={assignment.id} />
        </div>
    );
};

export default AssignmentDetails;