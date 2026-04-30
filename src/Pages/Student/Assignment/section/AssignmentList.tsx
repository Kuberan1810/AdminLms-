import React, { useState, useMemo, useEffect, useRef } from 'react';
import { FilterSearch } from 'iconsax-react';
import { ChevronDown } from 'lucide-react';
import { type StatusType } from "../data/AssignmentData";
import AssignmentCard from "./AssignmentCard";
import { useStudentAssignments } from '../../../../hooks/useAssignments';
import { useQueries } from "@tanstack/react-query";
import { getMySubmission } from '../../../../services/assignmentService';
import type { AssignmentResourceResponse } from '../../../../services/assignmentService';

interface AssignmentListProps {
  selectedCourse: string | null;
}

const AssignmentList: React.FC<AssignmentListProps> = ({ selectedCourse }) => {

  const [statusFilter, setStatusFilter] = useState<StatusType>('All status');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const statusOptions: StatusType[] = [
    'All status',
    'In Progress',
    'Submitted',
    'Graded',
    'Overdue',
    'Submitted Late'
  ];

  const getStatusStyles = (status: string) => {
    const s = status?.toLowerCase() || '';
    switch (s) {
      case 'in progress':
      case 'in_progress': 
        return 'bg-[#FFEDDE] dark:bg-[#F67300]/10 text-[#F67300] dark:text-[#ff9d4d]';
      case 'submitted':
      case 'graded':
        return 'bg-[#2A9A4610] dark:bg-[#2A9A46]/10 text-[#2A9A46] dark:text-[#4ade80]';
      case 'overdue':
      case 'late':
      case 'submitted late':
      case 'submitted_late':
        return 'bg-[#F32D2D10] dark:bg-[#F32D2D]/10 text-[#F32D2D] dark:text-[#f87171]';
      default: return 'bg-gray-50 dark:bg-gray-800 text-gray-400 ';
    }
  };
  
  const formatDate = (dateString: string | null, status: string, submittedAt?: string | null) => {
    const options: Intl.DateTimeFormatOptions = { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    };

    if (status === 'Submitted' || status === 'Submitted Late') {
        if (submittedAt) {
            const date = new Date(submittedAt);
            return `Submitted on: ${date.toLocaleString('en-US', options)}`;
        }
        return `Submitted successfully`;
    }

    if (!dateString) return "No deadline";
    const date = new Date(dateString);
    const formatted = date.toLocaleString('en-US', options);
    
    if (status === 'Overdue') {
        return `Last date: ${formatted}`;
    }
    return `Due ${formatted}`;
  };

  const SkeletonCard = () => (
    <div className="boxStyle animate-pulse border border-[#F2EEF4] dark:border-[#3B3B3B] rounded-[28px] p-6 mb-5 dark:bg-[#2A2A2A]">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex-1 w-full">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-7 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            <div className="h-5 w-20 bg-gray-100 dark:bg-gray-800 rounded-full"></div>
          </div>
          <div className="h-5 w-32 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4"></div>
          <div className="h-4 w-full bg-gray-50 dark:bg-gray-900 rounded-lg mb-2"></div>
          <div className="h-4 w-2/3 bg-gray-50 dark:bg-gray-900 rounded-lg"></div>
        </div>
        <div className="flex flex-col items-start lg:items-end gap-3 w-full lg:w-auto">
          <div className="h-5 w-32 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
          <div className="h-10 w-44 bg-gray-200 dark:bg-gray-700 rounded-2xl mt-2"></div>
        </div>
      </div>
    </div>
  );

  const { data: assignments = [], isLoading: isAssignmentsLoading } = useStudentAssignments();

  const submissionQueries = useQueries({
    queries: assignments.map((item: any) => ({
      queryKey: ["my-submission", item.id],
      queryFn: () => getMySubmission(item.id),
      retry: false,
    }))
  });

  const isLoading = isAssignmentsLoading || submissionQueries.some(q => q.isLoading);

  const filteredAssignments = useMemo(() => {
    return assignments
      .map((item: any, index: number) => {
        let status: StatusType = 'In Progress';
        
        const mySubmission = submissionQueries[index]?.data;
        const isSuccess = submissionQueries[index]?.isSuccess;

        // Find the submitted_at timestamp wherever it might be hiding
        const submissionObj = item.submission || item.student_submission || (item.submissions && item.submissions[0]);
        const submittedAt = mySubmission?.submitted_at || item.submitted_at || submissionObj?.submitted_at;
        
        if (submittedAt || (isSuccess && mySubmission) || (item.status === 'Submitted' || item.status === 'completed') || submissionObj) {
            status = mySubmission?.grade ? 'Graded' : 'Submitted';
        } else if (item.due_date) {
            const dueDate = new Date(item.due_date);
            if (dueDate < new Date()) {
                status = 'Overdue';
            }
        }

        return {
          id: item.id,
          title: item.title,
          course: item.module_name || item.course_name || "",
          description: item.description || "",
          objective: "", // Backend doesn't provide this yet
          expectedOutcome: item.expected_outcome || "",
          status: status,
          deadline: formatDate(item.due_date, status, submittedAt),
          resources: item.resources.map((r: AssignmentResourceResponse) => ({
              id: r.id,
              title: r.file_name,
              url: r.file_path,
              type: (r.file_type?.includes('pdf') ? 'pdf' : 'link') as "pdf" | "link"
          }))
        } as const;
      })
      .filter((item) => {
        const matchesCourse = selectedCourse
          ? item.course.includes(selectedCourse)
          : true;

        const matchesStatus =
          statusFilter === 'All status'
            ? true
            : item.status === (statusFilter as any); // Cast for comparison

        return matchesCourse && matchesStatus;
      });
  }, [assignments, selectedCourse, statusFilter, submissionQueries]);

  // Removed early return for isLoading to keep header/filters visible

  return (
    <div className="boxStyle">

      {/* HEADER */}
      <div className="flex flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-lg sm:text-2xl font-semibold text-[#333] sm:w-fit w-35 dark:text-gray-300">
          {selectedCourse
            ? `Assignments for ${selectedCourse}`
            : 'All Assignments'}
        </h2>

        {/* DROPDOWN */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between gap-2 border border-[#F2EEF4] rounded-xl px-4 py-2 bg-white hover:bg-gray-50 transition-all cursor-pointer w-full"
          >
            <FilterSearch size="16"  color="#626262" />
            <span className="text-[13px] font-medium text-gray-600">
              {statusFilter}
            </span>
            <ChevronDown
              size="16"
              className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          {isOpen && (
            <div className="absolute top-full mt-2 w-full bg-white border border-[#F2EEF4] rounded-xl shadow-md z-50 overflow-hidden">
              {statusOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setStatusFilter(option);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-[13px] transition-colors cursor-pointer ${statusFilter === option
                      ? "bg-[#FFF7ED] text-[#F97316] font-medium"
                      : "hover:bg-gray-50 text-gray-600"
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CARD LIST */}
      <div className="space-y-5">
        {isLoading ? (
          /* SKELETON LOADING STATE */
          [1, 2, 3].map(i => <SkeletonCard key={i} />)
        ) : filteredAssignments.length > 0 ? (
          filteredAssignments.map((item) => (
            <AssignmentCard
              key={item.id}
              item={item}
              getStatusStyles={getStatusStyles}
            />
          ))
        ) : (
          <div className="text-center py-16 sm:py-20 bg-gray-50 rounded-[28px] border border-dashed border-[#F2EEF4]">
            <p className="text-[#626262] font-medium text-sm">
              No assignments found for the current selection.
            </p>
            <button
              onClick={() => setStatusFilter('All status')}
                className="mt-3 text-[#f67500] hover:text-[#ff820d] text-xs font-semibold hover:underline cursor-pointer transition duration-500 "
            >
              Clear status filter
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default AssignmentList;