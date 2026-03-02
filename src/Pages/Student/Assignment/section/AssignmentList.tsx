import React, { useState, useMemo, useEffect, useRef } from 'react';
import { FilterSearch } from 'iconsax-react';
import { ChevronDown } from 'lucide-react';
import { Assignments, type StatusType } from "../data/AssignmentData";
import AssignmentCard from "./AssignmentCard";

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
    'Overdue',
    'Submitted Late'
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-[#FFEDDE] text-[#F67300] ';
      case 'Submitted': return 'bg-[#2A9A4610] text-[#2A9A46] ';
      case 'Overdue': return 'bg-[#F32D2D10] text-[#F32D2D] ';
      case 'Submitted Late': return 'bg-[#F32D2D10] text-[#F32D2D]';
      default: return 'bg-gray-50 text-gray-400 ';
    }
  };

  const filteredAssignments = useMemo(() => {
    return Assignments.filter(item => {
      const matchesCourse = selectedCourse
        ? item.course.includes(selectedCourse)
        : true;

      const matchesStatus =
        statusFilter === 'All status'
          ? true
          : item.status === statusFilter;

      return matchesCourse && matchesStatus;
    });
  }, [selectedCourse, statusFilter]);

  return (
    <div className="boxStyle">

      {/* HEADER */}
      <div className="flex flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-lg sm:text-2xl font-semibold text-[#333] sm:w-fit w-35">
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
            <FilterSearch size="16" color="#626262" />
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
        {filteredAssignments.length > 0 ? (
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