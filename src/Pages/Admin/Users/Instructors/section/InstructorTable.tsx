import React from 'react';
import {
  Users,
  Presentation,
  Calendar,
  CheckSquare,
  Search,
  ListFilter,
  SlidersHorizontal,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { instructorMockData } from "../../../../../data/InstructorMockData";
import type { InstructorData } from "../../../../../data/InstructorMockData";

interface Props {
  onSelect: (instructor: InstructorData) => void;
}

const InstructorTable = ({ onSelect }: Props) => {
  const stats = [
    {
      label: "Total Instructor",
      value: "24",
      subtitle: "Across all departments",
      icon: Users,
      iconColor: "text-[#F67300]",
      bgColor: "bg-[#FFF4ED]",
    },
    {
      label: "Currently Teaching",
      value: "18",
      subtitle: "Live classes ongoing",
      icon: Presentation,
      iconColor: "text-[#22C55E]",
      bgColor: "bg-[#E8F8F0]",
    },
    {
      label: "On Leave",
      value: "2",
      subtitle: "Not available today",
      icon: Calendar,
      iconColor: "text-[#EF4444]",
      bgColor: "bg-[#FEE2E2]",
    },
    {
      label: "Avg. Attendance",
      value: "95%",
      growth: "+12%",
      icon: CheckSquare,
      iconColor: "text-[#8B5CF6]",
      bgColor: "bg-[#F5F3FF]",
    },
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-[#E8F8F0] text-[#22C55E]";
      case "Leave":
        return "bg-[#FFF7ED] text-[#F97316]";
      case "Pending":
        return "bg-[#F5F3FF] text-[#8B5CF6]";
      case "Resigned":
        return "bg-[#FEF2F2] text-[#EF4444]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#2A2A2A] p-6 rounded-[28px] border border-[#F2EEF4] dark:border-[#3B3B3B] transition-all hover:shadow-md relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={stat.iconColor} size={20} />
              </div>
              {stat.growth && (
                <span className="bg-[#E8F8F0] text-[#22C55E] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {stat.growth}
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-[#626262] dark:text-[#A3A3A3] mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-[#333333] dark:text-white mb-1">{stat.value}</h3>
              {stat.subtitle && (
                <p className="text-[11px] text-[#626262] dark:text-[#A3A3A3] font-medium">{stat.subtitle}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-[400px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#626262]" size={18} />
          <input
            type="text"
            placeholder="Search by name, ID or email..."
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#2A2A2A] border border-[#F2EEF4] dark:border-[#3B3B3B] rounded-[18px] text-sm focus:outline-none focus:ring-2 focus:ring-[#F67300]/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#2A2A2A] border border-[#F2EEF4] dark:border-[#3B3B3B] rounded-xl text-sm font-semibold text-[#333333] dark:text-white hover:bg-gray-50 dark:hover:bg-[#333] transition-all">
            <ListFilter size={18} className="text-[#626262]" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#2A2A2A] border border-[#F2EEF4] dark:border-[#3B3B3B] rounded-xl text-sm font-semibold text-[#333333] dark:text-white hover:bg-gray-50 dark:hover:bg-[#333] transition-all">
            <SlidersHorizontal size={18} className="text-[#626262]" />
            Sort by : <span className="text-[#F67300]">Newest</span>
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white dark:bg-[#2A2A2A] rounded-[28px] border border-[#F2EEF4] dark:border-[#3B3B3B] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#F2EEF4] dark:border-[#3B3B3B]">
                <th className="px-6 py-5 text-sm font-semibold text-[#333333] dark:text-white">Instructor</th>
                <th className="px-6 py-5 text-sm font-semibold text-[#333333] dark:text-white text-center">Instructor Id</th>
                <th className="px-6 py-5 text-sm font-semibold text-[#333333] dark:text-white">Course</th>
                <th className="px-6 py-5 text-sm font-semibold text-[#333333] dark:text-white text-center">Status</th>
                <th className="px-6 py-5 text-sm font-semibold text-[#333333] dark:text-white text-center">Attendance</th>
                <th className="px-6 py-5 text-sm font-semibold text-[#333333] dark:text-white text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {instructorMockData.map((instructor) => (
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
                        <p className="text-sm font-bold text-[#333333] dark:text-white">{instructor.name}</p>
                        <p className="text-xs text-[#626262] dark:text-[#A3A3A3]">{instructor.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-sm font-medium text-[#626262] dark:text-[#A3A3A3]">{instructor.instructorId}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {instructor.courses.map((course, idx) => (
                        <p key={idx} className="text-xs font-medium text-[#626262] dark:text-[#A3A3A3] truncate max-w-[250px]">
                          {course}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold ${getStatusStyles(instructor.status)}`}>
                      {instructor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-bold text-[#626262] dark:text-[#A3A3A3]">
                    {instructor.attendance}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="text-[#626262] hover:text-[#333333] transition-colors">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 p-6 border-t border-[#F2EEF4] dark:border-[#3B3B3B]">
          <button className="p-2 text-[#626262] hover:bg-gray-100 dark:hover:bg-[#3B3B3B] rounded-lg transition-all border border-[#F2EEF4] dark:border-[#3B3B3B]">
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center bg-[#F67300] text-white text-xs font-bold rounded-lg">1</button>
            <button className="w-8 h-8 flex items-center justify-center text-[#626262] text-xs font-medium hover:bg-gray-100 dark:hover:bg-[#3B3B3B] rounded-lg">2</button>
            <button className="w-8 h-8 flex items-center justify-center text-[#626262] text-xs font-medium hover:bg-gray-100 dark:hover:bg-[#3B3B3B] rounded-lg">3</button>
            <span className="text-[#626262] px-1">...</span>
            <button className="w-8 h-8 flex items-center justify-center text-[#626262] text-xs font-medium hover:bg-gray-100 dark:hover:bg-[#3B3B3B] rounded-lg">7</button>
          </div>
          <button className="p-2 text-[#626262] hover:bg-gray-100 dark:hover:bg-[#3B3B3B] rounded-lg transition-all border border-[#F2EEF4] dark:border-[#3B3B3B]">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorTable;
