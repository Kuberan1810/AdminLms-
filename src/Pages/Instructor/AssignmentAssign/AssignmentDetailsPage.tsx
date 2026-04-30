import { useNavigate, useLocation } from "react-router-dom";
import InstructorDashboardLayout from "../../../Components/instructor/InstructorDashboardLayout";
import { useEffect, useState } from "react";
import { getAssignmentById } from "../../../services/assignmentService";
import type { AssignmentResponse, AssignmentResourceResponse } from "../../../services/assignmentService";
import InstructorAssignmentHeader from "../../../Components/instructor/InstructorAssignmentHeader";
import ResourceCard from "../../Student/Assignment/AssignmentDetails/section/AssignmentResousesCard";
import { CalendarRemove } from "iconsax-react";

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

const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w-]+/g, '')    // Remove all non-word chars
        .replace(/--+/g, '-');      // Replace multiple - with single -
};

const AssignmentDetailsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state || {};

    const [apiAssignment, setApiAssignment] = useState<AssignmentResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (state?.id) {
            setIsLoading(true);
            getAssignmentById(state.id)
                .then(setApiAssignment)
                .catch((err) => console.error("Error fetching assignment:", err))
                .finally(() => setIsLoading(false));
        }
    }, [state?.id]);

    const assignment = apiAssignment || state;

    const handleEdit = () => {
        navigate("/instructor/create-assignment/details", { 
            state: { 
                // Identification
                id: assignment.id || state.id,
                isEdit: true,
                // Content fields (API names)
                title: assignment.title,
                description: assignment.description || "",
                objective: assignment.objective || "",
                expected_outcome: assignment.expected_outcome || "",
                due_date: assignment.due_date || null,
                // Context
                batch: assignment.batch_name || state.batch,
                batch_name: assignment.batch_name || state.batch,
                courseId: assignment.course_id || state.courseId,
                module: assignment.module_name || state.moduleInfo,
                moduleInfo: assignment.module_name || state.moduleInfo,
                moduleId: state.moduleId,
                course: state.course,
                // Resources array (AssignmentResourceResponse objects)
                resources: assignment.resources || []
            } 
        });
    };

    const handleReview = () => {
        const slug = slugify(assignment.title || "assignment");
        navigate(`/instructor/assignment/${slug}/review`, { 
            state: { 
                ...assignment,
                assignmentId: assignment.id || state.id 
            } 
        });
    };

    const isImage = (fileName: string) =>
        ['.jpg', '.jpeg', '.png', '.gif', '.webp'].some(ext => fileName.toLowerCase().endsWith(ext));

    const isPdf = (fileName: string) => fileName.toLowerCase().endsWith('.pdf');

    const resources = (assignment.resources || []).map((res: any) => {
        const r = res as AssignmentResourceResponse;
        const url = r.file_path?.startsWith('http') ? r.file_path : `${BASE_URL}${r.file_path}`;
        return {
            id: r.id,
            title: r.file_name,
            url: url,
            type: isPdf(r.file_name) ? 'pdf' : (isImage(r.file_name) ? 'image' : 'link')
        };
    });

    if (isLoading) {
        return (
            <InstructorDashboardLayout>
                <div className="sm:px-6 px-4 py-8 animate-pulse space-y-6">
                    {/* Header Skeleton */}
                    <div className="boxStyle bg-white h-48 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                            <div className="w-1/3 h-8 bg-gray-200 rounded-xl"></div>
                        </div>
                        <div className="w-20 h-6 bg-gray-100 rounded-full"></div>
                        <div className="w-40 h-4 bg-gray-100 rounded-lg"></div>
                    </div>

                    {/* Content Skeleton */}
                    <div className="boxStyle bg-white space-y-10">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="space-y-4">
                                <div className="w-32 h-6 bg-gray-200 rounded-lg"></div>
                                <div className="space-y-2">
                                    <div className="w-full h-4 bg-gray-100 rounded-lg"></div>
                                    <div className="w-5/6 h-4 bg-gray-100 rounded-lg"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Resources Skeleton */}
                    <div className="boxStyle bg-white">
                        <div className="w-48 h-8 bg-gray-200 rounded-xl mb-8"></div>
                        <div className="space-y-4">
                            {[1, 2].map(i => (
                                <div key={i} className="h-20 bg-gray-50 border border-gray-100 rounded-[24px]"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </InstructorDashboardLayout>
        );
    }

    const mappedAssignment = {
        id: assignment.id || state.id,
        title: assignment.title,
        course: assignment.module_name || assignment.moduleInfo || "GENERAL MODULE",
        description: assignment.description || "",
        objective: assignment.objective || "",
        expectedOutcome: assignment.expected_outcome || assignment.outcome || "",
        status: (assignment.status || "In Progress") as any,
        deadline: formatDate(assignment.due_date),
        resources: resources
    };

    return (
        <InstructorDashboardLayout>
            <div className="sm:px-6 px-4 py-8">
                
                {/* Assignment Description Section */}
                <div className="w-full">
                    <div className="boxStyle mb-5 ">
                        <div className="mb-10">
                            <InstructorAssignmentHeader 
                                title={mappedAssignment.title}
                                status={mappedAssignment.status}
                                deadline={mappedAssignment.deadline}
                                courseCode={mappedAssignment.course}
                            />
                        </div>
                        <div className="space-y-10 ">
                            <section>
                                <h2 className="md:text-2xl text-lg font-medium text-[#333333] dark:text-gray-300 md:mb-5 mb-2">Description:</h2>
                                <p className="text-[#4D4D4D] md:text-[18px] text-[15px] dark:text-gray-200 leading-[1.6] font-normal whitespace-pre-wrap">
                                    {mappedAssignment.description}
                                </p>
                            </section>
                            
                            {mappedAssignment.objective && (
                                <section>
                                    <h2 className="md:text-2xl text-lg font-medium text-[#333333] dark:text-gray-300 md:mb-5 mb-2">Objective:</h2>
                                    <p className="text-[#4D4D4D] md:text-[18px] text-[15px] dark:text-gray-200 leading-[1.6] font-normal whitespace-pre-wrap">
                                        {mappedAssignment.objective}
                                    </p>
                                </section>
                            )}

                            {mappedAssignment.expectedOutcome && (
                                <section>
                                    <h2 className="md:text-2xl text-lg font-medium text-[#333333] dark:text-gray-300 md:mb-5 mb-2">Expected Outcome:</h2>
                                    <p className="text-[#4D4D4D] md:text-[18px] text-[15px] dark:text-gray-200 leading-[1.6] font-normal whitespace-pre-wrap">
                                        {mappedAssignment.expectedOutcome}
                                    </p>
                                </section>
                            )}
                        </div>
                    </div>
                </div>

                {/* Resources Section (matches student version layout but with instructor buttons) */}
                <div className="boxStyle bg-white">
                    <h2 className="md:text-2xl text-xl font-medium text-[#333333] dark:text-white md:mb-5 mb-2">
                        Assignment Resources
                    </h2>

                    <div className="flex flex-col gap-10">
                        {/* Resource List */}
                        {resources.length > 0 ? (
                            <div className="flex flex-col gap-5">
                                {resources.map((res: any) => (
                                    <ResourceCard key={res.id} resource={res} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-10 rounded-3xl">
                                <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                                    <CalendarRemove size="32" variant="Outline" color="#F67300" className="text-[#F67300]" />
                                </div>
                                <h3 className="text-lg font-semibold text-[#333] dark:text-white mb-1">No Resources Found</h3>
                                <p className="text-[#626262] dark:text-gray-400 text-sm">There are no resources available for this assignment.</p>
                            </div>
                        )}

                        {/* Action Buttons (Extra Buttons for Instructor) */}
                        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-6">
                            <button
                                onClick={handleEdit}
                                className="px-10 py-3 rounded-2xl bg-white border border-[#F2EEF4] text-[#626262] font-medium text-[15px] transition-all cursor-pointer hover:bg-gray-50 flex items-center gap-2"
                            >
                                Edit Assignment
                            </button>
                            <button
                                onClick={handleReview}
                                className="px-10 py-3 rounded-2xl bg-[#F67300] text-white font-medium text-[15px] transition-all cursor-pointer hover:bg-[#ff9232] shadow-sm"
                            >
                                Review Submissions
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </InstructorDashboardLayout>
    );
};

export default AssignmentDetailsPage;
