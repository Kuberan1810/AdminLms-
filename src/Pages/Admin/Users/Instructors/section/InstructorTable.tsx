
import { useState, useRef, useEffect } from "react";
import { MoreVertical, ChevronLeft, ChevronRight, Mail, FileText, Users, Trash2, ListFilter, Search, SlidersHorizontal } from "lucide-react";

import { instructorMockData, type InstructorData } from "../../../../../data/InstructorMockData";

interface Props {
  instructors: InstructorData[];
  onSelect: (instructor: InstructorData) => void;
  onDelete: (id: string) => void;
}


const InstructorTable = ({ instructors, onSelect, onDelete }: Props) => {
  const [activeActionMenu, setActiveActionMenu] = useState<string | null>(null);
  const [instructorToDelete, setInstructorToDelete] = useState<InstructorData | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveActionMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-[#047C2E]/10 text-[#047C2E]";
      case "Leave":
        return "bg-[#F6810C]/10 text-[#F6810C]";
      case "Pending":
        return "bg-[#3111E8]/10 text-[#3111E8]";
      case "Resigned":
        return "bg-[#EA1115]/10 text-[#EA1115]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const confirmDelete = () => {
    if (instructorToDelete) {
      onDelete(instructorToDelete.id);
      setInstructorToDelete(null);
    }
  };

  return (

    <div className="bg-white dark:bg-[#2A2A2A] rounded-[20px] border border-[#F2EEF4] dark:border-[#3B3B3B] overflow-visible">
      <div className="overflow-x-auto overflow-y-visible pb-16">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className=" bg-[#FFFBF8] dark:bg-[#3B3B3B] border-b border-[#F2EEF4] dark:border-[#3B3B3B]">
              <th className="px-6 py-5 text-sm md:text-base font-semibold text-[#333333] dark:text-white">Instructor</th>
              <th className="px-6 py-5 text-sm md:text-base font-semibold text-[#333333] dark:text-white text-center">Instructor Id</th>
              <th className="px-6 py-5 text-sm md:text-base font-semibold text-[#333333] dark:text-white">Course</th>
              <th className="px-6 py-5 text-sm md:text-base font-semibold text-[#333333] dark:text-white text-center">Status</th>
              <th className="px-6 py-5 text-sm md:text-base font-semibold text-[#333333] dark:text-white text-center">Attendance</th>
              <th className="px-6 py-5 text-sm md:text-base font-semibold text-[#333333] dark:text-white text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {instructors.map((instructor) => (
              <tr 
                key={instructor.id} 
                onClick={() => onSelect(instructor)}
                className="border-b border-[#F2EEF4] dark:border-[#3B3B3B] last:border-0 hover:bg-gray-50/50 dark:hover:bg-[#333]/30 transition-all cursor-pointer group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={instructor.avatar}
                      alt={instructor.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm md:text-base font-semibold text-[#333333] dark:text-white">{instructor.name}</p>
                      <p className="text-sm md:text-base text-[#626262] dark:text-[#A3A3A3]">{instructor.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-sm font-medium text-[#626262] dark:text-[#A3A3A3]">{instructor.instructorId}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    {instructor.courses.map((course, idx) => (
                      <p key={idx} className="text-xs md:text-sm font-medium text-[#333333] dark:text-[#A3A3A3] truncate max-w-[250px]">
                        {course}
                      </p>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-[12px] font-regular ${getStatusStyles(instructor.status)}`}>
                    {instructor.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center text-sm font-semibold text-[#222222] dark:text-[#A3A3A3]">
                  {instructor.attendance}
                </td>
                <td className="px-6 py-4 text-center relative">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveActionMenu(activeActionMenu === instructor.id ? null : instructor.id);
                    }}
                    className="p-1 text-[#626262] hover:bg-gray-100 dark:hover:bg-[#333] rounded-lg transition-colors cursor-pointer"
                  >
                    <MoreVertical size={20} />
                  </button>

                  {/* Action Menu Popup */}
                  {activeActionMenu === instructor.id && (
                    <div 
                      ref={menuRef}
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-[80%] right-10 w-[200px] bg-white dark:bg-[#2A2A2A] shadow-xl rounded-xl border border-[#F2EEF4] dark:border-[#3B3B3B] z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-[#F2EEF4] dark:border-[#3B3B3B]">
                        <p className="text-sm font-semibold text-[#333333] dark:text-white text-left">Instructor Action</p>
                      </div>
                      <div className="p-2 space-y-1">
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#626262] dark:text-[#A3A3A3] hover:text-[#333333] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#333] rounded-lg transition-colors text-left cursor-pointer">
                          <Mail size={16} strokeWidth={1.5} />
                          Send Mail
                        </button>
                        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#626262] dark:text-[#A3A3A3] hover:text-[#333333] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#333] rounded-lg transition-colors text-left cursor-pointer">
                          <FileText size={16} strokeWidth={1.5} />
                          Export Report
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelect(instructor);
                            setActiveActionMenu(null);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-[#626262] dark:text-[#A3A3A3] hover:text-[#333333] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#333] rounded-lg transition-colors text-left cursor-pointer"
                        >
                          <Users size={16} strokeWidth={1.5} />
                          View Full Profile
                        </button>
                      </div>
                      <div className="border-t border-[#F2EEF4] dark:border-[#3B3B3B] p-2 flex justify-center">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setInstructorToDelete(instructor);
                            setActiveActionMenu(null);
                          }}
                          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-[#FF5A5F] hover:bg-[#FF5A5F]/10 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 size={16} strokeWidth={1.5} />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* Delete Confirmation Modal */}
      {instructorToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#2A2A2A] rounded-2xl p-6 w-full max-w-sm shadow-xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-[#333333] dark:text-white mb-2">Delete Instructor?</h3>
            <p className="text-sm text-[#626262] dark:text-[#A3A3A3] mb-6">
              Are you sure you want to remove <span className="font-semibold text-[#333333] dark:text-white">{instructorToDelete.name}</span>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button 
                onClick={() => setInstructorToDelete(null)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-[#626262] dark:text-[#A3A3A3] hover:bg-gray-100 dark:hover:bg-[#3B3B3B] transition-colors cursor-pointer border border-[#F2EEF4] dark:border-[#3B3B3B]"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-[#FF5A5F] hover:bg-[#E0484D] transition-colors  cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstructorTable;
