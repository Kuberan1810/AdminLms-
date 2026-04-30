import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CalendarRemove } from 'iconsax-react';

interface AssignmentHeaderProps {
  title: string;
  status: string;
  deadline: string;
  courseCode: string;
}

const AssignmentHeader: React.FC<AssignmentHeaderProps> = ({
  title,
  status,
  deadline,
  courseCode,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  // Status style helper moved here to keep it self-contained
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
      default: return 'bg-gray-50 dark:bg-[#333] text-gray-400 dark:text-gray-300';
    }
  };

  return (
    <header className="mb-5 ">
      <div className="flex items-center gap-4 mb-5 ">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="p-1 -ml-1 hover:bg-gray-100 dark:hover:bg-[#333] rounded-full transition-colors cursor-pointer"
        >
            <ArrowLeft strokeWidth={1.7} className="md:size-7.5 size-5 text-gray-500 dark:text-gray-300" color="currentColor" />
        </button>

        <h1 className="lg:text-3xl md:text-2xl text-xl  font-medium text-[#333333] tracking-tight dark:text-gray-300">
          {title}
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-3">
        <span className={`px-4 py-1 rounded-full  text-xs font-medium ${getStatusStyles(status)}`}>
          {status}
        </span>


        <div className="flex gap-1.5 justify-between items-center">

          <div className="iconStyle">
            <CalendarRemove size="16" variant="Outline" color="currentColor" />
          </div>

          <span className="text-[14px] text-[#626262] dark:text-gray-300">
            <span>{deadline}</span>
          </span>
          
        </div>

      </div>

      <p className="text-sm font-medium text-[#626262] dark:text-gray-100 uppercase tracking-wide">
        {courseCode}
      </p>
    </header>
  );
};

export default AssignmentHeader;